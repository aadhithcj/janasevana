import Link from 'next/link';
import { cardioPackage, formatInr, royalPackage, type HealthPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { packageItem } from '@/lib/basketItems';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { AddToBooking } from '@/components/index/AddToBooking';
import s from './HomePackages.module.css';

/** Price first: the Royal Package as a petrol panel, the dated offer on white beside it. */
export function HomePackages({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <section className={s.section} aria-labelledby="pk-title">
      <div className="wrap">
        <h2 id="pk-title" className={s.title}>
          {d.sections.packages}
        </h2>
        <div className={s.grid}>
          <Panel pkg={royalPackage} locale={locale} />
          <Panel pkg={cardioPackage} locale={locale} />
        </div>
      </div>
    </section>
  );
}

function Panel({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const item = packageItem(pkg);
  const id = `home-pk-${pkg.id}`;
  const dated = Boolean(pkg.window);
  return (
    <article className={`${s.panel} ${pkg.id === 'royal' ? s.royal : s.cardio}`} aria-labelledby={id} data-reveal>
      <p className={`${s.price} num`}>{formatInr(pkg.priceInr)}</p>
      <h3 id={id} className={s.name}>
        {pkg.name[locale]}
      </h3>
      <p className={s.meta}>
        <span className={s.label} data-when-offer={dated ? 'live upcoming' : undefined}>
          {pkg.label[locale]}.
        </span>
        {dated && (
          <span className={s.ended} data-when-offer="ended">
            {d.hero.ended}.
          </span>
        )}{' '}
        {d.common.tests(pkg.tests.length)}. {d.common.freeHomeCollection}.
      </p>
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
      <div className={s.actions}>
        <span data-when-offer={dated ? 'live upcoming' : undefined}>
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
        </span>
        <Link href={href(locale, 'packages', pkg.id)} className={s.link}>
          {d.home.allTests(pkg.tests.length)}
        </Link>
      </div>
    </article>
  );
}
