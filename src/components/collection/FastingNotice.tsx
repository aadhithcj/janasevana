import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import s from './FastingNotice.module.css';

/** Amber is reserved for this: fasting and preparation. No hours are given until the lab confirms them. */
export function FastingNotice({ locale, headingLevel = 3, id }: { locale: Locale; headingLevel?: 2 | 3; id?: string }) {
  const d = getDict(locale).fasting;
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <aside className={s.notice} aria-labelledby={id ?? 'fasting-title'}>
      <Icon name="clock" className={s.icon} />
      <div className={s.text}>
        <H id={id ?? 'fasting-title'} className={s.title}>
          {d.title}
        </H>
        <p>{d.body}</p>
        <p>{d.other}</p>
      </div>
    </aside>
  );
}
