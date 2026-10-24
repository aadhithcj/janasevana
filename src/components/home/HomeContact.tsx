import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { Photo } from '@/components/ui/Photo';
import { CompactSelection } from '@/components/booking/CompactSelection';
import s from './HomeContact.module.css';

/** The one contact block on home: address, numbers, hours, selection, the shopfront and the map. */
export function HomeContact({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <section className={s.band} aria-labelledby="contact-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.details} data-reveal>
          <h2 id="contact-title" className={s.title}>
            {d.sections.contact}
          </h2>
          <ContactDetails locale={locale} tone="paper" mapNearby />
          <CompactSelection locale={locale} bookHref={href(locale, 'homeCollection', 'book')} />
        </div>
        <div className={s.map}>
          <Photo name="storefront" alt={d.common.photoAlt.storefront} sizes="(min-width: 64rem) 46vw, 100vw" className={s.photo} />
          <MapEmbed locale={locale} />
        </div>
      </div>
    </section>
  );
}
