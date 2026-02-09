import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import SpiceRating from "@/components/SpiceRating";
import { getBooksBySpiceLevel } from "@/lib/books";
import { SPICE_LABELS } from "@/lib/types";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const num = Number(level);
  const info = SPICE_LABELS[num];
  if (!info) return {};
  const books = await getBooksBySpiceLevel(num);
  return {
    title: `Spice Level ${num} Books — ${info.label} Romance Books`,
    description: `Browse ${books.length} romance books with spice level ${num}/5 (${info.label}). ${info.description}.`,
  };
}

export default async function SpiceLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const num = Number(level);
  const info = SPICE_LABELS[num];
  if (!info) notFound();

  const books = await getBooksBySpiceLevel(num);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 animate-fade-in-up">
        <p
          className="mb-3 text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          Spice Level {num}
        </p>
        <h1
          className="mb-4 text-4xl font-bold"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
        >
          {info.label}
        </h1>
        <SpiceRating level={num} size="lg" />
        <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
          {info.description}. Found {books.length}{" "}
          {books.length === 1 ? "book" : "books"} at this heat level.
        </p>
      </div>
      {books.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 stagger-children">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "var(--surface-warm)" }}
        >
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            No books at this spice level yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
