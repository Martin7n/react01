import { useEffect, useRef, useState } from "react";
import Asset from "./Asset";
import workoutsApi from "../api/workoutsApi";

const testAssets = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Monitor" },
    { id: 3, name: "Keyboard" },
];

const initAsset = {
    id: 2,
    name: "initialAssetForTest",
};

export default function Catalog() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollContainerRef = useRef(null);
    const [selectedAsset, setSelectedAsset] = useState(null);

    useEffect(() => {
        workoutsApi
            .getAll()
            .then(setAssets)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 340;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen w-full py-12 mt-16">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <h1 className="text-4xl font-extrabold text-gray-950 mb-8">
                        Product Catalog
                    </h1>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : assets.length === 0 ? (
                        <h1>No items</h1>
                    ) : (
                        /* Unified sliding deck layout wrapper container */
                        <div className="relative group w-full mb-12">
                            {/* Left Floating Button */}
                            <button
                                onClick={() => scroll("left")}
                                className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
                                aria-label="Scroll Left"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            {/* The Horizontal Scroll Container */}
                            <div
                                ref={scrollContainerRef}
                                className="flex space-x-6 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scroll-smooth scrollbar-none"
                                style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                }}
                            >
                                {assets.map((asset) => (
                                    <Asset
                                        key={asset.id}
                                        asset={asset}
                                        onSelect={() => setSelectedAsset(asset)}
                                        isSelected={
                                            selectedAsset?.id === asset.id
                                        }
                                    />
                                ))}
                            </div>

                            {/* Right Floating Button */}
                            <button
                                onClick={() => scroll("right")}
                                className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
                                aria-label="Scroll Right"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* ⚡ FIXED: Moved outside the slider container and kept exactly ONE copy */}
                    {selectedAsset && (
                        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                            {/* Large Preview Image */}
                            <div className="h-64 md:h-full min-h-[260px] bg-gray-900/10 rounded-xl flex items-center justify-center border border-gray-200">
                                <span className="text-gray-400 text-sm font-semibold">
                                    Detailed Product View Placeholder
                                </span>
                            </div>

                            {/* Full Descriptive Data Layout */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs uppercase font-bold tracking-widest bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                            {selectedAsset.category ||
                                                "General"}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setSelectedAsset(null)
                                            }
                                            className="text-gray-400 hover:text-gray-600 font-medium text-sm transition"
                                        >
                                            ✕ Close Details
                                        </button>
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                                        {selectedAsset.name}
                                    </h2>
                                    <p className="text-2xl font-semibold text-blue-600 mb-4">
                                        $29.99
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {selectedAsset.desc ||
                                            "No extended descriptions loaded for this active module profile catalog item entry."}
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition active:scale-98">
                                        Add to Cart
                                    </button>
                                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition">
                                        ♥ Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>

        // <>
        //     <div className="bg-gray-100 min-h-screen p-8">
        //         <h1 className="text-4xl font-extrabold text-gray-950 mb-6">
        //             Product Catalog
        //         </h1>

        //         {loading ? (
        //             <div role="status">
        //                 <svg
        //                     aria-hidden="true"
        //                     className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
        //                     viewBox="0 0 100 101"
        //                     fill="none"
        //                     xmlns="http://www.w3.org/2000/svg"
        //                 >
        //                     <path
        //                         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        //                         fill="currentColor"
        //                     />
        //                     <path
        //                         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        //                         fill="currentFill"
        //                     />
        //                 </svg>
        //                 <span className="sr-only">Loading...</span>
        //             </div>
        //         ) : error ? (
        //             <p>Error: {error}</p>
        //         ) : assets.length === 0 ? (
        //             <h1>No items</h1>
        //         ) : (
        //             assets.map((asset) => (
        //                 <Asset key={asset.id} asset={asset} />
        //             ))
        //         )}
        //     </div>
        // </>

        // <div className="bg-gray-100 min-h-screen p-8">
        //     <h1 className="text-4xl font-extrabold text-gray-950 mb-6">
        //         Product Catalog
        //     </h1>

        //     {loading ? (
        //         <div role="status">
        //             {/* Your existing spinner code */}
        //             <span className="sr-only">Loading...</span>
        //         </div>
        //     ) : error ? (
        //         <p>Error: {error}</p>
        //     ) : assets.length === 0 ? (
        //         <h1>No items</h1>
        //     ) : (
        //         /* Updated wrapper: horizontal layout flexrow with natural touch scroll */
        //         <div className="flex space-x-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none custom-scroll-container">
        //             {assets.map((asset) => (
        //                 /* Note: Ensure the component name tag here matches your import target (Asset vs AssetDetails) */
        //                 <Asset key={asset.id} asset={asset} />
        //             ))}
        //         </div>
        //     )}
        // </div>
    );
}

// export default function Catalog() {
//     console.log("Catalog rendered");

//     return <h1>Catalog works!</h1>;
// }
