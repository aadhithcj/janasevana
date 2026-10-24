'use client';

import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { useBasket } from './BasketContext';
import s from './CompactSelection.module.css';

/** The compact booking summary: count, the first few names, and Review. Shown only when something is selected. */
export function CompactSelection({ locale, bookHref, tone = 'paper' }: { locale: Locale; bookHref: string; tone?: 'paper' | 'field' }) {
  const d = getDict(locale);
  const { items, loaded } = useBasket();
  if (!loaded || items.length === 0) return null;
  const shown = items.slice(0, 3).map((i) => i.name);
  return (
    <div className={`${s.box} ${tone === 'field' ? s.field : ''}`}>
      <p className={s.title}>
        {d.sections.yourSelection} <span className={`${s.count} num`}>{items.length}</span>
      </p>
      <p className={s.names}>
        {shown.join(', ')}
        {items.length > shown.length ? ` +${items.length - shown.length}` : ''}
      </p>
      <a href={bookHref} className={s.review}>
        {d.sections.reviewBooking}
      </a>
    </div>
  );
}
