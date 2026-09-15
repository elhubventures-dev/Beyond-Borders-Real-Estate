import Image from "next/image";

export type GalleryItem = { src: string; alt: string };

export function BrandGallery({
  items,
  title = "On The Ground",
  subtitle = "Construction delivery, brand presence, and the corridors we serve across Abuja.",
  eyebrow = "Brand & Delivery",
}: {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="max-w-2xl mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
          {eyebrow}
        </span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight text-bb-obsidian">
          {title}
        </h2>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{subtitle}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure
            key={item.src}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-900"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
