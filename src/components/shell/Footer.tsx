import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { LogoFull } from './Logo';
import { NavLinks } from './NavLinks';
import s from './Footer.module.css';

/** Quiet close: the full logo, address, one phone line, the pages, and the lab's quality line once. */
export function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const a = site.address[locale];
  const landline = site.phones[0];
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.brand}>
          <LogoFull className={s.logo} />
          <address className={s.address}>
            {a.building}, {a.locality}, {a.city}, {a.region}
            <br />
            <a href={telHref(landline.tel)} className="num">
              {landline.display}
            </a>
            {' · '}
            <a href={`mailto:${site.email}`} className={s.email}>
              {site.email.toLowerCase()}
            </a>
          </address>
        </div>

        <nav id="footer-nav" aria-labelledby="footer-nav-title" tabIndex={-1}>
          <h2 id="footer-nav-title" className="visually-hidden">
            {d.footer.navTitle}
          </h2>
          <NavLinks locale={locale} labels={d.shell.nav} includeHome className={s.list} />
        </nav>
      </div>

      <div className={`wrap ${s.base}`}>
        <p>{d.common.iso}</p>
        <p lang="en" className={s.quality}>
          {site.lines.footerQuality}
        </p>
        <p>{d.footer.copyright(2026)}</p>
      </div>
    </footer>
  );
}
