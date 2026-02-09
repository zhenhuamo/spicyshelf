import Link from "next/link";
import type { Metadata } from "next";
import { getBooksBySpiceLevel } from "@/lib/books";
import { SPICE_LABELS } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Browse Books by Spice Level — Romance Heat Ratings",
  description:
    "Browse romance and romantasy books by spice level from clean (0) to scorching (5). Find the perfect heat level for your next read.",
};

export default async function SpiceOverviewPage() {
  const counts: Record<number, number> = {};
  for (const level of [0, 1, 2, 3, 4, 5]) {
    const books = await getBooksBySpiceLevel(level);
    counts[level] = books.length;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 animate-fade-in-up">
        <p
          className="mb-3 text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          Heat Guide
        </p>
        <h1
          className="mb-3 text-4xl font-bold"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
        >
          Browse by Spice Level
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Find romance books at your preferred heat level. From clean reads to scorching hot.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
        {Object.entries(SPICE_LABELS).map(([level, info]) => {
          const count = counts[Number(level)] ?? 0;
          return (
            <Link
              key={level}
              href={`/spice/${level}`}
              className="group flex items-start gap-4 rounded-2xl p-6 transition-all duration-300"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {Number(level) === 0
                  ? "🧊"
                  : Array.from({ length: Number(level) }, () => "🌶️").join("")}
              </span>
              <div>
                <h2
                  className="font-semibold"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
                >
                  Level {level} — {info.label}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                  {info.description}
                </p>
                <p
                  className="mt-3 text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "var(--primary)" }}
                >
                  {count} {count === 1 ? "book" : "books"} →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
