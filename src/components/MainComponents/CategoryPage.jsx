import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import categoryApi from "../../api/catalogApi";
import EditCategoryModal from "./EditCategoryModal";
import Articles from "./Articles/Articles";
import profileApi from "../../api/profileApi";

export default function CategoryPage() {
    const { id } = useParams();
    const { user, loading: authLoading } = useAuth();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);

    const navigate = useNavigate();

    async function loadCategory(isMounted = true) {
        try {
            const result = await categoryApi.getOne(id);

            if (!result?.success) {
                throw new Error("Could not load category.");
            }

            const found =
                result.data && result.data.length > 0 ? result.data[0] : null;

            if (isMounted) {
                if (!found) {
                    setError("Category not found.");
                } else {
                    setCategory(found);
                }
            }
        } catch (err) {
            if (isMounted) {
                setError(err.message || "Failed to load category.");
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    }

    async function checkUserSubscription(isMounted = true) {
        if (!user?.id) return;
        setProfileLoading(true);
        try {
            const result = await profileApi.getProfile(user.id);
            if (result && result.success) {
                const profile =
                    result.data && result.data.length > 0
                        ? result.data[0]
                        : null;
                const subs = profile?.subscribed_categories || [];

                if (isMounted) {
                    setIsSubscribed(subs.includes(id));
                }
            }
        } catch (err) {
            console.error(
                "Failed executing profile subscription validation sweep:",
                err,
            );
        } finally {
            if (isMounted) setProfileLoading(false);
        }
    }

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        loadCategory(!cancelled);
        checkUserSubscription(!cancelled); // Run checks concurrently

        return () => {
            cancelled = true;
        };
    }, [id, user?.id]);

    const handleEditCategorySubmit = async (categoryId, updatedFields) => {
        try {
            const result = await categoryApi.editOne(categoryId, updatedFields);

            if (result && result.success) {
                const updatedItem =
                    result.data && result.data.length > 0
                        ? result.data[0]
                        : null;
                if (updatedItem) {
                    setCategory(updatedItem);
                } else {
                    await loadCategory();
                }
                setIsEditModalOpen(false);
            }
        } catch (err) {
            console.error("Database update processing failure:", err.message);
            throw new Error(
                err.message || "Failed to update record on server.",
            );
        }
    };

    const handleDeleteCategory = async () => {
        if (
            !window.confirm(
                "Are you absolutely sure you want to permanently delete this category?",
            )
        ) {
            return;
        }
        try {
            const result = await categoryApi.deleteOne(id);
            if (result && result.success) {
                alert("Category successfully deleted.");
                navigate("/catalog");
            }
        } catch (err) {
            console.error("Database record deletion failure:", err.message);
            alert(err.message || "Failed to delete category.");
        }
    };

    const handleSubscribeToggle = async () => {
        if (profileLoading || !category) return;

        try {
            const profileResult = await profileApi.getProfile(user.id);
            if (!profileResult?.success)
                throw new Error("Could not download user profile parameters.");

            const profile =
                profileResult.data && profileResult.data.length > 0
                    ? profileResult.data[0]
                    : null;
            const currentSubs = profile?.subscribed_categories || [];

            let updatedSubs;

            if (currentSubs.includes(category.id)) {
                updatedSubs = currentSubs.filter(
                    (subId) => String(subId) !== String(category.id),
                );
                setIsSubscribed(false);
            } else {
                updatedSubs = [...currentSubs, category.id];
                setIsSubscribed(true);
            }

            await profileApi.updateSubscriptions(user.id, updatedSubs);
        } catch (err) {
            console.error(
                "Subscription system encountered a processing failure:",
                err.message,
            );
            alert("Could not process subscription updates. Please try again.");
        }
    };

    if (loading || authLoading) {
        return (
            <p className="mt-24 text-center text-gray-400 animate-pulse">
                Loading category...
            </p>
        );
    }
    if (error)
        return <p className="mt-24 text-center text-red-400">Error: {error}</p>;
    if (!category)
        return (
            <p className="mt-24 text-center text-gray-400">
                Category not found.
            </p>
        );

    const isAuthor = user?.id === category.author;

    return (
        <>
            <main className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        to="/catalog"
                        className="text-blue-400 hover:text-blue-300 transition duration-150 inline-flex items-center gap-1 text-sm font-medium"
                    >
                        &larr; Back to catalog
                    </Link>

                    {category.imgUrl && (
                        <div className="mt-6 w-full h-72 bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-gray-800 shadow-xl">
                            <img
                                src={category.imgUrl}
                                alt={category.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    )}

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            {category.name}
                        </h1>

                        <div>
                            {!user ? (
                                <Link
                                    to="/login"
                                    className="text-sm text-blue-400 hover:underline font-medium"
                                >
                                    Log in to subscribe
                                </Link>
                            ) : (
                                <button
                                    onClick={handleSubscribeToggle}
                                    disabled={profileLoading}
                                    className={`w-full sm:w-auto rounded-xl px-5 py-2.5 text-sm font-semibold transition cursor-pointer shadow-md active:scale-95 disabled:opacity-50 ${
                                        isSubscribed
                                            ? "bg-neutral-800 hover:bg-red-950/40 hover:text-red-400 border border-neutral-700 hover:border-red-900/50"
                                            : "bg-blue-600 hover:bg-blue-500 text-white"
                                    }`}
                                >
                                    {profileLoading
                                        ? "Syncing..."
                                        : isSubscribed
                                          ? "Unsubscribe"
                                          : "Subscribe to Topic"}
                                </button>
                            )}
                        </div>
                    </div>

                    <p className="mt-4 text-gray-300 leading-relaxed text-lg">
                        {category.description || "No description available."}
                    </p>

                    {isAuthor && (
                        <div className="mt-6 flex gap-3 border-t border-gray-800 pt-4">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 active:scale-95 px-5 py-2 text-sm font-semibold transition cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteCategory}
                                className="rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 px-5 py-2 text-sm font-semibold transition cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    <section className="mt-12 pt-8 border-t border-gray-800">
                        <Articles category={category} />
                    </section>
                </div>
            </main>

            {isEditModalOpen && (
                <EditCategoryModal
                    category={category}
                    onClose={() => setIsEditModalOpen(false)}
                    onEditSuccess={handleEditCategorySubmit}
                />
            )}
        </>
    );
}
