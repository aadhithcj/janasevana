import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { CompactSelection } from '@/components/booking/CompactSelection';
import s from './HomeContact.module.css';

/** The one contact section on home (full-bleed band 3 of 3): address, numbers, hours, selection and the map. */
export function HomeContact({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <section className={`${s.band} on-field`} aria-labelledby="contact-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.details} data-reveal>
          <h2 id="contact-title" className={s.title}>
            {d.sections.contact}
          </h2>
          <ContactDetails locale={locale} />
          <CompactSelection locale={locale} bookHref={href(locale, 'homeCollection', 'book')} tone="field" />
        </div>
        <div className={s.map}>
          <MapEmbed locale={locale} />
        </div>
      </div>
    </section>
  );
}
