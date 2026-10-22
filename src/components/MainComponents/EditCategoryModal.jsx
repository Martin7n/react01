import { useState } from "react";

export default function EditCategoryModal({
    category,
    onClose,
    onEditSuccess,
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionError, setActionError] = useState(null);

    const handleFormAction = async (formData) => {
        setActionError(null);
        setIsSubmitting(true);

        const name = formData.get("name")?.trim() || "";
        const description = formData.get("description")?.trim() || "";
        const imgUrl = formData.get("imgUrl")?.trim() || "";

        if (
            name.length < 3 ||
            description.length < 3 ||
            (imgUrl.length > 0 && imgUrl.length < 5)
        ) {
            setActionError(
                "Please fulfill all fields with valid, descriptive parameters.",
            );
            setIsSubmitting(false);
            return;
        }

        try {
            // Passes updated values back alongside the target identifier
            await onEditSuccess(category.id, { name, description, imgUrl });
            onClose();
        } catch (err) {
            setActionError(err.message || "Failed to update category row.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl p-6 relative flex flex-col text-white">
                {/* Header Container */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                    <h3 className="text-xl font-bold tracking-tight">
                        Edit Category
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white font-bold p-1 text-lg transition cursor-pointer"
                        disabled={isSubmitting}
                    >
                        ✕
                    </button>
                </div>

                {/* Form Component Container */}
                <form action={handleFormAction} className="space-y-4">
                    {actionError && (
                        <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-lg font-medium">
                            ⚠️ {actionError}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-1 text-sm font-medium text-gray-300"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={category?.name || ""}
                            placeholder="Programming, Cybersecurity..."
                            required
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block mb-1 text-sm font-medium text-gray-300"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows="3"
                            defaultValue={category?.description || ""}
                            placeholder="Brief overview summarizing this technical node topic..."
                            required
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="imgUrl"
                            className="block mb-1 text-sm font-medium text-gray-300"
                        >
                            Cover Image URL
                        </label>
                        <input
                            type="url"
                            name="imgUrl"
                            id="imgUrl"
                            defaultValue={category?.imgUrl || ""}
                            placeholder="https://example.com"
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 rounded-xl transition text-sm disabled:opacity-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
                        >
                            {isSubmitting ? "Updating..." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
