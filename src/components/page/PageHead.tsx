import s from './PageHead.module.css';

/**
 * Inner-page opening, in the home hero's language: a rounded mist card whose
 * heading rises word by word on load, and a lede.
 */
export function PageHead({ title, lede, children }: { title: string; lede?: string; children?: React.ReactNode }) {
  const words = title.split(' ');
  return (
    <header className={s.head}>
      <div className={`wrap ${s.inner}`}>
        <h1 className={s.title}>
          {words.map((w, i) => (
            <span key={i}>
              <span className={s.word} style={{ '--w': i } as React.CSSProperties}>
                {w}
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        {lede && (
          <p className={s.lede} data-load style={{ '--i': words.length + 1 } as React.CSSProperties}>
            {lede}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
