import { cardioPackage, formatInr, royalPackage } from '@config/packages';
import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { formatDate } from '@/lib/offer';
import type { Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { ActionLink } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { OfferSlip } from '@/components/slip/OfferSlip';
import { Arc } from './Arc';
import s from './Hero.module.css';

/** The site's one field of colour: where the lab is, how to reach it, and the current offer. */
export function Hero({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const landline = site.phones[0];
  return (
    <section className={`${s.hero} on-field`} aria-labelledby="hero-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className={s.place} data-load style={{ '--i': 0 } as React.CSSProperties}>
            <Icon name="pin" />
            <span>{d.home.place}</span>
          </p>
          <h1 id="hero-title" className={s.title} data-load style={{ '--i': 1 } as React.CSSProperties}>
            {d.home.h1.join(' ')}
          </h1>
          <div className={s.actions} data-load style={{ '--i': 2 } as React.CSSProperties}>
            <ActionLink href={telHref(landline.tel)} variant="field" size="lg" icon="phone">
              {d.shell.call} <span className="num">{landline.display}</span>
            </ActionLink>
            <ActionLink href={whatsappUrl(generalMessage(locale))} variant="whatsapp" size="lg" icon="chat" external>
              {d.home.whatsappCta}
            </ActionLink>
          </div>
          {/* On phones the slip sits below the fold, so the offer is named here too. */}
          <p className={s.offerLine} data-load style={{ '--i': 3 } as React.CSSProperties}>
            <a href="#offer" data-when-offer="live upcoming">
              <span className={s.offerTag}>{cardioPackage.label[locale]}</span>
              <span>
                {d.home.offerLine(cardioPackage.name[locale], formatInr(cardioPackage.priceInr), formatDate(cardioPackage.window!.endDate, locale))}
              </span>
            </a>
            <a href="#offer" data-when-offer="ended">
              <span className={s.offerTag}>{royalPackage.label[locale]}</span>
              <span>
                {royalPackage.name[locale]}, {formatInr(royalPackage.priceInr)}, {d.common.tests(royalPackage.tests.length)}
              </span>
            </a>
          </p>
        </div>

        <div id="offer" className={s.offer} data-load style={{ '--i': 2 } as React.CSSProperties}>
          <div data-when-offer="live upcoming">
            <OfferSlip pkg={cardioPackage} locale={locale} />
          </div>
          <div data-when-offer="ended">
            <OfferSlip pkg={royalPackage} locale={locale} />
          </div>
        </div>
      </div>
      <Arc className={s.arc} />
    </section>
  );
}
