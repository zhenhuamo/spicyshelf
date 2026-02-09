import Link from "next/link";
import type { Trope } from "@/lib/types";

export default function TropeTag({ trope }: { trope: Trope }) {
  return (
    <Link
      href={`/tropes/${trope.slug}`}
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
      style={{
        background: "var(--primary-bg)",
        color: "var(--primary)",
        border: "1px solid transparent",
      }}
    >
      <span>{trope.emoji}</span>
      <span>{trope.name}</span>
    </Link>
  );
}
