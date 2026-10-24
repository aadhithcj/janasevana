'use client';

import { useBasket, type BasketItem } from '@/components/booking/BasketContext';
import { Icon } from '@/components/ui/Icon';
import s from './AddToBooking.module.css';

/** Add to booking / Added + Remove. The live region in the basket announces each change. */
export function AddToBooking({
  item,
  labels,
}: {
  item: BasketItem;
  labels: { add: string; added: string; remove: string; addedLive: string; removedLive: string };
}) {
  const basket = useBasket();
  const added = basket.has(item.id);
  if (added) {
    return (
      <button
        type="button"
        className={s.added}
        onClick={() => {
          basket.remove(item.id);
          basket.announce(labels.removedLive);
        }}
      >
        <Icon name="check" className={s.check} />
        <span>{labels.added}</span>
        <span className={s.remove}>
          {labels.remove}
          <span className="visually-hidden">: {item.name}</span>
        </span>
      </button>
    );
  }
  return (
    <button
      type="button"
      className={s.add}
      onClick={() => {
        basket.add(item);
        basket.announce(labels.addedLive);
      }}
    >
      <Icon name="plus" />
      <span>
        {labels.add}
        <span className="visually-hidden">: {item.name}</span>
      </span>
    </button>
  );
}
