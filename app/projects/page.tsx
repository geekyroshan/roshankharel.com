"use client";

import { projects } from "@/app/data/portfolio";
import { Slide } from "../animation/Slide";
import NeuralNetworkProjects from "../components/pages/NeuralNetworkProjects";
import ProjectShowcase from "../components/pages/ProjectShowcase";

export default function ProjectsPage() {
    return (
        <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
            {/* Hero Section */}
            <Slide>
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        <span className="text-zinc-900 dark:text-white">My </span>
                        <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                            Work
                        </span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Building intelligent systems that solve real problems.
                        <br className="hidden md:block" />
                        Each node represents a project in my AI journey.
                    </p>
                </div>
            </Slide>

            {/* Neural Network Visualization - Clean, minimal */}
            <Slide delay={0.1}>
                <NeuralNetworkProjects projects={projects} />
            </Slide>

            {/* Project Showcase */}
            <ProjectShowcase projects={projects} />
        </main>
    );
}
