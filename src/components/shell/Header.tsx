import Link from 'next/link';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { ActionLink } from '@/components/ui/Action';
import { LogoLockup } from './Logo';
import { LangToggle } from './LangToggle';
import { SiteNav } from './SiteNav';
import { MenuTrigger } from './Menu';
import s from './Header.module.css';

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale).shell;
  return (
    <header className={s.header}>
      <div className={`wrap ${s.bar}`}>
        <Link href={href(locale, 'home')} className={s.home} aria-label={t.homeLink}>
          <LogoLockup />
        </Link>
        <div className={s.nav}>
          <SiteNav locale={locale} labels={t.nav} ariaLabel={t.navLabel} />
        </div>
        <div className={s.end}>
          <LangToggle locale={locale} label={t.language} />
          <ActionLink href={href(locale, 'homeCollection', 'book')} className={s.book}>
            {t.bookShort}
          </ActionLink>
          <MenuTrigger label={t.menu} className={s.menuTrigger} />
        </div>
      </div>
    </header>
  );
}
