import s from './Header.module.css';

/** The owner's circular J/S mark, in the printed logo's charcoal and teal. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/brand/logo-mark.avif" type="image/avif" />
      <source srcSet="/brand/logo-mark.webp" type="image/webp" />
      <img src="/brand/logo-mark.png" alt="" width={144} height={144} className={className} fetchPriority="high" />
    </picture>
  );
}

/** The name as live text in the logo's colours (teal "Janasevana", charcoal "Lab"), sharp at any size. */
export function LogoName({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className={`${s.name} ${onDark ? s.nameOnDark : ''}`} lang="en">
      <span className={s.nameLead}>Janasevana</span> Lab
    </span>
  );
}

export function LogoFull({ className, loading = 'lazy' }: { className?: string; loading?: 'lazy' | 'eager' }) {
  return (
    <picture>
      <source srcSet="/brand/logo-full.avif" type="image/avif" />
      <source srcSet="/brand/logo-full.webp" type="image/webp" />
      <img
        src="/brand/logo-full.png"
        alt="Janasevana Lab, Promoting Better Diagnostic Tools"
        width={571}
        height={361}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
