export default function Asset({ asset, onSelect, isSelected }) {
    return (
        <div
            onClick={onSelect}
            className={`w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-xl p-4 border transition-all duration-200 cursor-pointer transform hover:-translate-y-1
                ${
                    isSelected
                        ? "border-blue-500 ring-4 ring-blue-500/20 shadow-xl"
                        : "border-gray-200 shadow-md hover:shadow-lg"
                }`}
        >
            {/* Asset Placeholder Image Area */}
            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>

            <h2 className="text-xl font-bold text-gray-800 truncate">
                {asset.name}
            </h2>
            <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">\$29.99</p>
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                    {isSelected ? "Focused" : "Click to view"}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    alert("Added to cart!");
                }}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
            >
                Subscribe
            </button>
        </div>
    );
}
