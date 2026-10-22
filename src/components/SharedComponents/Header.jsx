import { Link } from "react-router";
import Navigation from "./Navigation";

export default function Header() {
    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800/60 shadow-md">
                <div className="w-full max-w-screen-xl mx-auto py-1 flex items-center justify-between">
                    <Navigation />
                </div>

                <div className="flex flex-wrap items-center justify-between py-6">
                    <label
                        htmlFor="menu-toggle"
                        className="pointer-cursor md:hidden block"
                    >
                        <svg
                            className="fill-current text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <title>menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>

                    <input
                        className="hidden"
                        type="checkbox"
                        id="menu-toggle"
                    />
                </div>
            </header>
        </>
    );
}
