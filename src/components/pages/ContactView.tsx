import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { PrintButton } from '@/components/contact/PrintButton';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { LogoFull } from '@/components/shell/Logo';
import { Photo } from '@/components/ui/Photo';
import s from './ContactView.module.css';

export function ContactView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <>
      <PageHead title={d.contact.h1} lede={d.contact.lede} />
      <div className={`wrap ${s.grid}`}>
        <section aria-labelledby="contact-address" className={s.main}>
          <h2 id="contact-address" className="visually-hidden">
            {d.contact.addressTitle}
          </h2>
          {/* Shown only on paper, so a printout carries the lab's mark. */}
          <LogoFull className={s.printLogo} loading="eager" />
          <ContactDetails locale={locale} tone="paper" mapNearby />
          <div className={s.print}>
            <PrintButton label={d.contact.print} />
          </div>
        </section>
        <div className={s.side} data-print="hide">
          <Photo name="storefront" alt={d.common.photoAlt.storefront} sizes="(min-width: 64rem) 46vw, 100vw" className={s.photo} />
          <MapEmbed locale={locale} />
        </div>
      </div>
    </>
  );
}
