import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { ActionLink } from '@/components/ui/Action';

export function MenuExtras({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const landline = site.phones[0];
  return (
    <>
      <ActionLink href={href(locale, 'homeCollection', 'book')} block>
        {d.shell.book}
      </ActionLink>
      <ActionLink href={telHref(landline.tel)} variant="outline" icon="phone" block>
        <span className="num">{landline.display}</span>
      </ActionLink>
    </>
  );
}
