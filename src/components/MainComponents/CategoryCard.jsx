import { Link } from "react-router";
import { useAuth } from "../../context/authContext";

export default function CategoryCard({
    category,
    onSelect,
    isSelected,
    onSubscribe,
}) {
    const user = useAuth();
    console.log(user);
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
            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>

            <h2 className="text-xl font-bold text-gray-800 truncate">
                {category.name}
            </h2>
            <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm truncate">
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
                        e.stopPropagation(); // Stops card from selecting when clicking subscribe
                        onSubscribe(category.id);
                    }}
                    className="mt-4 w-full bg-black text-white hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow transition"
                >
                    Subscribe
                </button>
            )}
        </div>
        // <div
        //     onClick={onSelect}
        //     className={`w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-xl p-4 border transition-all duration-200 cursor-pointer transform hover:-translate-y-1
        //         ${
        //             isSelected
        //                 ? "border-blue-500 ring-4 ring-blue-500/20 shadow-xl"
        //                 : "border-gray-200 shadow-md hover:shadow-lg"
        //         }`}
        // >
        //     {/* Asset Placeholder Image Area */}
        //     <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>

        //     <h2 className="text-xl font-bold text-gray-800 truncate">
        //         {category.name}
        //     </h2>
        //     <div className="flex justify-between items-center mt-2">
        //         <p className="text-gray-600">\$29.99</p>
        //         <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
        //             {isSelected ? "Focused" : "Click to view"}
        //         </span>
        //     </div>

        //     <button
        //         onClick={(e) => {
        //             e.stopPropagation();
        //             alert("Added to cart!");
        //         }}
        //         className="mt-4 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
        //     >
        //         Subscribe
        //     </button>
        // </div>
    );
}
