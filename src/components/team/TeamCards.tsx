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
 * The three people printed on every report, as credential cards: the
 * only symmetric grid on the site. A monogram stands in until the owner
 * confirms photos; there is never an empty frame.
 */
export function TeamCards({ locale }: { locale: Locale }) {
  const photo = confirmed(site.photos.team);
  return (
    <ul role="list" className={s.grid}>
      {team.map((m, i) => (
        <li key={m.id} className={s.card} data-reveal style={{ '--i': i } as React.CSSProperties}>
          {photo ? (
            // Static export: the owner's photo is served as is.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={m.name[locale]} loading="lazy" decoding="async" className={s.photo} />
          ) : (
            <span className={`${s.monogram} num`} aria-hidden="true" lang="en">
              {initials(m.name.en)}
            </span>
          )}
          <p className={s.name}>{m.name[locale]}</p>
          <p className={s.role}>{m.role[locale]}</p>
          {m.registration && (
            <p className={s.reg} lang="en">
              {m.registration}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
