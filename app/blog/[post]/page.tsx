import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/app/data/posts";
import { BiChevronRight, BiTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import FeaturedPosts from "../../components/pages/FeaturedPosts";
import SharePost from "@/app/components/shared/SharePost";
import { Slide } from "../../animation/Slide";
import Comments from "@/app/components/shared/Comments";
import { HiCalendar } from "react-icons/hi";

type Props = {
  params: Promise<{
    post: string;
  }>;
};

const metadataBase = new URL("https://roshankharel.com");

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post: postSlug } = await params;
  const post = posts.find((p) => p.slug === postSlug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    metadataBase,
    title: `${post.title} | Roshan Kharel`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://roshankharel.com/blog/${post.slug}`,
      images: post.coverImage?.image
        ? [{ url: post.coverImage.image, alt: post.coverImage.alt || post.title }]
        : undefined,
    },
  };
}

// --- Markdown Renderer Utilities ---

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Match bold (**text**), inline code (`code`), and links [text](url)
  const inlineRegex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = inlineRegex.exec(text)) !== null) {
    // Push text before this match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold
      nodes.push(
        <strong key={match.index} className="font-semibold dark:text-zinc-200 text-zinc-800">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Inline code
      nodes.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono dark:text-zinc-300 text-zinc-700"
        >
          {match[3]}
        </code>
      );
    } else if (match[4] && match[5]) {
      // Link
      nodes.push(
        <a
          key={match.index}
          href={match[5]}
          className="underline decoration-zinc-500 hover:decoration-zinc-300 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[4]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdownBody(markdown: string): React.ReactNode[] {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Heading ## (h2)
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="text-2xl font-bold font-headline tracking-tight mt-12 mb-4 dark:text-zinc-100 text-zinc-900"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Heading ### (h3)
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className="text-xl font-bold font-headline tracking-tight mt-8 mb-3 dark:text-zinc-200 text-zinc-800"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Code block ```
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      elements.push(
        <div key={key++} className="my-6 rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-200">
          {lang && (
            <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 px-4 py-2 border-b dark:border-zinc-800 border-zinc-200">
              <span className="text-xs font-mono text-zinc-500">{lang}</span>
            </div>
          )}
          <pre className="bg-zinc-50 dark:bg-[#0c0c0c] p-4 overflow-x-auto">
            <code className="text-sm font-mono dark:text-zinc-300 text-zinc-700 leading-relaxed">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>
      );
      continue;
    }

    // Ordered list (lines starting with number.)
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const content = lines[i].trim().replace(/^\d+\.\s/, "");
        listItems.push(
          <li key={key++} className="pl-2">
            {parseInlineMarkdown(content)}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal list-outside ml-6 my-4 space-y-2 dark:text-zinc-400 text-zinc-600 leading-relaxed">
          {listItems}
        </ol>
      );
      continue;
    }

    // Unordered list (lines starting with - )
    if (line.trim().startsWith("- ")) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        const content = lines[i].trim().slice(2);
        listItems.push(
          <li key={key++} className="pl-2">
            {parseInlineMarkdown(content)}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-outside ml-6 my-4 space-y-2 dark:text-zinc-400 text-zinc-600 leading-relaxed">
          {listItems}
        </ul>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="my-4 dark:text-zinc-400 text-zinc-600 leading-relaxed text-[1.05rem]">
        {parseInlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// --- Page Component ---

export default async function Post({ params }: Props) {
  const { post: postSlug } = await params;
  const post = posts.find((p) => p.slug === postSlug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <header>
        <Slide>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-x-2 border-b dark:border-zinc-800 border-zinc-200 pb-8">
            <span className="text-zinc-400 text-sm">Blog</span>
            <BiChevronRight className="text-zinc-400" />
            <p className="text-zinc-600 dark:text-zinc-300 text-sm truncate font-medium">{post.title}</p>
          </div>
        </Slide>
      </header>

      <article>
        <Slide className="grid lg:grid-cols-[70%,30%] grid-cols-1 gap-8 relative" delay={0.1}>
          <div className="min-h-full pt-10 pb-4">
            {/* Meta info: date, reading time, tags */}
            <div className="flex items-center flex-wrap gap-4 text-md mb-8 dark:text-zinc-400 text-zinc-600">
              <div className="flex items-center gap-x-2">
                <HiCalendar />
                <time dateTime={post._createdAt}>
                  {formatDate(post._createdAt)}
                </time>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-x-2">
                  <BiTime />
                  <span>{post.readingTime}</span>
                </div>
              )}
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

            {/* Post title */}
            <h1 className="max-w-3xl font-incognito font-semibold tracking-tight sm:text-5xl text-3xl mb-4 lg:leading-[3.7rem]">
              {post.title}
            </h1>
            <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed mb-8">
              {post.description}
            </p>

            {/* Cover image */}
            {post.coverImage?.image && (
              <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.coverImage.image})` }}
                />
              </div>
            )}

            {/* Body content */}
            <div className="mt-2">
              {post.body ? (
                renderMarkdownBody(post.body)
              ) : (
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
              )}
            </div>

            {/* Share post */}
            <div className="mt-12">
              <SharePost
                title={post.title}
                slug={post.slug}
                description={post.description}
              />
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-x-2 dark:text-zinc-400 text-zinc-500 hover:dark:text-white hover:text-zinc-800 transition-colors text-sm font-medium"
              >
                <BiChevronRight className="rotate-180" />
                Back to all posts
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col lg:max-h-full h-max gap-y-8 sticky top-10 py-10 lg:pl-8 lg:border-l dark:border-zinc-800 border-zinc-200">
            <section>
              <h3 className="text-lg font-bold mb-4">Featured Posts</h3>
              <FeaturedPosts params={postSlug} />
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
