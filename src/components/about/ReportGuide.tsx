import { site } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { Confirmed } from '@/components/ui/Unconfirmed';
import { Icon } from '@/components/ui/Icon';
import s from './ReportGuide.module.css';

/**
 * The report's real column structure, explained in words. It deliberately
 * shows no values, real or invented: the cells hold explanations instead.
 */
export function ReportGuide({ locale }: { locale: Locale }) {
  const d = getDict(locale).about;
  return (
    <section className={s.section} aria-labelledby="report-title">
      <div className="wrap">
        <div className={s.panel}>
          <div className={s.head}>
            <h2 id="report-title" className={s.heading}>
              {d.reportTitle}
            </h2>
            <p className={s.intro}>{d.reportIntro}</p>
          </div>

          <ol className={s.sheet}>
            {d.reportColumns.map((c, i) => (
              <li key={c.name} className={s.col} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <span className={s.colName}>{c.name}</span>
                <span className={s.colBody}>{c.body}</span>
              </li>
            ))}
          </ol>

          <p className={s.doctor}>
            <Icon name="info" />
            <span>{d.reportDoctor}</span>
          </p>
          <p className={s.delivery}>
            <strong>{d.reportDelivery}: </strong>
            <Confirmed fact={site.reportDelivery} locale={locale}>
              {(v) => v[locale]}
            </Confirmed>
          </p>
        </div>
      </div>
    </section>
  );
}
