import Link from 'next/link';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { TeamCards } from '@/components/team/TeamCards';
import s from './TeamQuality.module.css';

/** The three names printed on every report, as cards, then the quality facts. */
export function TeamQuality({ locale, showLink = true, headingLevel = 2 }: { locale: Locale; showLink?: boolean; headingLevel?: 2 | 3 }) {
  const d = getDict(locale);
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <section className={s.section} aria-labelledby="team-title">
      <div className={`wrap ${s.grid}`}>
        <H id="team-title" className={s.heading}>
          {d.home.teamTitle}
        </H>
        <TeamCards locale={locale} />
        <div className={s.quality} data-reveal>
          <p className={s.qualityTitle}>{d.home.teamQuality}</p>
          <ul role="list" className={s.qualityList}>
            {d.home.qualityLines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          {showLink && (
            <Link href={href(locale, 'about')} className={s.link}>
              {d.home.aboutLink}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
