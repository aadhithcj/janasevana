import { en, type Dict } from './en';
import { ml } from './ml';
import type { Locale } from '@/lib/paths';

export type { Dict };

export function getDict(locale: Locale): Dict {
  return locale === 'ml' ? ml : en;
}
