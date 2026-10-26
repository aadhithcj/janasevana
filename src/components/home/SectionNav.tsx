'use client';

/*
 * A quiet section index for the home page, adapted from React Bits' LineSidebar
 * (reactbits.dev): marker lines at the left edge that grow toward the pointer
 * through one eased --effect value per item. Changes for this site: real links
 * (keyboard and screen readers reach every section), labels that only appear on
 * hover or focus, the section in view marked as current, and no index numbers.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import s from './SectionNav.module.css';

type Item = { id: string; label: string };

const smoothstep = (p: number) => p * p * (3 - 2 * p);

export function SectionNav({ items, label }: { items: Item[]; label: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targets = useRef<number[]>([]);
  const current = useRef<number[]>([]);
  const raf = useRef(0);
  const last = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);

  // One rAF loop eases every item's --effect toward its target (pointer proximity, or 1 when current),
  // and stops itself once everything has settled.
  const kick = useCallback(() => {
    if (raf.current) return;
    function step(now: number) {
      const dt = Math.min((now - last.current) / 1000, 0.05);
      last.current = now;
      const k = 1 - Math.exp(-dt / 0.1);
      let moving = false;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = Math.max(targets.current[i] || 0, activeRef.current === i ? 1 : 0);
        const cur = current.current[i] || 0;
        const next = cur + (target - cur) * k;
        const settled = Math.abs(target - next) < 0.002;
        current.current[i] = settled ? target : next;
        el.style.setProperty('--effect', current.current[i].toFixed(3));
        if (!settled) moving = true;
      });
      raf.current = moving ? requestAnimationFrame(step) : 0;
    }
    last.current = performance.now();
    raf.current = requestAnimationFrame(step);
  }, []);

  // The section in view: the last one whose top has passed 40% of the viewport.
  useEffect(() => {
    const sections = items.map((it) => document.getElementById(it.id)?.closest('section') ?? null);
    let pending = 0;
    const spy = () => {
      pending = 0;
      const foot = document.querySelector('footer')?.getBoundingClientRect();
      const footSeen = foot ? (innerHeight - foot.top) / foot.height : 0;
      let idx = 0;
      sections.forEach((sec, i) => {
        if (sec && sec.getBoundingClientRect().top <= innerHeight * 0.4) idx = i;
      });
      // The index belongs to the sections below the hero: it shows once the search section is current.
      setShown(idx >= 1 && footSeen < 0.4);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
        kick();
      }
    };
    const queue = () => {
      if (!pending) pending = requestAnimationFrame(spy);
    };
    spy();
    kick();
    addEventListener('scroll', queue, { passive: true });
    return () => {
      removeEventListener('scroll', queue);
      cancelAnimationFrame(pending);
      cancelAnimationFrame(raf.current);
    };
  }, [items, kick]);

  const onMove = (e: React.PointerEvent) => {
    const list = listRef.current;
    if (!list) return;
    const y = e.clientY - list.getBoundingClientRect().top;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(y - (el.offsetTop + el.offsetHeight / 2));
      targets.current[i] = smoothstep(Math.max(0, 1 - d / 64));
    });
    kick();
  };

  const onLeave = () => {
    targets.current = targets.current.map(() => 0);
    kick();
  };

  const go = (e: React.MouseEvent, id: string) => {
    const section = document.getElementById(id)?.closest('section');
    if (!section) return;
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = id === items[0].id ? 0 : section.getBoundingClientRect().top + scrollY - 88;
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <nav className={s.nav} aria-label={label} data-shown={shown ? '' : undefined}>
      <ul ref={listRef} className={s.list} onPointerMove={onMove} onPointerLeave={onLeave}>
        {items.map((it, i) => (
          <li
            key={it.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={s.item}
          >
            <a href={`#${it.id}`} className={s.link} aria-current={active === i ? 'true' : undefined} onClick={(e) => go(e, it.id)}>
              <span className={s.marker} aria-hidden="true" />
              <span className={s.label}>{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
