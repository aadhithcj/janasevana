import { Arc } from '@/components/home/Arc';
import s from './PageHead.module.css';

/** Inner-page opening: the coloured field, the page's one heading, and the arc. */
export function PageHead({
  title,
  lede,
  tone = 'teal',
  children,
}: {
  title: string;
  lede?: string;
  tone?: 'teal' | 'petrol';
  children?: React.ReactNode;
}) {
  return (
    <header className={`${s.head} ${tone === 'petrol' ? s.petrol : ''} on-field`}>
      <div className={`wrap ${s.inner}`}>
        <h1 className={s.title} data-load style={{ '--i': 0 } as React.CSSProperties}>
          {title}
        </h1>
        {lede && (
          <p className={s.lede} data-load style={{ '--i': 1 } as React.CSSProperties}>
            {lede}
          </p>
        )}
        {children}
      </div>
      <Arc className={s.arc} fill={tone === 'petrol' ? 'var(--petrol-700)' : 'var(--field)'} />
    </header>
  );
}
