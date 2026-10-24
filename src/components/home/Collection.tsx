import Link from 'next/link';
import { site } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Steps } from '@/components/collection/Steps';
import { FastingNotice } from '@/components/collection/FastingNotice';
import { Confirmed } from '@/components/ui/Unconfirmed';
import s from './Collection.module.css';

/** Home collection as one horizontal flow, with the fasting notice and the honest area line beneath. */
export function Collection({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <section className={s.section} aria-labelledby="collection-title">
      <div className={`wrap ${s.inner}`}>
        <div data-reveal>
          <Steps locale={locale} headingLevel={2} headingId="collection-title" />
        </div>
        <div className={s.foot}>
          <FastingNotice locale={locale} />
          <div className={s.side}>
            <p className={s.area}>
              <Confirmed fact={site.homeCollectionArea} locale={locale} fallback={d.collection.area}>
                {(v) => v[locale]}
              </Confirmed>
            </p>
            <Link href={href(locale, 'homeCollection')} className={s.link}>
              {d.home.collectionLink}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
