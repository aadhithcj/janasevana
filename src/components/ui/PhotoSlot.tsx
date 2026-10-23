import { confirmed, type Confirmable } from '@config/confirm';
import s from './PhotoSlot.module.css';

/**
 * A reserved place for a real photograph. Holds its aspect ratio so the
 * page does not shift when the photo arrives; until then it shows a quiet
 * mount with a caption saying what will go there.
 */
export function PhotoSlot({
  photo,
  caption,
  alt,
  ratio = '4 / 3',
  tone = 'paper',
  className,
}: {
  photo: Confirmable<string>;
  caption: string;
  alt: string;
  ratio?: string;
  tone?: 'paper' | 'field';
  className?: string;
}) {
  const src = confirmed(photo);
  return (
    <figure className={`${s.slot} ${tone === 'field' ? s.field : ''} ${className ?? ''}`} style={{ aspectRatio: ratio }}>
      {src ? (
        // Static export: images are pre-optimised files, so a plain img is intended.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" decoding="async" className={s.img} />
      ) : (
        <figcaption className={s.caption}>{caption}</figcaption>
      )}
    </figure>
  );
}
