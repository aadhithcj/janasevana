import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { ActionLink } from '@/components/ui/Action';
import { BookingForm } from './BookingForm';
import s from './BookingSection.module.css';

/** The booking form with its heading, plus a no-JavaScript fallback that still books by call or WhatsApp. */
export function BookingSection({ locale, title }: { locale: Locale; title?: string }) {
  const d = getDict(locale);
  const landline = site.phones[0];
  return (
    <section id="book" className={s.section} aria-labelledby="book-title">
      <div className="wrap">
        <div className={s.panel}>
          <h2 id="book-title" className={s.heading}>
            {title ?? d.booking.title}
          </h2>
          <noscript>
            <div className={s.noscript}>
              <p>{d.booking.noscript}</p>
              <div className={s.noscriptActions}>
                <ActionLink href={telHref(landline.tel)} icon="phone">
                  {d.common.callNumber(landline.display)}
                </ActionLink>
                <ActionLink href={whatsappUrl(generalMessage(locale))} variant="whatsapp" icon="chat" external>
                  WhatsApp
                </ActionLink>
              </div>
            </div>
          </noscript>
          <div className={s.form}>
            <BookingForm locale={locale} testsHref={href(locale, 'tests')} />
          </div>
        </div>
      </div>
    </section>
  );
}
