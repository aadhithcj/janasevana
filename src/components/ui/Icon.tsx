/**
 * Authored icon set: 24px box, 1.75px round stroke. Decorative by default;
 * every icon sits next to visible text.
 */
export type IconName =
  | 'phone'
  | 'chat'
  | 'pin'
  | 'mail'
  | 'clock'
  | 'plus'
  | 'check'
  | 'close'
  | 'chevron'
  | 'copy'
  | 'info'
  | 'out'
  | 'search'
  | 'menu'
  | 'arrow'
  | 'alert'
  | 'print'
  | 'note';

const paths: Record<IconName, React.ReactNode> = {
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4.1-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4.1 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  chat: (
    <>
      <path d="M4.2 19.8l1.2-3.6A8 8 0 1 1 8.6 19l-4.4.8Z" />
      <path d="M9.3 8.6c.1 2.7 2.4 5.1 5.3 5.6l.9-1.3-1.6-.8-.7.6c-.9-.4-1.6-1.1-2-2l.6-.7-.8-1.6-1.7.2Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" />
      <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.6v.1" />
    </>
  ),
  out: (
    <>
      <path d="M13.5 4.5h6v6M19.5 4.5l-8 8" />
      <path d="M17.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V8A1.5 1.5 0 0 1 6 6.5h4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  alert: (
    <>
      <path d="M12 4 2.8 19.5h18.4L12 4Z" />
      <path d="M12 10v4.5M12 17.2v.1" />
    </>
  ),
  note: (
    <>
      <path d="M6.5 3.5h8l3 3v14h-11z" />
      <path d="M9 10h6M9 13.5h6M9 17h3.5" />
    </>
  ),
  print: (
    <>
      <path d="M7 9V4.5h10V9" />
      <rect x="4" y="9" width="16" height="7.5" rx="1.5" />
      <path d="M7 14h10v5.5H7z" />
    </>
  ),
};

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
