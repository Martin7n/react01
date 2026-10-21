const art = {
    art_id: "1",
    art_content: "content",
};

export default function Articles({ category }) {
    console.log(category);
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {category}
                    </h2>
                    <p className="text-gray-600 mt-2">$29.99</p>
                    <button className="mt-4 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
}
