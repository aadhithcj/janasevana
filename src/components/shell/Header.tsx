import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { LangToggle } from './LangToggle';
import { SiteNav } from './SiteNav';
import { RequestLink } from './RequestLink';
import { MenuTrigger } from './Menu';
import s from './Header.module.css';

/**
 * A floating header over each page's mist field: the circular mark and the
 * PillNav capsule at the left; the language toggle, "Your request" (only
 * with a selection) and the Contact arrow button at the right.
 */
export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale).shell;
  return (
    <header className={s.header}>
      <div className={s.bar}>
        <div className={s.nav}>
          <SiteNav locale={locale} labels={t.nav} ariaLabel={t.navLabel} homeLabel={t.homeLink} />
        </div>
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
