import { site } from '../../config/site';
import type { Locale } from './paths';

export type BookingDetails = {
  patientName: string;
  bookerName?: string;
  where: 'home' | 'lab';
  area?: string;
  time?: string;
  packages: string[];
  tests: string[];
};

const words = {
  en: {
    greeting: 'Hello Janasevana Lab,',
    wantHome: 'I would like to book a free home sample collection.',
    wantLab: 'I would like to book tests at the lab.',
    patient: 'Patient',
    booker: 'Booked by',
    area: 'Area / landmark',
    time: 'Preferred time',
    packages: 'Package',
    tests: 'Tests',
    closing: 'Please confirm the details and any fasting instructions.',
  },
  ml: {
    greeting: 'നമസ്കാരം ജനസേവന ലാബ്,',
    wantHome: 'വീട്ടിൽ വന്ന് സാമ്പിൾ എടുക്കുന്ന സൗജന്യ സേവനം ബുക്ക് ചെയ്യണം.',
    wantLab: 'ലാബിൽ വന്ന് ടെസ്റ്റ് ചെയ്യാൻ ബുക്ക് ചെയ്യണം.',
    patient: 'പേര് (ടെസ്റ്റ് ചെയ്യേണ്ട ആൾ)',
    booker: 'ബുക്ക് ചെയ്യുന്നത്',
    area: 'സ്ഥലം / അടയാളം',
    time: 'സൗകര്യമുള്ള സമയം',
    packages: 'പാക്കേജ്',
    tests: 'ടെസ്റ്റുകൾ',
    closing: 'വിവരങ്ങളും ഫാസ്റ്റിംഗ് നിർദ്ദേശങ്ങളും ദയവായി ഉറപ്പിച്ചു തരിക.',
  },
};

export function bookingMessage(d: BookingDetails, locale: Locale): string {
  const w = words[locale];
  const lines = [w.greeting, d.where === 'home' ? w.wantHome : w.wantLab, ''];
  lines.push(`${w.patient}: ${d.patientName.trim()}`);
  if (d.bookerName?.trim()) lines.push(`${w.booker}: ${d.bookerName.trim()}`);
  if (d.where === 'home' && d.area?.trim()) lines.push(`${w.area}: ${d.area.trim()}`);
  if (d.time?.trim()) lines.push(`${w.time}: ${d.time.trim()}`);
  if (d.packages.length) lines.push(`${w.packages}: ${d.packages.join(', ')}`);
  if (d.tests.length) lines.push(`${w.tests}: ${d.tests.join(', ')}`);
  lines.push('', w.closing);
  return lines.join('\n');
}

/** Short enquiry used by the package and offer slips, with no form. */
export function enquiryMessage(item: string, locale: Locale): string {
  return locale === 'ml'
    ? `നമസ്കാരം ജനസേവന ലാബ്,\n${item} ബുക്ക് ചെയ്യണം. വീട്ടിൽ വന്ന് സാമ്പിൾ എടുക്കാമോ? ഫാസ്റ്റിംഗ് നിർദ്ദേശങ്ങളും പറഞ്ഞു തരിക.`
    : `Hello Janasevana Lab,\nI would like to book the ${item}, with free home sample collection. Please tell me the fasting instructions.`;
}

export function generalMessage(locale: Locale): string {
  return locale === 'ml' ? 'നമസ്കാരം ജനസേവന ലാബ്,\n' : 'Hello Janasevana Lab,\n';
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
