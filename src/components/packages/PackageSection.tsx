import { formatInr, type HealthPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { packageItem } from '@/lib/basketItems';
import { rowsFromPackage } from '@/lib/indexRows';
import { formatDate } from '@/lib/offer';
import type { Locale } from '@/lib/paths';
import { enquiryMessage, whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { IndexList } from '@/components/index/IndexList';
import { AddToBooking } from '@/components/index/AddToBooking';
import s from './Packages.module.css';

/**
 * One package as a rounded mist panel, in the home page's language: a summary
 * card (the package photo with a frosted count card, price first) that pins on
 * wide, tall screens, and the package's tests in a white card beside it. The
 * cardiovascular notice sits in the summary, so it stays in view with the price.
 */
export function PackageSection({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const item = packageItem(pkg);
  const message = enquiryMessage(item.name, locale);
  const titleId = `${pkg.id}-title`;
  const listId = `${pkg.id}-list`;
  const dated = Boolean(pkg.window);
  const royal = pkg.id === 'royal';
  return (
    <section id={pkg.id} className={`${s.section} ${royal ? s.royal : s.cardio}`} aria-labelledby={titleId}>
      <div className="wrap">
        <div className={s.panel}>
          <div className={s.summary}>
            <div className={s.summaryInner}>
              <figure className={s.stage}>
                <Photo
                  name={royal ? 'stock-blood-tube' : 'stock-heart-model'}
                  alt={royal ? d.front.stockAlt.tube : d.front.stockAlt.heart}
                  sizes="(min-width: 64rem) 30vw, 92vw"
                  className={s.photo}
                />
                <figcaption className={s.stockNote}>{d.front.stockCaption}</figcaption>
                <span className={s.glass} aria-hidden="true">
                  <span className={`${s.glassBig} num`}>{pkg.tests.length}</span>
                  <span className={s.glassSmall}>
                    {d.front.pkgCardWord} {d.front.pkgCardIn}
                  </span>
                </span>
              </figure>

              <p className={s.chips}>
                <span className={s.chip} data-when-offer={dated ? 'live upcoming' : undefined}>
                  {pkg.label[locale]}
                </span>
                {dated && (
                  <span className={`${s.chip} ${s.ended}`} data-when-offer="ended">
                    {d.hero.ended}
                  </span>
                )}
                <span className={`${s.chip} ${s.chipSoft}`}>
                  <Icon name="check" />
                  {d.common.freeHomeCollection}
                </span>
              </p>
              <h2 id={titleId} className={s.name}>
                {pkg.name[locale]}
              </h2>
              <p className={s.priceRow}>
                <span className={`${s.price} num`}>{formatInr(pkg.priceInr)}</span>
                <span className={s.priceFor}>{d.front.pkgFor(pkg.tests.length)}</span>
              </p>
              {pkg.window && (
                <p className={s.period}>
                  {d.common.validity(formatDate(pkg.window.startDate, locale), formatDate(pkg.window.endDate, locale))}. {d.hero.callToConfirm}
                </p>
              )}

              {pkg.notice && (
                <p className={s.notice} role="note">
                  <Icon name="info" />
                  <span>{pkg.notice[locale]}</span>
                </p>
              )}

              <div className={s.actions} data-when-offer={dated ? 'live upcoming' : undefined}>
                <AddToBooking
                  item={item}
                  size="lg"
                  labels={{
                    add: d.packages.select,
                    added: d.packages.selected,
                    remove: d.tests.remove,
                    addedLive: d.basket.addedLive(pkg.shortName),
                    removedLive: d.basket.removedLive(pkg.shortName),
                  }}
                />
                <a href={whatsappUrl(message)} target="_blank" rel="noopener" className={s.wa}>
                  <Icon name="chat" />
                  <span>{d.packages.askWhatsapp}</span>
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>

          <div className={s.list}>
            <h3 id={listId} className={s.listTitle}>
              {d.packages.contents} <span className="num">{pkg.tests.length}</span>
            </h3>
            <IndexList rows={rowsFromPackage(pkg)} density="package" locale={locale} t={d.index} numbered labelledBy={listId} />
          </div>
        </div>
      </div>
    </section>
  );
}
