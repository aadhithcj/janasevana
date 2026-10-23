import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { RequestButton } from '@/components/request/RequestButton';
import { LangToggle } from './LangToggle';
import { SiteNav } from './SiteNav';
import { MenuTrigger } from './Menu';
import s from './Header.module.css';

/** A floating group, 12px from the top: logo bubble and PillNav, then the language and request pills. */
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
          <RequestButton locale={locale} fallbackHref={href(locale, 'homeCollection', 'book')} />
          <MenuTrigger label={t.menu} className={s.menuTrigger} />
        </div>
      </div>
    </header>
  );
}
