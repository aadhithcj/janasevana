import Link from 'next/link';
import { cardioPackage, formatInr, royalPackage, type HealthPackage } from '@config/packages';
import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Icon } from '@/components/ui/Icon';
import { Helix } from './helix/Helix';
import s from './Hero.module.css';

/**
 * The mist field: the lab's own line set large and light, Call and WhatsApp,
 * and the current offer on an opaque paper slip that overhangs the field's
 * soft lower edge. A particle helix drifts behind; the field stands without it.
 */
export function Hero({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const landline = site.phones[0];
  return (
    <section className={s.hero} aria-labelledby="hero-title" data-hero>
      <div className={s.field}>
        <Helix />
        <div className={`wrap ${s.grid}`}>
          <div className={s.copy}>
            <h1 id="hero-title" className={s.promise} data-load style={{ '--i': 1 } as React.CSSProperties}>
              {d.hero.promise}
            </h1>
            <p className={s.sub} data-load style={{ '--i': 2 } as React.CSSProperties}>
              {d.hero.sub}
            </p>
          </div>

          <div className={s.slipCol} data-load style={{ '--i': 3 } as React.CSSProperties}>
            <div data-when-offer="live upcoming">
              <Offer pkg={cardioPackage} locale={locale} />
            </div>
            <div data-when-offer="ended">
              <Offer pkg={royalPackage} locale={locale} />
            </div>
          </div>

          <div className={s.actions} data-load style={{ '--i': 3 } as React.CSSProperties}>
            <ArrowButton href={telHref(landline.tel)} size="lg">
              <span className="num">{d.common.callNumber(landline.display)}</span>
            </ArrowButton>
            <ArrowButton href={whatsappUrl(generalMessage(locale))} variant="whatsapp" size="lg" external>
              {d.home.whatsappCta}
            </ArrowButton>
          </div>

          <ul role="list" className={s.meta} data-load style={{ '--i': 4 } as React.CSSProperties}>
            <li>
              <Icon name="check" />
              <span>{d.front.isoLine}</span>
            </li>
            <li>
              <Icon name="pin" />
              <span>{d.hero.meta}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Offer({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const id = `hero-offer-${pkg.id}`;
  return (
    <article className={s.slip} aria-labelledby={id}>
      <h2 id={id} className={s.slipName}>
        {pkg.name[locale]}
      </h2>
      <p className={`${s.price} num`}>{formatInr(pkg.priceInr)}</p>
      <p className={s.slipFacts}>
        <span className={s.tag}>{pkg.label[locale]}.</span> {d.hero.offerTests(pkg.tests.length)}
      </p>
      {pkg.window && (
        <p className={s.slipFacts}>
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
        <Icon name="arrow" />
      </Link>
    </article>
  );
}
