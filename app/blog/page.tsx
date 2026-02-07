import { Metadata } from "next";
import { HiCalendar } from "react-icons/hi";
import Link from "next/link";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import { posts } from "../data/posts";
import { formatDate } from "../utils/date";

export const metadata: Metadata = {
  title: "Blog | Roshan Kharel",
  metadataBase: new URL("https://roshankharel.com/blog"),
  description: "Read latest stories from Roshan Kharel's Blog",
  openGraph: {
    title: "Blog | Roshan Kharel",
    url: "https://roshankharel.com/blog",
    description: "Read latest stories from Roshan's Blog",
    images:
      "https://res.cloudinary.com/geekyroshan/image/upload/v1692636087/roshankharel/blog.png",
  },
};

export default async function Blog() {
  const publishedPosts = posts.filter((post) => post.isPublished);

  // Sort: featured first, then by date
  const sortedPosts = [...publishedPosts].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      {/* Hero Section */}
      <Slide>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-zinc-900 dark:text-white">My </span>
            <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stories about things I have learned, projects I am hacking on,
            <br className="hidden md:block" />
            and discoveries worth sharing.
          </p>
          <Social type="publication" />
        </div>
      </Slide>

      {/* Unified Blog Posts */}
      <Slide delay={0.1}>
        <div className="grid gap-6 mb-16">
          {sortedPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-50 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col sm:flex-row">
                {/* Cover Image */}
                <div className="relative sm:w-[240px] md:w-[280px] w-full h-48 sm:h-auto overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                  {post.coverImage?.image ? (
                    <div
                      className="w-full h-full min-h-[160px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${post.coverImage.image})` }}
                    />
                  ) : (
                    <div className="w-full h-full min-h-[160px] flex items-center justify-center text-4xl">
                      📝
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    {post.featured && (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20">
                        Featured
                      </span>
                    )}
                    {post.readingTime && (
                      <span className="text-xs text-zinc-500">
                        {post.readingTime}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-headline tracking-tight mb-2 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="dark:text-zinc-400 text-zinc-600 text-sm line-clamp-2 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="flex items-center gap-x-2 text-sm text-zinc-500">
                      <HiCalendar />
                      <time dateTime={post._createdAt}>
                        {formatDate(post._createdAt)}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Slide>
    </main>
  );
}
