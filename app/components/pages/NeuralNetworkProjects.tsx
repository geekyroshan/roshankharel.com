"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Project {
    _id: string;
    name: string;
    slug: string;
    tagline: string;
    projectUrl: string;
    logo: string;
}

export default function NeuralNetworkProjects({ projects }: { projects: Project[] }) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    // Generate positions for nodes in a circular pattern
    const getNodePosition = (index: number, total: number) => {
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        const radius = 35; // percentage from center
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        return { x, y };
    };

    // Generate SVG path for connection lines
    const generateConnections = () => {
        const lines: JSX.Element[] = [];
        for (let i = 0; i < projects.length; i++) {
            for (let j = i + 1; j < projects.length; j++) {
                const pos1 = getNodePosition(i, projects.length);
                const pos2 = getNodePosition(j, projects.length);
                const isActive = activeId === projects[i]._id || activeId === projects[j]._id;
                lines.push(
                    <motion.line
                        key={`${i}-${j}`}
                        x1={`${pos1.x}%`}
                        y1={`${pos1.y}%`}
                        x2={`${pos2.x}%`}
                        y2={`${pos2.y}%`}
                        stroke={isActive ? "#ffffff" : "#333333"}
                        strokeWidth={isActive ? 1.5 : 0.5}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                    />
                );
            }
        }
        return lines;
    };

    return (
        <div className="relative w-full h-[75vh] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

            {/* Particle dots */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-zinc-700 rounded-full"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: 0.3
                        }}
                        animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}
            </div>

            {/* Title */}
            <div className="absolute top-6 left-6 z-20">
                <h2 className="text-3xl font-bold font-headline text-white">Neural Network</h2>
                <p className="text-zinc-500 text-sm mt-1">Interactive project constellation</p>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-6 right-6 z-20">
                <p className="text-zinc-600 text-xs">Hover nodes to explore • Click to visit</p>
            </div>

            {/* SVG Network Visualization */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                {/* Connection lines */}
                <g className="connections">
                    {generateConnections()}
                </g>

                {/* Center node */}
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="3"
                    fill="#ffffff"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Connection lines from center to outer nodes */}
                {projects.map((project, index) => {
                    const pos = getNodePosition(index, projects.length);
                    return (
                        <motion.line
                            key={`center-${index}`}
                            x1="50%"
                            y1="50%"
                            x2={`${pos.x}%`}
                            y2={`${pos.y}%`}
                            stroke={activeId === project._id ? "#ffffff" : "#444444"}
                            strokeWidth={activeId === project._id ? 2 : 1}
                            strokeDasharray="4 2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                    );
                })}
            </svg>

            {/* Project Nodes */}
            {projects.map((project, index) => {
                const pos = getNodePosition(index, projects.length);
                const isActive = activeId === project._id;

                return (
                    <motion.div
                        key={project._id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        onMouseEnter={() => {
                            setActiveId(project._id);
                            setHoveredNode(index);
                        }}
                        onMouseLeave={() => {
                            setActiveId(null);
                            setHoveredNode(null);
                        }}
                    >
                        <Link
                            href={project.projectUrl || `/projects/${project.slug}`}
                            className="block"
                        >
                            <motion.div
                                className={`relative cursor-pointer transition-all duration-300 ${isActive ? "scale-125" : "scale-100"
                                    }`}
                            >
                                {/* Outer ring */}
                                <motion.div
                                    className={`absolute inset-0 rounded-full border-2 ${isActive ? "border-white" : "border-zinc-600"
                                        }`}
                                    style={{ width: 60, height: 60, margin: -10 }}
                                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />

                                {/* Core node */}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${isActive
                                            ? "bg-white text-black shadow-lg shadow-white/20"
                                            : "bg-zinc-800 text-white"
                                        }`}
                                >
                                    {project.name.charAt(0)}
                                </div>
                            </motion.div>

                            {/* Label */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap"
                                    >
                                        <div className="bg-black/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-zinc-700">
                                            <p className="text-white font-bold text-sm">{project.name}</p>
                                            <p className="text-zinc-400 text-xs max-w-[200px] truncate">{project.tagline}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Link>
                    </motion.div>
                );
            })}

            {/* Project List Sidebar */}
            <div className="absolute left-6 top-24 z-10 max-h-[50vh] overflow-y-auto">
                <div className="space-y-2">
                    {projects.map((project) => (
                        <Link
                            key={project._id}
                            href={project.projectUrl || `/projects/${project.slug}`}
                            className={`block p-3 rounded-xl transition-all duration-300 ${activeId === project._id
                                    ? "bg-white text-black"
                                    : "bg-zinc-900/80 text-white hover:bg-zinc-800"
                                }`}
                            onMouseEnter={() => setActiveId(project._id)}
                            onMouseLeave={() => setActiveId(null)}
                        >
                            <p className="font-bold text-sm">{project.name}</p>
                            <p className={`text-xs truncate max-w-[160px] ${activeId === project._id ? "text-zinc-600" : "text-zinc-400"
                                }`}>
                                {project.tagline}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
