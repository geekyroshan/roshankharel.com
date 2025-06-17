"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";
import { giscusRepoId, giscusCategoryId } from "@/lib/env.api";

export default function Comments() {
  const theme = useTheme();
  const giscusTheme =
    theme.theme === "light"
      ? "light"
      : theme.theme === "dark"
      ? "transparent_dark"
      : "dark";

  // Only render Giscus if the required variables are available
  if (!giscusRepoId || !giscusCategoryId) {
    return (
      <div className="py-10 text-center text-zinc-500">
        Comments are currently disabled.
      </div>
    );
  }

  return (
    <Giscus
      id="comments"
      repo="geekyroshan/roshankharel.com"
      repoId={giscusRepoId}
      category="Announcements"
      categoryId={giscusCategoryId}
      mapping="title"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={giscusTheme}
      lang="en"
      loading="lazy"
    />
  );
}
