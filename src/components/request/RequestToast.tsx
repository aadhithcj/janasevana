'use client';

import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { useRequest } from './RequestContext';
import s from './RequestToast.module.css';

/** Short visual confirmation after an add; the polite live region already announces it. */
export function RequestToast({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const { toast, open } = useRequest();
  if (!toast) return null;
  return (
    <div className={s.toast} key={toast.key} data-print="hide">
      <Icon name="check" />
      <span className={s.text}>{toast.text}</span>
      <button type="button" className={s.review} onClick={(e) => open(e.currentTarget)}>
        {d.request.review}
      </button>
    </div>
  );
}
