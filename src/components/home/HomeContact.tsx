import { directionsUrl, site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { Confirmed } from '@/components/ui/Unconfirmed';
import { CompactSelection } from '@/components/booking/CompactSelection';
import s from './HomeContact.module.css';

/**
 * Find the lab, in the page's panel language: the address set large with
 * directions and WhatsApp, every number and the email as tiles, then the
 * shopfront (with a frosted card naming the building) and the map.
 */
export function HomeContact({ locale, onPage = false, children }: { locale: Locale; onPage?: boolean; children?: React.ReactNode }) {
  const d = getDict(locale);
  const a = site.address[locale];
  return (
    <section className={`${s.band} ${onPage ? s.onPage : ''}`} aria-labelledby="contact-title">
      <div className="wrap">
        <div className={s.panel}>
          <div className={s.info} data-reveal>
            <h2 id="contact-title" className={s.title}>
              {d.sections.contact}
            </h2>
            <address className={s.address}>
              <span className={s.building}>
                {a.building}, {a.locality}
              </span>
              <span className={s.city}>
                {a.city}, {a.region}
              </span>
            </address>
            <div className={s.actions}>
              <ArrowButton href={directionsUrl()} external>
                {d.common.directions}
              </ArrowButton>
              <ArrowButton href={whatsappUrl(generalMessage(locale))} variant="whatsapp" external>
                WhatsApp
              </ArrowButton>
            </div>

            <ul role="list" className={s.tiles}>
              {site.phones.map((p) => (
                <li key={p.id}>
                  <a href={telHref(p.tel)} className={s.tile}>
                    <span className={s.tileLabel}>{p.id === 'landline' ? d.common.landline : p.whatsapp ? d.common.whatsappAndCall : d.common.mobile}</span>
                    <span className={`${s.tileValue} num`}>{p.display}</span>
                    <Icon name="phone" className={s.tileIcon} />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className={s.tile}>
                  <span className={s.tileLabel}>{d.common.email}</span>
                  <span className={`${s.tileValue} ${s.email}`}>{site.email.toLowerCase()}</span>
                  <Icon name="mail" className={s.tileIcon} />
                </a>
              </li>
              <li className={s.wide}>
                <div className={`${s.tile} ${s.static}`}>
                  <span className={s.tileLabel}>{d.common.hours}</span>
                  <span className={s.hours}>
                    <Confirmed fact={site.hours} locale={locale}>
                      {(v) => v[locale]}
                    </Confirmed>
                  </span>
                  <Icon name="clock" className={s.tileIcon} />
                </div>
              </li>
            </ul>
            <CompactSelection locale={locale} bookHref={href(locale, 'homeCollection', 'book')} />
            {children}
          </div>

          <div className={s.place} data-print="hide">
            <figure className={s.stage}>
              <Photo name="storefront" alt={d.common.photoAlt.storefront} sizes="(min-width: 64rem) 44vw, 92vw" className={s.photo} />
              <figcaption className={s.glass}>
                <Icon name="pin" />
                <span>
                  <strong>{d.front.findSign}</strong> {a.building}, {a.locality}
                </span>
              </figcaption>
            </figure>
            <div className={s.map}>
              <MapEmbed locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
