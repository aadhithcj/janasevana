import { HelixMount } from './HelixMount';
import s from './Helix.module.css';

/**
 * The decorative helix behind the hero copy. The poster (frame 0, rendered at
 * build time from the same geometry) is a CSS background, so it shows with no
 * script and nothing shifts; the live canvas cross-fades in over it.
 */
export function Helix() {
  return (
    <div id="hero-helix" className={s.helix} aria-hidden="true">
      {/* Fetch the poster with the page instead of after the stylesheet; each screen size gets only its own. React hoists these to <head>. */}
      <link rel="preload" as="image" href="/helix/poster-mobile.avif" type="image/avif" media="(max-width: 63.99rem)" />
      <link rel="preload" as="image" href="/helix/poster-desktop.avif" type="image/avif" media="(min-width: 64rem)" />
      <HelixMount target="hero-helix" />
    </div>
  );
}
