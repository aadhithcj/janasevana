import { photoFiles } from '@config/photos';

/**
 * A pre-built photo as AVIF with a WebP fallback at its built widths. Loads
 * eagerly at low priority by default, so photos are ready as the visitor
 * scrolls without competing with the text and fonts of the first screen.
 */
export function Photo({
  name,
  alt,
  sizes,
  className,
  priority = 'low',
}: {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: 'low' | 'high';
}) {
  const f = photoFiles[name];
  const set = (ext: string) => f.widths.map((w) => `/photos/${name}-${w}.${ext} ${Math.min(w, f.width)}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      {/* Static export: the files are pre-optimised, so a plain img (inside picture) is intended. */}
      <img
        src={`/photos/${name}-${f.widths[0]}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        width={f.width}
        height={f.height}
        alt={alt}
        decoding="async"
        fetchPriority={priority}
        className={className}
      />
    </picture>
  );
}
