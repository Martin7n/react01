import { useState } from "react";

export default function ArticleModal({
    mode = "create",
    article,
    onClose,
    onSubmit,
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionError, setActionError] = useState(null);

    const handleFormAction = async (formData) => {
        setActionError(null);
        setIsSubmitting(true);

        const content = formData.get("content")?.trim() || "";
        const imgUrl = formData.get("imgUrl")?.trim() || "";

        if (content.length < 5) {
            setActionError(
                "Please provide an article body with at least 5 characters.",
            );
            setIsSubmitting(false);
            return;
        }

        try {
            if (mode === "edit") {
                await onSubmit(article.id, { content, imgUrl });
            } else {
                await onSubmit({ content, imgUrl });
            }
            onClose();
        } catch (err) {
            setActionError(
                err.message || "Failed to process database mutation.",
            );
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl p-6 text-white">
                {/* Header Container */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                    <h3 className="text-xl font-bold tracking-tight">
                        {mode === "edit"
                            ? "Edit Article Node"
                            : "Publish New Article"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white font-bold p-1 text-lg transition cursor-pointer"
                        disabled={isSubmitting}
                    >
                        ✕
                    </button>
                </div>

                {/* Form Processing */}
                <form action={handleFormAction} className="space-y-4">
                    {actionError && (
                        <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-lg font-medium">
                            ⚠️ {actionError}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="content"
                            className="block mb-1 text-sm font-medium text-gray-300"
                        >
                            Article Body Content
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            rows="5"
                            defaultValue={
                                mode === "edit" ? article?.content : ""
                            }
                            placeholder="Write your article data structural guidelines here..."
                            required
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="imgUrl"
                            className="block mb-1 text-sm font-medium text-gray-300"
                        >
                            Optional Image Link URL
                        </label>
                        <input
                            type="url"
                            name="imgUrl"
                            id="imgUrl"
                            defaultValue={
                                mode === "edit" ? article?.imgUrl : ""
                            }
                            placeholder="https://unsplash.com"
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl text-sm shadow transition"
                        >
                            {isSubmitting ? "Processing..." : "Save Record"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
