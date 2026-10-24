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
