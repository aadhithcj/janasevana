import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import s from './Steps.module.css';

/** Book, visit, report: a real sequence, so the steps are numbered. Reveals in order, once. */
export function Steps({ locale, headingId, headingLevel = 3 }: { locale: Locale; headingId?: string; headingLevel?: 2 | 3 }) {
  const d = getDict(locale).steps;
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <div className={s.wrap}>
      <H id={headingId} className={s.title}>
        {d.title}
      </H>
      <ol className={s.steps}>
        {d.items.map((step, i) => (
          <li key={step.title} className={s.step} data-reveal style={{ '--i': i } as React.CSSProperties}>
            <span className={s.num} aria-hidden="true">
              {i + 1}
            </span>
            <span className={s.stepTitle}>{step.title}</span>
            <span className={s.body}>{step.body}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
