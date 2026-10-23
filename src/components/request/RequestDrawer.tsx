'use client';

import { useEffect, useRef } from 'react';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { useBasket } from '@/components/booking/BasketContext';
import { useRequest } from './RequestContext';
import { RequestPanel } from './RequestPanel';
import s from './RequestDrawer.module.css';

/**
 * The request as a sheet: bottom sheet on phones, right-hand sheet on wide
 * screens. Native modal <dialog>: the page behind is inert (focus trap),
 * Escape closes it, and focus returns to whatever opened it.
 */
export function RequestDrawer({ locale, testsHref }: { locale: Locale; testsHref: string }) {
  const d = getDict(locale);
  const { isOpen, close, openerRef } = useRequest();
  const { items } = useBasket();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClose = () => {
      close();
      openerRef.current?.focus();
    };
    // Tapping the dimmed backdrop closes the sheet.
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener('close', onClose);
    dialog.addEventListener('click', onClick);
    return () => {
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('click', onClick);
    };
  }, [close, openerRef]);

  return (
    <dialog ref={ref} className={s.dialog} aria-labelledby="request-title">
      <div className={s.sheet}>
        <div className={s.top}>
          <h2 id="request-title" className={s.title}>
            {d.request.title}
            <span className={`${s.count} num`}>{items.length}</span>
          </h2>
          <button type="button" className={s.close} onClick={() => ref.current?.close()}>
            <Icon name="close" />
            <span>{d.request.close}</span>
          </button>
        </div>
        {isOpen && <RequestPanel locale={locale} testsHref={testsHref} titleId="request-title" />}
      </div>
    </dialog>
  );
}
