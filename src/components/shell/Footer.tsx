import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Confirmed } from '@/components/ui/Unconfirmed';
import { LogoMark, LogoName } from './Logo';
import { NavLinks } from './NavLinks';
import s from './Footer.module.css';

/**
 * The close: a deep teal card inset like the opening field. The lab's promise
 * with Call and WhatsApp, then the mark and tagline, the pages, every way to
 * reach the lab and the quality facts, over a large quiet wordmark.
 */
export function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const a = site.address[locale];
  const landline = site.phones[0];
  return (
    <footer className={s.footer}>
      <div className={s.card}>
        <div className={`wrap ${s.inner}`}>
          <div className={s.top}>
            <p className={s.promise}>{d.hero.promise}</p>
            <div className={s.actions}>
              <ArrowButton href={telHref(landline.tel)} variant="tint">
                <span className="num">{d.common.callNumber(landline.display)}</span>
              </ArrowButton>
              <ArrowButton href={whatsappUrl(generalMessage(locale))} variant="whatsapp" external>
                {d.home.whatsappCta}
              </ArrowButton>
            </div>
          </div>

          <div className={s.cols}>
            <div className={s.brand}>
              <span className={s.lockup}>
                <span className={s.markDisc}>
                  <LogoMark className={s.mark} />
                </span>
                <LogoName onDark />
              </span>
              <p className={s.tagline} lang="en">
                {site.lines.logoTagline}
              </p>
            </div>

            <nav id="footer-nav" aria-labelledby="footer-nav-title" tabIndex={-1} className={s.col}>
              <h2 id="footer-nav-title" className={s.colTitle}>
                {d.footer.navTitle}
              </h2>
              <NavLinks locale={locale} labels={d.shell.nav} includeHome className={s.list} />
            </nav>

            <div className={s.col}>
              <h2 className={s.colTitle}>{d.footer.contactTitle}</h2>
              <address className={s.address}>
                {a.building}, {a.locality}
                <br />
                {a.city}, {a.region}
              </address>
              <ul role="list" className={s.list}>
                {site.phones.map((p) => (
                  <li key={p.id}>
                    <a href={telHref(p.tel)} className="num">
                      {p.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className={s.email}>
                    {site.email.toLowerCase()}
                  </a>
                </li>
              </ul>
            </div>

            <div className={s.col}>
              <h2 className={s.colTitle}>{d.home.teamQuality}</h2>
              <p>{d.common.iso}</p>
              <p className={s.hours}>
                <span className={s.hoursLabel}>{d.common.hours}</span>{' '}
                <Confirmed fact={site.hours} locale={locale}>
                  {(v) => v[locale]}
                </Confirmed>
              </p>
            </div>
          </div>

          <div className={s.base}>
            <p lang="en" className={s.quality}>
              {site.lines.footerQuality}
            </p>
            <p>{d.footer.copyright(2026)}</p>
          </div>
        </div>
        {/* Drawn as generated content: purely decorative, so it is neither read nor checked as text. */}
        <div className={s.wordmark} aria-hidden="true" data-word="Janasevana" />
      </div>
    </footer>
  );
}
