'use client';

import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { useBasket } from '@/components/booking/BasketContext';
import s from './ActionBar.module.css';

/**
 * Phones only: Call and WhatsApp, plus "Review (n)" in the same bar once a
 * selection exists (never a second fixed bar). Body padding equals the
 * bar's height, and the bar slides away while a form field has focus.
 */
export function ActionBar({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.shell;
  const { items, loaded } = useBasket();
  const landline = site.phones[0];
  const count = loaded ? items.length : 0;
  return (
    <nav className={`${s.bar} ${count ? s.withReview : ''}`} aria-label={t.actionBarLabel} data-print="hide">
      <a href={telHref(landline.tel)} className={`${s.item} ${s.call}`}>
        <Icon name="phone" />
        <span>{t.call}</span>
      </a>
      <a href={whatsappUrl(generalMessage(locale))} className={`${s.item} ${s.wa}`} target="_blank" rel="noopener">
        <Icon name="chat" />
        <span>{t.whatsapp}</span>
      </a>
      {count > 0 && (
        <a href={href(locale, 'homeCollection', 'book')} className={`${s.item} ${s.review}`}>
          <span className={`${s.count} num`} key={count}>
            {count}
          </span>
          <span>{d.basket.review}</span>
        </a>
      )}
    </nav>
  );
}
