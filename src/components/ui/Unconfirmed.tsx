import { confirmed, type Confirmable } from '@config/confirm';
import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import s from './Unconfirmed.module.css';

/**
 * Renders a fact only once the owner has confirmed it in config/.
 * Until then it shows an honest "Call us to confirm." with the number,
 * styled as a sentence, never as data.
 */
export function Confirmed<T>({
  fact,
  locale,
  children,
  fallback,
}: {
  fact: Confirmable<T>;
  locale: Locale;
  children: (value: T) => React.ReactNode;
  fallback?: string;
}) {
  const value = confirmed(fact);
  if (value !== null) return <>{children(value)}</>;
  const d = getDict(locale);
  const landline = site.phones[0];
  return (
    <span className={s.pending}>
      {fallback ?? d.common.unconfirmed}{' '}
      <a href={telHref(landline.tel)} className="num">
        {landline.display}
      </a>
    </span>
  );
}
