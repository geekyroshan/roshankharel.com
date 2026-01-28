import Link from "next/link";
import { posts } from "@/app/data/posts";
import { formatDate } from "../../utils/date";
import { HiCalendar } from "react-icons/hi";
import EmptyState from "../shared/EmptyState";

export default function Posts() {
  const publishedPosts = posts.filter(post => post.isPublished);

  return (
    <section>
      {publishedPosts.length > 0 ? (
        <div className="flex flex-col lg:max-w-[950px] max-w-full lg:gap-y-8 gap-y-12 mb-12">
          {publishedPosts.map((post) => (
            <article key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex lg:flex-row flex-col lg:items-center items-start gap-8 dark:bg-zinc-900 bg-zinc-50 p-6 rounded-2xl border dark:border-zinc-800 border-zinc-100 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="relative lg:w-[300px] lg:h-40 w-full h-48 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                  {post.coverImage?.image ? (
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${post.coverImage.image})` }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      📝
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold font-headline tracking-tight mb-3 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {post.title}
                  </h2>
                  <p className="dark:text-zinc-400 text-zinc-600 text-[0.95rem] line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-x-2 text-sm text-zinc-500">
                      <HiCalendar />
                      <time dateTime={post._createdAt}>
                        {formatDate(post._createdAt)}
                      </time>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState value="Blog Post" />
      )}
    </section>
  );
}
