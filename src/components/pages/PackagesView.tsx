import { cardioPackage, royalPackage } from '@config/packages';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { PackageSection } from '@/components/packages/PackageSection';
import s from './PackagesView.module.css';

export function PackagesView({ locale }: { locale: Locale }) {
  const d = getDict(locale).packages;
  return (
    <>
      <PageHead title={d.h1} lede={d.intro} tone="petrol" />
      {/* The dated offer leads while it runs; once it ends, CSS moves it below the standing package. */}
      <div className={s.stack}>
        <div className={s.dated}>
          <PackageSection pkg={cardioPackage} locale={locale} />
        </div>
        <div className={s.standing}>
          <PackageSection pkg={royalPackage} locale={locale} />
        </div>
      </div>
    </>
  );
}
