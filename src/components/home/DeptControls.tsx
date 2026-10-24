'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import s from './Departments.module.css';

/** Previous and next for the department row. Rendered only with JavaScript; the row also scrolls by touch and keyboard. */
export function DeptControls({ prev, next }: { prev: string; next: string }) {
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- the buttons only exist once scripting runs
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  const go = (dir: 1 | -1) => {
    const row = document.getElementById('dept-row');
    const card = row?.querySelector<HTMLElement>('details');
    if (!row || !card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: reduce ? 'auto' : 'smooth' });
  };
  return (
    <div className={s.controls}>
      <button type="button" className={s.control} onClick={() => go(-1)} aria-label={prev} aria-controls="dept-row">
        <Icon name="arrow" className={s.back} />
      </button>
      <button type="button" className={s.control} onClick={() => go(1)} aria-label={next} aria-controls="dept-row">
        <Icon name="arrow" />
      </button>
    </div>
  );
}
