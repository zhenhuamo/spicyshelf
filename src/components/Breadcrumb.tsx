import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 text-sm"
      style={{ color: "var(--text-muted)" }}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true" style={{ color: "var(--border)", fontSize: "10px" }}>
              ▸
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "var(--text-primary)" }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
