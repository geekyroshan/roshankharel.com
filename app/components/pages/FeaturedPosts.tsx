import Link from "next/link";
import { posts } from "@/app/data/posts";

type Props = {
  params?: string;
};

export default function FeaturedPosts({ params }: Props) {
  const featuredPosts = posts.filter(
    (post) => post.featured && post.slug !== params && post.isPublished
  ).slice(0, 3);

  if (featuredPosts.length === 0) return null;

  return (
    <ul className="space-y-4">
      {featuredPosts.map((post) => (
        <li key={post._id}>
          <Link
            href={`/blog/${post.slug}`}
            className="block p-3 -mx-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <h4 className="text-sm font-medium line-clamp-2 mb-1">
              {post.title}
            </h4>
            <p className="text-xs text-zinc-500 line-clamp-1">
              {post.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
