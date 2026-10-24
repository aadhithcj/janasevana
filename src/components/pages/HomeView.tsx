import type { Locale } from '@/lib/paths';
import { Hero } from '@/components/home/Hero';
import { Search } from '@/components/home/Search';
import { Departments } from '@/components/home/Departments';
import { HomePackages } from '@/components/home/HomePackages';
import { Collection } from '@/components/home/Collection';
import { TeamQuality } from '@/components/home/TeamQuality';
import { HomeContact } from '@/components/home/HomeContact';

/** Home: the mist field and offer slip, search, departments, packages, collection, the team panel, then one contact block. */
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Search locale={locale} />
      <Departments locale={locale} />
      <HomePackages locale={locale} />
      <Collection locale={locale} />
      <TeamQuality locale={locale} />
      <HomeContact locale={locale} />
    </>
  );
}
