import Link from 'next/link';
import { cardioPackage, formatInr, royalPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { ActionLink } from '@/components/ui/Action';
import s from './PackagesBand.module.css';

/** Petrol band: the Royal Package in full, with the anniversary offer as a footnote while it runs. */
export function PackagesBand({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <section className={s.band} aria-labelledby="packages-title" data-reveal>
      <div className={`wrap ${s.grid}`}>
        <div className={s.intro}>
          <h2 id="packages-title" className={s.name}>
            {royalPackage.name[locale]}
          </h2>
          <p className={s.price}>
            <span className={`num ${s.amount}`}>{formatInr(royalPackage.priceInr)}</span>
            <span>{d.common.tests(royalPackage.tests.length)}</span>
            <span className={s.label}>{royalPackage.label[locale]}</span>
          </p>
          <p className={s.summary}>
            {d.home.royalSummary} {d.home.packagesTitle}
          </p>
          <div className={s.actions}>
            <ActionLink href={`${href(locale, 'homeCollection')}?package=royal#book`} variant="petrol">
              {d.home.bookPackage}
            </ActionLink>
            <Link href={href(locale, 'packages')} className={s.link}>
              {d.home.packagesLink}
            </Link>
          </div>
        </div>

        <div>
          <ol className={s.tests}>
            {royalPackage.tests.map((t) => (
              <li key={t.name}>{t.name}</li>
            ))}
          </ol>
          <Link href={href(locale, 'packages', 'royal')} className={`${s.link} ${s.allTests}`}>
            {d.home.allTests(royalPackage.tests.length)}
          </Link>
        </div>

        <p className={s.cardio} data-when-offer="live upcoming">
          <span className={s.cardioName}>
            {cardioPackage.label[locale]}: {cardioPackage.name[locale]}, <span className="num">{formatInr(cardioPackage.priceInr)}</span>.
          </span>{' '}
          {d.home.cardioSummary}{' '}
          {d.common.validity(formatDate(cardioPackage.window!.startDate, locale), formatDate(cardioPackage.window!.endDate, locale))}.{' '}
          {cardioPackage.notice![locale]}{' '}
          <Link href={href(locale, 'packages', 'cardio')} className={s.link}>
            {d.home.offerDetails}
          </Link>
        </p>
      </div>
    </section>
  );
}
