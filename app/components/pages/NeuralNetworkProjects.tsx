"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Project {
    _id: string;
    name: string;
    slug: string;
    tagline: string;
    projectUrl: string;
    logo: string;
}

export default function NeuralNetworkProjects({ projects }: { projects: Project[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isDark, setIsDark] = useState(true);
    const animationRef = useRef<number>();
    const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; project: Project }[]>([]);

    // Detect theme
    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize nodes
        const width = container.getBoundingClientRect().width;
        const height = container.getBoundingClientRect().height;

        if (nodesRef.current.length === 0) {
            nodesRef.current = projects.map((project, i) => {
                const angle = (i / projects.length) * Math.PI * 2;
                const radius = Math.min(width, height) * 0.32;
                return {
                    x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 30,
                    y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 30,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    project,
                };
            });
        }

        // Theme-aware colors
        const colors = {
            bg: isDark ? "#000000" : "#ffffff",
            connection: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
            connectionHover: isDark ? "rgba(139, 92, 246, 0.4)" : "rgba(139, 92, 246, 0.3)",
            node: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(24, 24, 27, 0.95)",
            nodeHover: "#8b5cf6",
            nodeText: isDark ? "#000" : "#fff",
            nodeTextHover: "#fff",
            glowCenter: isDark ? "rgba(139, 92, 246, 0.12)" : "rgba(139, 92, 246, 0.08)",
            glowMid: isDark ? "rgba(236, 72, 153, 0.05)" : "rgba(236, 72, 153, 0.03)",
        };

        // Animation loop
        const animate = () => {
            const rect = container.getBoundingClientRect();
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, rect.width, rect.height);

            // Update node positions with gentle floating
            nodesRef.current.forEach((node) => {
                node.x += node.vx;
                node.y += node.vy;

                // Boundary check with soft bounce
                const padding = 50;
                if (node.x < padding || node.x > rect.width - padding) node.vx *= -0.9;
                if (node.y < padding || node.y > rect.height - padding) node.vy *= -0.9;

                // Add slight random movement
                node.vx += (Math.random() - 0.5) * 0.015;
                node.vy += (Math.random() - 0.5) * 0.015;

                // Damping
                node.vx *= 0.995;
                node.vy *= 0.995;
            });

            // Draw connections - more visible
            nodesRef.current.forEach((node, i) => {
                nodesRef.current.slice(i + 1).forEach((other) => {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 250) {
                        const isHovered = hoveredProject &&
                            (hoveredProject._id === node.project._id || hoveredProject._id === other.project._id);
                        const opacity = (1 - dist / 250) * (isHovered ? 0.5 : 0.15);

                        ctx.strokeStyle = isHovered
                            ? `rgba(139, 92, 246, ${opacity})`
                            : isDark
                                ? `rgba(255, 255, 255, ${opacity})`
                                : `rgba(0, 0, 0, ${opacity * 0.7})`;
                        ctx.lineWidth = isHovered ? 2 : 1;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw center glow
            const gradient = ctx.createRadialGradient(
                rect.width / 2, rect.height / 2, 0,
                rect.width / 2, rect.height / 2, 120
            );
            gradient.addColorStop(0, colors.glowCenter);
            gradient.addColorStop(0.6, colors.glowMid);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(rect.width / 2, rect.height / 2, 120, 0, Math.PI * 2);
            ctx.fill();

            // Draw nodes
            nodesRef.current.forEach((node) => {
                const isHovered = hoveredProject?._id === node.project._id;
                const size = isHovered ? 24 : 18;

                // Glow effect for hovered
                if (isHovered) {
                    const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 45);
                    glow.addColorStop(0, "rgba(139, 92, 246, 0.35)");
                    glow.addColorStop(1, "transparent");
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 45, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? colors.nodeHover : colors.node;
                ctx.fill();

                // Node letter
                ctx.fillStyle = isHovered ? colors.nodeTextHover : colors.nodeText;
                ctx.font = `600 ${isHovered ? 12 : 10}px "DM Sans", system-ui, sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(node.project.name.charAt(0), node.x, node.y);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [projects, hoveredProject, isDark]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });

        // Check if hovering over a node
        const hovered = nodesRef.current.find((node) => {
            const dist = Math.hypot(node.x - x, node.y - y);
            return dist < 25;
        });
        setHoveredProject(hovered?.project || null);
    };

    return (
        <div className="relative mb-12">
            {/* Canvas container */}
            <div
                ref={containerRef}
                className="relative h-[350px] rounded-2xl overflow-hidden bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredProject(null)}
            >
                <canvas ref={canvasRef} className="absolute inset-0" />

                {/* Hover tooltip */}
                {hoveredProject && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-20 pointer-events-none"
                        style={{
                            left: mousePos.x,
                            top: mousePos.y - 65,
                            transform: "translateX(-50%)"
                        }}
                    >
                        <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl shadow-xl">
                            <p className="font-semibold text-sm">{hoveredProject.name}</p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-600 max-w-[180px] truncate">
                                {hoveredProject.tagline}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Corner badge */}
                <div className="absolute bottom-3 right-4 text-xs text-zinc-400 dark:text-zinc-600 font-medium">
                    {projects.length} projects
                </div>
            </div>
        </div>
    );
}
