import { useNavigate } from "react-router";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6 mt-12 animate-fadeIn">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl p-8 relative overflow-hidden text-center">
                {/* Security Matrix Flag */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-amber-500/40 select-none uppercase tracking-widest">
                    Security_Level: RESTRICTED
                </div>

                {/* Funny Header Area */}
                <div className="mb-6 pt-4">
                    <span className="text-5xl select-none">🔏</span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-100 mt-4">
                        Access Token Denied
                    </h1>
                    <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                        Hold on! Your current public profile signature lacks the
                        necessary clearances to write parameters to this backend
                        cluster table row.
                    </p>
                </div>

                {/* Mock Encryption Lock Summary Box */}
                <div className="bg-gray-950/80 border border-gray-700/50 rounded-xl p-4 text-left font-mono text-xs text-amber-500 space-y-1 mb-8 shadow-inner">
                    <p className="text-gray-500">
                        # Authorization clearance checklist breakdown...
                    </p>
                    <p>
                        <span className="text-gray-500">&gt;</span>{" "}
                        ACCOUNT_STATUS: Authenticated Guest
                    </p>
                    <p>
                        <span className="text-gray-500">&gt;</span>{" "}
                        AUTHOR_ID_MATCH: [FAIL] - You are not the owner of this
                        node
                    </p>
                    <p className="text-red-400">
                        <span className="text-gray-500">&gt;</span>{" "}
                        OPERATION_STATUS: Supabase Row-Level Policy Blocked
                    </p>
                </div>

                {/* Interactive Redirect Matrix Controls */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-white font-semibold py-2.5 px-5 rounded-xl transition text-sm cursor-pointer active:scale-95"
                    >
                        Switch Account
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-5 rounded-xl transition text-sm shadow-md cursor-pointer active:scale-95"
                    >
                        Back to Safe HomePage
                    </button>
                </div>
            </div>
        </main>
    );
}
