import { Link } from "react-router";
import { useAuth } from "../authContext";

export default function Navigation() {
    const { user } = useAuth();

    return (
        <>
            {/* Top Fixed Dark Header */}
            <nav className="bg-neutral-900 fixed w-full z-20 top-0 start-0 border-b border-neutral-800 shadow-md">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Logo Brand Link with Inline Sports Number 7 SVG */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse group"
                    >
                        {/* Custom  Logo SVG */}
                        <svg
                            className="h-9 w-9 text-blue-500 group-hover:text-blue-400 transition-colors"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://w3.org"
                        >
                            {/* Athletic Crest / Shield Backdrop */}
                            <path
                                d="M50 5L85 20V55C85 76.5 50 95 50 95C50 95 15 76.5 15 55V20L50 5Z"
                                fill="currentColor"
                                fillOpacity="0.1"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinejoin="round"
                            />
                            {/* Dynamic Lightning Accent */}
                            <path
                                d="M15 20L50 5L85 20"
                                stroke="#ffffff"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            {/* Bold Athletic Number 7 */}
                            <path
                                d="M35 32H65L45 72"
                                stroke="#ffffff"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className="self-center text-xl text-white font-black tracking-wider uppercase font-mono">
                            Seven <span className="text-blue-500">Tech</span>
                        </span>
                    </Link>

                    {/* Mobile Hamburger Toggle Button */}
                    <button
                        data-collapse-toggle="menu"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-400 rounded-lg md:hidden hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-700"
                        aria-controls="menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://w3.org"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="M5 7h14M5 12h14M5 17h14"
                            />
                        </svg>
                    </button>

                    {/* Nav Menu Block */}
                    <div className="hidden md:block w-full md:w-auto" id="menu">
                        <nav className="w-full bg-neutral-900 md:bg-transparent rounded px-6 py-4 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
                            <ul className="md:flex items-center">
                                <li>
                                    <Link
                                        to="/about"
                                        className="py-2 inline-block text-neutral-300 hover:text-white md:hidden lg:block font-medium transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>

                                <li className="md:ml-5">
                                    <Link
                                        to="/catalog"
                                        className="py-2 inline-block text-neutral-300 hover:text-white md:px-2 font-medium transition-colors"
                                    >
                                        Products / MainACC
                                    </Link>
                                </li>

                                {!user ? (
                                    <>
                                        {/* Render only when guest visitor is logged out */}
                                        <li className="md:ml-5">
                                            <Link
                                                to="/login"
                                                className="py-2 inline-block text-neutral-300 hover:text-white md:px-2 font-medium transition-colors"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className="md:ml-5">
                                            <Link
                                                to="/register"
                                                className="py-2 inline-block text-neutral-300 hover:text-white md:px-2 font-medium transition-colors"
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {/* Render only when active user is successfully logged in */}
                                        <li className="md:ml-5 text-sm text-blue-400 font-semibold tracking-wide cursor-default self-center">
                                            Logged in as:{" "}
                                            <span className="text-white font-mono">
                                                {user.email}
                                            </span>
                                        </li>
                                        <li className="md:ml-5">
                                            <Link
                                                to="/logout"
                                                className="py-2 inline-block text-neutral-300 hover:text-red-400 md:px-2 font-medium transition-colors"
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                )}

                                <li className="md:ml-5">
                                    <Link
                                        to="/contact"
                                        className="py-2 inline-block text-neutral-300 hover:text-white md:px-2 font-medium transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </li>

                                {/* Catalog Action Button */}
                                <li className="md:ml-6 mt-3 md:mt-0">
                                    <Link
                                        to="/catalog"
                                        className="inline-block font-semibold px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 border border-transparent rounded-lg shadow transition-all duration-200"
                                    >
                                        Catalog
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </nav>
        </>
    );
}
