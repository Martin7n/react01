import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function () {
    const [hintLevel, setHintLevel] = useState(0);
    const navigate = useNavigate();

    const placeholders = [
        "hunter2",
        "password123",
        "admin",
        "letmein123",
        "kittycat",
    ];

    const escalationHints = [
        "Take a deep breath. Is it your childhood pet's name followed by the year you realized taxes are mandatory?",
        "Check your caps lock key. Seriously, look at it. It's ruined lives before.",
        "Did you append a capitalization rule or a random exclamation point at the very end because a strict form validation criteria coerced you into it?",
        "Have you checked the underside of your keyboard, a sticky note on your monitor, or that loose text file named 'totally_not_passwords.txt' or RockYou.txt?",
        "Okay, let's face reality. If it's been longer than 6 months, you might just need to create a whole new digital identity. We won't judge.",
    ];

    return (
        <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="bg-gray-800 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="text-center mb-6">
                    <span className="text-3xl select-none">🧠</span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-100 mt-2">
                        Password Retrieving Mind Gymnastic
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">
                        Don't panic. Human neural storage systems are
                        notoriously volatile. Let's try some basic local
                        diagnosis.
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="p-4 bg-gray-900/60 border border-gray-700 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono tracking-wider text-blue-400 uppercase font-bold">
                                System Hint Layer {hintLevel + 1} of{" "}
                                {escalationHints.length}
                            </span>
                            {hintLevel < escalationHints.length - 1 && (
                                <button
                                    onClick={() =>
                                        setHintLevel((prev) => prev + 1)
                                    }
                                    className="text-[11px] bg-gray-800 hover:bg-gray-700 border border-gray-700 px-2 py-0.5 rounded transition text-blue-300 font-semibold cursor-pointer"
                                >
                                    Escalate Hint
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-sans">
                            {escalationHints[hintLevel]}
                        </p>
                    </div>

                    {/* Pro Tips Static Checklist Container Layout */}
                    <div className="space-y-2.5 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            Standard Verification Matrix:
                        </h4>

                        <ul className="space-y-2 text-xs text-gray-300 font-sans">
                            <li className="flex items-start gap-2 bg-gray-900/30 p-2.5 rounded-lg border border-gray-800">
                                <span className="text-blue-500 font-bold">
                                    ☐
                                </span>
                                <span>
                                    Was it your universal string parameters
                                    configuration? (e.g.{" "}
                                    <span className="font-mono text-gray-400">
                                        "
                                        {
                                            placeholders[
                                                hintLevel % placeholders.length
                                            ]
                                        }
                                        "
                                    </span>
                                    )
                                </span>
                            </li>
                            <li className="flex items-start gap-2 bg-gray-900/30 p-2.5 rounded-lg border border-gray-800">
                                <span className="text-blue-500 font-bold">
                                    ☐
                                </span>
                                <span>
                                    Are you typing with your hands shifted one
                                    key sequence over to the left on the
                                    keyboard array matrix?
                                </span>
                            </li>
                            <li className="flex items-start gap-2 bg-gray-900/30 p-2.5 rounded-lg border border-gray-800">
                                <span className="text-blue-500 font-bold">
                                    ☐
                                </span>
                                <span>
                                    Did you use your old corporate email
                                    authentication profile sequence by mistake
                                    out of pure muscle memory?
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Defiant Mock Submission Interaction Control Link */}
                    <div className="pt-2">
                        <button
                            onClick={() =>
                                alert(
                                    "We literally just established that this is a static page. There is no server endpoint listening here! Try guessing again.",
                                )
                            }
                            className="w-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-semibold py-3 rounded-xl transition text-sm shadow-md cursor-pointer active:scale-[0.98] text-center"
                        >
                            Submit a Random Guess Anyway
                        </button>
                    </div>
                </div>

                {/* Footer Redirection Group Canvas Layout */}
                <div className="mt-6 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
                    <span>Suddenly recovered your memory nodes? </span>
                    <Link
                        to="/login"
                        className="text-blue-400 hover:underline font-semibold transition"
                    >
                        Return to Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
}
