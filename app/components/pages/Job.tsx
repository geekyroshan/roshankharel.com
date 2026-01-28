import { jobs } from "@/app/data/portfolio";
import ExperienceList from "./ExperienceList";

export default function Job() {
  return (
    <section className="mb-32">
      <div className="mb-12">
        <h2 className="font-headline text-4xl mb-4 font-bold tracking-tight">
          Experience
        </h2>
        <p className="text-zinc-500 max-w-xl">
          My professional journey across software and machine learning.
        </p>
      </div>
      <ExperienceList jobs={jobs} />
    </section>
  );
}
