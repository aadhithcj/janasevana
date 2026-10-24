import Link from 'next/link';
import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { generalMessage, whatsappUrl } from '@/lib/whatsapp';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Icon, type IconName } from '@/components/ui/Icon';
import { FastingNotice } from '@/components/collection/FastingNotice';
import { Confirmed } from '@/components/ui/Unconfirmed';
import s from './Collection.module.css';

const stepIcons: IconName[] = ['chat', 'pin', 'note'];

/**
 * How home collection works, as one mist panel: the title and the promise,
 * three numbered step cards on a line (a real sequence), then the fasting
 * notice beside a deep booking card with the honest area line.
 */
export function Collection({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const landline = site.phones[0];
  return (
    <section className={s.section} aria-labelledby="collection-title">
      <div className="wrap">
        <div className={s.panel}>
          <div className={s.head}>
            <h2 id="collection-title" className={s.title}>
              {d.steps.title}
            </h2>
            <p className={s.lede}>{d.collection.lede}</p>
          </div>

          <ol className={s.steps}>
            {d.steps.items.map((step, i) => (
              <li key={step.title} className={s.step} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <span className={s.marker} aria-hidden="true">
                  <span className={`${s.num} num`}>{i + 1}</span>
                </span>
                <span className={s.icon} aria-hidden="true">
                  <Icon name={stepIcons[i]} />
                </span>
                <span className={s.stepTitle}>{step.title}</span>
                <span className={s.body}>{step.body}</span>
              </li>
            ))}
          </ol>

          <div className={s.foot}>
            <FastingNotice locale={locale} />
            <div className={s.book} data-reveal>
              <p className={s.bookTitle}>{d.front.collectTitle}</p>
              <p className={s.area}>
                <Confirmed fact={site.homeCollectionArea} locale={locale} fallback={d.collection.area}>
                  {(v) => v[locale]}
                </Confirmed>
              </p>
              <div className={s.actions}>
                <ArrowButton href={telHref(landline.tel)} variant="tint">
                  <span className="num">{d.common.callNumber(landline.display)}</span>
                </ArrowButton>
                <ArrowButton href={whatsappUrl(generalMessage(locale))} variant="whatsapp" external>
                  {d.home.whatsappCta}
                </ArrowButton>
              </div>
              <Link href={href(locale, 'homeCollection')} className={s.link}>
                {d.home.collectionLink}
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
