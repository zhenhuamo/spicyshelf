import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import { getTropeBySlug, getBooksByTrope } from "@/lib/books";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trope = await getTropeBySlug(slug);
  if (!trope) return {};
  const books = await getBooksByTrope(slug);
  return {
    title: `${trope.name} Books — ${books.length} Romance Books with This Trope`,
    description: `Discover ${books.length} romance books featuring the ${trope.name} trope. ${trope.description}. Browse with spice levels and content warnings.`,
  };
}

export default async function TropeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trope = await getTropeBySlug(slug);
  if (!trope) notFound();

  const books = await getBooksByTrope(slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 animate-fade-in-up">
        <p
          className="mb-3 text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          Trope
        </p>
        <h1
          className="mb-3 text-4xl font-bold"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
        >
          {trope.emoji} {trope.name}
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          {trope.description}. Found {books.length}{" "}
          {books.length === 1 ? "book" : "books"} with this trope.
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
            No books with this trope yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
