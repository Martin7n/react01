import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10">
            <div className="container mx-auto px-4">
                <div
                    className="flex flex-col gap-6 py-8 sm:flex-row
            sm:items-center sm:justify-between"
                >
                    {/* Project information */}
                    <div>
                        <h3 className="text-base font-semibold text-white">
                            Explore the project
                        </h3>

                        <p className="mt-1 text-sm text-neutral-400">
                            An educational project exploring the world of
                            technology.
                        </p>
                    </div>

                    {/* GitHub link */}
                    <a
                        href="https://github.com/Martin7n/react01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2
                    rounded-lg border border-blue-500/40
                    bg-blue-500/10 px-5 py-3
                    text-sm font-semibold text-blue-400
                    transition-all duration-200
                    hover:border-blue-400 hover:bg-blue-500/20
                    hover:text-blue-300
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3.01 0 4.29-2.6 5.24-5.09 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.64.76.53A11.1 11.1 0 0 0 12 .9Z" />
                        </svg>
                        View on GitHub
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M7 17 17 7M7 7h10v10" />
                        </svg>
                    </a>
                </div>

                {/* Bottom line */}
                <div
                    className="flex flex-col gap-2 border-t border-white/10
            py-4 text-xs text-neutral-500
            sm:flex-row sm:items-center sm:justify-between"
                >
                    <p>© {new Date().getFullYear()} Student Project</p>
                    <p>Built with curiosity and a lot of spaghetti.</p>
                </div>
            </div>
        </footer>
    );
}
