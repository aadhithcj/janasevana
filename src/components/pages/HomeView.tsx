import type { Locale } from '@/lib/paths';
import { Hero } from '@/components/home/Hero';
import { QuickActions } from '@/components/home/QuickActions';
import { PackagesBand } from '@/components/home/PackagesBand';
import { Services } from '@/components/home/Services';
import { Collection } from '@/components/home/Collection';
import { TeamQuality } from '@/components/home/TeamQuality';
import { ContactBand } from '@/components/home/ContactBand';

export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <QuickActions locale={locale} />
      <PackagesBand locale={locale} />
      <Services locale={locale} />
      <Collection locale={locale} />
      <TeamQuality locale={locale} />
      <ContactBand locale={locale} />
    </>
  );
}
