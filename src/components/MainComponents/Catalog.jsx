import { useEffect, useRef, useState } from "react";
import categoryApi from "../api/catalogApi";
import CategoryCard from "./CategoryCard";
import ArticleReader from "./ArticleReader";
import { useAuth } from "../../context/authContext";
import CreateCategoryModal from "./CreateCategoryModal";

const mockArticlesByCat = {
    1: [
        {
            id: 101,
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

const baseCat = {
    id: "",
    created_at: "",
    name: "",
    description: "",
    articles: "",
    author: "",
    subscribers: "",
    imgUrl: "",
};

export default function Catalog() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollContainerRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { user } = useAuth();
    const [activeReadingArticle, setActiveReadingArticle] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateCategorySubmit = async (newCategoryData) => {
        const { name, description, imgUrl } = newCategoryData;
        try {
            const result = await categoryApi.createOne({
                name,
                description,
                imgUrl,
                // author: user?.id,
            });

            if (result && result.success) {
                setCategories((prevCategories) => [
                    ...prevCategories,
                    result.data,
                ]);
                setIsCreateModalOpen(false);
            }
        } catch (err) {
            console.error("Database connection failure:", err.message);
            throw new Error(err.message || "Failed to save category row.");
        }
    };

    useEffect(() => {
        categoryApi
            .getAll()
            .then((result) => {
                if (result && result.success) {
                    setCategories(result.data || []);
                }
            })
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
            <div className="bg-gray-900 min-h-screen w-full py-12 mt-16">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    {/* Aligned Header Row with Dark Gray Create Button for logged-in accounts */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-6 mb-8">
                        <div className="hidden sm:block w-40"></div>

                        <h1 className="text-4xl font-extrabold text-white tracking-tight text-center">
                            Category Catalog
                        </h1>

                        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                            {user ? (
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <svg
                                        className="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Create Category
                                </button>
                            ) : (
                                <div className="hidden sm:block w-40"></div>
                            )}
                        </div>
                    </div>

                    {/* Main Slider Row */}
                    {loading ? (
                        <p className="text-white text-center animate-pulse">
                            Loading...
                        </p>
                    ) : error ? (
                        <p className="text-red-400 text-center">
                            Error: {error}
                        </p>
                    ) : (
                        <div className="relative group w-full mb-12">
                            <button
                                onClick={() => scroll("left")}
                                className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 bg-white border p-3 rounded-full shadow-lg hidden md:flex opacity-0 group-hover:opacity-100 transition"
                            >
                                ◀
                            </button>

                            <div
                                ref={scrollContainerRef}
                                className="flex space-x-6 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scroll-smooth scrollbar-none"
                                style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                }}
                            >
                                {categories.length === 0 ? (
                                    <div className="w-full text-center py-12 text-gray-400 font-semibold text-lg select-none">
                                        No categories available at the moment.
                                    </div>
                                ) : (
                                    categories.map((category) => (
                                        <CategoryCard
                                            key={category.id}
                                            category={category}
                                            onSelect={() => {
                                                setSelectedCategory(category);
                                            }}
                                            isSelected={
                                                selectedCategory?.id ===
                                                category.id
                                            }
                                            onSubscribe={(id) =>
                                                alert(
                                                    "Subscribing to category ID: " +
                                                        id,
                                                )
                                            }
                                        />
                                    ))
                                )}
                            </div>

                            <button
                                onClick={() => scroll("right")}
                                className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 bg-white border p-3 rounded-full shadow-lg hidden md:flex opacity-0 group-hover:opacity-100 transition"
                            >
                                ▶
                            </button>
                        </div>
                    )}

                    {/* Tier 2: Category Selected ──► Show Details and Sub-Articles Row */}
                    {selectedCategory && (
                        <div className="bg-white rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn mb-8">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs uppercase">
                                        Selected Category
                                    </span>
                                    <button
                                        onClick={() =>
                                            setSelectedCategory(null)
                                        }
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ✕ Close
                                    </button>
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2">
                                    {selectedCategory.name}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    {selectedCategory.description ||
                                        "No overview profile details."}
                                </p>
                            </div>

                            {/* Sub-Articles Grid Stream inside selected space */}
                            <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Articles in this category:
                                </h3>
                                <div className="space-y-3">
                                    {(
                                        mockArticlesByCat[
                                            selectedCategory.id
                                        ] || []
                                    ).map((article) => (
                                        <div
                                            key={article.id}
                                            onClick={() =>
                                                setActiveReadingArticle(article)
                                            }
                                            className="p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer flex justify-between items-center font-semibold"
                                        >
                                            <span className="text-gray-800">
                                                {article.title}
                                            </span>
                                            <span className="text-xs text-blue-600 uppercase font-bold">
                                                Read →
                                            </span>
                                        </div>
                                    ))}
                                    {(
                                        mockArticlesByCat[
                                            selectedCategory.id
                                        ] || []
                                    ).length === 0 && (
                                        <p className="text-gray-400 text-sm italic">
                                            No documentation items loaded under
                                            this module node yet.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tier 3: Reading overlay view layer opens up */}
                    <ArticleReader
                        article={activeReadingArticle}
                        onClose={() => setActiveReadingArticle(null)}
                    />

                    {/* Create Category Modal Overlay */}
                    {isCreateModalOpen && (
                        <CreateCategoryModal
                            onClose={() => setIsCreateModalOpen(false)}
                            onCreateSuccess={handleCreateCategorySubmit}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
