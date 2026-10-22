import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/authContext";
import profileApi from "../../api/profileApi";
import categoryApi from "../../api/catalogApi";

export default function Dashboard() {
    const { user, logoutUser } = useAuth();
    const [followedCategories, setFollowedCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        if (!user?.id) return;

        async function fetchDashboardManifest() {
            try {
                const profileResult = await profileApi.getProfile(user.id);
                if (profileResult && profileResult.success) {
                    const profileRow = profileResult.data?.[0];
                    const subscribedIds =
                        profileRow?.subscribed_categories || [];

                    const catResult = await categoryApi.getAll();
                    if (catResult && catResult.success && isMounted) {
                        const matched = (catResult.data || []).filter((cat) =>
                            subscribedIds.includes(cat.id),
                        );
                        setFollowedCategories(matched);
                    }
                }
            } catch (err) {
                console.error("Dashboard loading failure:", err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchDashboardManifest();
        return () => {
            isMounted = false;
        };
    }, [user?.id]);

    return (
        <main className="min-h-screen bg-gray-900 text-white pt-24 pb-16 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Account Dashboard Card banner */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-100">
                            User Control Station
                        </h1>
                        <p className="text-sm font-mono text-blue-400 mt-1">
                            ID: {user?.id}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Email signature parameters valid.
                        </p>
                    </div>
                    <button
                        onClick={logoutUser}
                        className="bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer active:scale-95"
                    >
                        Log Out Session
                    </button>
                </div>

                <h2 className="text-xl font-bold mb-4 tracking-tight border-b border-gray-800 pb-2 text-gray-200">
                    Your Subscribed Track Nodes ({followedCategories.length})
                </h2>

                {loading ? (
                    <p className="text-gray-400 animate-pulse font-mono text-sm py-6">
                        Re-indexing profile data strings...
                    </p>
                ) : followedCategories.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/20 border border-gray-800 rounded-2xl p-6">
                        <p className="text-gray-500 italic text-sm">
                            You haven't followed any subscription category
                            channels yet.
                        </p>
                        <Link
                            to="/catalog"
                            className="mt-4 inline-block text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl transition shadow"
                        >
                            Browse the Catalog
                        </Link>
                    </div>
                ) : (
                    /* Grid showing only followed items */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {followedCategories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/catalog/${cat.id}`}
                                className="bg-gray-800/60 border border-gray-700/80 p-4 rounded-xl shadow hover:border-blue-500 transition duration-150 flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl overflow-hidden shrink-0">
                                    {cat.imgUrl ? (
                                        <img
                                            src={cat.imgUrl}
                                            className="object-contain max-w-full max-h-full"
                                            alt=""
                                        />
                                    ) : (
                                        "📜"
                                    )}
                                </div>
                                <div className="truncate">
                                    <h3 className="font-bold text-gray-200 group-hover:text-blue-400 transition truncate">
                                        {cat.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 truncate mt-0.5">
                                        {cat.description || "No preview copy."}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
