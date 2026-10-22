import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6 mt-12 animate-fadeIn">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl p-8 relative overflow-hidden text-center">
                {/* Decorative Cyber Grid Dot */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-red-500/40 select-none uppercase tracking-widest">
                    Status_Code: 404_NOT_FOUND
                </div>

                {/* Funny Header Area */}
                <div className="mb-6 pt-4">
                    <span className="text-5xl select-none animate-pulse">
                        🛰️
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-100 mt-4">
                        Void Node Traversal
                    </h1>
                    <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                        The resource pointer you followed requested a segment
                        matrix that does not exist in our database indexing
                        nodes.
                    </p>
                </div>

                {/* Micro Terminal Trace Logs Container */}
                <div className="bg-gray-950/80 border border-gray-700/50 rounded-xl p-4 text-left font-mono text-xs text-red-400 space-y-1 mb-8 shadow-inner">
                    <p className="text-gray-500">
                        # System diagnostic trace execution...
                    </p>
                    <p>
                        <span className="text-gray-500">&gt;</span>{" "}
                        REQUESTED_URI: "{window.location.pathname}"
                    </p>
                    <p>
                        <span className="text-gray-500">&gt;</span> SCAN_RESULT:
                        COLLECTION_INDEX_VOID
                    </p>
                    <p className="text-emerald-400 animate-pulse">
                        <span className="text-gray-500">&gt;</span>{" "}
                        RECOMMENDATION: Turn back immediately.
                    </p>
                </div>

                {/* Navigation Recovery Blocks */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-semibold py-2.5 px-5 rounded-xl transition text-sm cursor-pointer active:scale-95"
                    >
                        &larr; Go Back
                    </button>
                    <button
                        onClick={() => navigate("/catalog")}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-5 rounded-xl transition text-sm shadow-md cursor-pointer active:scale-95"
                    >
                        Return to Catalog
                    </button>
                </div>
            </div>
        </main>
    );
}
