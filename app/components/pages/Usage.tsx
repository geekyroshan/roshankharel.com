import { PortableText } from "@portabletext/react";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { CustomPortableTextFavicon } from "../shared/CustomPortableTextFavicon";
import { sanityFetch } from "@/lib/sanity.client";

// Helper function to split content into sections
function splitContentIntoSections(content: any[]) {
  const sections = [];
  let currentSection = [];

  for (const block of content) {
    if (block.style === 'h3' && currentSection.length > 0) {
      sections.push([...currentSection]);
      currentSection = [block];
    } else {
      currentSection.push(block);
    }
  }

  // Add the last section if it's not empty
  if (currentSection.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

export default async function Usage() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  // Get all sections from the usage content
  const sections = profile?.usage ? splitContentIntoSections(profile.usage) : [];
  
  // Separate sections into left and right columns
  const leftSections = sections.filter((_, i) => i % 2 === 0);
  const rightSections = sections.filter((_, i) => i % 2 === 1);

  return (
    <section className="max-w-7xl">
      <div className="mb-6">
        <h2 className="text-4xl mb-2 font-bold tracking-tight">Usage</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Tools, technologies and gadgets I use on a daily basis but not limited
          to.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div>
          {leftSections.map((section, index) => (
            <div key={`left-${index}`} className="mb-8">
              <PortableText
                value={section}
                components={CustomPortableTextFavicon}
              />
            </div>
          ))}
        </div>

        {/* Right column */}
        <div>
          {rightSections.map((section, index) => (
            <div key={`right-${index}`} className="mb-8">
              <PortableText
                value={section}
                components={CustomPortableTextFavicon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
