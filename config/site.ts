/**
 * Janasevana Lab: business facts.
 * The owner edits this file, never the components. Anything marked
 * todo(...) stays hidden or shows "Call us to confirm" until it is replaced
 * with { status: 'confirmed', value: ... }.
 */
import { todo, type Confirmable } from './confirm';

export type Phone = {
  id: 'landline' | 'whatsapp' | 'mobile';
  display: string;
  tel: string;
  whatsapp: boolean;
};

export type Hours = { en: string; ml: string };

export const site = {
  name: { en: 'Janasevana Lab', ml: 'ജനസേവന ലാബ്' },

  address: {
    en: {
      building: 'Kattungal Building',
      locality: 'Kaichoondy Jn.',
      city: 'Alappuzha',
      region: 'Kerala',
    },
    ml: {
      building: 'കാട്ടുങ്ങൽ ബിൽഡിങ്',
      locality: 'കൈചൂണ്ടി ജം.',
      city: 'ആലപ്പുഴ',
      region: 'കേരളം',
    },
  },

  phones: [
    { id: 'landline', display: '0477 2288 413', tel: '+914772288413', whatsapp: false },
    { id: 'whatsapp', display: '+91 91884 90413', tel: '+919188490413', whatsapp: true },
    { id: 'mobile', display: '+91 96335 98413', tel: '+919633598413', whatsapp: false },
  ] satisfies Phone[],

  /** Digits only, country code first, as wa.me expects. */
  whatsappNumber: '919188490413',

  email: 'Janasevanalab313@gmail.com',

  /** Lines the lab uses itself. */
  lines: {
    logoTagline: 'Promoting Better Diagnostic Tools',
    automation: 'Laboratory automation and smart technology',
    homeVisit: 'The lab comes to your home',
    /** Shown once, quietly, in the footer only. */
    footerQuality: 'Quality laboratory equipments | Dedicated customer care | Warranty you can trust',
  },

  iso: 'ISO 9001:2015',

  /** Search link built from the address text. The exact pin needs the owner's confirmation. */
  directionsQuery: 'Kattungal Building, Kaichoondy Junction, Alappuzha, Kerala',

  hours: todo('Opening days and hours') as Confirmable<Hours>,
  mapPin: todo('Exact Google Maps pin or place link') as Confirmable<string>,
  homeCollectionArea: todo('Areas the collector visits') as Confirmable<Hours>,
  homeCollectionTimings: todo('Collection visit timings') as Confirmable<Hours>,
  reportDelivery: todo('How and when reports are delivered') as Confirmable<Hours>,
  discountDetails: todo('Which tests the 10%–50% discounts apply to') as Confirmable<Hours>,
  isoCertificate: todo('ISO certificate number, body and scope') as Confirmable<string>,
  photos: {
    storefront: todo('Photo of the lab front at Kaichoondy Jn.') as Confirmable<string>,
    team: todo('Photos of the team') as Confirmable<string>,
    collection: todo('Photo of a home collection visit') as Confirmable<string>,
  },
  /** Public address of the site. Placeholder domain until the owner confirms it. */
  siteUrl: todo('Live domain') as Confirmable<string>,
  siteUrlFallback: 'https://janasevana-lab.example',
} as const;

export function telHref(tel: string): string {
  return `tel:${tel}`;
}

export function directionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.directionsQuery)}`;
}
