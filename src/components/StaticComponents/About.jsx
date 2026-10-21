import { Link } from "react-router";

const topics = [
    {
        title: "Web Development",
        description:
            "Explore programming languages, frameworks, tools, and techniques used to build modern websites and web applications.",
        icon: "💻",
    },
    {
        title: "Cybersecurity",
        description:
            "Learn about digital security, common online threats, privacy, and the practices that help protect systems and data.",
        icon: "🔐",
    },
    {
        title: "Artificial Intelligence",
        description:
            "Discover AI, machine learning, automation, and the technologies changing how we work and interact with the digital world.",
        icon: "🤖",
    },
    {
        title: "Emerging Technologies",
        description:
            "Explore new innovations, software tools, and trends influencing the future of technology.",
        icon: "⚡",
    },
];

export default function About() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                <p
                    className="mb-4 text-sm font-semibold uppercase
                    tracking-[0.2em] text-blue-400"
                >
                    About the project
                </p>

                <h1
                    className="max-w-3xl text-4xl font-bold
                    leading-tight md:text-6xl"
                >
                    Explore the world of{" "}
                    <span className="text-blue-400">technology.</span>
                </h1>

                <p
                    className="mt-6 max-w-2xl text-lg leading-8
                    text-slate-300"
                >
                    A place to discover new technologies, learn useful concepts,
                    and explore the ideas shaping our digital world.
                </p>

                <Link
                    to="/catalog"
                    className="mt-8 inline-block rounded-lg bg-blue-600
                        px-6 py-3 font-semibold transition-colors
                        hover:bg-blue-500"
                >
                    Explore articles
                </Link>
            </section>

            {/* Mission */}
            <section className="border-y border-slate-800 bg-slate-900/60">
                <div
                    className="mx-auto grid max-w-6xl gap-10
                    px-6 py-16 md:grid-cols-2 md:items-center"
                >
                    <div>
                        <h2 className="text-3xl font-bold">Our mission</h2>

                        <p className="mt-5 leading-7 text-slate-300">
                            This project brings different areas of technology
                            together in one place. Its goal is to make technical
                            topics easier to explore through informative
                            articles and educational content.
                        </p>

                        <p className="mt-4 leading-7 text-slate-300">
                            Whether you are interested in writing code,
                            understanding cybersecurity, or discovering new
                            innovations, there is always something new to learn.
                        </p>
                    </div>

                    <div
                        className="rounded-2xl border border-slate-800
                        bg-slate-950 p-8"
                    >
                        <div className="text-4xl">{"</>"}</div>
                        <h3 className="mt-4 text-xl font-semibold">
                            Learn. Explore. Build.
                        </h3>
                        <p className="mt-3 leading-7 text-slate-400">
                            Technology is constantly evolving. This platform
                            encourages curiosity and continuous learning, one
                            article at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Topics */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="text-3xl font-bold">What you can explore</h2>

                <p className="mt-4 max-w-2xl text-slate-400">
                    Browse different areas of technology and find topics that
                    interest you.
                </p>

                <div
                    className="mt-10 grid gap-6 sm:grid-cols-2
                    lg:grid-cols-4"
                >
                    {topics.map((topic) => (
                        <article
                            key={topic.title}
                            className="rounded-xl border border-slate-800
                                bg-slate-900 p-6 transition-all
                                hover:-translate-y-1 hover:border-blue-500"
                        >
                            <div className="text-3xl">{topic.icon}</div>

                            <h3 className="mt-5 text-xl font-semibold">
                                {topic.title}
                            </h3>

                            <p
                                className="mt-3 text-sm leading-6
                                text-slate-400"
                            >
                                {topic.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Student project */}
            <section className="mx-auto max-w-6xl px-6 pb-20">
                <div
                    className="rounded-2xl border border-blue-900/60
                    bg-blue-950/30 p-8 md:p-12"
                >
                    <h2 className="text-2xl font-bold md:text-3xl">
                        A project built through learning
                    </h2>

                    <p
                        className="mt-5 max-w-3xl leading-7
                        text-slate-300"
                    >
                        This website was developed as a student project to apply
                        practical skills in web development, interface design,
                        and content management. It represents an opportunity to
                        learn by building a useful and accessible technology
                        resource.
                    </p>

                    <p className="mt-4 text-sm text-slate-400">
                        Created for educational purposes.
                    </p>
                </div>
            </section>
        </main>
    );
}
