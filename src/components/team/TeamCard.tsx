'use client';

import { useRef } from 'react';
import s from './TeamCards.module.css';

const MAX_TILT = 5;

/**
 * Lifts and tilts gently toward a mouse pointer. Touch, pen and
 * reduced-motion users get the static card; keyboard focus lifts it too.
 */
export function TeamCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * MAX_TILT * 2).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * MAX_TILT * 2).toFixed(2)}deg`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  return (
    <div ref={ref} className={`${s.card} ${className ?? ''}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
