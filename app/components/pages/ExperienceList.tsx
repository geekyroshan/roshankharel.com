"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../../utils/date";
import type { JobType } from "@/types";

export default function ExperienceList({ jobs }: { jobs: JobType[] }) {
    const [selectedJob, setSelectedJob] = useState<string | null>(jobs[0]?._id || null);
    const currentJob = jobs.find(job => job._id === selectedJob);

    return (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 lg:gap-8">
            {/* Left: Interactive List */}
            <div className="lg:col-span-5 relative">
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2">
                    {/* Gradient vertical line */}
                    <div className="absolute left-[22px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-violet-500 via-pink-500 to-orange-500 hidden lg:block opacity-40" />

                    {jobs.map((job) => {
                        const isSelected = selectedJob === job._id;
                        return (
                            <div
                                key={job._id}
                                className={`relative z-10 pl-10 py-4 px-4 cursor-pointer rounded-xl transition-all duration-200 ${
                                    isSelected
                                        ? "bg-white dark:bg-zinc-800 shadow-sm"
                                        : "hover:bg-white/50 dark:hover:bg-zinc-800/50"
                                }`}
                                onClick={() => setSelectedJob(job._id)}
                            >
                                {/* Node Dot */}
                                <div
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-200 ${
                                        isSelected
                                            ? "bg-gradient-to-r from-violet-500 to-pink-500 shadow-md shadow-violet-500/40"
                                            : "bg-zinc-300 dark:bg-zinc-600"
                                    }`}
                                />

                                <h3 className={`text-base font-semibold font-headline transition-colors ${
                                    isSelected
                                        ? "text-zinc-900 dark:text-white"
                                        : "text-zinc-500 dark:text-zinc-400"
                                }`}>
                                    {job.name}
                                </h3>
                                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                    {job.jobTitle}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right: Details Panel */}
            <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                    {currentJob && (
                        <motion.div
                            key={currentJob._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 h-full"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                                        <Image
                                            src={currentJob.logo}
                                            fill
                                            className="object-contain p-2"
                                            alt={`${currentJob.name} logo`}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-headline font-bold text-zinc-900 dark:text-white">
                                            {currentJob.name}
                                        </h3>
                                        <p className="text-violet-600 dark:text-violet-400 font-medium text-sm">
                                            {currentJob.jobTitle}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right flex-shrink-0">
                                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                        {formatDate(currentJob.startDate)} — {currentJob.endDate ? formatDate(currentJob.endDate) : (
                                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Present</span>
                                        )}
                                    </div>
                                    <a
                                        href={currentJob.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-semibold mt-2 text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                                    >
                                        Visit Website
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                                {currentJob.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
