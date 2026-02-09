import Link from "next/link";
import Image from "next/image";
import SpiceRating from "./SpiceRating";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-light)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden" style={{ background: "var(--surface-warm)" }}>
        <Image
          src={book.coverUrl}
          alt={`${book.title} by ${book.author} book cover`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(to top, rgba(139, 34, 82, 0.6) 0%, transparent 50%)",
          }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3
          className="font-semibold leading-tight transition-colors duration-200"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--text-primary)",
          }}
        >
          <span className="group-hover:text-gradient">{book.title}</span>
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {book.author}
        </p>
        <div className="mt-auto pt-2">
          <SpiceRating level={book.spiceLevel} size="sm" />
        </div>
      </div>
    </Link>
  );
}
