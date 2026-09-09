import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, getPost } from "@/content/blog";
import { CTABand } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const allowed = new Set(blogPosts.map((p) => p.slug));

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!allowed.has(slug)) return {};
  const seo = getSeo(`/${slug}/`);
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absoluteUrl(`/${slug}/`) },
  };
}

export default async function RootBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-bb-muted">
          <Link href="/blog/" className="hover:text-bb-accent">
            Blog
          </Link>{" "}
          / {post.category}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{post.title}</h1>
        <p className="mt-3 text-sm text-bb-muted">{post.date}</p>
        {post.image && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-bb-sand">
            <Image src={post.image} alt="" fill className="object-cover" sizes="100vw" priority />
          </div>
        )}
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-bb-muted">
          {post.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </article>
      <CTABand />
    </>
  );
}
