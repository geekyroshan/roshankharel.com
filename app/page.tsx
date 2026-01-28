import HeroSvg from "./assets/icons/HeroSvg";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import { profile } from "@/app/data/portfolio";

export default function Home() {

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-24">
        <div key={profile?._id} className="lg:max-w-2xl max-w-2xl">
          <Slide>
            <h1 className="font-headline font-bold tracking-tighter text-3xl sm:text-6xl mb-6 lg:leading-[1.1] leading-tight lg:min-w-[700px] min-w-full">
              Architecting <span className="text-zinc-900 dark:text-white">Intelligence</span>
              <br />
              <span className="text-zinc-900 dark:text-white">AI Engineer, Full Stack, MLOps</span>
            </h1>
            <p className="text-lg dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-lg">
              {profile?.shortBio ?? "I build scalable AI systems and machine learning infrastructure."}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <Social type="social" />
          </Slide>
        </div>
        <Slide delay={0.14}>
          <div className="relative">
            <HeroSvg />
          </div>
        </Slide>
      </section>

      <section className="mb-32">
        <ContributionGraph />
      </section>

      <Job />
    </main>
  );
}
