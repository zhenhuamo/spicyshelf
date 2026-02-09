import type { Review } from "@/lib/types";

const SOURCE_STYLES: Record<string, { bg: string; text: string }> = {
  Reddit: { bg: "rgba(255, 87, 34, 0.1)", text: "#e64a19" },
  BookTok: { bg: "rgba(139, 34, 82, 0.1)", text: "var(--primary)" },
  Bookstagram: { bg: "rgba(196, 133, 108, 0.1)", text: "var(--accent)" },
  StoryGraph: { bg: "rgba(0, 150, 136, 0.1)", text: "#00897b" },
  SpicyBooks: { bg: "var(--primary-bg)", text: "var(--primary)" },
};

export default function ReviewCard({ review }: { review: Review }) {
  const peppers = Array.from({ length: 5 }, (_, i) => i < review.spiceRating);
  const style = SOURCE_STYLES[review.source] ?? {
    bg: "var(--surface-warm)",
    text: "var(--text-secondary)",
  };

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-light)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, var(--spice-from), var(--spice-to))",
            }}
          >
            {review.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {review.username}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {review.date}
            </p>
          </div>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ background: style.bg, color: style.text }}
        >
          {review.source}
        </span>
      </div>

      <div
        className="mb-3 flex items-center gap-1"
        aria-label={`User rated spice ${review.spiceRating} out of 5`}
      >
        {peppers.map((active, i) => (
          <span key={i} className={`text-sm ${active ? "" : "opacity-20 grayscale"}`}>
            🌶️
          </span>
        ))}
        <span className="ml-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
          {review.spiceRating}/5
        </span>
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}
