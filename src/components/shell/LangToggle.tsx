'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/paths';
import s from './Header.module.css';

function equivalent(path: string, target: Locale): string {
  const bare = path.replace(/^\/ml(?=\/|$)/, '') || '/';
  const withSlash = bare.endsWith('/') ? bare : `${bare}/`;
  return target === 'ml' ? `/ml${withSlash}` : withSlash;
}

/**
 * Two real links to the same page in each language. Each label is written
 * in its own script and carries its own lang. The choice is remembered by
 * the head script (data-set-lang), so a returning visitor lands in it.
 */
export function LangToggle({ locale, label }: { locale: Locale; label: string }) {
  const path = usePathname() || '/';
  return (
    <nav className={s.toggle} aria-label={label}>
      <a
        href={equivalent(path, 'en')}
        lang="en"
        hrefLang="en"
        data-set-lang="en"
        aria-current={locale === 'en' ? 'true' : undefined}
        className={s.seg}
      >
        EN
      </a>
      <a
        href={equivalent(path, 'ml')}
        lang="ml"
        hrefLang="ml"
        data-set-lang="ml"
        aria-current={locale === 'ml' ? 'true' : undefined}
        className={`${s.seg} ${s.segMl}`}
      >
        മലയാളം
      </a>
    </nav>
  );
}
