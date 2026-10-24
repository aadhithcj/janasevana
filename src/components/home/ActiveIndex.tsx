'use client';

import { useEffect } from 'react';

/**
 * Marks the department in view in the pinned capabilities index
 * (aria-current="true"). Highlighting only: the index and the content are
 * complete without it.
 */
export function ActiveIndex() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-active-target]'));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-active-index] a'));
    if (!targets.length || !links.length) return;
    const mark = (id: string) =>
      links.forEach((a) => {
        if (a.getAttribute('href') === `#${id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) mark(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return null;
}
