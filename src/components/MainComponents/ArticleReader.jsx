export default function ArticleReader({ article, onClose }) {
    if (!article) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-2xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 md:p-8 flex flex-col">
                {/* Modal Navigation Control Header */}
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase">
                        Reading Article Mode
                    </span>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-2 text-xl font-bold transition"
                    >
                        ✕ Close Reading
                    </button>
                </div>

                {/* Article Copy Text Structure */}
                <article className="prose dark:prose-invert max-w-none flex-grow">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
                        {article.title}
                    </h1>
                    <div className="text-sm text-gray-400 mb-6 flex space-x-4">
                        <span>Published: October 2026</span>
                        <span>•</span>
                        <span>Estimated reading time: 4 mins</span>
                    </div>

                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                        <p className="font-medium text-lg text-gray-600 dark:text-gray-400">
                            {article.summary ||
                                "This represents the summary lead paragraph for the active document text item section node module tracker entity layout workflow."}
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
