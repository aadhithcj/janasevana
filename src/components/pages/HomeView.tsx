import type { Locale } from '@/lib/paths';
import { Hero } from '@/components/home/Hero';
import { HomePackages } from '@/components/home/HomePackages';
import { Categories } from '@/components/home/Categories';
import { Capabilities } from '@/components/home/Capabilities';
import { Collection } from '@/components/home/Collection';
import { TeamQuality } from '@/components/home/TeamQuality';
import { HomeContact } from '@/components/home/HomeContact';

/** Home: promise and offer, prices, entry points, capabilities, collection, people, then one contact section. */
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <HomePackages locale={locale} />
      <Categories locale={locale} />
      <Capabilities locale={locale} />
      <Collection locale={locale} />
      <TeamQuality locale={locale} />
      <HomeContact locale={locale} />
    </>
  );
}
