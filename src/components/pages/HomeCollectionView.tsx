import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { Collection } from '@/components/home/Collection';
import { BookingSection } from '@/components/booking/BookingSection';

export function HomeCollectionView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <>
      <PageHead title={d.collection.h1} lede={d.collection.lede} />
      <Collection locale={locale} onPage />
      <BookingSection locale={locale} title={d.collection.bookingTitle} />
    </>
  );
}
