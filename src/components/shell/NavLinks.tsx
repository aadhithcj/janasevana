'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { href, type Locale, type PageId } from '@/lib/paths';

const order: PageId[] = ['packages', 'tests', 'homeCollection', 'about', 'contact'];

export function NavLinks({
  locale,
  labels,
  className,
  linkClassName,
  includeHome,
  onNavigate,
}: {
  locale: Locale;
  labels: Record<PageId, string>;
  className?: string;
  linkClassName?: string;
  includeHome?: boolean;
  onNavigate?: () => void;
}) {
  const path = usePathname() || '/';
  const norm = path.endsWith('/') ? path : `${path}/`;
  const ids: PageId[] = includeHome ? ['home', ...order] : order;
  return (
    <ul role="list" className={className}>
      {ids.map((id) => {
        const target = href(locale, id);
        return (
          <li key={id}>
            <Link
              href={target}
              className={linkClassName}
              aria-current={norm === target ? 'page' : undefined}
              onClick={onNavigate}
            >
              {labels[id]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
