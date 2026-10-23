/**
 * The one curve on each page: the coloured field closes with a sweep taken
 * from the lab's letterhead, and a thin logo-teal line follows it like the
 * lower ring of the logo. Drawn once, purely as the field's edge.
 */
export function Arc({ className, fill = 'var(--field)' }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 0H1440V22C1180 128 760 150 0 92Z" fill={fill} />
      <path
        d="M0 118C700 172 1150 150 1440 50"
        fill="none"
        stroke="var(--teal-500)"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
