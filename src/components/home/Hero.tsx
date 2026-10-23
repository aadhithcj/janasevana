import { confirmed } from '@config/confirm';
import { cardioPackage, formatInr, royalPackage } from '@config/packages';
import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { formatDate } from '@/lib/offer';
import { ActionLink } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { OfferSlip } from '@/components/slip/OfferSlip';
import { Arc } from './Arc';
import s from './Hero.module.css';

export function Hero({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const [landline, whatsapp, mobile] = site.phones;
  // The owner's lab photo takes the right-hand side once it is set in config/site.ts;
  // until then the current offer sits there, so the hero never shows an empty frame.
  const photo = confirmed(site.photos.hero);
  const offerHref = photo ? href(locale, 'packages', 'cardio') : '#offer';
  const royalHref = photo ? href(locale, 'packages', 'royal') : '#offer';
  return (
    <section className={`${s.hero} on-field`} aria-labelledby="hero-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className={s.place} data-load style={{ '--i': 0 } as React.CSSProperties}>
            <Icon name="pin" />
            <span>{d.home.place}</span>
          </p>
          <h1 id="hero-title" className={s.title}>
            {d.home.h1.map((line, i) => (
              <span key={line} className={s.line} data-load style={{ '--i': i + 1 } as React.CSSProperties}>
                {line}
              </span>
            ))}
          </h1>
          <div className={s.actions} data-load style={{ '--i': 3 } as React.CSSProperties}>
            <ActionLink href={telHref(landline.tel)} variant="field" size="lg" icon="phone">
              {d.shell.call} <span className="num">{landline.display}</span>
            </ActionLink>
            <ActionLink href={whatsappUrl(generalMessage(locale))} variant="whatsapp" size="lg" icon="chat" external>
              {d.home.whatsappCta}
            </ActionLink>
          </div>
          <p className={s.offerLine} data-load style={{ '--i': 4 } as React.CSSProperties}>
            <a href={offerHref} data-when-offer="live upcoming">
              <span className={s.offerTag}>{cardioPackage.label[locale]}</span>
              <span>
                {d.home.offerLine(cardioPackage.name[locale], formatInr(cardioPackage.priceInr), formatDate(cardioPackage.window!.endDate, locale))}
              </span>
            </a>
            <a href={royalHref} data-when-offer="ended">
              <span className={s.offerTag}>{royalPackage.label[locale]}</span>
              <span>
                {royalPackage.name[locale]}, {formatInr(royalPackage.priceInr)}, {d.common.tests(royalPackage.tests.length)}
              </span>
            </a>
          </p>
          <p className={s.lede} data-load style={{ '--i': 5 } as React.CSSProperties}>
            {d.home.lede}
          </p>
          <p className={s.numbers} data-load style={{ '--i': 6 } as React.CSSProperties}>
            <span>{d.home.otherNumbers}:</span>{' '}
            <a href={telHref(whatsapp.tel)} className="num">
              {whatsapp.display}
            </a>{' '}
            <a href={telHref(mobile.tel)} className="num">
              {mobile.display}
            </a>
          </p>
        </div>

        {photo ? (
          <figure className={s.photo} data-load style={{ '--i': 3 } as React.CSSProperties}>
            {/* Static export: the owner's photo is served as is from public/photos. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={d.common.heroPhotoAlt} width={1200} height={1500} fetchPriority="high" decoding="async" />
          </figure>
        ) : (
          <div id="offer" className={s.offer} data-load style={{ '--i': 3 } as React.CSSProperties}>
            <div data-when-offer="live upcoming">
              <OfferSlip pkg={cardioPackage} locale={locale} />
            </div>
            <div data-when-offer="ended">
              <OfferSlip pkg={royalPackage} locale={locale} />
            </div>
          </div>
        )}
      </div>
      <Arc className={s.arc} />
    </section>
  );
}
