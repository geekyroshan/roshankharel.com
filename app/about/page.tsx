"use client";

import Image from "next/image";
import { useState } from "react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { HiLightningBolt, HiGlobe, HiChip, HiCode } from "react-icons/hi";

import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import RefLink from "../components/shared/RefLink";
import { profile } from "@/app/data/portfolio";

const highlights = [
  {
    icon: HiChip,
    title: "AI & Deep Learning",
    description: "Training & deploying models from 2B to 14B parameters for production systems",
  },
  {
    icon: HiCode,
    title: "Full Stack Engineering",
    description: "End-to-end systems with React, Next.js, FastAPI, and distributed backends",
  },
  {
    icon: HiLightningBolt,
    title: "MLOps & Infrastructure",
    description: "GPU clusters, Kubernetes, CI/CD pipelines for ML at scale",
  },
  {
    icon: HiGlobe,
    title: "Social Impact AI",
    description: "Building accessible AI for underserved communities and real-world problems",
  },
];

export default function About() {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <main className="relative mx-auto max-w-3xl md:px-16 px-6 lg:max-w-7xl">
      <div key={profile?._id}>
        {/* Hero Section - Compact & Visual */}
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
            {/* Profile Card - Mobile: centered on top, Desktop: right side */}
            <aside className="lg:order-2 w-full lg:w-auto shrink-0">
              <Slide delay={0.1}>
                <div className="flex flex-col items-center lg:items-start gap-y-5 lg:sticky lg:top-10">
                  <div className="relative group">
                    <div className="absolute -inset-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl hidden md:block" />
                    {profile?.profileImage.image ? (
                      <Image
                        className="rounded-xl object-cover w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] bg-top shadow-md dark:shadow-none"
                        src={profile?.profileImage.image}
                        width={320}
                        height={320}
                        quality={95}
                        alt={profile?.profileImage.alt}
                        priority
                      />
                    ) : (
                      <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                    )}
                  </div>

                  <div className="flex flex-col gap-y-3 w-full max-w-[320px]">
                    <div className="flex items-center gap-x-3 w-full">
                      <RefLink
                        href="https://drive.google.com/file/d/1JeCJ6lrxoU8z0neb4SXi3eqnry65GidL/view?usp=sharing"
                        className="flex-1 flex items-center justify-center text-center gap-x-2 bg-zinc-900 dark:bg-white text-white dark:text-black border border-transparent hover:opacity-90 rounded-full py-2.5 text-sm font-bold font-headline transition-opacity"
                      >
                        View CV <BiLinkExternal className="text-base" />
                      </RefLink>
                      <a
                        href={`${profile?.resumeURL}?dl=${profile?.fullName}-resume.pdf`}
                        className="flex items-center justify-center text-center p-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                        title="Download Resume"
                      >
                        <BiSolidDownload className="text-lg" aria-label="Download Resume" />
                      </a>
                    </div>
                    <a
                      href={`mailto:${profile?.email}`}
                      className="flex items-center gap-x-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors text-xs font-mono justify-center"
                    >
                      <BiEnvelope className="text-base" />
                      {profile?.email ?? "contact@roshankharel.com"}
                    </a>
                  </div>
                </div>
              </Slide>
            </aside>

            {/* Text Content */}
            <div className="flex-1 lg:order-1">
              <Slide>
                <h1 className="font-headline font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl lg:leading-tight mb-6 text-center lg:text-left">
                  I build AI systems that{" "}
                  <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    ship to production
                  </span>
                </h1>

                {/* Condensed Bio */}
                <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed text-base mb-6 text-center lg:text-left">
                  <p>
                    I&apos;m an AI Engineer and founder who specializes in the full lifecycle of AI — from training models to deploying them at scale. Whether it&apos;s an enterprise RAG pipeline with zero-hallucination guarantees or a 14B parameter avatar model on a GPU cluster, I care about one thing: does it work for the people who use it?
                  </p>
                  {bioExpanded && (
                    <div className="mt-4 space-y-4 text-left">
                      <p>
                        My path started in Web3 as a founding engineer at MagicSquare, where I scaled a community platform from under 10K to 190K+ users. Those lessons in real-world traffic and messy user behavior transferred directly into ML engineering.
                      </p>
                      <p>
                        Today, I lead AI engineering at AlysAI in Dubai, shipping enterprise projects including autonomous AI agents and LiveAvatar — a real-time avatar system powered by a 14B diffusion model on 5x H800 GPUs. In parallel, I founded Sarathi Studio, building AI solutions for local businesses.
                      </p>
                      <p>
                        On the impact side, VisionSathi runs a 2B model on-device to help blind users navigate without internet. Sarathi Voice Agent serves 31M citizens in NE India in their native languages. The most meaningful AI work happens in the hands of people who need it most.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setBioExpanded(!bioExpanded)}
                  className="flex items-center gap-1.5 text-sm text-violet-500 hover:text-violet-400 transition-colors font-medium mx-auto lg:mx-0 mb-8"
                >
                  {bioExpanded ? (
                    <>Show less <BiChevronUp className="text-lg" /></>
                  ) : (
                    <>Read my full story <BiChevronDown className="text-lg" /></>
                  )}
                </button>
              </Slide>

              {/* What I Do - Highlights Grid */}
              <Slide delay={0.08}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {highlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-1.5 rounded-lg bg-violet-500/10">
                            <Icon className="text-lg text-violet-500" />
                          </div>
                          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Slide>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <Slide delay={0.12}>
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: "12+", label: "Projects Shipped" },
                { value: "190K+", label: "Users Reached" },
                { value: "6", label: "Companies" },
                { value: "14B", label: "Largest Model Deployed" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-zinc-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
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
