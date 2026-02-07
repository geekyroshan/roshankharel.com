"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [isDark, setIsDark] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const animationRef = useRef<number | undefined>(undefined);
    const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; project: Project }[]>([]);
    const prevWidthRef = useRef(0);

    // Detect touch device
    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

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

    // Track container width for responsive scaling
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateWidth = () => {
            const w = container.getBoundingClientRect().width;
            setContainerWidth(w);
            if (w > 0) setIsReady(true);
        };
        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, []);

    // Responsive helpers derived from container width
    const isSmallScreen = containerWidth > 0 && containerWidth < 400;
    const isMobile = containerWidth > 0 && containerWidth < 768;

    // Scale factor: 1.0 at 768px+, scales down linearly to 0.65 at 320px
    const scaleFactor = isMobile
        ? Math.max(0.65, Math.min(1, (containerWidth - 320) / (768 - 320) * 0.35 + 0.65))
        : 1;

    const connectionDistance = isMobile ? 150 : 250;
    const nodeSize = Math.round(18 * scaleFactor);
    const nodeHoverSize = Math.round(24 * scaleFactor);
    const hitRadius = isTouchDevice ? 35 : 25;

    // Clamp tooltip position so it stays within the container
    const getClampedTooltipPos = useCallback(
        (x: number, y: number) => {
            const container = containerRef.current;
            if (!container) return { x, y };

            const rect = container.getBoundingClientRect();
            const tooltipWidth = 200;
            const tooltipHeight = 60;
            const padding = 8;

            const clampedX = Math.max(
                tooltipWidth / 2 + padding,
                Math.min(x, rect.width - tooltipWidth / 2 - padding)
            );
            const clampedY = Math.max(
                padding,
                Math.min(y - 65, rect.height - tooltipHeight - padding)
            );

            return { x: clampedX, y: clampedY };
        },
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: false });
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize or reinitialize nodes on significant width change
        const width = container.getBoundingClientRect().width;
        const height = container.getBoundingClientRect().height;
        const widthChanged = Math.abs(prevWidthRef.current - width) > 100;

        if (nodesRef.current.length === 0 || widthChanged) {
            prevWidthRef.current = width;
            // Use more of the available space on mobile via a higher radius multiplier
            const radiusMultiplier = isMobile ? 0.38 : 0.32;
            const radius = Math.min(width, height) * radiusMultiplier;
            const jitter = isMobile ? 15 : 30;

            nodesRef.current = projects.map((project, i) => {
                const angle = (i / projects.length) * Math.PI * 2;
                return {
                    x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * jitter,
                    y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * jitter,
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

            // Responsive boundary padding - tighter on mobile
            const padding = isMobile ? 30 : 50;

            // Update node positions with gentle floating
            nodesRef.current.forEach((node) => {
                node.x += node.vx;
                node.y += node.vy;

                // Boundary check with soft bounce
                if (node.x < padding || node.x > rect.width - padding) node.vx *= -0.9;
                if (node.y < padding || node.y > rect.height - padding) node.vy *= -0.9;

                // Clamp nodes within bounds to prevent escape
                node.x = Math.max(padding, Math.min(rect.width - padding, node.x));
                node.y = Math.max(padding, Math.min(rect.height - padding, node.y));

                // Add slight random movement
                node.vx += (Math.random() - 0.5) * 0.015;
                node.vy += (Math.random() - 0.5) * 0.015;

                // Damping
                node.vx *= 0.995;
                node.vy *= 0.995;
            });

            // Draw connections with responsive distance threshold
            const connDist = connectionDistance;
            nodesRef.current.forEach((node, i) => {
                nodesRef.current.slice(i + 1).forEach((other) => {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < connDist) {
                        const isHovered = hoveredProject &&
                            (hoveredProject._id === node.project._id || hoveredProject._id === other.project._id);
                        const opacity = (1 - dist / connDist) * (isHovered ? 0.5 : 0.15);

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

            // Draw center glow - scaled on mobile
            const glowRadius = isMobile ? 80 : 120;
            const gradient = ctx.createRadialGradient(
                rect.width / 2, rect.height / 2, 0,
                rect.width / 2, rect.height / 2, glowRadius
            );
            gradient.addColorStop(0, colors.glowCenter);
            gradient.addColorStop(0.6, colors.glowMid);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(rect.width / 2, rect.height / 2, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Draw nodes with responsive sizing
            const currentNodeSize = nodeSize;
            const currentHoverSize = nodeHoverSize;

            nodesRef.current.forEach((node) => {
                const isHovered = hoveredProject?._id === node.project._id;
                const size = isHovered ? currentHoverSize : currentNodeSize;

                // Glow effect for hovered
                if (isHovered) {
                    const glowSize = Math.round(45 * scaleFactor);
                    const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
                    glow.addColorStop(0, "rgba(139, 92, 246, 0.35)");
                    glow.addColorStop(1, "transparent");
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? colors.nodeHover : colors.node;
                ctx.fill();

                // Node letter - scaled font
                const fontSize = isHovered ? Math.round(12 * scaleFactor) : Math.round(10 * scaleFactor);
                ctx.fillStyle = isHovered ? colors.nodeTextHover : colors.nodeText;
                ctx.font = `600 ${fontSize}px "DM Sans", system-ui, sans-serif`;
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
    }, [projects, hoveredProject, isDark, isMobile, connectionDistance, nodeSize, nodeHoverSize, scaleFactor]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isTouchDevice) return; // Prevent ghost mouse events on touch devices
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if hovering over a node
        const hovered = nodesRef.current.find((node) => {
            const dist = Math.hypot(node.x - x, node.y - y);
            return dist < hitRadius;
        });

        if (hovered) {
            setTooltipPos(getClampedTooltipPos(hovered.x, hovered.y));
        }
        setHoveredProject(hovered?.project || null);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // Check if tapping on a node
        const tapped = nodesRef.current.find((node) => {
            const dist = Math.hypot(node.x - x, node.y - y);
            return dist < hitRadius;
        });

        if (tapped) {
            // If tapping the same project, dismiss it; otherwise show new one
            if (hoveredProject?._id === tapped.project._id) {
                setHoveredProject(null);
            } else {
                setTooltipPos(getClampedTooltipPos(tapped.x, tapped.y));
                setHoveredProject(tapped.project);
            }
        } else {
            // Tap elsewhere to dismiss
            setHoveredProject(null);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const hovered = nodesRef.current.find((node) => {
            const dist = Math.hypot(node.x - x, node.y - y);
            return dist < hitRadius;
        });

        if (hovered) {
            setTooltipPos(getClampedTooltipPos(hovered.x, hovered.y));
            setHoveredProject(hovered.project);
        } else {
            setHoveredProject(null);
        }
    };

    // Fallback simple project list for very small screens
    if (isReady && isSmallScreen) {
        return (
            <div className="relative mb-12">
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="grid grid-cols-2 gap-2">
                        {projects.map((project) => (
                            <a
                                key={project._id}
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        {project.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                        {project.name}
                                    </p>
                                    <p className="text-[10px] text-zinc-500 dark:text-zinc-500 truncate">
                                        {project.tagline}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="text-right mt-2 text-xs text-zinc-400 dark:text-zinc-600 font-medium">
                        {projects.length} projects
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative mb-12">
            {/* Canvas container - responsive height */}
            <div
                ref={containerRef}
                className="relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 touch-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { if (!isTouchDevice) setHoveredProject(null); }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => {
                    // Keep tooltip visible on touch end (dismiss by tapping elsewhere)
                }}
            >
                {!isReady && (
                    <div className="absolute inset-0 animate-pulse bg-zinc-100 dark:bg-zinc-900" />
                )}
                <canvas ref={canvasRef} className="absolute inset-0" />

                {/* Hover/Touch tooltip with clamped positioning */}
                <AnimatePresence>
                    {hoveredProject && (
                        <motion.div
                            key={hoveredProject._id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-20 pointer-events-none"
                            style={{
                                left: tooltipPos.x,
                                top: tooltipPos.y,
                                transform: "translateX(-50%)"
                            }}
                        >
                            <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-2 md:px-4 md:py-2.5 rounded-xl shadow-xl">
                                <p className="font-semibold text-xs md:text-sm">{hoveredProject.name}</p>
                                <p className="text-[10px] md:text-xs text-zinc-400 dark:text-zinc-600 max-w-[150px] md:max-w-[180px] truncate">
                                    {hoveredProject.tagline}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Corner badge */}
                <div className="absolute bottom-3 right-4 text-xs text-zinc-400 dark:text-zinc-600 font-medium">
                    {projects.length} projects
                </div>
            </div>
        </div>
    );
}
