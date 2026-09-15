"use client";

import Image from "next/image";

/**
 * Cropped thumbnail that slowly pops out only when hovering this image frame
 * (not the rest of the card) to reveal the full flyer.
 */
export function HoverPopImage({
  src,
  alt,
  sizes,
  priority,
  aspectClass = "aspect-[16/10]",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  aspectClass?: string;
}) {
  return (
    <div className={`group/media relative ${aspectClass} w-full bg-slate-900`}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.04] group-hover/media:brightness-90"
          sizes={sizes}
          priority={priority}
        />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-50 w-[min(22rem,88vw)] -translate-x-1/2 -translate-y-[42%] scale-[0.82] opacity-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:pointer-events-auto group-hover/media:scale-100 group-hover/media:opacity-100 sm:w-[min(26rem,70vw)]"
        aria-hidden
      >
        <div className="overflow-hidden rounded-md border border-white/20 bg-bb-obsidian shadow-[0_32px_80px_-16px_rgba(11,15,23,0.7)] ring-1 ring-bb-obsidian/20">
          <div className="relative aspect-[3/4] w-full bg-bb-obsidian sm:aspect-[4/5]">
            <Image
              src={src}
              alt=""
              fill
              className="object-contain p-1"
              sizes="(max-width:640px) 88vw, 26rem"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
