import type { Dict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import type { IndexRow } from '@/lib/indexRows';
import { Icon } from '@/components/ui/Icon';
import s from './IndexList.module.css';

export type IndexDensity = 'teaser' | 'package' | 'full';

/**
 * The Index: the site's signature list. A row is a test with its count;
 * opening it shows what's inside, what it measures (only where the lab
 * supplied wording), and method, sample and preparation (or "Ask the lab").
 * Native <details>, so it works without JavaScript. Usable from server and
 * client components; the Add control is passed in.
 */
export function IndexList({
  rows,
  density,
  locale,
  t,
  numbered,
  renderAction,
  showDepartment,
  labelledBy,
}: {
  rows: IndexRow[];
  density: IndexDensity;
  locale: Locale;
  t: Dict['index'];
  numbered?: boolean;
  renderAction?: (row: IndexRow) => React.ReactNode;
  showDepartment?: (row: IndexRow) => string | undefined;
  labelledBy?: string;
}) {
  return (
    <ol className={`${s.list} ${s[density]} ${numbered ? s.numbered : ''}`} aria-labelledby={labelledBy} role="list">
      {rows.map((row, i) => (
        <li key={row.key} className={s.row} data-test={row.testId}>
          {density === 'teaser' ? (
            <p className={s.teaserLine}>
              <span className={s.name} lang="en">
                {row.name}
              </span>
              {row.parameters.length > 0 && <span className={`${s.count} num`}>{row.parameters.length}</span>}
            </p>
          ) : (
            <details className={s.item}>
              <summary className={s.summary}>
                {numbered && (
                  <span className={`${s.index} num`} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <span className={s.head}>
                  <span className={s.name} lang="en">
                    {row.name}
                  </span>
                  {row.parameters.length > 0 && (
                    <span className={`${s.count} num`}>
                      {row.parameters.length}
                      <span className="visually-hidden"> {t.parts}</span>
                    </span>
                  )}
                  {showDepartment?.(row) && <span className={s.dept}>{showDepartment(row)}</span>}
                  {row.prep === 'fasting' && <span className={s.fastingTag}>{t.fastingTag}</span>}
                </span>
                <Icon name="chevron" className={s.chev} />
              </summary>
              <Body row={row} locale={locale} t={t} />
            </details>
          )}
          {renderAction && <div className={s.action}>{renderAction(row)}</div>}
        </li>
      ))}
    </ol>
  );
}

function Body({ row, locale, t }: { row: IndexRow; locale: Locale; t: Dict['index'] }) {
  const ask = t.askLab;
  return (
    <div className={s.body}>
      {row.nameOnly && <p className={s.only}>{t.nameOnly}</p>}
      {row.kind === 'category' && <p className={s.only}>{t.category}</p>}

      {row.parameters.length > 0 && (
        <div className={s.block}>
          <p className={s.label}>{t.includes}</p>
          <ul role="list" className={s.params} lang="en">
            {row.parameters.map((p) => (
              <li key={p.name}>
                <span>{p.name}</span>
                {p.method && <span className={s.paramMethod}>{p.method}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {row.about && (
        <div className={s.block}>
          <p className={s.label}>{t.measures}</p>
          <p className={s.about}>{row.about[locale]}</p>
        </div>
      )}

      {row.kind === 'test' && !row.nameOnly && (
        <dl className={s.facts}>
          <div>
            <dt>{t.method}</dt>
            <dd>{row.method ?? (row.methodPerPart ? t.methodPerPart : ask)}</dd>
          </div>
          <div>
            <dt>{t.sample}</dt>
            <dd>{row.sample ? t.samples[row.sample] : ask}</dd>
          </div>
          <div>
            <dt>{t.prep}</dt>
            <dd>{row.prep === 'fasting' ? <span className={s.fasting}>{t.fasting}</span> : ask}</dd>
          </div>
        </dl>
      )}

      {row.viaPackagesOnly && (
        <p className={s.note}>{row.inPackages?.length === 1 && row.inPackages[0] === 'cardio' ? t.inCardio : t.viaPackages}</p>
      )}
    </div>
  );
}
