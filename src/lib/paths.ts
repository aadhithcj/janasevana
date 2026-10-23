export type Locale = 'en' | 'ml';

export type PageId = 'home' | 'packages' | 'tests' | 'homeCollection' | 'about' | 'contact';

const slugs: Record<PageId, string> = {
  home: '/',
  packages: '/packages/',
  tests: '/tests/',
  homeCollection: '/home-collection/',
  about: '/about/',
  contact: '/contact/',
};

export const pageIds = Object.keys(slugs) as PageId[];

export function href(locale: Locale, page: PageId, hash?: string): string {
  const base = locale === 'ml' ? `/ml${slugs[page]}` : slugs[page];
  return hash ? `${base}#${hash}` : base;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ml' : 'en';
}
