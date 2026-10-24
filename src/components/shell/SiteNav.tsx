'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { href, type Locale, type PageId } from '@/lib/paths';
import PillNav from './PillNav/PillNav';

// No Home or Contact item: the logo links home and the Contact arrow button sits beside the capsule.
const order: PageId[] = ['packages', 'tests', 'homeCollection', 'about'];

/**
 * React Bits PillNav with the requested settings (plain items, fill hover,
 * pill indicator, bounce 0.24, stretch 0.32). No logo is passed in: the
 * header sets the full lab logo in its own box beside the capsule. Solid
 * surface (no glass), 48px targets. On narrow screens the header hides the
 * link capsule and shows the site menu instead.
 */
export function SiteNav({
  locale,
  labels,
  ariaLabel,
}: {
  locale: Locale;
  labels: Record<PageId, string>;
  ariaLabel: string;
}) {
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
      barColor="#ffffff"
      textColor="#1e1f22"
      highlightColor="#03494c"
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
        '--pn-mark': '40px',
        '--pn-edge': 'transparent',
      }}
    />
  );
}
