import { jobs } from "@/app/data/portfolio";
import ExperienceList from "./ExperienceList";

export default function Job() {
  return (
    <section className="mb-32">
      <div className="mb-12">
        <h2 className="font-headline text-4xl md:text-5xl mb-4 font-bold tracking-tight">
          <span className="text-zinc-900 dark:text-white">My </span>
          <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Journey
          </span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl font-sans">
          Building AI systems and leading engineering teams across startups and agencies.
        </p>
      </div>
      <ExperienceList jobs={jobs} />
    </section>
  );
}
