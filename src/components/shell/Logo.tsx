import s from './Header.module.css';

/**
 * The lab's real logo artwork (extracted from brand/, not redrawn): the
 * circular J/S mark and the "Janasevana Lab" wordmark, set side by side so
 * the name stays legible at header size.
 */
export function LogoLockup() {
  return (
    <span className={s.lockup}>
      <picture>
        <source srcSet="/brand/logo-mark.avif" type="image/avif" />
        <source srcSet="/brand/logo-mark.webp" type="image/webp" />
        <img src="/brand/logo-mark.png" alt="" width={302} height={245} className={s.mark} />
      </picture>
      <picture>
        <source srcSet="/brand/logo-wordmark.avif" type="image/avif" />
        <source srcSet="/brand/logo-wordmark.webp" type="image/webp" />
        <img src="/brand/logo-wordmark.png" alt="Janasevana Lab" width={571} height={75} className={s.wordmark} />
      </picture>
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
