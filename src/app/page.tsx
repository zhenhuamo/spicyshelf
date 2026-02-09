import Link from "next/link";
import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import { getFeaturedBooks, getAllTropes } from "@/lib/books";
import { SPICE_LABELS } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Spicy Books — Find Romance Book Spice Levels, Tropes & Content Warnings",
  description:
    "How spicy is your next read? Browse spicy books rated on a 0-5 spice scale. Find romance and romantasy spice levels, tropes like enemies to lovers, and content warnings before you dive in.",
  openGraph: {
    title: "Spicy Books — How Spicy Is Your Next Read?",
    description:
      "Browse spicy books rated on a 0-5 spice scale. Find romance spice levels, tropes, and content warnings before you dive in.",
    url: "https://spicybooks.org",
    siteName: "SpicyBooks",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpicyBooks — Romance Book Spice Levels & Tropes",
    description:
      "Find the spice level, tropes, and content warnings for any romance book. Your go-to spicy books guide.",
  },
  alternates: {
    canonical: "https://spicybooks.org",
  },
};

export default async function Home() {
  const featured = await getFeaturedBooks();
  const tropes = await getAllTropes();

  // JSON-LD: WebSite schema (enables sitelinks search box in Google)
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SpicyBooks",
    url: "https://spicybooks.org",
    description:
      "SpicyBooks rates every romance and romantasy book on a 0-5 spice scale with tropes and content warnings.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://spicybooks.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // JSON-LD: Organization schema
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SpicyBooks",
    url: "https://spicybooks.org",
    logo: "https://spicybooks.org/logo.png",
    description:
      "SpicyBooks helps romance and romantasy readers find spice levels, tropes, and content warnings for any book.",
  };

  // JSON-LD: CollectionPage for featured books
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Trending Spicy Books — Romance Spice Levels & Tropes",
    description:
      "Browse trending spicy romance and romantasy books with spice level ratings, trope tags, and content warnings.",
    url: "https://spicybooks.org",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: featured.length,
      itemListElement: featured.map((book, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://spicybooks.org/books/${book.slug}`,
        name: book.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <section className="mb-20 text-center animate-fade-in-up">
          <p
            className="mb-4 text-sm font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            Your Spicy Books Guide
          </p>
          <h1
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            How Spicy Is
            <br />
            <span className="text-gradient">Your Next Read?</span>
          </h1>
          <p
            className="mx-auto max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            SpicyBooks rates every romance and romantasy book on a 0-5 spice
            scale. Find spice levels, tropes, and content warnings — before you
            dive in. From clean reads to scorching hot spicy books, we&apos;ve got
            you covered.
          </p>
          <div
            className="mx-auto mt-8 h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary-muted), transparent)" }}
          />
        </section>

        {/* Featured / Trending Books */}
        <section className="mb-20">
          <div className="mb-8 flex items-baseline justify-between">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              Trending Spicy Books
            </h2>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--primary)" }}
            >
              Curated picks
            </span>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 stagger-children">
            {featured.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>

        {/* Browse by Trope */}
        <section className="mb-20">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              Browse Spicy Books by Trope
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Find your next spicy read by your favorite romantic dynamics — from enemies to lovers to slow burn and beyond.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 stagger-children">
            {tropes.map((trope) => (
              <Link
                key={trope.slug}
                href={`/tropes/${trope.slug}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{
                  background: "var(--primary-bg)",
                  color: "var(--primary)",
                }}
              >
                <span>{trope.emoji}</span> {trope.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/tropes" style={{ color: "var(--primary)" }}>
              View all {tropes.length} romance tropes →
            </Link>
          </p>
        </section>

        {/* Browse by Spice Level */}
        <section className="mb-20">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              Browse Spicy Books by Spice Level
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Every book is rated on our 0-5 spice scale. Find the perfect heat level for your comfort zone.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {Object.entries(SPICE_LABELS).map(([level, info]) => (
              <Link
                key={level}
                href={`/spice/${level}`}
                className="group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-light)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  {Array.from({ length: Number(level) }, () => "🌶️").join("") || "🧊"}
                </span>
                <div>
                  <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                    Level {level} — {info.label}
                  </p>
                  <p className="mt-0.5 text-sm" style={{ color: "var(--text-muted)" }}>
                    {info.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mb-12 space-y-8">
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--surface-warm)" }}
          >
            <h2
              className="mb-4 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              What Is SpicyBooks?
            </h2>
            <div
              className="space-y-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                SpicyBooks is the ultimate resource for romance and romantasy readers who want to
                know exactly how spicy a book is before they start reading. We rate every romance
                book on a 0-5 spice scale — from clean reads with absolutely no intimate content
                to scorching hot spicy books with very explicit scenes. Whether you picked up a
                recommendation from BookTok, saw a title trending on Instagram Bookstagram, or
                heard about a new release on Reddit&apos;s r/RomanceBooks community, SpicyBooks gives
                you the full picture before you commit to your next read.
              </p>
              <p>
                Beyond spice levels, we tag every book with its romance tropes (like{" "}
                <Link href="/tropes/enemies-to-lovers" style={{ color: "var(--primary)" }}>enemies to lovers</Link>,{" "}
                <Link href="/tropes/slow-burn" style={{ color: "var(--primary)" }}>slow burn</Link>,{" "}
                <Link href="/tropes/forced-proximity" style={{ color: "var(--primary)" }}>forced proximity</Link>,{" "}
                <Link href="/tropes/fake-dating" style={{ color: "var(--primary)" }}>fake dating</Link>,{" "}
                <Link href="/tropes/grumpy-sunshine" style={{ color: "var(--primary)" }}>grumpy/sunshine</Link>, and{" "}
                <Link href="/tropes/dark-romance" style={{ color: "var(--primary)" }}>dark romance</Link>),
                list content warnings for readers with specific sensitivities, and provide detailed
                breakdowns of what to expect in every book. Whether you&apos;re a BookTok enthusiast
                looking for your next spicy books obsession or a careful reader who wants to avoid
                certain triggers, SpicyBooks has you covered.
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--surface-warm)" }}
          >
            <h2
              className="mb-4 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              How Our Spicy Books Rating System Works
            </h2>
            <div
              className="space-y-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                Our spice level rating system is designed to be simple, consistent, and genuinely
                useful. Every romance book on SpicyBooks receives a spicy books rating from 0 to 5 on our
                spice scale, so you always know what level of heat to expect before you start
                reading. Here&apos;s how our spicy books scale breaks down:
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Level 0 — No Spice (Clean):</strong>{" "}
                These are clean romance books with no intimate or sexual content whatsoever. Perfect
                for readers who enjoy the emotional journey of a love story without any physical
                scenes. Think sweet Hallmark-style romances.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Level 1 — Mild (Fade to Black):</strong>{" "}
                The romance is present and the chemistry is real, but any intimate moments happen
                off-page. The author &quot;fades to black&quot; before things get explicit. Great for readers
                who want a hint of romance without the details.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Level 2 — Warm (Closed Door+):</strong>{" "}
                There are suggestive scenes and clear romantic tension, but the author doesn&apos;t go
                into graphic detail. You know what&apos;s happening, but it&apos;s more implied than described.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Level 3 — Spicy (Moderate Scenes):</strong>{" "}
                Now we&apos;re getting into spicy books territory. These books have clear, on-page intimate
                scenes with moderate detail. The spice is part of the story but doesn&apos;t dominate it.
                This is where many popular BookTok romance novels land.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Level 4 — Very Spicy (Explicit):</strong>{" "}
                Detailed intimate scenes that are a significant part of the reading experience. If
                you&apos;re searching for &quot;spicy books&quot; or &quot;spicy romance books,&quot; this is likely what
                you&apos;re looking for. Authors like{" "}
                <Link href="/tropes/dark-romance" style={{ color: "var(--primary)" }}>dark romance</Link>{" "}
                writers often fall into this category.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Level 5 — Scorching (Very Explicit):</strong>{" "}
                The highest level on our spicy books scale. These books feature very detailed, frequent
                intimate scenes throughout the story. Not for the faint of heart — but exactly what
                some spicy books readers are looking for.
              </p>
              <p>
                Browse all spicy books by their heat level on our{" "}
                <Link href="/spice" style={{ color: "var(--primary)" }}>spice level guide</Link> page.
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--surface-warm)" }}
          >
            <h2
              className="mb-4 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              Popular Spicy Books Tropes Explained
            </h2>
            <div
              className="space-y-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                Romance tropes are the recurring themes, dynamics, and plot devices that define
                the flavor of a love story. Many spicy books readers actively seek out books based on their
                favorite tropes — and SpicyBooks makes it easy to find exactly what you&apos;re
                craving. Here are some of the most popular spicy books tropes you&apos;ll find on our site:
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Enemies to Lovers</strong> is one
                of the most beloved tropes in romance fiction. Two characters who start out hating
                each other gradually develop feelings, creating incredible tension and satisfying
                payoff. Find all{" "}
                <Link href="/tropes/enemies-to-lovers" style={{ color: "var(--primary)" }}>enemies to lovers books</Link>{" "}
                in our collection.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Forced Proximity</strong> puts two
                characters in a situation where they can&apos;t avoid each other — whether it&apos;s a
                snowed-in cabin, a shared apartment, or a work assignment. The close quarters
                force them to confront their feelings. Browse{" "}
                <Link href="/tropes/forced-proximity" style={{ color: "var(--primary)" }}>forced proximity romance books</Link>.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Slow Burn</strong> romances take
                their time building the relationship. The tension simmers for chapters (sometimes
                the entire book) before anything happens, making the eventual payoff incredibly
                rewarding. Perfect for readers who love the anticipation. See all{" "}
                <Link href="/tropes/slow-burn" style={{ color: "var(--primary)" }}>slow burn romance books</Link>.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Fake Dating</strong> is a fan
                favorite where two characters pretend to be in a relationship — for a family event,
                to make an ex jealous, or for some other reason — and inevitably catch real feelings.
                Explore{" "}
                <Link href="/tropes/fake-dating" style={{ color: "var(--primary)" }}>fake dating books</Link>.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Romantasy</strong> (romance +
                fantasy) has exploded in popularity thanks to authors like Sarah J. Maas and Rebecca
                Yarros. These books combine epic fantasy worldbuilding with steamy romance, and
                they&apos;re dominating BookTok and bestseller lists. Discover{" "}
                <Link href="/tropes/romantasy" style={{ color: "var(--primary)" }}>romantasy books with spice ratings</Link>.
              </p>
              <p>
                We tag every book with all applicable tropes so you can find your perfect match.
                Visit our full{" "}
                <Link href="/tropes" style={{ color: "var(--primary)" }}>romance tropes directory</Link>{" "}
                to explore all {tropes.length} tropes.
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--surface-warm)" }}
          >
            <h2
              className="mb-4 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              Why Content Warnings Matter for Spicy Books
            </h2>
            <div
              className="space-y-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                Content warnings (also called trigger warnings) are an essential part of the
                reading experience for many romance readers. Some books contain themes like
                violence, abuse, addiction, grief, or other sensitive topics that can be
                distressing for certain readers. At SpicyBooks, we believe every reader deserves
                to make an informed choice about what they read.
              </p>
              <p>
                Every book page on SpicyBooks includes a comprehensive list of content warnings
                so you can decide whether a book is right for you before you start reading. We
                cover everything from mild triggers (like mild language or alcohol use) to more
                serious content (like depictions of trauma or graphic violence). Our goal is not
                to censor or judge — it&apos;s simply to give you the information you need to read
                comfortably and safely.
              </p>
              <p>
                If content warnings are important to you, SpicyBooks is the perfect tool. Every
                book in our database includes detailed warnings alongside its spice level and
                trope tags, giving you a complete picture before you commit to your next romance
                read.
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--surface-warm)" }}
          >
            <h2
              className="mb-4 text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
            >
              Find Your Next Spicy Books Read
            </h2>
            <div
              className="space-y-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                Not sure where to start? SpicyBooks offers multiple ways to discover your next
                favorite spicy books read. You can browse by{" "}
                <Link href="/spice" style={{ color: "var(--primary)" }}>spice level</Link> if you
                know exactly how much heat you want, explore books by{" "}
                <Link href="/tropes" style={{ color: "var(--primary)" }}>trope</Link> if you&apos;re
                chasing a specific vibe, or check out our trending section above to see what the
                romance community is reading right now.
              </p>
              <p>
                Every book page on SpicyBooks includes a detailed spice breakdown, a full list of
                tropes, content warnings, reader reviews, an editorial take, and recommendations
                for similar books. We also answer common questions like &quot;Is [book] spicy?&quot; and
                &quot;What is the spice level of [book]?&quot; directly on each page — so whether you found
                us through Google, BookTok, or a friend&apos;s recommendation, you&apos;ll get the answer
                you&apos;re looking for instantly.
              </p>
              <p>
                SpicyBooks is built by romance readers, for romance readers. We&apos;re constantly
                adding new books, updating our ratings, and expanding our trope and content warning
                databases. If there&apos;s a book you want to see on SpicyBooks, let us know — we&apos;re
                always growing our collection to serve the romance reading community better.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
