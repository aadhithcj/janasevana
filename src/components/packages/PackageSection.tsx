import { formatInr, type HealthPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { enquiryMessage, whatsappUrl } from '@/lib/whatsapp';
import { ActionLink } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { MessageQuote } from '@/components/slip/MessageQuote';
import { CopyButton } from '@/components/slip/CopyButton';
import { Explorer } from './Explorer';
import s from './Packages.module.css';

/** One package in full: the summary and booking on one side, the explorer of its tests on the other. */
export function PackageSection({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const message = enquiryMessage(`${pkg.shortName} (${formatInr(pkg.priceInr)})`, locale);
  const end = pkg.window ? formatDate(pkg.window.endDate, locale) : null;
  const titleId = `${pkg.id}-title`;
  // A dated offer is only bookable while it runs; the head script sets the state.
  const bookable = pkg.window ? 'live upcoming' : undefined;
  return (
    <section id={pkg.id} className={s.section} aria-labelledby={titleId}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.summary}>
          <h2 id={titleId} className={s.name}>
            {pkg.name[locale]}
          </h2>
          <p className={s.price}>
            <span className={`num ${s.amount}`}>{formatInr(pkg.priceInr)}</span>
            <span>{d.common.tests(pkg.tests.length)}</span>
            <span className={s.label}>{pkg.label[locale]}</span>
          </p>
          <p className={s.free}>
            <Icon name="check" />
            <span>{d.common.freeHomeCollection}</span>
          </p>
          {pkg.window && (
            <>
              <p className={s.period} data-when-offer="live upcoming">
                {d.common.validity(formatDate(pkg.window.startDate, locale), end!)}
              </p>
              <p className={s.period} data-when-offer="upcoming">
                {d.common.offerUpcoming(formatDate(pkg.window.startDate, locale))}
              </p>
              <p className={s.ended} data-when-offer="ended">
                {d.common.offerEnded(end!)}
              </p>
            </>
          )}

          {pkg.notice && (
            <div className={s.notice} role="note">
              <p className={s.noticeLabel}>
                <Icon name="info" />
                <span>{d.packages.noticeLabel}</span>
              </p>
              <p>{pkg.notice[locale]}</p>
            </div>
          )}

          <div className={s.book} data-when-offer={bookable}>
            <MessageQuote caption={d.slip.heading} message={message} />
            <div className={s.actions}>
              <ActionLink href={whatsappUrl(message)} variant="whatsapp" icon="chat" external block>
                {d.slip.sendWhatsapp}
              </ActionLink>
              <ActionLink href={`${href(locale, 'homeCollection')}?package=${pkg.id}#book`} variant="outline" block>
                {d.packages.bookThis}
              </ActionLink>
            </div>
            <CopyButton text={message} label={d.slip.copy} copied={d.slip.copied} failed={d.slip.copyFailed} />
            <p className={s.nothingSent}>{d.slip.nothingSent}</p>
          </div>
        </div>

        <div className={s.explorerCol}>
          <h3 className={s.explorerTitle}>{d.packages.testsHeading}</h3>
          <p className={s.explorerHint}>{d.packages.explain}</p>
          <Explorer pkg={pkg} locale={locale} />
        </div>
      </div>
    </section>
  );
}
