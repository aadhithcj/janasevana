'use client';

import Link from 'next/link';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { useBasket } from '@/components/booking/BasketContext';
import s from './Header.module.css';

/** "Your request (n)": appears only once something is selected, and leads to the booking form. */
export function RequestLink({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const { items, loaded } = useBasket();
  if (!loaded || items.length === 0) return null;
  return (
    <Link href={href(locale, 'homeCollection', 'book')} className={s.request} aria-label={d.front.requestCount(items.length)}>
      <Icon name="note" />
      <span className={s.requestLabel}>{d.front.request}</span>
      <span className={`${s.requestCount} num`} key={items.length}>
        {items.length}
      </span>
    </Link>
  );
}
