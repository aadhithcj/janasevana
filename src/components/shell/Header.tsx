import Link from 'next/link';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { ActionLink } from '@/components/ui/Action';
import { LogoLockup } from './Logo';
import { LangToggle } from './LangToggle';
import { NavLinks } from './NavLinks';
import { MenuTrigger } from './Menu';
import s from './Header.module.css';

/** Real logo, a calm text nav, the language toggle (visible on phones) and one primary action. */
export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale).shell;
  return (
    <header className={s.header}>
      <div className={`wrap ${s.bar}`}>
        <Link href={href(locale, 'home')} className={s.home} aria-label={t.homeLink}>
          <LogoLockup />
        </Link>
        <nav className={s.nav} aria-label={t.navLabel}>
          <NavLinks locale={locale} labels={t.nav} className={s.navList} linkClassName={s.navLink} />
        </nav>
        <div className={s.end}>
          <LangToggle locale={locale} label={t.language} />
          <ActionLink href={href(locale, 'homeCollection', 'book')} className={s.book}>
            {t.book}
          </ActionLink>
          <MenuTrigger label={t.menu} className={s.menuTrigger} />
        </div>
      </div>
    </header>
  );
}
