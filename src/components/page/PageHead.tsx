import s from './PageHead.module.css';

/** Inner-page opening on paper: the page's one heading, a one-line lede, and a thin teal arc line. */
export function PageHead({ title, lede, children }: { title: string; lede?: string; children?: React.ReactNode }) {
  return (
    <header className={s.head}>
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
      <svg className={s.arc} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 34C520 46 1040 30 1440 4" fill="none" stroke="var(--teal-500)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </header>
  );
}
