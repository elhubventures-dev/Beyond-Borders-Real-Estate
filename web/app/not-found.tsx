import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-gradient mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bb-muted">404</p>
      <h1 className="mt-3 font-display text-4xl">Page not found</h1>
      <p className="mt-4 text-bb-muted">
        That link may be a retired theme demo. Head home or browse our projects.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/houses/" className="inline-flex border border-bb-ink/20 px-5 py-3 font-semibold">
          Houses
        </Link>
      </div>
    </div>
  );
}
