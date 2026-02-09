import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--background) 85%, transparent)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-xl transition-transform group-hover:scale-110 group-hover:rotate-12">
            🌶️
          </span>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--primary)" }}
          >
            SpicyBooks
          </span>
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/tropes"
            className="relative py-1 transition-colors hover:opacity-100"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="hover-underline">Tropes</span>
          </Link>
          <Link
            href="/spice"
            className="relative py-1 transition-colors hover:opacity-100"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="hover-underline">Spice Levels</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
