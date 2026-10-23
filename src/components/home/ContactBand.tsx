import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { ContactDetails } from '@/components/contact/ContactDetails';
import s from './ContactBand.module.css';

export function ContactBand({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <section className={`${s.band} on-field`} aria-labelledby="contact-title">
      <div className={`wrap ${s.grid}`} data-reveal>
        <h2 id="contact-title" className={s.heading}>
          {d.home.contactTitle}
        </h2>
        <ContactDetails locale={locale} />
      </div>
    </section>
  );
}
