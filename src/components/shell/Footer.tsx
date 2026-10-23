import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { LogoFull } from './Logo';
import { NavLinks } from './NavLinks';
import s from './Footer.module.css';

export function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const a = site.address[locale];
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.brand}>
          <LogoFull className={s.logo} />
          <address className={s.address}>
            {a.building}, {a.locality}
            <br />
            {a.city}, {a.region}
          </address>
        </div>

        <div>
          <h2 className={s.heading}>{d.footer.contactTitle}</h2>
          <ul role="list" className={s.list}>
            {site.phones.map((p) => (
              <li key={p.id}>
                <a href={telHref(p.tel)} className="num">
                  {p.display}
                </a>
                <span className={s.meta}>
                  {p.id === 'landline' ? d.common.landline : p.whatsapp ? d.common.whatsappAndCall : d.common.mobile}
                </span>
              </li>
            ))}
            <li>
              <a href={whatsappUrl(generalMessage(locale))} target="_blank" rel="noopener">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={s.email}>
                {site.email.toLowerCase()}
              </a>
            </li>
          </ul>
        </div>

        <nav id="footer-nav" aria-labelledby="footer-nav-title" tabIndex={-1}>
          <h2 id="footer-nav-title" className={s.heading}>
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
