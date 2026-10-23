'use client';

import type { BasketItem } from '@/components/booking/BasketContext';
import { Icon } from '@/components/ui/Icon';
import { actionClass } from '@/components/ui/Action';
import { useRequest } from './RequestContext';

/**
 * "Book this package": adds the package to the request and opens the
 * drawer. Without JavaScript it is a link to the booking form with the
 * package pre-filled.
 */
export function AddToRequest({
  item,
  label,
  addedMessage,
  fallbackHref,
  variant = 'outline',
  block,
  className,
}: {
  item: BasketItem;
  label: string;
  addedMessage: string;
  fallbackHref: string;
  variant?: 'primary' | 'outline' | 'petrol' | 'field';
  block?: boolean;
  className?: string;
}) {
  const { addItem } = useRequest();
  return (
    <a
      href={fallbackHref}
      className={actionClass({ variant, block, className })}
      onClick={(e) => {
        e.preventDefault();
        addItem(item, addedMessage, true);
      }}
    >
      <Icon name="plus" />
      <span>{label}</span>
    </a>
  );
}
