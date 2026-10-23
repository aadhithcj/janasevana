import Link from 'next/link';
import { formatInr, type HealthPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { enquiryMessage, whatsappUrl } from '@/lib/whatsapp';
import { ActionLink } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { MessageQuote } from './MessageQuote';
import { CopyButton } from './CopyButton';
import s from './Slip.module.css';

/**
 * An offer as a slip of paper: what it is, what it costs, what is in it,
 * and the message that books it. The cardiovascular notice is part of the
 * slip, never optional.
 */
export function OfferSlip({
  pkg,
  locale,
  headingLevel = 2,
  className,
}: {
  pkg: HealthPackage;
  locale: Locale;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const d = getDict(locale);
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const message = enquiryMessage(`${pkg.shortName} (${formatInr(pkg.priceInr)})`, locale);
  const titleId = `slip-${pkg.id}`;
  return (
    <article className={`${s.slip} ${className ?? ''}`} aria-labelledby={titleId}>
      <div className={s.head}>
        <p className={s.label}>{pkg.label[locale]}</p>
        {pkg.window && (
          <p className={s.period}>
            {d.common.validity(formatDate(pkg.window.startDate, locale), formatDate(pkg.window.endDate, locale))}
          </p>
        )}
      </div>

      <H id={titleId} className={s.title}>
        {pkg.name[locale]}
      </H>

      <p className={s.price}>
        <span className="num">{formatInr(pkg.priceInr)}</span>
        <span className={s.priceNote}>{d.common.freeHomeCollection}</span>
      </p>

      {pkg.window && (
        <p className={s.upcoming} data-when-offer="upcoming">
          {d.common.offerUpcoming(formatDate(pkg.window.startDate, locale))}
        </p>
      )}

      <ul role="list" className={pkg.tests.length > 6 ? s.testsDense : s.tests}>
        {pkg.tests.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>

      {pkg.notice && (
        <p className={s.notice}>
          <Icon name="info" className={s.noticeIcon} />
          <span>{pkg.notice[locale]}</span>
        </p>
      )}

      <MessageQuote caption={d.slip.heading} message={message} />

      <ActionLink href={whatsappUrl(message)} variant="whatsapp" size="lg" icon="chat" external block>
        {d.slip.sendWhatsapp}
      </ActionLink>
      <div className={s.foot}>
        <Link href={`${href(locale, 'homeCollection')}?package=${pkg.id}#book`} className={s.more}>
          {d.home.bookWithDetails}
        </Link>
        <Link href={href(locale, 'packages', pkg.id)} className={s.more}>
          {d.home.offerDetails}
        </Link>
        <CopyButton text={message} label={d.slip.copy} copied={d.slip.copied} failed={d.slip.copyFailed} />
      </div>
      <p className={s.nothingSent}>{d.slip.nothingSent}</p>
    </article>
  );
}
