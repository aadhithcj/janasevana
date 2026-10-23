import Link from 'next/link';
import { site } from '@config/site';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Steps } from '@/components/collection/Steps';
import { FastingNotice } from '@/components/collection/FastingNotice';
import { Confirmed } from '@/components/ui/Unconfirmed';
import s from './Collection.module.css';

export function Collection({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <section className={s.section} aria-labelledby="collection-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.lead} data-reveal>
          <h2 id="collection-title" className={s.heading}>
            {d.home.collectionTitle}
          </h2>
          <p className={s.lede}>{d.home.collectionLede}</p>
          <p className={s.area}>
            <Confirmed fact={site.homeCollectionArea} locale={locale} fallback={d.collection.area}>
              {(v) => v[locale]}
            </Confirmed>
          </p>
        </div>
        <div className={s.main}>
          <Steps locale={locale} />
          <FastingNotice locale={locale} />
          <Link href={href(locale, 'homeCollection')} className={s.link}>
            {d.home.collectionLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
