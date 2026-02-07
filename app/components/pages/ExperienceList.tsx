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
            <div className="lg:col-span-5">
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3">
                    {jobs.map((job, index) => {
                        const isSelected = selectedJob === job._id;
                        const isLast = index === jobs.length - 1;
                        return (
                            <div key={job._id} className="relative">
                                {/* Connecting line between dots */}
                                {!isLast && (
                                    <div className="absolute left-[19px] top-[36px] bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-700" />
                                )}

                                <div
                                    className={`relative z-10 flex items-start gap-4 py-4 px-3 cursor-pointer rounded-xl transition-all duration-200 ${
                                        isSelected
                                            ? "bg-white dark:bg-zinc-800 shadow-sm"
                                            : "hover:bg-white/50 dark:hover:bg-zinc-800/50"
                                    }`}
                                    onClick={() => setSelectedJob(job._id)}
                                >
                                    {/* Node Dot */}
                                    <div className="flex-shrink-0 mt-1">
                                        <div
                                            className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ring-4 ${
                                                isSelected
                                                    ? "bg-violet-500 ring-violet-500/20"
                                                    : "bg-zinc-300 dark:bg-zinc-600 ring-zinc-100 dark:ring-zinc-900"
                                            }`}
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className={`text-sm font-semibold font-headline transition-colors ${
                                            isSelected
                                                ? "text-zinc-900 dark:text-white"
                                                : "text-zinc-500 dark:text-zinc-400"
                                        }`}>
                                            {job.name}
                                        </h3>
                                        <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                            {job.jobTitle}
                                        </p>
                                    </div>
                                </div>
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

                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans text-[0.95rem]">
                                {currentJob.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
