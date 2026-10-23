'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { href, type Locale, type PageId } from '@/lib/paths';
import PillNav from './PillNav/PillNav';

const order: PageId[] = ['home', 'packages', 'tests', 'homeCollection', 'about', 'contact'];

/**
 * Desktop navigation: React Bits PillNav with the requested settings
 * (plain items, fill hover, pill indicator, bounce 0.24, stretch 0.32),
 * tuned to the lab's palette, a solid surface (no glass) and 48px targets.
 * The logo stays in the header lockup beside it, so the name is always shown.
 */
export function SiteNav({ locale, labels, ariaLabel }: { locale: Locale; labels: Record<PageId, string>; ariaLabel: string }) {
  const path = usePathname() || '/';
  const current = path.endsWith('/') ? path : `${path}/`;
  const items = order.map((id) => ({ label: labels[id], href: href(locale, id) }));
  return (
    <PillNav
      items={items}
      activeHref={current}
      linkComponent={Link}
      itemStyle="plain"
      hoverEffect="fill"
      indicator="pill"
      bounce={0.24}
      stretch={0.32}
      theme="light"
      surface="solid"
      barColor="#eef5f4"
      textColor="#1e1f22"
      highlightColor="#056a6d"
      collapse="never"
      intro={false}
      ariaLabel={ariaLabel}
      className="site-pill-nav"
      style={{
        '--pn-h': '56px',
        '--pn-pad': '4px',
        '--pn-inner': '48px',
        '--pn-x': '15px',
        '--pn-font': '16px',
        '--pn-shadow': 'none',
        '--pn-ring': '#017b7f',
      }}
    />
  );
}
