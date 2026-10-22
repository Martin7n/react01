import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../context/authContext";
import CreateCategoryModal from "./CreateCategoryModal";
import categoryApi from "../../api/catalogApi";
import profileApi from "../../api/profileApi"; // 🌟 Imported your profile tracking endpoints

export default function Catalog() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { user } = useAuth();

    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const [profileLoading, setProfileLoading] = useState(false);

    const navigate = useNavigate();

    const loadCatalogData = async (isMounted = true) => {
        try {
            const catResult = await categoryApi.getAll();
            if (!catResult?.success)
                throw new Error("Could not load categories list.");

            let subs = [];
            if (user?.id) {
                setProfileLoading(true);
                const profileResult = await profileApi.getProfile(user.id);
                if (profileResult && profileResult.success) {
                    const profileRow =
                        profileResult.data && profileResult.data.length > 0
                            ? profileResult.data[0]
                            : null;
                    subs = profileRow?.subscribed_categories || [];
                }
            }

            if (isMounted) {
                setCategories(catResult.data || []);
                setUserSubscriptions(subs);
            }
        } catch (err) {
            if (isMounted) setError(err.message);
        } finally {
            if (isMounted) {
                setLoading(false);
                setProfileLoading(false);
            }
        }
    };

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        loadCatalogData(isMounted);

        return () => {
            isMounted = false;
        };
    }, [user?.id]);
    const handleCreateCategorySubmit = async (newCategoryData) => {
        const { name, description, imgUrl } = newCategoryData;
        try {
            const result = await categoryApi.createOne({
                name,
                description,
                imgUrl,
            });

            if (result && result.success) {
                await loadCatalogData();
                setIsCreateModalOpen(false);
            }
        } catch (err) {
            console.error("Database connection failure:", err.message);
            throw new Error(err.message || "Failed to save category row.");
        }
    };

    const handleSubscribeToggle = async (e, categoryId) => {
        e.stopPropagation(); // 🌟
        if (!user || profileLoading) return;

        try {
            const profileResult = await profileApi.getProfile(user.id);
            if (!profileResult?.success)
                throw new Error("Profile retrieval failed.");

            const profileRow =
                profileResult.data && profileResult.data.length > 0
                    ? profileResult.data[0]
                    : null;
            const currentSubs = profileRow?.subscribed_categories || [];

            let updatedSubs;
            if (currentSubs.includes(categoryId)) {
                updatedSubs = currentSubs.filter(
                    (id) => String(id) !== String(categoryId),
                );
            } else {
                updatedSubs = [...currentSubs, categoryId];
            }

            const result = await profileApi.updateSubscriptions(
                user.id,
                updatedSubs,
            );
            if (result && result.success) {
                setUserSubscriptions(updatedSubs);
            }
        } catch (err) {
            console.error(
                "Failed modifying card subscription matrix:",
                err.message,
            );
        }
    };

    return (
        <>
            <div className="bg-gray-900 min-h-screen w-full py-12 mt-16 text-white">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-6 mb-8">
                        <div className="hidden sm:block w-40"></div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-center">
                            Category Catalog
                        </h1>

                        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                            {user ? (
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <svg
                                        className="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Create Category
                                </button>
                            ) : (
                                <div className="hidden sm:block w-40"></div>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-400 animate-pulse py-12">
                            Loading categories...
                        </p>
                    ) : error ? (
                        <p className="text-red-400 text-center py-12">
                            Error: {error}
                        </p>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 font-medium text-lg">
                            No categories available at the moment.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map((category) => {
                                const articleCount =
                                    category.articles &&
                                    Array.isArray(category.articles)
                                        ? category.articles.length
                                        : 0;

                                const isFollowing = userSubscriptions.includes(
                                    category.id,
                                );

                                return (
                                    <div
                                        key={category.id}
                                        onClick={() =>
                                            navigate(`/catalog/${category.id}`)
                                        }
                                        className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl hover:border-blue-500 transition duration-200 cursor-pointer flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="h-40 w-full bg-gray-700/50 rounded-lg mb-4 overflow-hidden flex items-center justify-center p-2 relative">
                                                {category.imgUrl ? (
                                                    <img
                                                        src={category.imgUrl}
                                                        alt={category.name}
                                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200"
                                                    />
                                                ) : (
                                                    <div className="text-gray-500 text-xs">
                                                        No Image
                                                    </div>
                                                )}

                                                {/*  Subscription Stat Overlay Badge */}
                                                {isFollowing && (
                                                    <span className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow tracking-wider uppercase animate-fadeIn">
                                                        ✓ Followed
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className="text-lg font-bold text-gray-100 truncate group-hover:text-blue-400 transition duration-200">
                                                {category.name}
                                            </h2>
                                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                                {category.description ||
                                                    "No description provided."}
                                            </p>
                                        </div>

                                        <div className="mt-3 flex items-center gap-1.5 text-xs">
                                            <span className="text-gray-400 font-medium">
                                                Articles:
                                            </span>
                                            {articleCount > 0 ? (
                                                <span className="bg-blue-500/10 text-blue-400 font-bold px-2 py-0.5 rounded-md border border-blue-500/20 tracking-wide">
                                                    {articleCount}{" "}
                                                    {articleCount === 1
                                                        ? "Article"
                                                        : "Articles"}
                                                </span>
                                            ) : (
                                                <span className="bg-gray-900 text-gray-500 font-medium italic px-2 py-0.5 rounded-md border border-gray-700/60">
                                                    Empty Node
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-gray-700 flex items-center justify-between gap-2">
                                            {!user ? (
                                                <Link
                                                    to="/login"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    className="text-xs text-gray-400 hover:text-white transition underline"
                                                >
                                                    Log in to subscribe
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={(e) =>
                                                        handleSubscribeToggle(
                                                            e,
                                                            category.id,
                                                        )
                                                    }
                                                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold shadow transition cursor-pointer active:scale-95 ${
                                                        isFollowing
                                                            ? "bg-neutral-700 text-gray-300 hover:bg-red-950/40 hover:text-red-400 border border-neutral-600 hover:border-red-900/40"
                                                            : "bg-blue-600 hover:bg-blue-500 text-white"
                                                    }`}
                                                >
                                                    {isFollowing
                                                        ? "Unsubscribe"
                                                        : "Subscribe"}
                                                </button>
                                            )}

                                            <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300 uppercase tracking-wider flex items-center gap-0.5">
                                                Details &rarr;
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {isCreateModalOpen && (
                <CreateCategoryModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateCategorySubmit}
                />
            )}
        </>
    );
}
