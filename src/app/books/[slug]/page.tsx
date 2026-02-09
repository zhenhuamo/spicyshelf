import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SpiceRating from "@/components/SpiceRating";
import ContentWarning from "@/components/ContentWarning";
import BookCard from "@/components/BookCard";
import Breadcrumb from "@/components/Breadcrumb";
import ReviewCard from "@/components/ReviewCard";
import {
  getAllBooks,
  getBookBySlug,
  getBookshopUrl,
  getTropeBySlug,
  getSimilarBooks,
} from "@/lib/books";
import { SPICE_LABELS } from "@/lib/types";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};
  const spice = SPICE_LABELS[book.spiceLevel];

  const tropeNames: string[] = [];
  for (const t of book.tropes) {
    const trope = await getTropeBySlug(t);
    if (trope) tropeNames.push(trope.name);
  }

  return {
    title: `${book.title} Spice Level — ${spice.label} (${book.spiceLevel}/5)`,
    description: `Is ${book.title} spicy? ${book.title} by ${book.author} has a spice level of ${book.spiceLevel}/5 (${spice.label}). Tropes: ${tropeNames.join(", ")}. Read our full spice breakdown, content warnings, and reading guide.`,
    openGraph: {
      title: `${book.title} Spice Level — ${spice.label} (${book.spiceLevel}/5) | SpicyBooks`,
      description: `Is ${book.title} spicy? Find out the spice level, tropes, and content warnings before you read.`,
      images: [{ url: book.coverUrl, alt: `${book.title} book cover` }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} Spice Level — ${book.spiceLevel}/5 🌶️`,
      description: `${spice.label}. Tropes: ${tropeNames.join(", ")}.`,
    },
    alternates: {
      canonical: `https://spicybooks.org/books/${slug}`,
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const tropeObjects: NonNullable<Awaited<ReturnType<typeof getTropeBySlug>>>[] = [];
  for (const t of book.tropes) {
    const trope = await getTropeBySlug(t);
    if (trope) tropeObjects.push(trope);
  }
  const similar = await getSimilarBooks(book.similarBooks);
  const spice = SPICE_LABELS[book.spiceLevel];
  const allBooks = await getAllBooks();

  // JSON-LD schemas
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.author },
    numberOfPages: book.pageCount,
    datePublished: String(book.publishYear),
    isbn: book.isbn,
    image: book.coverUrl,
    genre: book.subgenres,
    ...(book.series && {
      isPartOf: {
        "@type": "BookSeries",
        name: book.series.name,
        position: book.series.number,
      },
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: book.spiceLevel,
      bestRating: 5,
      worstRating: 0,
      ratingCount: 1,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${book.title} spicy?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${book.title} has a spice level of ${book.spiceLevel}/5 (${spice.label}). ${spice.description}. ${book.spiceDescription}`,
        },
      },
      {
        "@type": "Question",
        name: `What is the spice level of ${book.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${book.title} by ${book.author} is rated ${book.spiceLevel} out of 5 on our spice scale, which means "${spice.label}." ${book.steamLevel}.`,
        },
      },
      {
        "@type": "Question",
        name: `What tropes are in ${book.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${book.title} features the following tropes: ${tropeObjects.map((t) => t.name).join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${book.title} have content warnings?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Content warnings for ${book.title} include: ${book.contentWarnings.join(", ")}.`,
        },
      },
      ...(book.series
        ? [{
            "@type": "Question",
            name: `Is ${book.title} part of a series?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes, ${book.title} is book ${book.series.number} of ${book.series.totalBooks} in the ${book.series.name} series.`,
            },
          }]
        : []),
      ...(book.spicySceneCount !== undefined
        ? [{
            "@type": "Question",
            name: `How many spicy scenes are in ${book.title}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${book.title} contains approximately ${book.spicySceneCount} intimate/spicy scene${book.spicySceneCount !== 1 ? "s" : ""}. ${book.steamLevel}.`,
            },
          }]
        : []),
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://spicybooks.org" },
      { "@type": "ListItem", position: 2, name: "Books", item: "https://spicybooks.org/books" },
      { "@type": "ListItem", position: 3, name: book.title },
    ],
  };

  const reviewJsonLd = book.reviews.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    review: book.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.username },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: r.spiceRating, bestRating: 5, worstRating: 0 },
      reviewBody: r.text,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (book.reviews.reduce((sum, r) => sum + r.spiceRating, 0) / book.reviews.length).toFixed(1),
      reviewCount: book.reviews.length,
      bestRating: 5,
      worstRating: 0,
    },
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {reviewJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
      )}

      <article className="mx-auto max-w-4xl px-6 py-10">
        <Breadcrumb items={[{ label: "Books" }, { label: book.title }]} />

        {/* ===== HERO ===== */}
        <header className="mb-12 flex flex-col gap-8 sm:flex-row animate-fade-in-up">
          <div
            className="relative aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-2xl"
            style={{ background: "var(--surface-warm)", boxShadow: "var(--shadow-lg)" }}
          >
            <Image
              src={book.coverUrl}
              alt={`${book.title} by ${book.author} — book cover`}
              fill
              className="object-cover"
              sizes="192px"
              priority
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              {book.title}
              {book.series && (
                <span className="ml-2 text-lg font-normal" style={{ color: "var(--text-muted)" }}>
                  ({book.series.name} #{book.series.number})
                </span>
              )}
            </h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              by {book.author}
            </p>

            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <span>📖 {book.pageCount} pages</span>
              <span>📅 {book.publishYear}</span>
              <span>👁️ {book.povStyle}</span>
              {book.narrator && <span>🎧 {book.narrator}</span>}
            </div>

            <div className="flex flex-wrap gap-2">
              {book.subgenres.map((s) => (
                <span
                  key={s}
                  className="rounded-lg px-3 py-1 text-xs font-medium"
                  style={{ background: "var(--surface-warm)", color: "var(--text-secondary)" }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, var(--spice-from), var(--spice-to))",
                  boxShadow: "0 4px 16px rgba(139, 34, 82, 0.25)",
                }}
              >
                Buy on Amazon →
              </a>
              <a
                href={getBookshopUrl(book.isbn)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Buy on Bookshop.org
              </a>
            </div>
          </div>
        </header>

        {/* ===== QUICK VERDICT ===== */}
        <section
          className="mb-12 rounded-2xl p-7"
          style={{
            background: "linear-gradient(135deg, var(--primary-bg), var(--accent-bg))",
            border: "1px solid color-mix(in srgb, var(--primary) 15%, transparent)",
          }}
        >
          <h2
            className="mb-4 text-lg font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            🌶️ Quick Spice Verdict
          </h2>
          <div className="mb-4">
            <SpiceRating level={book.spiceLevel} size="lg" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Heat Level", value: book.steamLevel },
              ...(book.spicySceneCount !== undefined
                ? [{ label: "Spicy Scenes", value: `~${book.spicySceneCount} scene${book.spicySceneCount !== 1 ? "s" : ""}` }]
                : []),
              { label: "POV Style", value: book.povStyle },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4"
                style={{ background: "color-mix(in srgb, var(--surface) 80%, transparent)" }}
              >
                <p
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </p>
                <p className="mt-1.5 font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SECTION NAV ===== */}
        <nav className="mb-12 flex flex-wrap gap-2 text-sm" aria-label="Page sections">
          {["About", "Spice Breakdown", "Tropes", "Content Warnings", "Who Should Read This", "Our Take", "Reader Reviews", ...(book.series ? ["Series Info"] : []), "FAQ", "Similar Books"].map((section) => {
            const id = section.toLowerCase().replace(/\s+/g, "-");
            return (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-4 py-2 transition-all duration-200 hover:scale-105"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  background: "var(--surface)",
                }}
              >
                {section}
              </a>
            );
          })}
        </nav>

        {/* ===== ABOUT ===== */}
        <section id="about" className="mb-12">
          <h2
            className="mb-4 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            About {book.title}
          </h2>
          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {book.description}
          </p>
          {book.moods.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Reading Vibes
              </p>
              <div className="flex flex-wrap gap-2">
                {book.moods.map((mood) => (
                  <span
                    key={mood}
                    className="rounded-full px-3.5 py-1.5 text-xs font-medium"
                    style={{ background: "var(--primary-bg)", color: "var(--primary)" }}
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ===== SPICE BREAKDOWN ===== */}
        <section id="spice-breakdown" className="mb-12">
          <h2
            className="mb-4 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            🌶️ Spice Level Breakdown
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{ background: "var(--surface)", border: "1px solid var(--border-light)" }}
          >
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--spice-from), var(--spice-to))",
                  color: "white",
                }}
              >
                {book.spiceLevel}/5 — {spice.label}
              </span>
            </div>
            <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {book.spiceDescription}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Spice Meter
              </span>
              <div
                className="flex h-2.5 flex-1 overflow-hidden rounded-full"
                style={{ background: "var(--surface-warm)" }}
              >
                <div
                  className="rounded-full transition-all duration-700"
                  style={{
                    width: `${(book.spiceLevel / 5) * 100}%`,
                    background: "linear-gradient(90deg, var(--spice-from), var(--spice-to))",
                  }}
                />
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {book.spiceLevel}/5
              </span>
            </div>
          </div>
        </section>

        {/* ===== TROPES ===== */}
        <section id="tropes" className="mb-12">
          <h2
            className="mb-4 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            Tropes in {book.title}
          </h2>
          <div className="space-y-3">
            {tropeObjects.map((trope) => (
              <div
                key={trope.slug}
                className="flex items-start gap-4 rounded-2xl p-5 transition-all duration-200"
                style={{ background: "var(--surface)", border: "1px solid var(--border-light)" }}
              >
                <span className="text-2xl">{trope.emoji}</span>
                <div>
                  <Link
                    href={`/tropes/${trope.slug}`}
                    className="font-semibold transition-colors duration-200"
                    style={{ color: "var(--primary)" }}
                  >
                    {trope.name}
                  </Link>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                    {trope.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CONTENT WARNINGS ===== */}
        <section id="content-warnings" className="mb-12">
          <h2
            className="mb-4 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            Content Warnings
          </h2>
          <ContentWarning warnings={book.contentWarnings} />
        </section>

        {/* ===== WHO SHOULD READ THIS ===== */}
        <section id="who-should-read-this" className="mb-12">
          <h2
            className="mb-5 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            Should You Read {book.title}?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "color-mix(in srgb, #22c55e 6%, var(--surface))",
                border: "1px solid color-mix(in srgb, #22c55e 20%, transparent)",
              }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-semibold" style={{ color: "#16a34a" }}>
                <span>✅</span> Perfect For You If...
              </h3>
              <ul className="space-y-2.5">
                {book.perfectFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "#22c55e" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-6"
              style={{
                background: "color-mix(in srgb, var(--spice-from) 6%, var(--surface))",
                border: "1px solid color-mix(in srgb, var(--spice-from) 20%, transparent)",
              }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-semibold" style={{ color: "var(--spice-from)" }}>
                <span>⛔</span> Skip This If...
              </h3>
              <ul className="space-y-2.5">
                {book.skipIf.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--spice-from)" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== EDITORIAL REVIEW ===== */}
        <section id="our-take" className="mb-12">
          <h2
            className="mb-4 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            Our Take
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-light)",
              borderLeft: "3px solid var(--primary)",
            }}
          >
            <p className="leading-relaxed italic" style={{ color: "var(--text-secondary)" }}>
              {book.editorialReview}
            </p>
          </div>
        </section>

        {/* ===== READER REVIEWS ===== */}
        {book.reviews.length > 0 && (
          <section id="reader-reviews" className="mb-12">
            <h2
              className="mb-2 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              What Readers Say
            </h2>
            <p className="mb-5 text-sm" style={{ color: "var(--text-muted)" }}>
              Average community spice rating:{" "}
              <span className="font-semibold" style={{ color: "var(--primary)" }}>
                {(book.reviews.reduce((sum, r) => sum + r.spiceRating, 0) / book.reviews.length).toFixed(1)}/5
              </span>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {book.reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </section>
        )}

        {/* ===== SERIES INFO ===== */}
        {book.series && (
          <section id="series-info" className="mb-12">
            <h2
              className="mb-4 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              📚 Series Information
            </h2>
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border-light)" }}
            >
              <p style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{book.title}</span> is book{" "}
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>#{book.series.number}</span> of{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{book.series.totalBooks}</span> in the{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{book.series.name}</span> series.
              </p>
              {book.series.number > 1 && (
                <p className="mt-2 text-sm" style={{ color: "var(--accent)" }}>
                  ⚠️ We recommend reading this series in order for the best experience.
                </p>
              )}
              {(() => {
                const seriesBooks = allBooks.filter(
                  (b) => b.series?.name === book.series?.name && b.slug !== book.slug
                );
                if (seriesBooks.length === 0) return null;
                return (
                  <div className="mt-5">
                    <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Other books in this series:
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {seriesBooks.map((b) => (
                        <BookCard key={b.slug} book={b} />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* ===== FAQ ===== */}
        <section id="faq" className="mb-12">
          <h2
            className="mb-5 text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: `Is ${book.title} spicy?`,
                a: `Yes, ${book.title} has a spice level of ${book.spiceLevel}/5 on our scale, which we rate as "${spice.label}." ${spice.description}. ${book.spiceDescription}`,
              },
              {
                q: `What is the spice level of ${book.title}?`,
                a: `${book.title} by ${book.author} is rated ${book.spiceLevel} out of 5 on the SpicyBooks spice scale. This means it's "${spice.label}" — ${spice.description.toLowerCase()}. The steam level is: ${book.steamLevel}.`,
              },
              ...(book.spicySceneCount !== undefined
                ? [{
                    q: `How many spicy scenes are in ${book.title}?`,
                    a: `${book.title} contains approximately ${book.spicySceneCount} intimate/spicy scene${book.spicySceneCount !== 1 ? "s" : ""}. ${book.spiceDescription}`,
                  }]
                : []),
              {
                q: `What tropes are in ${book.title}?`,
                a: `${book.title} features the following romance tropes: ${tropeObjects.map((t) => `${t.emoji} ${t.name}`).join(", ")}. These tropes are central to the story and shape the romantic dynamic between the characters.`,
              },
              {
                q: `Does ${book.title} have content warnings?`,
                a: `Yes, readers should be aware of the following content warnings for ${book.title}: ${book.contentWarnings.join(", ")}. We always recommend checking content warnings before reading if you have specific sensitivities.`,
              },
              ...(book.series
                ? [{
                    q: `Is ${book.title} part of a series? Do I need to read it in order?`,
                    a: `Yes, ${book.title} is book ${book.series.number} of ${book.series.totalBooks} in the ${book.series.name} series. ${book.series.number === 1 ? "As the first book, this is the perfect starting point." : `We recommend starting with book 1 for the best experience, as the story builds on previous events.`}`,
                  }]
                : [{
                    q: `Is ${book.title} a standalone?`,
                    a: `${book.title} can be read as a standalone novel. You don't need to read any other books before or after to enjoy the full story.`,
                  }]),
              {
                q: `Who would enjoy ${book.title}?`,
                a: `${book.title} is perfect for: ${book.perfectFor.slice(0, 3).join("; ")}. The reading vibes are: ${book.moods.join(", ")}.`,
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl transition-all duration-200"
                style={{ background: "var(--surface)", border: "1px solid var(--border-light)" }}
              >
                <summary
                  className="cursor-pointer px-6 py-4 font-semibold transition-colors duration-200"
                  style={{ color: "var(--text-primary)" }}
                >
                  {q}
                </summary>
                <p
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== SIMILAR BOOKS ===== */}
        {similar.length > 0 && (
          <section id="similar-books" className="mb-12">
            <h2
              className="mb-5 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              If You Liked {book.title}, You&apos;ll Love These
            </h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {similar.map((b) => (
                <BookCard key={b.slug} book={b} />
              ))}
            </div>
          </section>
        )}

        {/* ===== BOTTOM CTA ===== */}
        <section
          className="rounded-2xl p-10 text-center text-white"
          style={{
            background: "linear-gradient(135deg, var(--spice-from), var(--spice-to))",
            boxShadow: "0 8px 32px rgba(139, 34, 82, 0.2)",
          }}
        >
          <h2
            className="mb-3 text-2xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to Read {book.title}?
          </h2>
          <p className="mb-6" style={{ opacity: 0.85 }}>
            Now that you know the spice level, tropes, and content warnings — grab your copy!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="rounded-xl bg-white px-7 py-3 text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{ color: "var(--primary)" }}
            >
              Buy on Amazon →
            </a>
            <a
              href={getBookshopUrl(book.isbn)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="rounded-xl border-2 border-white/40 px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:border-white hover:scale-105"
            >
              Buy on Bookshop.org
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
