import s from './Header.module.css';

/**
 * The header logo: the owner's original circular J/S mark, with the name set
 * as live text in the logo's own colours (teal "Janasevana", charcoal "Lab"),
 * so it stays sharp at any size.
 */
export function LogoLockup() {
  return (
    <span className={s.lockup}>
      <picture>
        <source srcSet="/brand/logo-mark.avif" type="image/avif" />
        <source srcSet="/brand/logo-mark.webp" type="image/webp" />
        <img src="/brand/logo-mark.png" alt="" width={144} height={144} className={s.mark} fetchPriority="high" />
      </picture>
      <span className={s.name} lang="en">
        <span className={s.nameLead}>Janasevana</span> Lab
      </span>
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
