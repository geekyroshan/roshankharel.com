// Environment variables for the portfolio site

// Make Giscus variables optional (for blog comments)
export const giscusRepoId = process.env.NEXT_PUBLIC_GISCUS_REPOID || "";
export const giscusCategoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORYID || "";

// Make Umami variable optional (for analytics)
export const umamiSiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";

// GitHub username for contribution graph
export const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "geekyroshan";
