import { confirmed } from '@config/confirm';
import { site } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { Steps } from '@/components/collection/Steps';
import { FastingNotice } from '@/components/collection/FastingNotice';
import { BookingSection } from '@/components/booking/BookingSection';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { Confirmed } from '@/components/ui/Unconfirmed';
import s from './HomeCollectionView.module.css';

export function HomeCollectionView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const timings = confirmed(site.homeCollectionTimings);
  return (
    <>
      <PageHead title={d.collection.h1} lede={d.collection.lede} />
      <div className={`wrap ${s.grid}`}>
        <div className={s.main}>
          <Steps locale={locale} headingLevel={2} headingId="steps-title" />
          <FastingNotice locale={locale} headingLevel={2} />
        </div>
        <aside className={s.side} aria-labelledby="area-title">
          <h2 id="area-title" className={s.sideTitle}>
            {d.collection.areaTitle}
          </h2>
          <p>
            <Confirmed fact={site.homeCollectionArea} locale={locale} fallback={d.collection.area}>
              {(v) => v[locale]}
            </Confirmed>
          </p>
          {/* Timings show only once confirmed; until then the line above already asks people to call. */}
          {timings && <p>{timings[locale]}</p>}
          <PhotoSlot photo={site.photos.collection} caption={d.common.photoSlot.collection} alt="" ratio="4 / 3" />
        </aside>
      </div>
      <BookingSection locale={locale} title={d.collection.bookingTitle} />
    </>
  );
}
