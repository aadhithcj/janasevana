import Link from 'next/link';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { LogoMark, LogoName } from './Logo';
import { LangToggle } from './LangToggle';
import { SiteNav } from './SiteNav';
import { RequestLink } from './RequestLink';
import { MenuTrigger } from './Menu';
import s from './Header.module.css';

/**
 * At the top of a page: a full-width bar on paper, above the page's rounded
 * opening field. The mark and the links at the left, the lab's name centred,
 * the language toggle, "Your request" (only with a selection) and Contact at
 * the right. Once the page scrolls, the bar draws together into one centred
 * pill of deep-teal glass (html.scrolled, set by the head script).
 */
export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale).shell;
  const home = href(locale, 'home');
  return (
    <header className={s.header}>
      <div className={s.bar}>
        <div className={s.start}>
          {/* A second way home for the pointer; the centred name is the link keyboards and screen readers use. */}
          <Link href={home} className={s.markLink} tabIndex={-1} aria-hidden="true">
            <LogoMark className={s.mark} />
          </Link>
          <div className={s.nav}>
            <SiteNav locale={locale} labels={t.nav} ariaLabel={t.navLabel} />
          </div>
        </div>
        {/* The visible name leads the link's name (WCAG 2.5.3); "home page" is spoken after it. */}
        <Link href={home} className={s.home}>
          <LogoName />
          <span className="visually-hidden">{t.homeSuffix}</span>
        </Link>
        <div className={s.end}>
          <LangToggle locale={locale} label={t.language} />
          <RequestLink locale={locale} />
          <ArrowButton href={href(locale, 'contact')} className={s.contact}>
            {t.nav.contact}
          </ArrowButton>
          <MenuTrigger label={t.menu} className={s.menuTrigger} />
        </div>
      </div>
    </header>
  );
}
