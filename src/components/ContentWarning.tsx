export default function ContentWarning({ warnings }: { warnings: string[] }) {
  if (!warnings.length) return null;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "var(--accent-bg)",
        border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
      }}
    >
      <h3
        className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase"
        style={{ color: "var(--accent)" }}
      >
        <span>⚠️</span> Content Warnings
      </h3>
      <ul className="flex flex-wrap gap-2">
        {warnings.map((w) => (
          <li
            key={w}
            className="rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{
              background: "color-mix(in srgb, var(--accent) 12%, transparent)",
              color: "var(--accent)",
            }}
          >
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
