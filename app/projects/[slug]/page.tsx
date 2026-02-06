import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { projects } from "@/app/data/portfolio";
import { Slide } from "@/app/animation/Slide";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryConfig: Record<string, { gradient: string }> = {
  "Accessibility AI": { gradient: "from-violet-600 to-purple-600" },
  "Generative AI": { gradient: "from-pink-600 to-rose-600" },
  "Enterprise RAG": { gradient: "from-emerald-600 to-teal-600" },
  "Conversational AI": { gradient: "from-amber-600 to-orange-600" },
  "Data Science": { gradient: "from-blue-600 to-indigo-600" },
  "Reinforcement Learning": { gradient: "from-orange-600 to-red-600" },
  "Production ML": { gradient: "from-green-600 to-emerald-600" },
  "AI Agents": { gradient: "from-cyan-600 to-blue-600" },
  "Productivity AI": { gradient: "from-indigo-600 to-violet-600" },
  "Recommendation Systems": { gradient: "from-red-600 to-pink-600" },
  "Hackathon Project": { gradient: "from-yellow-600 to-amber-600" },
  "Data Engineering": { gradient: "from-teal-600 to-cyan-600" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | Roshan Kharel`,
    description: project.tagline,
    metadataBase: new URL("https://roshankharel.com"),
    openGraph: {
      title: `${project.name} | Roshan Kharel`,
      description: project.tagline,
      type: "article",
      url: `https://roshankharel.com/projects/${project.slug}`,
      images: project.coverImage.image
        ? [
            {
              url: project.coverImage.image,
              alt: project.coverImage.alt || project.name,
            },
          ]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const config = categoryConfig[project.category] || {
    gradient: "from-zinc-600 to-zinc-700",
  };

  const metricItems = project.metrics
    ? project.metrics.split(" | ")
    : [];

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      {/* Back Button */}
      <Slide>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-10 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>
      </Slide>

      {/* Hero Section */}
      <Slide delay={0.05}>
        <section className="relative rounded-3xl overflow-hidden bg-zinc-950 mb-12">
          {/* Cover Image */}
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1]">
            {project.coverImage.image && (
              <Image
                src={project.coverImage.image}
                alt={project.coverImage.alt || project.name}
                fill
                className="object-contain p-8 md:p-16"
                priority
              />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative px-6 md:px-10 pb-8 md:pb-10 -mt-20 md:-mt-24">
            {/* Category Badge */}
            {project.category && (
              <span
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${config.gradient} text-white mb-4`}
              >
                {project.category}
              </span>
            )}

            <h1 className="font-headline font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {project.name}
            </h1>

            <p className="text-zinc-300 text-lg md:text-xl max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </section>
      </Slide>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column: Description + Highlights */}
        <div className="lg:col-span-2 space-y-10">
          {/* Full Description */}
          {project.fullDescription && (
            <Slide delay={0.1}>
              <section>
                <h2 className="font-headline text-2xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
                  About the Project
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                  {project.fullDescription}
                </p>
              </section>
            </Slide>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <Slide delay={0.15}>
              <section>
                <h2 className="font-headline text-2xl font-bold text-zinc-900 dark:text-white mb-5 tracking-tight">
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Slide>
          )}

          {/* Impact Section */}
          {project.impact && (
            <Slide delay={0.2}>
              <section
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1), rgba(249, 115, 22, 0.1))",
                }}
              >
                <h2 className="font-headline text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
                  Impact
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
                  {project.impact}
                </p>
              </section>
            </Slide>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <Slide delay={0.1}>
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Slide>
          )}

          {/* Metrics */}
          {metricItems.length > 0 && (
            <Slide delay={0.15}>
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                  Metrics
                </h3>
                <div className="space-y-3">
                  {metricItems.map((metric, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex-shrink-0" />
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                        {metric.trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Slide>
          )}

          {/* Links */}
          <Slide delay={0.2}>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-3">
              <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Links
              </h3>
              {project.projectUrl && (
                <Link
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  <BiLinkExternal className="w-5 h-5" />
                  Live Demo
                </Link>
              )}
              {project.repository && (
                <Link
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <BiLogoGithub className="w-5 h-5" />
                  Source Code
                </Link>
              )}
              {!project.projectUrl && !project.repository && (
                <p className="text-zinc-500 dark:text-zinc-500 text-sm">
                  No public links available for this project.
                </p>
              )}
            </div>
          </Slide>
        </div>
      </div>

      {/* Bottom CTA */}
      <Slide delay={0.25}>
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10 pb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline text-xl font-bold text-zinc-900 dark:text-white mb-1">
                Interested in this project?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Let&apos;s discuss how I can build something similar for you.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                className="px-5 py-2.5 rounded-xl font-medium text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                All Projects
              </Link>
              <Link
                href="mailto:contact@roshankharel.com"
                className="px-5 py-2.5 rounded-xl font-medium text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </Slide>
    </main>
  );
}
