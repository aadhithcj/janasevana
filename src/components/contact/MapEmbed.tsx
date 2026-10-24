import { directionsUrl, site } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import s from './MapEmbed.module.css';

/**
 * Google Maps embed of the address search (no API key, no script). It is
 * an address search, not a confirmed pin, and the caption says so.
 */
export function MapEmbed({ locale }: { locale: Locale }) {
  const d = getDict(locale).sections;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(site.directionsQuery)}&z=16&output=embed`;
  return (
    <figure className={s.map}>
      <iframe
        src={src}
        title={d.mapTitle}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={s.frame}
      />
      <figcaption className={s.caption}>
        {d.mapCaption}{' '}
        <a href={directionsUrl()} target="_blank" rel="noopener">
          {d.openMap}
        </a>
      </figcaption>
    </figure>
  );
}
