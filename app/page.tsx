import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import { profile } from "@/app/data/portfolio";

export default function Home() {

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-16">
      <section className="flex xl:flex-row flex-col xl:items-center items-center xl:justify-center justify-between gap-x-12 mb-16 md:mb-24">
        {/* Avatar - shows first on mobile, second on desktop */}
        <Slide delay={0.05}>
          <div className="relative flex items-center justify-center xl:order-2 mb-8 xl:mb-0">
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 p-[3px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://github.com/geekyroshan.png"
                      alt="Roshan Kharel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-orange-500/20 blur-2xl -z-10" />
            </div>
          </div>
        </Slide>

        {/* Text content */}
        <div key={profile?._id} className="lg:max-w-2xl max-w-2xl xl:order-1 text-center xl:text-left">
          <Slide>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-3 sm:mb-4 font-sans">
              Hi, I&apos;m <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            </p>
            <h1 className="font-headline font-bold tracking-tight text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 sm:mb-6 lg:leading-[1] leading-tight">
              <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Roshan Kharel
              </span>
            </h1>
            <h2 className="font-headline font-semibold tracking-tight text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-zinc-800 dark:text-zinc-200">
              AI Engineer & Full Stack Developer
            </h2>
            <p className="text-base sm:text-lg dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-lg mx-auto xl:mx-0 font-sans">
              {profile?.shortBio ?? "I build scalable AI systems and machine learning infrastructure."}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <div className="flex justify-center xl:justify-start">
              <Social type="social" />
            </div>
          </Slide>
        </div>
      </section>

      <section className="mb-32">
        <ContributionGraph />
      </section>

      <Job />
    </main>
  );
}
