import Link from 'next/link';
import s from './ArrowButton.module.css';

type Variant = 'ink' | 'tint' | 'whatsapp';

const variantClass: Record<Variant, string | undefined> = {
  ink: undefined,
  tint: s.tint,
  whatsapp: s.whatsapp,
};

/**
 * A pill whose arrow circle slides in on hover or keyboard focus. Touch
 * screens show the circle at rest. CSS only; a real link, never a div.
 */
export function ArrowButton({
  href,
  variant = 'ink',
  size = 'md',
  external,
  className,
  children,
  ...anchor
}: {
  href: string;
  variant?: Variant;
  size?: 'md' | 'lg';
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>) {
  const cls = [s.button, variantClass[variant], size === 'lg' && s.lg, className].filter(Boolean).join(' ');
  const content = (
    <>
      <span className={s.inner}>{children}</span>
      <span className={s.circle} aria-hidden="true">
        <span>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </span>
    </>
  );
  if (external || /^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...anchor}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...anchor}>
      {content}
    </Link>
  );
}
