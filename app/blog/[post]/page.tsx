import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/app/data/posts";
import { BiChevronRight } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import FeaturedPosts from "../../components/pages/FeaturedPosts";
import { Slide } from "../../animation/Slide";
import Comments from "@/app/components/shared/Comments";
import PageHeading from "@/app/components/shared/PageHeading";
import { HiCalendar } from "react-icons/hi";

type Props = {
  params: {
    post: string;
  };
};

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts.find(p => p.slug === params.post);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://roshankharel.com/blog/${post.slug}`,
    },
  };
}

export default function Post({ params }: Props) {
  const post = posts.find(p => p.slug === params.post);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <header>
        <Slide className="relative flex items-center gap-x-2 border-b dark:border-zinc-800 border-zinc-200 pb-8">
          <Link
            href="/blog"
            className="whitespace-nowrap dark:text-zinc-400 text-zinc-400 hover:dark:text-white hover:text-zinc-700 text-sm border-b dark:border-zinc-700 border-zinc-200"
          >
            cd ..
          </Link>
          <BiChevronRight />
          <p className="text-zinc-400 text-sm truncate">{post.title}</p>
        </Slide>
      </header>

      <article>
        <Slide className="grid lg:grid-cols-[70%,30%] grid-cols-1 gap-8 relative" delay={0.1}>
          <div className="min-h-full pt-10 pb-4">
            <div className="flex items-center flex-wrap gap-4 text-md mb-8 dark:text-zinc-400 text-zinc-600">
              <div className="flex items-center gap-x-2">
                <HiCalendar />
                <time dateTime={post._createdAt}>
                  {formatDate(post._createdAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <PageHeading title={post.title} description={post.description} />

            {post.coverImage?.image && (
              <div className="relative w-full h-80 rounded-2xl overflow-hidden mt-8">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.coverImage.image})` }}
                />
              </div>
            )}

            <div className="mt-10 dark:text-zinc-400 text-zinc-600 leading-relaxed text-lg">
              <p className="mb-6">
                This is a placeholder for the full blog post content. In a production setup,
                you would store the full content in markdown files or a database.
              </p>
              <p>
                For now, Roshan is focusing on building amazing AI systems and autonomous agents.
                Check back soon for the full article!
              </p>
            </div>
          </div>

          <aside className="flex flex-col lg:max-h-full h-max gap-y-8 sticky top-10 py-10 lg:pl-8 lg:border-l dark:border-zinc-800 border-zinc-200">
            <section>
              <h3 className="text-lg font-bold mb-4">Featured Posts</h3>
              <FeaturedPosts params={params.post} />
            </section>
          </aside>
        </Slide>
      </article>

      <section id="comments" className="max-w-3xl mt-16 border-t dark:border-zinc-800 border-zinc-200 py-10">
        <h3 className="text-3xl font-bold font-headline tracking-tight mb-8">
          Comments
        </h3>
        <Comments />
      </section>
    </main>
  );
}

// Generate static paths for all posts
export async function generateStaticParams() {
  return posts.map((post) => ({
    post: post.slug,
  }));
}
