// import { useEffect, useState } from "react";
// import { useParams } from "react-router"; // Added to read URL route parameters
// import articleApi from "../../api/articleApi";

// export default function Articles({ category }) {
//     // 1. Unpack the ID from the route path parameters if it exists (e.g., /catalog/:id)
//     const { id: urlParamId } = useParams();

//     // 2. Fallback cascade: prioritize a passed-in category prop object, then fallback to URL params
//     const categoryId = category?.id || urlParamId;

//     const [articles, setArticles] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Guard clause: if neither prop nor URL parameter exists, do not execute the call
//         if (!categoryId) {
//             setLoading(false);
//             return;
//         }

//         let isMounted = true;
//         setLoading(true);
//         setError(null);

//         articleApi
//             .getAll(categoryId)
//             .then((result) => {
//                 if (result && result.success && isMounted) {
//                     const fetchedData = result.data || [];
//                     setArticles(fetchedData);
//                     console.log(
//                         `Articles loaded for category [${categoryId}]:`,
//                         fetchedData,
//                     );
//                 }
//             })
//             .catch((err) => {
//                 if (isMounted) setError(err.message);
//             })
//             .finally(() => {
//                 if (isMounted) setLoading(false);
//             });

//         return () => {
//             isMounted = false;
//         };
//     }, [categoryId]); // Automatically fires if the prop updates OR if the URL parameter changes

//     return (
//         <div className="mt-6 text-white">
//             {loading ? (
//                 <p className="text-center text-gray-400 animate-pulse py-6">
//                     Loading articles...
//                 </p>
//             ) : error ? (
//                 <p className="text-red-400 text-center py-6">
//                     Error loading articles: {error}
//                 </p>
//             ) : articles.length === 0 ? (
//                 <p className="text-gray-500 text-center py-6 font-medium italic">
//                     No articles published under this category node yet.
//                 </p>
//             ) : (
//                 /* Responsive Articles Grid */
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {articles.map((item) => (
//                         <div
//                             key={item.id}
//                             className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-blue-500 transition duration-150"
//                         >
//                             <div>
//                                 {/* Article Image Frame */}
//                                 <div className="h-40 bg-gray-700/50 border border-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden p-2">
//                                     {item.imgUrl && item.imgUrl !== "nanaa" ? (
//                                         <img
//                                             src={item.imgUrl}
//                                             alt="Article Cover"
//                                             className="max-h-full max-w-full object-contain rounded"
//                                         />
//                                     ) : (
//                                         <span className="text-gray-500 text-xs select-none">
//                                             📜 Article Preview
//                                         </span>
//                                     )}
//                                 </div>

//                                 <h3 className="text-sm font-mono text-blue-400 truncate">
//                                     {item.title ||
//                                         `Resource Node #${item.idx ?? "Item"}`}
//                                 </h3>
//                                 <div className="text-xs text-gray-500 font-sans mt-0.5 truncate">
//                                     ID: {item.id}
//                                 </div>

//                                 <p className="text-gray-300 text-sm mt-3 line-clamp-4 leading-relaxed font-sans">
//                                     {item.content ||
//                                         "No text content available."}
//                                 </p>
//                             </div>

//                             <button className="mt-5 w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white py-2 rounded-lg font-semibold text-sm shadow transition cursor-pointer">
//                                 Read Full Article
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import articleApi from "../../api/articleApi";
import { useAuth } from "../../context/authContext";
import ArticleModal from "./ArticleModal"; // Imported modal above

export default function Articles({ category }) {
    const { id: urlParamId } = useParams();
    const categoryId = category?.id || urlParamId;
    const { user } = useAuth(); // Read user context session layer

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal Control States
    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: "create",
        currentArticle: null,
    });

    async function loadArticles(isMounted = true) {
        if (!categoryId) return;
        try {
            const result = await articleApi.getAll(categoryId);
            if (result && result.success && isMounted) {
                setArticles(result.data || []);
            }
        } catch (err) {
            if (isMounted) setError(err.message);
        } finally {
            if (isMounted) setLoading(false);
        }
    }

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);
        loadArticles(isMounted);
        return () => {
            isMounted = false;
        };
    }, [categoryId]);

    // CREATE SUBMIT HANDLER
    const handleCreateArticleSubmit = async (fields) => {
        try {
            const payload = {
                ...fields,
                category: categoryId,
                article_author: user?.id, // Explicitly binds active user id parameter as author field
            };
            const result = await articleApi.createOne(payload);
            if (result && result.success) {
                await loadArticles();
                setModalState({
                    isOpen: false,
                    mode: "create",
                    currentArticle: null,
                });
            }
        } catch (err) {
            console.error("Failed creating dynamic article node:", err.message);
            throw new Error(
                err.message || "Failed to persist article metadata row.",
            );
        }
    };

    // UPDATE EDIT SUBMIT HANDLER
    const handleEditArticleSubmit = async (articleId, fields) => {
        try {
            const result = await articleApi.editOne(articleId, fields);
            if (result && result.success) {
                await loadArticles();
                setModalState({
                    isOpen: false,
                    mode: "create",
                    currentArticle: null,
                });
            }
        } catch (err) {
            console.error(
                "Failed altering target article node record:",
                err.message,
            );
            throw new Error(
                err.message || "Failed to process mutation update matrix.",
            );
        }
    };

    // DELETE RESTRUCTURING HANDLER
    const handleDeleteArticle = async (articleId) => {
        if (
            !window.confirm(
                "Are you sure you want to permanently delete this article element?",
            )
        )
            return;
        try {
            const result = await articleApi.deleteOne(articleId);
            if (result && result.success) {
                setArticles((prev) =>
                    prev.filter((art) => art.id !== articleId),
                );
                alert("Article record successfully purged.");
            }
        } catch (err) {
            console.error("Failed removing article database row:", err.message);
            alert(err.message || "Failed to delete article row on server.");
        }
    };

    return (
        <div className="mt-8 text-white">
            {/* Header Area with Conditional Creation Controls based on user authorization states */}
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
                <h2 className="text-2xl font-bold tracking-tight">
                    Resource Articles
                </h2>

                {user && (
                    <button
                        onClick={() =>
                            setModalState({
                                isOpen: true,
                                mode: "create",
                                currentArticle: null,
                            })
                        }
                        className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs px-4 py-2 rounded-xl font-semibold shadow transition cursor-pointer flex items-center gap-1.5"
                    >
                        ➕ Add Article
                    </button>
                )}
            </div>

            {/* Layout Canvas Handling conditions */}
            {loading ? (
                <p className="text-center text-gray-400 animate-pulse py-6">
                    Loading articles...
                </p>
            ) : error ? (
                <p className="text-red-400 text-center py-6">
                    Error reading canvas: {error}
                </p>
            ) : articles.length === 0 ? (
                <p className="text-gray-500 text-center py-6 font-medium italic">
                    No articles published under this category node yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {articles.map((item) => {
                        // Authorized validation comparison check against your explicit key 'article_author'
                        const isAuthor =
                            user && user.id === item.article_author;

                        return (
                            <div
                                key={item.id}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-gray-600 transition duration-150"
                            >
                                <div>
                                    {/* Image Display */}
                                    <div className="h-40 bg-gray-700/50 border border-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden p-2">
                                        {item.imgUrl &&
                                        item.imgUrl !== "nanaa" ? (
                                            <img
                                                src={item.imgUrl}
                                                alt="Cover asset"
                                                className="max-h-full max-w-full object-contain rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-500 text-xs select-none">
                                                📜 Documentation Block
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-sm font-mono text-blue-400 truncate">
                                        Resource Node #{item.idx ?? "Item"}
                                    </h3>

                                    <p className="text-gray-300 text-sm mt-3 line-clamp-4 leading-relaxed font-sans">
                                        {item.content ||
                                            "No structural body data defined."}
                                    </p>
                                </div>

                                {/* Dynamic Action Controls */}
                                <div className="mt-5 pt-3 border-t border-gray-700/60 flex items-center justify-between gap-2">
                                    {isAuthor ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    setModalState({
                                                        isOpen: true,
                                                        mode: "edit",
                                                        currentArticle: item,
                                                    })
                                                }
                                                className="text-xs bg-gray-700 hover:bg-gray-600 text-blue-400 font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteArticle(item.id)
                                                }
                                                className="text-xs bg-red-950/40 hover:bg-red-900/60 text-red-400 font-semibold px-3 py-1.5 rounded-lg border border-red-900/40 transition cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <div /> /* Invisible spacer to push main button style parameters right uniformly */
                                    )}

                                    <button className="bg-neutral-900 hover:bg-black text-gray-300 text-xs px-3 py-1.5 rounded-lg font-medium transition cursor-pointer">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Dynamic Modal mounting gate wrapper execution */}
            {modalState.isOpen && (
                <ArticleModal
                    mode={modalState.mode}
                    article={modalState.currentArticle}
                    onClose={() =>
                        setModalState({
                            isOpen: false,
                            mode: "create",
                            currentArticle: null,
                        })
                    }
                    onSubmit={
                        modalState.mode === "edit"
                            ? handleEditArticleSubmit
                            : handleCreateArticleSubmit
                    }
                />
            )}
        </div>
    );
}
