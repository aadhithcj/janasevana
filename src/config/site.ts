/**
 * SITE CONFIGURATION: JANASEVANA LAB
 * 
 * Strict separation between VERIFIED FACTS and items that NEED OWNER CONFIRMATION.
 * All unconfirmed items use typed ConfirmationStatus markers so placeholders
 * can never accidentally render as verified facts.
 */

export type ConfirmationStatus<T> =
  | {
      readonly status: 'CONFIRMED';
      readonly value: T;
    }
  | {
      readonly status: 'TODO_CONFIRM';
      readonly note: string;
      readonly fallbackMessageEn: string;
      readonly fallbackMessageMl: string;
    };

export function isConfirmed<T>(
  item: ConfirmationStatus<T>
): item is { readonly status: 'CONFIRMED'; readonly value: T } {
  return item.status === 'CONFIRMED';
}

export function getFallbackMessage<T>(
  item: ConfirmationStatus<T>,
  lang: 'en' | 'ml' = 'en'
): string {
  if (item.status === 'TODO_CONFIRM') {
    return lang === 'ml' ? item.fallbackMessageMl : item.fallbackMessageEn;
  }
  return '';
}

export const googleMapsSearchUrl =
  'https://www.google.com/maps/search/?api=1&query=Janasevana+Lab+Kattungal+Building+Kaichoondy+Jn+Alappuzha';

export const siteConfig = {
  // VERIFIED FACTS (Exact verified data)
  name: 'Janasevana Lab',
  legalName: 'Janasevana Diagnostic Laboratory',
  shortName: 'Janasevana',
  
  address: {
    building: 'Kattungal Building',
    junction: 'Kaichoondy Junction',
    city: 'Alappuzha',
    district: 'Alappuzha',
    state: 'Kerala',
    country: 'India',
    pincode: '688007',
    full: 'Kattungal Building, Kaichoondy Jn., Alappuzha, Kerala',
    fullMl: 'കാട്ടുങ്കൽ ബിൽഡിംഗ്, കൈചൂണ്ടി ജംഗ്ഷൻ, ആലപ്പുഴ, കേരളം',
  },

  phones: {
    landline: '0477-2288413',
    landlineRaw: '04772288413',
    mobile1: '+91 91884 90413',
    mobile1Raw: '+919188490413',
    mobile2: '+91 96335 98413',
    mobile2Raw: '+919633598413',
    primaryCall: '+91 91884 90413',
    primaryCallRaw: '+919188490413',
  },

  whatsapp: {
    number: '919188490413',
    display: '+91 91884 90413',
    link: 'https://wa.me/919188490413',
  },

  email: 'Janasevanalab313@gmail.com',

  siteUrl: 'https://janasevanalab.com',

  // UNCONFIRMED ITEMS (Typed markers - helpers enforce honest fallback)
  tagline: {
    status: 'TODO_CONFIRM',
    note: 'Found tagline "... Promoting Better Diagnostic Tools" in brand image. Awaiting owner confirmation.',
    fallbackMessageEn: 'Diagnostic laboratory serving Alappuzha with care',
    fallbackMessageMl: 'ആലപ്പുഴയിൽ ആത്മാർത്ഥമായ പരിചരണത്തോടെയുള്ള രോഗനിർണ്ണയ ലബോറട്ടറി',
  } as ConfirmationStatus<string>,

  openingHours: {
    status: 'TODO_CONFIRM',
    note: 'Exact daily operating hours and Sunday schedule need owner confirmation.',
    fallbackMessageEn: 'Please call the lab (0477-2288413 / 91884 90413) to confirm daily hours.',
    fallbackMessageMl: 'പ്രവർത്തന സമയങ്ങൾ അറിയുവാൻ ലബോറട്ടറിയുമായി ബന്ധപ്പെടുക (0477-2288413 / 91884 90413).',
  } as ConfirmationStatus<{
    weekdays: string;
    sundays: string;
  }>,

  googleMapsPin: {
    status: 'TODO_CONFIRM',
    note: 'Exact Google Maps Plus Code / Place ID pending owner confirmation.',
    fallbackMessageEn: 'Directions to Kattungal Building, Kaichoondy Jn., Alappuzha',
    fallbackMessageMl: 'കാട്ടുങ്കൽ ബിൽഡിംഗ്, കൈചൂണ്ടി ജംഗ്ഷൻ, ആലപ്പുഴ',
  } as ConfirmationStatus<string>,

  homeCollection: {
    status: 'TODO_CONFIRM',
    note: 'Home collection service area boundaries, booking notice and slot schedules await owner confirmation.',
    fallbackMessageEn: 'Home sample collection availability depends on area. Please call or WhatsApp us to enquire.',
    fallbackMessageMl: 'വീട്ടിൽ നിന്നുള്ള സാമ്പിൾ ശേഖരണം: ലഭ്യമായ സ്ഥലങ്ങൾ അറിയുവാൻ ഞങ്ങളെ വിളിക്കുകയോ വാട്സ്ആപ്പ് ചെയ്യുകയോ ചെയ്യുക.',
  } as ConfirmationStatus<{
    available: boolean;
    coveredAreas: string[];
    noticeHours: number;
  }>,

  isoCertification: {
    status: 'TODO_CONFIRM',
    note: 'ISO 9001:2015 certification details and certificate number require owner confirmation.',
    fallbackMessageEn: '',
    fallbackMessageMl: '',
  } as ConfirmationStatus<string>,

  paramedicalRegistration: {
    status: 'TODO_CONFIRM',
    note: 'Paramedical council registration number requires owner confirmation.',
    fallbackMessageEn: '',
    fallbackMessageMl: '',
  } as ConfirmationStatus<string>,

  reportDelivery: {
    status: 'TODO_CONFIRM',
    note: 'Exact report delivery options (printed counter pickup, WhatsApp dispatch) require owner confirmation.',
    fallbackMessageEn: 'Reports are collected directly at the lab counter or coordinated via WhatsApp. Please call for status.',
    fallbackMessageMl: 'റിപ്പോർട്ടുകൾ ലാബ് കൗണ്ടറിൽ നിന്നോ വാട്സ്ആപ്പ് വഴിയോ ലഭ്യമാക്കാം. വിവരങ്ങൾക്ക് വിളിക്കുക.',
  } as ConfirmationStatus<{
    counterPickup: boolean;
    whatsappDelivery: boolean;
  }>,

  realPhotographs: {
    status: 'TODO_CONFIRM',
    note: 'Laboratory exterior and staff photos require owner confirmation.',
    fallbackMessageEn: '',
    fallbackMessageMl: '',
  } as ConfirmationStatus<boolean>,
} as const;
