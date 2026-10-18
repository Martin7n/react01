import { Link } from "react-router";
import Footer from "./SharedComponents/Footer";
import Header from "./SharedComponents/Header";

export default function Home() {
    return (
        <>
            <main className="min-h-screen bg-slate-950 text-white">
                <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6">
                    <div className="max-w-2xl">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
                            Mini TechHub
                        </p>

                        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                            Follow the tech
                            <span className="text-red-500"> you love.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                            Discover upcoming events, follow your favorite
                            teams, and join the conversation with other sports
                            fans.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <Link
                                to="/catalog"
                                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
                            >
                                Explore events
                            </Link>

                            <button className="rounded-lg border border-slate-700 px-5 py-3 font-semibold transition hover:bg-slate-800">
                                Sign in
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
