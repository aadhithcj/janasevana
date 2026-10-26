'use client';

/*
 * A quiet section index for the home page, adapted from React Bits' LineSidebar
 * (reactbits.dev): marker lines at the left edge that grow toward the pointer
 * through one eased --effect value per item. Changes for this site: real links
 * (keyboard and screen readers reach every section), the section in view marked
 * as current, and no index numbers.
 *
 * Three forms, one set of links:
 * - wide screens whose margin fits the labels: the labels sit beside the markers, quiet at rest;
 * - wide screens without that room: markers only, and the hovered or focused marker shows its
 *   label as a small pill, so nothing covers the page's text;
 * - phones and tablets: a floating button naming the current section, which opens the list.
 */
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import s from './SectionNav.module.css';

type Item = { id: string; label: string };

const smoothstep = (p: number) => p * p * (3 - 2 * p);

export function SectionNav({ items, label }: { items: Item[]; label: string }) {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targets = useRef<number[]>([]);
  const current = useRef<number[]>([]);
  const raf = useRef(0);
  const last = useRef(0);
  const activeRef = useRef(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  const [room, setRoom] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetId = useId();

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
      const show = idx >= 1 && footSeen < 0.4;
      setShown(show);
      if (!show) setOpen(false);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
        kick();
      }
    };
    // Labels sit beside the markers only where the margin left of the content fits them.
    const measure = () => {
      const list = listRef.current;
      const wrap = sections[1]?.querySelector('.wrap');
      if (!list || !wrap) return;
      const labels = [...list.querySelectorAll<HTMLElement>(`.${s.label}`)];
      const widest = Math.max(0, ...labels.map((l) => l.scrollWidth));
      const content = wrap.getBoundingClientRect().left + parseFloat(getComputedStyle(wrap).paddingLeft);
      // nav offset + list padding + marker + gap + label + the current label's step + breathing room
      setRoom(6 + 8 + 24 + 12 + widest + 8 + 24 <= content);
    };
    const queue = () => {
      if (!pending) pending = requestAnimationFrame(spy);
    };
    spy();
    measure();
    document.fonts?.ready.then(measure);
    kick();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', measure);
    return () => {
      removeEventListener('scroll', queue);
      removeEventListener('resize', measure);
      cancelAnimationFrame(pending);
      cancelAnimationFrame(raf.current);
    };
  }, [items, kick]);

  // The phone sheet closes on Escape (focus returns to its button) or a press outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    addEventListener('keydown', onKey);
    addEventListener('pointerdown', onDown);
    return () => {
      removeEventListener('keydown', onKey);
      removeEventListener('pointerdown', onDown);
    };
  }, [open]);

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
    setOpen(false);
    const section = document.getElementById(id)?.closest('section');
    if (!section) return;
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = id === items[0].id ? 0 : section.getBoundingClientRect().top + scrollY - 88;
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <nav ref={navRef} className={s.nav} aria-label={label} data-shown={shown ? '' : undefined} data-room={room ? '' : undefined}>
      {/* Wide screens: the rail. */}
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

      {/* Phones and tablets: a button naming the current section, opening the list above it. */}
      <div className={s.jump}>
        <ul id={sheetId} className={s.sheet} data-open={open ? '' : undefined}>
          {items.map((it, i) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className={s.sheetLink} aria-current={active === i ? 'true' : undefined} tabIndex={open ? undefined : -1} onClick={(e) => go(e, it.id)}>
                <span className={s.sheetMarker} aria-hidden="true" />
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <button ref={triggerRef} type="button" className={s.trigger} aria-expanded={open} aria-controls={sheetId} onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h10M4 12h16M4 17h7" />
          </svg>
          <span className="visually-hidden">{label}: </span>
          <span className={s.triggerLabel}>{items[active]?.label}</span>
        </button>
      </div>
    </nav>
  );
}
