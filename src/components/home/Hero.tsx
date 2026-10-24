import Link from 'next/link';
import { cardioPackage, formatInr, royalPackage, type HealthPackage } from '@config/packages';
import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { ActionLink } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import s from './Hero.module.css';

/**
 * Typographic hero: the lab's own line set very large, the place and the
 * free collection in one quiet line, Call and WhatsApp, and the current
 * offer set like a column of the lab's report. No photos.
 */
export function Hero({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const landline = site.phones[0];
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`wrap ${s.grid}`}>
        <p className={s.meta} data-load style={{ '--i': 0 } as React.CSSProperties}>
          <Icon name="pin" />
          <span>{d.hero.meta}</span>
        </p>
        <div className={s.left}>
        <h1 id="hero-title" className={s.promise} data-load style={{ '--i': 1 } as React.CSSProperties}>
          {d.hero.promise}
        </h1>
        <div className={s.lead} data-load style={{ '--i': 2 } as React.CSSProperties}>
          <p className={s.sub}>{d.hero.sub}</p>
          <div className={s.actions}>
            <ActionLink href={telHref(landline.tel)} size="lg" icon="phone" className={s.call}>
              <span className={s.callLabel}>{d.shell.call}</span> <span className={`${s.callNum} num`}>{landline.display}</span>
            </ActionLink>
            <ActionLink href={whatsappUrl(generalMessage(locale))} variant="whatsapp" size="lg" icon="chat" external>
              {d.home.whatsappCta}
            </ActionLink>
          </div>
        </div>
        </div>
        <div className={s.offerCol} data-load style={{ '--i': 3 } as React.CSSProperties}>
          <div data-when-offer="live upcoming">
            <Offer pkg={cardioPackage} locale={locale} />
          </div>
          <div data-when-offer="ended">
            <Offer pkg={royalPackage} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const id = `hero-offer-${pkg.id}`;
  return (
    <article className={`${s.offer} ${pkg.id === 'royal' ? s.royal : ''}`} aria-labelledby={id}>
      <p className={s.tag}>{pkg.label[locale]}</p>
      <h2 id={id} className={s.offerName}>
        {pkg.name[locale]}
      </h2>
      <p className={`${s.price} num`}>{formatInr(pkg.priceInr)}</p>
      <p className={s.offerTests}>{d.hero.offerTests(pkg.tests.length)}</p>
      {pkg.window && (
        <p className={s.period}>
          {d.common.validity(formatDate(pkg.window.startDate, locale), formatDate(pkg.window.endDate, locale))}. {d.hero.callToConfirm}
        </p>
      )}
      {pkg.notice && (
        <p className={s.notice}>
          <Icon name="info" />
          <span>{pkg.notice[locale]}</span>
        </p>
      )}
      <Link href={href(locale, 'packages', pkg.id)} className={s.seePackage}>
        {d.hero.seePackage}
      </Link>
    </article>
  );
}
