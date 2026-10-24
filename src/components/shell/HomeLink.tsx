'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** The lab's name in the header: on the home page it glides back to the top; elsewhere it goes home. */
export function HomeLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const path = usePathname() || '/';
  const here = (path.endsWith('/') ? path : `${path}/`) === href;
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (!here) return;
        e.preventDefault();
        history.replaceState(null, '', href);
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
    >
      {children}
    </Link>
  );
}
