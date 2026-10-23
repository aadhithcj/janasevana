import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { TestDirectory } from '@/components/tests/TestDirectory';
import { BookingSection } from '@/components/booking/BookingSection';
import s from './TestsView.module.css';

export function TestsView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <>
      <PageHead title={d.tests.h1} lede={d.tests.intro} />
      <div className={`wrap ${s.body}`}>
        <TestDirectory
          locale={locale}
          packagesHref={href(locale, 'packages')}
          bookHref="#book"
        />
      </div>
      <BookingSection locale={locale} />
    </>
  );
}
