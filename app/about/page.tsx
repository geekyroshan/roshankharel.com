import Image from "next/image";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import { CustomPortableText } from "../components/shared/CustomPortableText";

import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import RefLink from "../components/shared/RefLink";
import { profile } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "About | Roshan Kharel",
  metadataBase: new URL("https://roshankharel.com/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Roshan Kharel",
    url: "https://roshankharel.com/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/geekyroshan/image/upload/v1692635746/roshankharel/og.png",
  },
};

export default function About() {

  return (
    <main className="relative mx-auto max-w-3xl md:px-16 px-6 lg:max-w-7xl">
      <div key={profile?._id}>
        <section className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-12 justify-items-start mb-24">
          <div className="order-2 lg:order-none">
            <Slide>
              <h1 className="font-headline font-bold tracking-tight sm:text-5xl text-3xl lg:leading-tight mb-8">
                I&apos;m <span className="text-zinc-900 dark:text-white">{profile?.fullName ?? "John Doe"}</span>.{" "}
                I build AI systems that solve real problems for real people.
              </h1>

              <div className="dark:text-zinc-400 text-zinc-600 leading-loose text-lg font-light">
                {profile?.fullBio ? (
                  <PortableText
                    value={profile?.fullBio}
                    components={CustomPortableText}
                  />
                ) : (
                  "Your bio information will show up here"
                )}
              </div>
            </Slide>
          </div>

          <aside className="flex flex-col lg:justify-self-start justify-self-start gap-y-8 lg:order-1 order-none mb-12 w-full">
            <Slide delay={0.1}>
              <div className="sticky top-10">
                <div className="relative group">
                  {/* Minimal Decorator Frame */}
                  <div className="absolute -inset-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl md:block hidden" />

                  {profile?.profileImage.image ? (
                    <Image
                      className="rounded-xl mb-6 object-cover max-h-96 min-h-96 bg-top shadow-md dark:shadow-none"
                      src={profile?.profileImage.image}
                      width={400}
                      height={400}
                      quality={95}
                      alt={profile?.profileImage.alt}
                      priority
                    />
                  ) : (
                    <div className="h-96 w-[400px] bg-zinc-200 dark:bg-zinc-800 mb-6 rounded-xl"></div>
                  )}
                </div>

                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-3 w-full">
                    <RefLink
                      href="https://drive.google.com/file/d/1JeCJ6lrxoU8z0neb4SXi3eqnry65GidL/view?usp=sharing"
                      className="flex-1 flex items-center justify-center text-center gap-x-2 bg-zinc-900 dark:bg-white text-white dark:text-black border border-transparent hover:opacity-90 rounded-full py-3 text-base font-bold font-headline transition-opacity"
                    >
                      View CV <BiLinkExternal className="text-lg" />
                    </RefLink>
                    <a
                      href={`${profile?.resumeURL}?dl=${profile?.fullName}-resume.pdf`}
                      className="flex items-center justify-center text-center p-3 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                      title="Download Resume"
                    >
                      <BiSolidDownload
                        className="text-xl"
                        aria-label="Download Resume"
                      />
                    </a>
                  </div>

                  <a
                    href={`mailto:${profile?.email}`}
                    className="flex items-center gap-x-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors text-sm font-mono justify-center border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2"
                  >
                    <BiEnvelope className="text-lg" />
                    {profile?.email ?? "contact@roshankharel.com"}
                  </a>
                </div>
              </div>
            </Slide>
          </aside>
        </section>
        <Slide delay={0.12}>
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: "12+", label: "Projects Shipped" },
                { value: "190K+", label: "Users Reached" },
                { value: "6", label: "Companies" },
                { value: "14B", label: "Largest Model Deployed" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50"
                >
                  <div className="text-3xl sm:text-4xl font-bold font-headline bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Slide>

        <Slide delay={0.14}>
          <Usage />
        </Slide>
      </div>
    </main>
  );
}
