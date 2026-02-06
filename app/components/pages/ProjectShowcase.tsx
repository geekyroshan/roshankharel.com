"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";

interface Project {
    _id: string;
    name: string;
    slug: string;
    tagline: string;
    projectUrl: string;
    repository?: string;
    logo: string;
    coverImage: {
        image: string;
        alt: string;
    };
    techStack?: string[];
    metrics?: string;
    category?: string;
    highlights?: string[];
    fullDescription?: string;
    impact?: string;
}

const categoryConfig: Record<string, { gradient: string; accent: string }> = {
    "Accessibility AI": { gradient: "from-violet-600 to-purple-600", accent: "violet" },
    "Generative AI": { gradient: "from-pink-600 to-rose-600", accent: "pink" },
    "Enterprise RAG": { gradient: "from-emerald-600 to-teal-600", accent: "emerald" },
    "Conversational AI": { gradient: "from-amber-600 to-orange-600", accent: "amber" },
    "Data Science": { gradient: "from-blue-600 to-indigo-600", accent: "blue" },
    "Reinforcement Learning": { gradient: "from-orange-600 to-red-600", accent: "orange" },
    "Production ML": { gradient: "from-green-600 to-emerald-600", accent: "green" },
    "AI Agents": { gradient: "from-cyan-600 to-blue-600", accent: "cyan" },
    "Productivity AI": { gradient: "from-indigo-600 to-violet-600", accent: "indigo" },
    "Recommendation Systems": { gradient: "from-red-600 to-pink-600", accent: "red" },
    "Hackathon Project": { gradient: "from-yellow-600 to-amber-600", accent: "yellow" },
    "Data Engineering": { gradient: "from-teal-600 to-cyan-600", accent: "teal" },
};

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("all");

    const categories = ["all", ...Array.from(new Set(projects.map(p => p.category).filter((c): c is string => Boolean(c))))];
    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section className="py-24">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                    <span className="text-zinc-900 dark:text-white">Featured </span>
                    <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    From production ML systems to hackathon experiments.
                    <br className="hidden md:block" />
                    Each project represents a unique challenge solved with AI.
                </p>
            </motion.div>

            {/* Category Filter - Minimal pill design */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap justify-center gap-2 mb-16"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            filter === cat
                                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg"
                                : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        }`}
                    >
                        {cat === "all" ? "All Projects" : cat}
                    </button>
                ))}
            </motion.div>

            {/* Projects */}
            <div className="space-y-6">
                {filteredProjects.map((project, index) => {
                    const isExpanded = expandedId === project._id;
                    const config = categoryConfig[project.category || ""] || { gradient: "from-zinc-600 to-zinc-700", accent: "zinc" };

                    return (
                        <motion.article
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.03 }}
                            className="group"
                        >
                            <div className={`
                                relative rounded-2xl overflow-hidden
                                bg-white dark:bg-zinc-900
                                border border-zinc-200 dark:border-zinc-800
                                hover:border-zinc-300 dark:hover:border-zinc-700
                                transition-all duration-300
                                ${isExpanded ? "ring-2 ring-violet-500/20" : ""}
                            `}>
                                {/* Main Content Grid */}
                                <div className="grid lg:grid-cols-2 gap-0">
                                    {/* Left: Architecture Image */}
                                    <div className="relative aspect-[16/10] lg:aspect-auto bg-zinc-950 overflow-hidden">
                                        {project.coverImage.image && (
                                            <Image
                                                src={project.coverImage.image}
                                                alt={project.coverImage.alt || project.name}
                                                fill
                                                className="object-contain p-4 lg:p-6"
                                            />
                                        )}
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/20 lg:block hidden" />
                                    </div>

                                    {/* Right: Project Details */}
                                    <div className="p-6 lg:p-8 flex flex-col">
                                        {/* Category */}
                                        {project.category && (
                                            <div className="mb-4">
                                                <span className={`
                                                    inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                                                    bg-gradient-to-r ${config.gradient} text-white
                                                `}>
                                                    {project.category}
                                                </span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                                            >
                                                {project.name}
                                            </Link>
                                        </h3>

                                        {/* Tagline */}
                                        <p className="text-zinc-600 dark:text-zinc-300 text-base lg:text-lg leading-relaxed mb-5">
                                            {project.tagline}
                                        </p>

                                        {/* Tech Stack - Clean minimal badges */}
                                        {project.techStack && (
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {project.techStack.slice(0, 6).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-medium
                                                            bg-zinc-100 dark:bg-zinc-800
                                                            text-zinc-700 dark:text-zinc-300
                                                            border border-zinc-200 dark:border-zinc-700"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 6 && (
                                                    <span className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500">
                                                        +{project.techStack.length - 6} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Metrics - Clean highlight box */}
                                        {project.metrics && (
                                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 mb-5 border border-zinc-100 dark:border-zinc-800">
                                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                    {project.metrics.split(" | ").map((metric, i) => (
                                                        <span key={i} className="text-sm text-zinc-600 dark:text-zinc-300">
                                                            <span className="font-semibold text-zinc-900 dark:text-white">
                                                                {metric.split(":")[0]}
                                                            </span>
                                                            {metric.includes(":") && (
                                                                <span className="text-zinc-500"> {metric.split(":")[1]}</span>
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 mt-auto pt-2">
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : project._id)}
                                                className="px-5 py-2.5 rounded-xl font-medium text-sm
                                                    bg-zinc-900 dark:bg-white
                                                    text-white dark:text-zinc-900
                                                    hover:bg-zinc-800 dark:hover:bg-zinc-100
                                                    transition-colors"
                                            >
                                                {isExpanded ? "Show Less" : "View Details"}
                                            </button>
                                            {project.projectUrl && (
                                                <Link
                                                    href={project.projectUrl}
                                                    target="_blank"
                                                    className="p-2.5 rounded-xl
                                                        bg-zinc-100 dark:bg-zinc-800
                                                        text-zinc-600 dark:text-zinc-400
                                                        hover:bg-zinc-200 dark:hover:bg-zinc-700
                                                        transition-colors"
                                                    title="Live Demo"
                                                >
                                                    <BiLinkExternal className="w-5 h-5" />
                                                </Link>
                                            )}
                                            {project.repository && (
                                                <Link
                                                    href={project.repository}
                                                    target="_blank"
                                                    className="p-2.5 rounded-xl
                                                        bg-zinc-100 dark:bg-zinc-800
                                                        text-zinc-600 dark:text-zinc-400
                                                        hover:bg-zinc-200 dark:hover:bg-zinc-700
                                                        transition-colors"
                                                    title="Source Code"
                                                >
                                                    <BiLogoGithub className="w-5 h-5" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 lg:p-8 pt-0 border-t border-zinc-100 dark:border-zinc-800 mt-6">
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    {/* Overview */}
                                                    {project.fullDescription && (
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 uppercase tracking-wide">
                                                                Overview
                                                            </h4>
                                                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                                {project.fullDescription}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Highlights */}
                                                    {project.highlights && (
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 uppercase tracking-wide">
                                                                Key Features
                                                            </h4>
                                                            <ul className="space-y-2.5">
                                                                {project.highlights.map((highlight, i) => (
                                                                    <li key={i} className="flex items-start gap-3">
                                                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                        <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                                                                            {highlight}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Impact */}
                                                {project.impact && (
                                                    <div className={`
                                                        mt-6 p-5 rounded-xl
                                                        bg-gradient-to-r ${config.gradient}
                                                        bg-opacity-10
                                                    `} style={{ background: `linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))` }}>
                                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                                                            Impact
                                                        </h4>
                                                        <p className="text-zinc-700 dark:text-zinc-300">
                                                            {project.impact}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-24 text-center"
            >
                <div className="inline-flex flex-col items-center p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                        Interested in working together?
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Let&apos;s build something amazing with AI.
                    </p>
                    <Link
                        href="mailto:contact@roshankharel.com"
                        className="px-8 py-3.5 rounded-xl font-semibold
                            bg-zinc-900 dark:bg-white
                            text-white dark:text-zinc-900
                            hover:bg-zinc-800 dark:hover:bg-zinc-100
                            transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
