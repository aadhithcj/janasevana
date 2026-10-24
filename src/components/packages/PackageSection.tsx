import { formatInr, type HealthPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { packageItem } from '@/lib/basketItems';
import { rowsFromPackage } from '@/lib/indexRows';
import { formatDate } from '@/lib/offer';
import type { Locale } from '@/lib/paths';
import { enquiryMessage, whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { IndexList } from '@/components/index/IndexList';
import { AddToBooking } from '@/components/index/AddToBooking';
import s from './Packages.module.css';

/**
 * One package: the summary (price first) pins on wide, tall screens while
 * its Index scrolls beside it. The cardiovascular notice sits in the
 * summary, so it stays in view with the price.
 */
export function PackageSection({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const item = packageItem(pkg);
  const message = enquiryMessage(item.name, locale);
  const titleId = `${pkg.id}-title`;
  const listId = `${pkg.id}-list`;
  const dated = Boolean(pkg.window);
  return (
    <section id={pkg.id} className={`${s.section} ${pkg.id === 'royal' ? s.royal : s.cardio}`} aria-labelledby={titleId}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.summary}>
          <div className={s.summaryInner}>
            <h2 id={titleId} className={s.name}>
              {pkg.name[locale]}
            </h2>
            <p className={`${s.price} num`}>{formatInr(pkg.priceInr)}</p>
            <ul role="list" className={s.facts}>
              <li className={s.label}>
                <span data-when-offer={dated ? 'live upcoming' : undefined}>{pkg.label[locale]}</span>
                {dated && (
                  <span className={s.ended} data-when-offer="ended">
                    {d.hero.ended}
                  </span>
                )}
              </li>
              <li>{d.common.freeHomeCollection}</li>
              <li>{d.common.tests(pkg.tests.length)}</li>
              {pkg.window && (
                <li>
                  {d.common.validity(formatDate(pkg.window.startDate, locale), formatDate(pkg.window.endDate, locale))}. {d.hero.callToConfirm}
                </li>
              )}
            </ul>

            {pkg.notice && (
              <p className={s.notice} role="note">
                <Icon name="info" />
                <span>{pkg.notice[locale]}</span>
              </p>
            )}

            <div className={s.actions} data-when-offer={dated ? 'live upcoming' : undefined}>
              <AddToBooking
                item={item}
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
    </section>
  );
}
