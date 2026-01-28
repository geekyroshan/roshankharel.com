"use client";

import { projects } from "@/app/data/portfolio";
import PageHeading from "../components/shared/PageHeading";
import { Slide } from "../animation/Slide";
import NeuralNetworkProjects from "../components/pages/NeuralNetworkProjects";

export default function ProjectsPage() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Projects"
        description="Explore my work through an interactive neural network. Each node represents a project I've built — from ML pipelines to production AI systems."
      />

      <Slide delay={0.1}>
        <NeuralNetworkProjects projects={projects} />
      </Slide>

      {/* Fallback grid for smaller screens */}
      <Slide delay={0.2}>
        <div className="mt-16 lg:hidden">
          <h3 className="text-2xl font-bold font-headline mb-6">All Projects</h3>
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <a
                key={project._id}
                href={project.projectUrl || `/projects/${project.slug}`}
                className="block p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
              >
                <h4 className="font-bold text-lg">{project.name}</h4>
                <p className="text-zinc-500 text-sm mt-1">{project.tagline}</p>
              </a>
            ))}
          </div>
        </div>
      </Slide>
    </main>
  );
}
