import { confirmed } from '@config/confirm';
import { site } from '@config/site';
import { team } from '@config/team';
import type { Locale } from '@/lib/paths';
import s from './TeamCards.module.css';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * The three people printed on every report, as tall cards with a name plate
 * at the foot. Large initials stand in until the owner confirms photos;
 * there is never an empty frame or a stock portrait.
 */
export function TeamCards({ locale, label }: { locale: Locale; label: string }) {
  const photo = confirmed(site.photos.team);
  return (
    // On phones the list scrolls sideways, so it takes focus for keyboard scrolling.
    <ul role="list" className={s.grid} tabIndex={0} aria-label={label}>
      {team.map((m) => (
        <li key={m.id} className={s.card}>
          {photo ? (
            // Static export: the owner's photo is served as is.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={m.name[locale]} loading="lazy" decoding="async" className={s.photo} />
          ) : (
            <span className={`${s.monogram} num`} aria-hidden="true" lang="en">
              {initials(m.name.en)}
            </span>
          )}
          <div className={s.plate}>
            <p className={s.name}>{m.name[locale]}</p>
            <p className={s.role}>{m.role[locale]}</p>
            {m.registration && (
              <p className={s.reg} lang="en">
                {m.registration}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
