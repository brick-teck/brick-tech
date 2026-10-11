export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="m7 11 13-6 13 6v9l-13 6-13-6zm0 14 13 6 13-6v8l-13 6-13-6"
          fill="currentColor"
        />
        <path d="m7 11 13 6 13-6M20 17v9" stroke="#0B1220" strokeWidth="2" />
      </svg>
      {!compact && (
        <span>
          Brick<span className="brand-light">Tech</span>
          <span className="brand-dot">.</span>
        </span>
      )}
    </span>
  );
}
