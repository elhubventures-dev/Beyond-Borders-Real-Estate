import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/content/blog";
import { PageHero } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/blog/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/blog/") },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero title="Blog" subtitle="Notes on construction, delivery and buying smarter." />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border border-bb-ink/10 bg-bb-white">
              {post.image && (
                <Link href={`/${post.slug}/`} className="relative block aspect-[16/10] overflow-hidden">
                  <Image src={post.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </Link>
              )}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-bb-muted">
                  {post.category} · {post.date}
                </p>
                <h2 className="mt-2 font-display text-xl">
                  <Link href={`/${post.slug}/`} className="hover:text-bb-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-bb-muted">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
