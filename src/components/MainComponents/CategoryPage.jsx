// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/authContext";
// import { useParams } from "react-router";

// export default function CategoryPage() {
//     const { id } = useParams();
//     const { user, loading: authLoading } = useAuth();
//     const [category, setCategory] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function loadCategory() {
//             setLoading(true);
//             setError(null);

//             try {
//                 const result = await categoryApi.getAll();

//                 if (!result?.success) {
//                     throw new Error("Could not load categories.");
//                 }

//                 const found = result.data.find(
//                     (item) => String(item.id) === id,
//                 );

//                 if (!cancelled) {
//                     setCategory(found ?? null);
//                 }
//             } catch (err) {
//                 if (!cancelled) {
//                     setError(err.message || "Failed to load category.");
//                 }
//             } finally {
//                 if (!cancelled) {
//                     setLoading(false);
//                 }
//             }
//         }

//         loadCategory();

//         return () => {
//             cancelled = true;
//         };
//     }, [id]);

//     if (loading || authLoading) {
//         return <p className="mt-24 text-center">Loading category...</p>;
//     }

//     if (error) {
//         return <p className="mt-24 text-center text-red-600">{error}</p>;
//     }

//     if (!category) {
//         return <p className="mt-24 text-center">Category not found.</p>;
//     }

//     const isAuthor = user?.id === category.author;

//     return (
//         <>
//             {" "}
//             <main className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-6">
//                 <div className="max-w-4xl mx-auto">
//                     <Link
//                         to="/catalog"
//                         className="text-blue-400 hover:text-blue-300"
//                     >
//                         ← Back to catalog
//                     </Link>

//                     {category.imgUrl && (
//                         <img
//                             src={category.imgUrl}
//                             alt={category.name}
//                             className="mt-6 w-full h-72 object-cover rounded-2xl"
//                         />
//                     )}

//                     <h1 className="mt-8 text-4xl font-bold">{category.name}</h1>

//                     <p className="mt-4 text-gray-300 leading-relaxed">
//                         {category.description || "No description available."}
//                     </p>

//                     {isAuthor && (
//                         <div className="mt-6 flex gap-3">
//                             <button className="rounded-lg bg-blue-600 px-4 py-2">
//                                 Edit
//                             </button>

//                             <button className="rounded-lg bg-red-600 px-4 py-2">
//                                 Delete
//                             </button>
//                         </div>
//                     )}

//                     <section className="mt-10">
//                         <h2 className="text-2xl font-bold">Articles</h2>
//                         <p className="mt-3 text-gray-400">
//                             Article loading can be connected here using your
//                             existing Articles component.
//                         </p>
//                     </section>
//                 </div>
//             </main>
//         </>
//     );
// }
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router"; // Added useNavigate
import { useAuth } from "../../context/authContext";
import categoryApi from "../../api/catalogApi";
import EditCategoryModal from "./EditCategoryModal";
import Articles from "./Articles";

export default function CategoryPage() {
    const { id } = useParams();
    const { user, loading: authLoading } = useAuth();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate(); // Hook instantiation to handle post-delete redirection

    async function loadCategory(isMounted = true) {
        try {
            // 1. Fetch from the specific getOne tracking endpoint
            const result = await categoryApi.getOne(id);

            if (!result?.success) {
                throw new Error("Could not load category.");
            }

            // 2. PostgREST filtering returns an array container.
            // We must safely target index 0 to pluck the actual category object layout out.
            const found =
                result.data && result.data.length > 0 ? result.data[0] : null;

            if (isMounted) {
                if (!found) {
                    // If the array came back empty, the ID doesn't exist in Supabase
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

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        loadCategory(!cancelled);
        return () => {
            cancelled = true;
        };
    }, [id]);

    // Handle form changes utilizing the custom PATCH request helper
    const handleEditCategorySubmit = async (categoryId, updatedFields) => {
        try {
            const result = await categoryApi.editOne(categoryId, updatedFields);

            if (result && result.success) {
                // PostgREST return=representation returns the updated item array
                const updatedItem =
                    result.data && result.data.length > 0
                        ? result.data[0]
                        : null;

                if (updatedItem) {
                    setCategory(updatedItem); // Synchronize updated state instantly
                } else {
                    await loadCategory(); // Fallback query cycle refresh
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

    // Handle database record removal utilizing the custom DELETE request helper
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
                navigate("/catalog"); // Clean exit redirect back onto catalog canvas grid
            }
        } catch (err) {
            console.error("Database record deletion failure:", err.message);
            alert(err.message || "Failed to delete category.");
        }
    };

    const handleSubscribe = () => {
        alert("Subscribing to category ID: " + category.id);
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
                        <div className="mt-6 w-full h-72 bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-gray-800">
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
                                    className="text-sm text-blue-400 hover:underline"
                                >
                                    Log in to subscribe
                                </Link>
                            ) : (
                                <button
                                    onClick={handleSubscribe}
                                    className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 px-5 py-2.5 text-sm font-semibold transition cursor-pointer shadow-md"
                                >
                                    Subscribe to Topic
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
                            {/* Wired up native click pointer handler trigger here */}
                            <button
                                onClick={handleDeleteCategory}
                                className="rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 px-5 py-2 text-sm font-semibold transition cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    <section className="mt-12 pt-8 border-t border-gray-800">
                        <h2 className="text-2xl font-bold">Articles</h2>
                        <p className="mt-3 text-gray-400 bg-gray-800/40 border border-gray-800 p-4 rounded-xl text-sm"></p>
                        <Articles />
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
