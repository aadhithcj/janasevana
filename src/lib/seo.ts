import type { Metadata } from 'next';
import { confirmed } from '@config/confirm';
import { site } from '@config/site';
import { royalPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { href, type Locale, type PageId } from './paths';

export function siteOrigin(): string {
  return confirmed(site.siteUrl) ?? site.siteUrlFallback;
}

export function pageMetadata(locale: Locale, page: PageId): Metadata {
  const d = getDict(locale).meta;
  const title = page === 'home' ? d.siteTitle : `${d.pages[page]} | ${site.name[locale]}`;
  const description = page === 'home' ? d.siteDescription : d.descriptions[page as Exclude<PageId, 'home'>];
  return {
    metadataBase: new URL(siteOrigin()),
    title,
    description,
    alternates: {
      canonical: href(locale, page),
      languages: { en: href('en', page), ml: href('ml', page), 'x-default': href('en', page) },
    },
    openGraph: {
      title,
      description,
      locale: locale === 'ml' ? 'ml_IN' : 'en_IN',
      alternateLocale: locale === 'ml' ? 'en_IN' : 'ml_IN',
      siteName: site.name[locale],
      type: 'website',
      url: href(locale, page),
      images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name.en }],
    },
    formatDetection: { telephone: true, address: true, email: true },
  };
}

/** MedicalBusiness JSON-LD with verified facts only. */
export function businessJsonLd(locale: Locale): string {
  const a = site.address.en;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: site.name.en,
    alternateName: site.name.ml,
    slogan: site.lines.logoTagline,
    url: `${siteOrigin()}${href(locale, 'home')}`,
    logo: `${siteOrigin()}/brand/logo-full.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.building}, ${a.locality}`,
      addressLocality: a.city,
      addressRegion: a.region,
      addressCountry: 'IN',
    },
    telephone: site.phones.map((p) => p.tel),
    email: site.email,
    makesOffer: [
      {
        '@type': 'Offer',
        name: royalPackage.name.en,
        price: royalPackage.priceInr,
        priceCurrency: 'INR',
      },
    ],
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
