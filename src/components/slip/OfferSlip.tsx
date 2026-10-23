import Link from 'next/link';
import { formatInr, type HealthPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { enquiryMessage, whatsappUrl } from '@/lib/whatsapp';
import { ActionLink } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { AddToRequest } from '@/components/request/AddToRequest';
import { packageItems } from '@/components/request/RequestPanel';
import { MessageQuote } from './MessageQuote';
import { CopyButton } from './CopyButton';
import s from './Slip.module.css';

const PREVIEW = 6;

/**
 * An offer as a slip of paper: what it is, what it costs, what is in it,
 * and the message that books it. One primary action; everything else sits
 * in a single "More" row. The cardiovascular notice is never optional.
 */
export function OfferSlip({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const message = enquiryMessage(`${pkg.shortName} (${formatInr(pkg.priceInr)})`, locale);
  const titleId = `slip-${pkg.id}`;
  const shown = pkg.tests.slice(0, PREVIEW);
  const rest = pkg.tests.slice(PREVIEW);
  return (
    <article className={s.slip} aria-labelledby={titleId}>
      <div className={s.head}>
        <p className={s.label}>{pkg.label[locale]}</p>
        {pkg.window && (
          <p className={s.period}>
            {d.common.validity(formatDate(pkg.window.startDate, locale), formatDate(pkg.window.endDate, locale))}
          </p>
        )}
      </div>

      <h2 id={titleId} className={s.title}>
        {pkg.name[locale]}
      </h2>

      <p className={s.price}>
        <span className={`num ${s.amount}`}>{formatInr(pkg.priceInr)}</span>
        <span className={s.priceNote}>{d.common.freeHomeCollection}</span>
      </p>

      {pkg.window && (
        <p className={s.upcoming} data-when-offer="upcoming">
          {d.common.offerUpcoming(formatDate(pkg.window.startDate, locale))}
        </p>
      )}

      <ul role="list" className={s.tests} lang="en">
        {shown.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
      {rest.length > 0 && (
        <details className={s.all}>
          <summary>
            {d.home.allTests(pkg.tests.length)}
            <Icon name="chevron" className={s.chev} />
          </summary>
          <ul role="list" className={s.tests} lang="en">
            {rest.map((t) => (
              <li key={t.name}>{t.name}</li>
            ))}
          </ul>
        </details>
      )}

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

      <details className={s.more}>
        <summary>
          {d.request.more}
          <Icon name="chevron" className={s.chev} />
        </summary>
        <div className={s.moreBody}>
          <AddToRequest
            item={packageItems[pkg.id]}
            label={d.home.bookWithDetails}
            addedMessage={d.request.added(pkg.shortName)}
            fallbackHref={`${href(locale, 'homeCollection')}?package=${pkg.id}#book`}
          />
          <Link href={href(locale, 'packages', pkg.id)} className={s.moreLink}>
            {d.home.offerDetails}
          </Link>
          <CopyButton text={message} label={d.slip.copy} copied={d.slip.copied} failed={d.slip.copyFailed} />
        </div>
      </details>
      <p className={s.nothingSent}>{d.slip.nothingSent}</p>
    </article>
  );
}
