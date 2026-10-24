'use client';

import { useEffect } from 'react';

/**
 * Marks the department card in view in the index (aria-current="true").
 * Stacked cards (wide screens): the last card that has reached its sticky
 * place. Swipe row (phones): the card nearest the row's centre, and the chip
 * row follows it. Highlighting only: everything reads without it.
 */
export function DeptIndex() {
  useEffect(() => {
    const row = document.getElementById('dept-row');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-dept-card]'));
    const index = document.querySelector<HTMLElement>('[data-dept-index]');
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-dept-index] a'));
    if (!row || !cards.length || !index) return;
    let current = '';
    let frame = 0;

    const mark = (id: string) => {
      if (id === current) return;
      current = id;
      links.forEach((a) => {
        const on = a.getAttribute('href') === `#${id}`;
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
        // Keep the active chip in view on phones without moving the page.
        if (on && index.scrollWidth > index.clientWidth) {
          index.scrollTo({ left: a.offsetLeft - index.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' });
        }
      });
    };

    const update = () => {
      frame = 0;
      if (row.scrollWidth > row.clientWidth + 4) {
        const mid = row.getBoundingClientRect().left + row.clientWidth / 2;
        let best = cards[0];
        let gap = Infinity;
        for (const c of cards) {
          const r = c.getBoundingClientRect();
          const g = Math.abs(r.left + r.width / 2 - mid);
          if (g < gap) {
            gap = g;
            best = c;
          }
        }
        mark(best.id);
      } else {
        let active = cards[0];
        for (const c of cards) {
          const stick = parseFloat(getComputedStyle(c).top) || 0;
          if (c.getBoundingClientRect().top <= stick + 8) active = c;
        }
        mark(active.id);
      }
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', queue, { passive: true });
    row.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      row.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);
  return null;
}
