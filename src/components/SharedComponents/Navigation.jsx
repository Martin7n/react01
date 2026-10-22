import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import "./Navigation.css";

export default function Navigation() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = (targetPath) => {
        setIsMenuOpen(false);
        navigate(targetPath);
    };

    return (
        <nav className="bg-neutral-900 fixed w-full z-50 top-0 start-0 border-b border-neutral-800 shadow-md select-none">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-neutral-900 relative">
                <button
                    onClick={() => handleLinkClick("/")}
                    className="flex items-center space-x-3 group cursor-pointer bg-transparent border-0 focus:outline-none"
                >
                    <svg
                        className="h-9 w-9 text-blue-500 group-hover:text-blue-400 transition-colors pointer-events-none"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <path
                            d="M50 5L85 20V55C85 76.5 50 95 50 95C50 95 15 76.5 15 55V20L50 5Z"
                            fill="currentColor"
                            fillOpacity="0.1"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15 20L50 5L85 20"
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M35 32H65L45 72"
                            stroke="#ffffff"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="self-center text-xl text-white font-black tracking-wider uppercase font-mono pointer-events-none">
                        Seven <span className="text-blue-500">Tech</span>
                    </span>
                </button>

                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // console.log(
                        //     "External CSS  Caught! State shifting to:",
                        //     !isMenuOpen,
                        // );
                        setIsMenuOpen((prev) => !prev);
                    }}
                    className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 cursor-pointer pointer-events-auto relative z-50 select-none touch-none"
                >
                    {isMenuOpen ? (
                        <svg
                            className="w-6 h-6 pointer-events-none text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6 pointer-events-none text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </div>

                <div
                    className={`mobile-menu-wrapper ${isMenuOpen ? "is-open" : ""}`}
                    id="menu"
                >
                    <ul className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-0 bg-transparent text-white font-sans">
                        <li className="md:ml-6 w-full md:w-auto">
                            <button
                                onClick={() => handleLinkClick("/catalog")}
                                className="inline-block w-full md:w-auto text-center font-bold px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition cursor-pointer text-sm"
                            >
                                Catalog
                            </button>
                        </li>

                        {!user ? (
                            <>
                                <li className="md:ml-5 w-full md:w-auto text-center">
                                    <button
                                        onClick={() =>
                                            handleLinkClick("/login")
                                        }
                                        className="py-2 w-full md:w-auto text-neutral-300 hover:text-white font-medium transition-colors text-sm cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </li>
                                <li className="md:ml-5 w-full md:w-auto text-center">
                                    <button
                                        onClick={() =>
                                            handleLinkClick("/register")
                                        }
                                        className="py-2 w-full md:w-auto text-neutral-300 hover:text-white font-medium transition-colors text-sm cursor-pointer"
                                    >
                                        Register
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="md:ml-5 text-xs text-blue-400 font-semibold tracking-wide cursor-default flex flex-col md:flex-row items-center gap-2 py-2 md:py-0">
                                    <span>
                                        Logged in as:{" "}
                                        <span className="text-white font-mono">
                                            {user.email}
                                        </span>
                                    </span>
                                    <span className="hidden md:inline text-neutral-600">
                                        |
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleLinkClick("/dashboard")
                                        }
                                        className="text-blue-500 hover:text-blue-400 underline transition font-bold text-xs cursor-pointer"
                                    >
                                        Dashboard
                                    </button>
                                </li>

                                <li className="md:ml-5 w-full md:w-auto text-center">
                                    <button
                                        onClick={() =>
                                            handleLinkClick("/logout")
                                        }
                                        className="py-2 w-full md:w-auto text-neutral-300 hover:text-red-400 font-medium transition-colors text-sm cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        <li className="md:ml-5 w-full md:w-auto text-center border-t border-gray-800/40 md:border-0 pt-2 md:pt-0">
                            <button
                                onClick={() => handleLinkClick("/about")}
                                className="inline-block py-2 text-white hover:text-yellow-200 font-medium transition duration-200 text-sm cursor-pointer"
                            >
                                About Project
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
