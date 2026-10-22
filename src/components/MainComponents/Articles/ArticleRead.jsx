import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import articleApi from "../../../api/articleApi";
import profileApi from "../../../api/profileApi";

export default function ArticleRead() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authorEmail, setAuthorEmail] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        async function fetchArticleAndAuthor() {
            try {
                // 1. Fetch the simple article record (No complex joins that cause 400 errors!)
                const result = await articleApi.getOneArticle(id);

                if (!result || !result.success) {
                    throw new Error("Could not find article record data.");
                }

                const foundArticle =
                    result.data && result.data.length > 0
                        ? result.data[0]
                        : null;

                if (!foundArticle) {
                    if (isMounted)
                        setError(
                            "The requested article node could not be located.",
                        );
                    return;
                }

                if (isMounted) {
                    setArticle(foundArticle);
                }

                // 2. Proactive Step-Up: Grab the email from our public profile table using the author UUID
                if (foundArticle.article_author) {
                    const profileResult = await profileApi.getProfile(
                        foundArticle.article_author,
                    );

                    if (
                        profileResult &&
                        profileResult.success &&
                        profileResult.data?.length > 0
                    ) {
                        if (isMounted) {
                            setAuthorEmail(profileResult.data[0].email); // Capture email successfully!
                        }
                    }
                }
            } catch (err) {
                if (isMounted)
                    setError(
                        err.message || "Failed to load documentation entry.",
                    );
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchArticleAndAuthor();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
                <p className="text-gray-400 font-medium animate-pulse">
                    Compiling resource content layout...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
                <div className="bg-red-950/40 border border-red-900/50 rounded-2xl p-6 text-center max-w-md shadow-xl">
                    <p className="text-red-400 font-semibold mb-4">
                        ⚠️ Initialization Error
                    </p>
                    <p className="text-gray-300 text-sm mb-6">{error}</p>
                    <Link
                        to="/catalog"
                        className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2 rounded-xl border border-neutral-700 transition"
                    >
                        Return to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white pt-24 pb-16 px-6 sm:px-12">
            <div className="max-w-3xl mx-auto">
                {/* Back Link pointing to the catalog list or back to its category dynamically */}
                <Link
                    to="/catalog"
                    className="text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1.5 text-sm font-medium mb-8"
                >
                    &larr; Back to platform nodes
                </Link>

                <div className="border-b border-gray-800 pb-6 mb-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-2">
                        <span>Node Target Identifier:</span>
                        <span className="text-blue-500 font-semibold select-all">
                            {id}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-100">
                        {`Resource Documentation Node #${article?.idx ?? "Item"}`}
                        {/* totally cool with identifier... */}
                    </h1>

                    <div className="mt-3 text-xs text-gray-400 flex flex-wrap items-center gap-4">
                        <span>
                            Published:{" "}
                            {article?.created_at
                                ? new Date(
                                      article.created_at,
                                  ).toLocaleDateString()
                                : "Pending temporal sync"}
                        </span>

                        {authorEmail ? (
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-md font-medium tracking-wide">
                                ✍️ Author: {authorEmail}
                            </span>
                        ) : (
                            <span className="bg-gray-800 text-gray-500 border border-gray-700/60 px-2.5 py-0.5 rounded-md italic">
                                Unknown Contributor
                            </span>
                        )}
                    </div>
                </div>

                {article?.imgUrl && article.imgUrl !== "nanaa" && (
                    <div className="w-full max-h-[380px] bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden flex items-center justify-center p-4 shadow-2xl mb-8">
                        <img
                            src={article.imgUrl}
                            alt="Documentation Manifest Cover"
                            className="max-h-full max-w-full object-contain rounded-xl"
                        />
                    </div>
                )}

                <article className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap font-sans">
                        {article?.content ||
                            "No copy text inside this resource node repository row."}
                    </p>
                </article>
            </div>
        </main>
    );
}
