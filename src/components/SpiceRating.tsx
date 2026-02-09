import { SPICE_LABELS } from "@/lib/types";

export default function SpiceRating({
  level,
  size = "md",
}: {
  level: number;
  size?: "sm" | "md" | "lg";
}) {
  const info = SPICE_LABELS[level];
  const peppers = Array.from({ length: 5 }, (_, i) => i < level);

  const sizeClasses = {
    sm: "text-sm gap-0.5",
    md: "text-lg gap-1",
    lg: "text-2xl gap-1.5",
  };

  return (
    <div
      className={`flex items-center gap-2`}
      aria-label={`Spice level ${level} out of 5: ${info?.label}`}
    >
      <span className={`flex ${sizeClasses[size]}`}>
        {peppers.map((active, i) => (
          <span
            key={i}
            className={`transition-all duration-300 ${active ? "drop-shadow-sm" : "opacity-20 grayscale"}`}
            style={active ? { filter: "drop-shadow(0 1px 2px rgba(139, 34, 82, 0.3))" } : undefined}
          >
            🌶️
          </span>
        ))}
      </span>
      {size !== "sm" && info && (
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {level}/5 — {info.label}
        </span>
      )}
    </div>
  );
}
