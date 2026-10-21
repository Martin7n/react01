import { Link } from "react-router";
import { useAuth } from "../../hooks/usePersistedState";

const assets = {
    1: [
        {
            id: "76bbae96-8b2b-4846-b89b-bd1a4947cc50aaaaaaaaaaaaa",
            title: "Pro Laptop Tweaks for Maximum Battery Life",
            summary: "Learn to stretch your portable system cells.",
        },
        {
            id: 102,
            title: "Hardware upgrades: RAM vs NVMe modules",
            summary: "Pinpoint performance block constraints.",
        },
    ],
    2: [
        {
            id: 201,
            title: "Color calibration guidelines for layout grids",
            summary: "Get crisp visual alignments on team monitors.",
        },
    ],
};

export default function CategoryCard({
    category,
    onSelect,
    isSelected,
    onSubscribe,
}) {
    const user = useAuth();

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
            <div className="h-48 bg-gray-300 rounded-lg mb-4 ">
                <div className="h-48 w-full bg-gray-100 rounded-lg  mb-4 overflow-hidden flex items-center justify-center">
                    <img
                        src={category.imgUrl}
                        alt={category.name}
                        className="w-full h-full object-contain p-2 rounded-2xl"
                    />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 truncate ">
                {category.name}
            </h2>
            <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm truncate">
                    {category.id}
                    {category.description || "Topic stream"}
                </p>

                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider shrink-0 ml-2">
                    {isSelected ? "Open" : "View"}
                </span>
            </div>

            {!user ? (
                <Link to="/login"> Login </Link>
            ) : (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSubscribe(category.id);
                    }}
                    className="mt-4 w-full bg-black text-white hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow transition"
                >
                    Subscribe
                </button>
            )}

            <button>Edit</button>
        </div>
    );
}
