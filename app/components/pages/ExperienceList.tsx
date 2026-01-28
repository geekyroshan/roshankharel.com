"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../../utils/date";
import type { JobType } from "@/types";

export default function ExperienceList({ jobs }: { jobs: JobType[] }) {
    const [selectedJob, setSelectedJob] = useState<string | null>(jobs[0]?._id || null);

    return (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-10">
            {/* Left: Interactive List (Nodes) */}
            <div className="lg:col-span-4 flex flex-col gap-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-zinc-200 dark:bg-zinc-800 hidden lg:block" />

                {jobs.map((job) => {
                    const isSelected = selectedJob === job._id;
                    return (
                        <div
                            key={job._id}
                            className="relative z-10 pl-14 cursor-pointer group"
                            onClick={() => setSelectedJob(job._id)}
                        >
                            {/* Node Dot animation */}
                            <div
                                className={`absolute left-2 top-1 w-6 h-6 rounded-full border-[3px] transition-all duration-300 ${isSelected
                                    ? "bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-white scale-110"
                                    : "bg-zinc-100 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 group-hover:dark:border-zinc-500"
                                    }`}
                            >
                                {isSelected && (
                                    <div className="absolute inset-0 bg-white dark:bg-black rounded-full scale-50" />
                                )}
                            </div>

                            {/* Company Name */}
                            <h3 className={`text-xl font-bold font-headline transition-colors ${isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-600 dark:group-hover:text-zinc-300"}`}>
                                {job.name}
                            </h3>
                            <p className="text-sm text-zinc-500">{job.jobTitle}</p>
                        </div>
                    );
                })}
            </div>

            {/* Right: Details Panel (Animated) */}
            <div className="lg:col-span-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {jobs.map((job) => (
                        selectedJob === job._id ? (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 shadow-sm"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-2 border border-zinc-100 dark:border-zinc-700">
                                            <Image
                                                src={job.logo}
                                                fill
                                                className="object-contain p-1"
                                                alt={`${job.name} logo`}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-headline font-bold text-zinc-900 dark:text-zinc-50">{job.name}</h3>
                                            <p className="text-zinc-500 font-medium">{job.jobTitle}</p>
                                        </div>
                                    </div>

                                    <div className="text-right hidden sm:block">
                                        <div className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                                            {formatDate(job.startDate)} — {job.endDate ? formatDate(job.endDate) : "Present"}
                                        </div>
                                        <a href={job.url} target="_blank" rel="noreferrer" className="text-xs font-bold mt-2 inline-block border-b border-zinc-300 pb-0.5 hover:border-black dark:hover:border-white transition-colors">
                                            VISIT WEBSITE ↗
                                        </a>
                                    </div>
                                </div>

                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                    <p className="whitespace-pre-line leading-loose text-lg font-light text-zinc-600 dark:text-zinc-300">
                                        {job.description}
                                    </p>
                                </div>
                            </motion.div>
                        ) : null
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
