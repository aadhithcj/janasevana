import { directionsUrl, site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { ActionLink } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { Confirmed } from '@/components/ui/Unconfirmed';
import s from './ContactDetails.module.css';

/** Address, every number, WhatsApp, email, directions and hours. Used on the teal band and the contact page. */
/** mapNearby: the map's own caption already says the pin is a search, so the note is left out. */
export function ContactDetails({ locale, tone = 'field', mapNearby = false }: { locale: Locale; tone?: 'field' | 'paper'; mapNearby?: boolean }) {
  const d = getDict(locale);
  const a = site.address[locale];
  return (
    <div className={`${s.details} ${tone === 'paper' ? s.paper : s.field}`}>
      <address className={s.address}>
        <span className={s.building}>{a.building},</span>{' '}
        <span className={s.building}>{a.locality}</span>
        <span className={s.city}>
          {a.city}, {a.region}
        </span>
      </address>

      <div className={s.actions}>
        <ActionLink href={directionsUrl()} variant={tone === 'field' ? 'field' : 'primary'} icon="pin" external>
          {d.common.directions}
        </ActionLink>
        <ActionLink href={whatsappUrl(generalMessage(locale))} variant="whatsapp" icon="chat" external>
          WhatsApp
        </ActionLink>
      </div>
      {!mapNearby && <p className={s.note}>{d.common.directionsNote}</p>}

      <dl className={s.list}>
        {site.phones.map((p) => (
          <div key={p.id} className={s.row}>
            <dt>{p.id === 'landline' ? d.common.landline : p.whatsapp ? d.common.whatsappAndCall : d.common.mobile}</dt>
            <dd>
              <a href={telHref(p.tel)} className={`${s.big} num`}>
                <Icon name="phone" />
                {p.display}
              </a>
            </dd>
          </div>
        ))}
        <div className={s.row}>
          <dt>{d.common.email}</dt>
          <dd>
            <a href={`mailto:${site.email}`} className={s.email}>
              {site.email.toLowerCase()}
            </a>
          </dd>
        </div>
        <div className={s.row}>
          <dt>{d.common.hours}</dt>
          <dd>
            <Confirmed fact={site.hours} locale={locale}>
              {(v) => v[locale]}
            </Confirmed>
          </dd>
        </div>
      </dl>
    </div>
  );
}
