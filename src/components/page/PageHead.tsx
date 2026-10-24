import s from './PageHead.module.css';

/** Inner-page opening: one statement heading and its lede on the mist field. */
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
    </header>
  );
}
