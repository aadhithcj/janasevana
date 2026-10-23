/**
 * The two offers, exactly as the lab published them.
 * Prices and validity come only from the lab. Do not add a validity period
 * to an offer that has none.
 */

type L = { en: string; ml: string };

export type PackageTest = {
  /** Matches an id in config/tests.ts so the directory and packages agree. */
  testId: string;
  name: string;
  /** Sub-parameters shown when the row expands. */
  parameters?: string[];
  /** Plain-language line, only where the lab wrote one. */
  about?: L;
};

export type OfferWindow = {
  /** Inclusive calendar dates in Asia/Kolkata. */
  startDate: string;
  endDate: string;
};

export type HealthPackage = {
  id: 'cardio' | 'royal';
  label: L;
  name: L;
  /** Short name used in the WhatsApp message and the basket. */
  shortName: string;
  priceInr: number;
  freeHomeCollection: true;
  window?: OfferWindow;
  tests: PackageTest[];
  /** Mandatory notice, rendered permanently wherever the package appears. */
  notice?: L;
};

export const cardioPackage: HealthPackage = {
  id: 'cardio',
  label: { en: 'Anniversary Special', ml: 'ആനിവേഴ്സറി സ്പെഷ്യൽ' },
  name: { en: 'Cardiovascular Health Package', ml: 'കാർഡിയോവാസ്കുലർ ഹെൽത്ത് പാക്കേജ്' },
  shortName: 'Cardiovascular Health Package',
  priceInr: 1299,
  freeHomeCollection: true,
  window: { startDate: '2026-10-23', endDate: '2026-11-15' },
  tests: [
    {
      testId: 'fbs',
      name: 'Fasting Blood Sugar (FBS)',
      about: {
        en: 'Measures blood glucose after fasting. Helps screen for diabetes and assess blood sugar levels.',
        ml: 'ഫാസ്റ്റിംഗിന് ശേഷം രക്തത്തിലെ ഗ്ലൂക്കോസ് (ഷുഗർ) അളക്കുന്നു. പ്രമേഹം ഉണ്ടോ എന്ന് നോക്കാനും ഷുഗർ നില അറിയാനും സഹായിക്കുന്നു.',
      },
    },
    {
      testId: 'lipid',
      name: 'Fasting Lipid Profile',
      parameters: ['Total cholesterol', 'HDL', 'LDL', 'VLDL', 'Triglycerides', 'TC/HDL ratio', 'LDL/HDL ratio'],
      about: {
        en: 'Measures cholesterol and triglycerides to assess cardiovascular risk.',
        ml: 'കൊളസ്ട്രോളും ട്രൈഗ്ലിസറൈഡും അളന്ന് ഹൃദ്രോഗ സാധ്യത വിലയിരുത്താൻ സഹായിക്കുന്നു.',
      },
    },
    {
      testId: 'lpa',
      name: 'Lipoprotein(a), Lp(a)',
      about: {
        en: 'Measures a largely inherited lipoprotein associated with increased cardiovascular risk.',
        ml: 'പ്രധാനമായും പാരമ്പര്യമായി ലഭിക്കുന്ന ഒരു ലിപ്പോപ്രോട്ടീൻ അളക്കുന്നു. ഇത് കൂടുതലാകുന്നത് ഹൃദ്രോഗ സാധ്യത കൂടുന്നതുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു.',
      },
    },
    {
      testId: 'hscrp',
      name: 'hs-CRP (high-sensitivity C-reactive protein)',
      about: {
        en: 'Measures an inflammation marker that can help assess cardiovascular risk alongside other factors.',
        ml: 'ശരീരത്തിലെ നീർക്കെട്ട് (ഇൻഫ്ലമേഷൻ) കാണിക്കുന്ന ഒരു മാർക്കർ അളക്കുന്നു. മറ്റു ഘടകങ്ങളോടൊപ്പം ഹൃദ്രോഗ സാധ്യത വിലയിരുത്താൻ ഇത് സഹായിക്കും.',
      },
    },
  ],
  notice: {
    en: 'These tests can help assess risk, but they cannot by themselves confirm whether someone has heart disease. Please confirm fasting instructions with the lab before booking.',
    ml: 'ഈ ടെസ്റ്റുകൾ ഹൃദ്രോഗ സാധ്യത വിലയിരുത്താൻ സഹായിക്കും. എന്നാൽ ഒരാൾക്ക് ഹൃദ്രോഗം ഉണ്ടോ എന്ന് ഇവ കൊണ്ടു മാത്രം ഉറപ്പിക്കാൻ കഴിയില്ല. ബുക്ക് ചെയ്യുന്നതിനു മുമ്പ് ഫാസ്റ്റിംഗ് നിർദ്ദേശങ്ങൾ ലാബിൽ വിളിച്ച് ഉറപ്പാക്കുക.',
  },
};

export const royalPackage: HealthPackage = {
  id: 'royal',
  label: { en: 'Special Offer', ml: 'സ്പെഷ്യൽ ഓഫർ' },
  name: { en: 'Royal Package', ml: 'റോയൽ പാക്കേജ്' },
  shortName: 'Royal Package',
  priceInr: 2000,
  freeHomeCollection: true,
  tests: [
    {
      testId: 'cbc',
      name: 'Complete Blood Count',
      parameters: ['Hb', 'WBC', 'Neutrophils', 'Lymphocytes', 'Monocytes', 'Eosinophils', 'Basophils', 'Platelets', 'MCV', 'MCH', 'MCHC', 'RDW'],
    },
    { testId: 'esr', name: 'ESR' },
    { testId: 'aec', name: 'Absolute Eosinophil Count (AEC)' },
    { testId: 'glucose', name: 'Glucose (fasting / random)' },
    {
      testId: 'lipid',
      name: 'Lipid Profile',
      parameters: ['Total cholesterol', 'HDL', 'Triglycerides', 'LDL', 'VLDL', 'TC/HDL ratio', 'LDL/HDL ratio'],
    },
    { testId: 'lft', name: 'Total Bilirubin' },
    { testId: 'lft', name: 'SGOT / AST' },
    { testId: 'lft', name: 'SGPT / ALT' },
    { testId: 'creatinine', name: 'Serum Creatinine' },
    { testId: 'uric', name: 'Uric Acid' },
    { testId: 'electrolytes', name: 'Electrolytes', parameters: ['Sodium', 'Potassium', 'Chloride'] },
    { testId: 'tsh', name: 'Thyroid Stimulating Hormone (TSH)' },
    { testId: 'vitd', name: 'Vitamin D' },
    { testId: 'calcium', name: 'Calcium' },
    { testId: 'urine', name: 'Urine Routine Examination (URE)' },
    {
      testId: 'acr',
      name: 'Urine Albumin Creatinine Ratio (ACR)',
      about: {
        en: 'Detects early kidney damage before symptoms appear.',
        ml: 'ലക്ഷണങ്ങൾ കാണുന്നതിനു മുമ്പേ വൃക്കയ്ക്ക് (കിഡ്നി) ഉണ്ടാകുന്ന തുടക്കത്തിലെ തകരാർ കണ്ടെത്തുന്നു.',
      },
    },
  ],
};

export const packages: HealthPackage[] = [cardioPackage, royalPackage];

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
