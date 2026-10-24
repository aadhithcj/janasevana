'use client';

import { useEffect } from 'react';

type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

/**
 * Chooses the helix tier and loads the live canvas after the page is idle.
 * Tier C (reduced motion, Save-Data, a 2GB-or-smaller phone, or no script)
 * keeps the static poster and costs nothing. Touch screens start at tier B.
 */
export function HelixMount({ target }: { target: string }) {
  useEffect(() => {
    const root = document.getElementById(target);
    const nav = navigator as Nav;
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory <= 2)) return;
    const forced = new URLSearchParams(location.search).get('helix');
    if (forced === 'C') return;
    const tier = forced === 'A' || forced === 'B' ? forced : matchMedia('(pointer: coarse)').matches ? 'B' : 'A';
    let cancelled = false;
    const go = () => {
      if (!cancelled) import('./live.mjs').then((m) => !cancelled && m.start(root, tier));
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(go, { timeout: 2500 }) : window.setTimeout(go, 1200);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [target]);
  return null;
}
