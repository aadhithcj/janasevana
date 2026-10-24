'use client';

import { useEffect } from 'react';

/**
 * Cycles the home search's placeholder through everyday examples ("Try: sugar",
 * "Try: thyroid") while the field is empty and not focused. Off under reduced
 * motion; without script the static placeholder stays.
 */
export function SearchHints({ target, prefix, words }: { target: string; prefix: string; words: string[] }) {
  useEffect(() => {
    const input = document.getElementById(target) as HTMLInputElement | null;
    if (!input || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    const id = window.setInterval(() => {
      if (document.activeElement === input || input.value) return;
      i = (i + 1) % words.length;
      input.placeholder = `${prefix}${words[i]}`;
    }, 2200);
    return () => window.clearInterval(id);
  }, [target, prefix, words]);
  return null;
}
