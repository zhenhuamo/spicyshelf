import Link from "next/link";
import type { Metadata } from "next";
import { getTropeWithBookCount } from "@/lib/books";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Romance Book Tropes — Browse All Tropes",
  description:
    "Browse all romance book tropes including enemies to lovers, forced proximity, fake dating, and more. Find your next read by trope.",
};

export default async function TropesPage() {
  const tropes = await getTropeWithBookCount();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 animate-fade-in-up">
        <p
          className="mb-3 text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          Discover
        </p>
        <h1
          className="mb-3 text-4xl font-bold"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
        >
          Romance Book Tropes
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Browse romance books by your favorite tropes. Click any trope to explore.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
        {tropes.map((trope) => (
          <Link
            key={trope.slug}
            href={`/tropes/${trope.slug}`}
            className="group flex items-start gap-4 rounded-2xl p-6 transition-all duration-300"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span className="text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {trope.emoji}
            </span>
            <div>
              <h2
                className="font-semibold"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
              >
                {trope.name}
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                {trope.description}
              </p>
              <p
                className="mt-3 text-xs font-semibold tracking-wide uppercase"
                style={{ color: "var(--primary)" }}
              >
                {trope.bookCount} {trope.bookCount === 1 ? "book" : "books"} →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
