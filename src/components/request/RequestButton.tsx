'use client';

import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { useBasket } from '@/components/booking/BasketContext';
import { useRequest } from './RequestContext';
import s from './RequestButton.module.css';

/**
 * Opens the request drawer and shows how many items it holds. Without
 * JavaScript it is a link to the booking form on the Home Collection page.
 */
export function RequestButton({ locale, fallbackHref }: { locale: Locale; fallbackHref: string }) {
  const d = getDict(locale);
  const { items, loaded } = useBasket();
  const { open } = useRequest();
  return (
    <a
      href={fallbackHref}
      className={s.button}
      aria-haspopup="dialog"
      onClick={(e) => {
        e.preventDefault();
        open(e.currentTarget);
      }}
    >
      <Icon name="note" />
      <span className={s.label}>{d.request.open}</span>
      {loaded && items.length > 0 && (
        <span className={`${s.count} num`} key={items.length}>
          {items.length}
          <span className="visually-hidden"> {d.basket.count(items.length)}</span>
        </span>
      )}
    </a>
  );
}
