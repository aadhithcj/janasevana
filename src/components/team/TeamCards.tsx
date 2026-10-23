import { confirmed } from '@config/confirm';
import { site } from '@config/site';
import { team } from '@config/team';
import type { Locale } from '@/lib/paths';
import { TeamCard } from './TeamCard';
import s from './TeamCards.module.css';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** The three people printed on every report. Initials stand in until the owner supplies photos. */
export function TeamCards({ locale }: { locale: Locale }) {
  const photo = confirmed(site.photos.team);
  return (
    <ul role="list" className={s.grid}>
      {team.map((m, i) => (
        <li key={m.id} className={s.item} data-reveal style={{ '--i': i } as React.CSSProperties}>
          <TeamCard>
            <div className={s.portrait} aria-hidden={photo ? undefined : true}>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={m.name[locale]} loading="lazy" decoding="async" className={s.photo} />
              ) : (
                <span className={s.initials} lang="en">
                  {initials(m.name.en)}
                </span>
              )}
              <svg className={s.arc} viewBox="0 0 300 60" preserveAspectRatio="none" focusable="false">
                <path d="M0 52C110 66 220 44 300 6" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className={s.body}>
              <p className={s.name}>{m.name[locale]}</p>
              <p className={s.role}>{m.role[locale]}</p>
              {m.registration && (
                <p className={s.reg} lang="en">
                  {m.registration}
                </p>
              )}
            </div>
          </TeamCard>
        </li>
      ))}
    </ul>
  );
}
