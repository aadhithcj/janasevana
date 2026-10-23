import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { MenuTrigger } from './Menu';
import s from './ActionBar.module.css';

/**
 * Phones only. Body padding equals the bar's height, so it never covers
 * content, and it slides away while a form field has focus.
 */
export function ActionBar({ locale }: { locale: Locale }) {
  const t = getDict(locale).shell;
  const landline = site.phones[0];
  return (
    <nav className={s.bar} aria-label={t.actionBarLabel} data-print="hide">
      <a href={telHref(landline.tel)} className={`${s.item} ${s.call}`}>
        <Icon name="phone" />
        <span>{t.call}</span>
      </a>
      <a href={whatsappUrl(generalMessage(locale))} className={`${s.item} ${s.wa}`} target="_blank" rel="noopener">
        <Icon name="chat" />
        <span>{t.whatsapp}</span>
      </a>
      <MenuTrigger label={t.menu} className={`${s.item} ${s.menu}`} />
    </nav>
  );
}
