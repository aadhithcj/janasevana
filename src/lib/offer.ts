import type { OfferWindow } from '../../config/packages';

/** When this module was evaluated: the build, for pre-rendered HTML. */
export const BUILD_TIME = Date.now();

export type OfferState = 'upcoming' | 'live' | 'ended';

/** IST has no daylight saving, so a fixed +05:30 offset is exact. */
const IST = '+05:30';

export function offerBounds(window: OfferWindow): { start: number; end: number } {
  return {
    start: Date.parse(`${window.startDate}T00:00:00${IST}`),
    // The end date is inclusive: the offer runs until midnight after it.
    end: Date.parse(`${window.endDate}T00:00:00${IST}`) + 24 * 60 * 60 * 1000,
  };
}

export function offerState(window: OfferWindow, now: number): OfferState {
  const { start, end } = offerBounds(window);
  if (now < start) return 'upcoming';
  if (now < end) return 'live';
  return 'ended';
}

/**
 * Runs in <head> before first paint, so the page never shows a stale offer
 * and React never sees a state change (no hydration mismatch). It only sets
 * an attribute on <html>; CSS shows or hides the matching blocks.
 * `?preview-date=YYYY-MM-DD` (or `YYYY-MM-DDTHH:MM`, read as IST) lets the owner check how the page will look on
 * another day.
 */
export function offerScript(window: OfferWindow): string {
  const { start, end } = offerBounds(window);
  return `(function(){try{var n=Date.now(),p=new URLSearchParams(location.search).get('preview-date');if(p&&/^\\d{4}-\\d{2}-\\d{2}$/.test(p))n=Date.parse(p+'T12:00:00${IST}');else if(p&&/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$/.test(p))n=Date.parse(p+':00${IST}');document.documentElement.setAttribute('data-offer',n<${start}?'upcoming':n<${end}?'live':'ended')}catch(e){}})();`;
}

export function formatDate(iso: string, locale: 'en' | 'ml'): string {
  const d = new Date(`${iso}T12:00:00${IST}`);
  const parts = new Intl.DateTimeFormat(locale === 'ml' ? 'ml-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  // Day month year in both languages, as people write it in Kerala.
  return `${get('day')} ${get('month')} ${get('year')}`;
}
