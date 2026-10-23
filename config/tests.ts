/**
 * Test directory, built only from tests evidenced on the lab's reports and
 * packages. Methods and sample types appear only where the report states
 * them (or for urine tests, where the sample is self-evident). Anything
 * missing renders as "Ask the lab".
 */

type L = { en: string; ml: string };

export type DepartmentId =
  | 'haematology'
  | 'biochemistry'
  | 'serology'
  | 'clinical-pathology'
  | 'packages'
  | 'other';

export type Parameter = { name: string; method?: string };

export type Test = {
  id: string;
  name: string;
  department: DepartmentId;
  kind: 'test' | 'package' | 'service' | 'category';
  parameters?: Parameter[];
  /** Method for the whole test, where the report states one. */
  method?: string;
  sample?: 'serum' | 'urine';
  /** Only 'fasting' is confirmed, and only for FBS and the fasting lipid profile. */
  prep?: 'fasting';
  about?: L;
  /** Offered as part of these packages. */
  inPackages?: ('cardio' | 'royal')[];
  /** Evidenced only through the packages, not as a standalone report line. */
  viaPackagesOnly?: boolean;
  /** The lab has supplied nothing beyond the name. */
  nameOnly?: boolean;
  /** Extra words people search with (English and Malayalam). */
  keywords?: string[];
};

export const departments: DepartmentId[] = [
  'haematology',
  'biochemistry',
  'serology',
  'clinical-pathology',
  'packages',
  'other',
];

const SERUM = 'serum' as const;
const URINE = 'urine' as const;

export const tests: Test[] = [
  // Haematology
  {
    id: 'cbc',
    name: 'Complete Haemogram (CBC)',
    department: 'haematology',
    kind: 'test',
    parameters: [
      { name: 'Haemoglobin (Hb)' },
      { name: 'Total WBC count' },
      { name: 'Neutrophils' },
      { name: 'Lymphocytes' },
      { name: 'Eosinophils' },
      { name: 'Monocytes' },
      { name: 'Basophils' },
      { name: 'RBC count' },
      { name: 'Platelet count' },
      { name: 'PCV' },
      { name: 'MCV' },
      { name: 'MCH' },
      { name: 'MCHC' },
      { name: 'RDW-SD' },
    ],
    inPackages: ['royal'],
    keywords: ['complete blood count', 'blood count', 'haemoglobin', 'hemoglobin', 'platelet', 'cbc', 'രക്ത', 'ഹീമോഗ്ലോബിൻ', 'പ്ലേറ്റ്‌ലെറ്റ്'],
  },
  {
    id: 'esr',
    name: 'ESR',
    department: 'haematology',
    kind: 'test',
    inPackages: ['royal'],
    keywords: ['erythrocyte sedimentation rate'],
  },
  {
    id: 'aec',
    name: 'Absolute Eosinophil Count (AEC)',
    department: 'haematology',
    kind: 'test',
    inPackages: ['royal'],
    keywords: ['eosinophil', 'allergy count'],
  },

  // Biochemistry (serum)
  {
    id: 'urea',
    name: 'Urea',
    department: 'biochemistry',
    kind: 'test',
    method: 'Urease GLDH',
    sample: SERUM,
    keywords: ['kidney', 'renal', 'വൃക്ക', 'കിഡ്നി'],
  },
  {
    id: 'creatinine',
    name: 'Creatinine',
    department: 'biochemistry',
    kind: 'test',
    method: 'Enzymatic',
    sample: SERUM,
    inPackages: ['royal'],
    keywords: ['serum creatinine', 'kidney', 'renal', 'വൃക്ക', 'കിഡ്നി'],
  },
  {
    id: 'lft',
    name: 'Liver Function Test (LFT)',
    department: 'biochemistry',
    kind: 'test',
    sample: SERUM,
    parameters: [
      { name: 'Bilirubin, total', method: 'Diazo' },
      { name: 'Bilirubin, direct', method: 'Diazo' },
      { name: 'Bilirubin, indirect', method: 'Calculated' },
      { name: 'Total protein', method: 'Biuret' },
      { name: 'Albumin', method: 'Bromocresol green (BCG)' },
      { name: 'Globulin' },
      { name: 'A/G ratio' },
      { name: 'SGOT / AST', method: 'IFCC without PDP' },
      { name: 'SGPT / ALT', method: 'IFCC without PDP' },
      { name: 'Alkaline phosphatase', method: 'IFCC with AMP' },
    ],
    inPackages: ['royal'],
    keywords: ['liver', 'bilirubin', 'sgot', 'sgpt', 'ast', 'alt', 'jaundice', 'കരൾ', 'ലിവർ', 'മഞ്ഞപ്പിത്തം'],
  },

  // Serology
  {
    id: 'aso',
    name: 'ASO titre (quantitative)',
    department: 'serology',
    kind: 'test',
    method: 'Immunoturbidimetry',
    keywords: ['antistreptolysin', 'aso'],
  },
  {
    id: 'crp',
    name: 'CRP',
    department: 'serology',
    kind: 'test',
    nameOnly: true,
    keywords: ['c-reactive protein', 'inflammation', 'infection marker', 'infection', 'നീർക്കെട്ട്', 'ഇൻഫെക്ഷൻ'],
  },
  {
    id: 'ra',
    name: 'RA Factor',
    department: 'serology',
    kind: 'test',
    nameOnly: true,
    keywords: ['rheumatoid', 'arthritis', 'ra', 'rheumatoid factor', 'joint pain', 'വാതം', 'സന്ധിവേദന'],
  },

  // Clinical pathology
  {
    id: 'urine',
    name: 'Urine routine examination',
    department: 'clinical-pathology',
    kind: 'test',
    sample: URINE,
    parameters: [
      { name: 'Albumin' },
      { name: 'Sugar' },
      { name: 'Pus cells (microscopy)' },
      { name: 'Epithelial cells (microscopy)' },
      { name: 'RBCs (microscopy)' },
      { name: 'Casts (microscopy)' },
      { name: 'Crystals (microscopy)' },
      { name: 'Bacteria (microscopy)' },
    ],
    inPackages: ['royal'],
    keywords: ['urine', 'ure', 'urine test', 'മൂത്രം', 'മൂത്ര'],
  },

  // Offered through the packages
  {
    id: 'fbs',
    name: 'Fasting Blood Sugar (FBS)',
    department: 'biochemistry',
    kind: 'test',
    prep: 'fasting',
    about: {
      en: 'Measures blood glucose after fasting. Helps screen for diabetes and assess blood sugar levels.',
      ml: 'ഫാസ്റ്റിംഗിന് ശേഷം രക്തത്തിലെ ഗ്ലൂക്കോസ് (ഷുഗർ) അളക്കുന്നു. പ്രമേഹം ഉണ്ടോ എന്ന് നോക്കാനും ഷുഗർ നില അറിയാനും സഹായിക്കുന്നു.',
    },
    inPackages: ['cardio'],
    viaPackagesOnly: true,
    keywords: ['sugar', 'glucose', 'diabetes', 'blood sugar', 'ഷുഗർ', 'പ്രമേഹം', 'പഞ്ചസാര'],
  },
  {
    id: 'glucose',
    name: 'Glucose (fasting / random)',
    department: 'biochemistry',
    kind: 'test',
    inPackages: ['royal'],
    viaPackagesOnly: true,
    keywords: ['sugar', 'blood sugar', 'diabetes', 'rbs', 'ഷുഗർ', 'പ്രമേഹം', 'പഞ്ചസാര'],
  },
  {
    id: 'lipid',
    name: 'Lipid Profile',
    department: 'biochemistry',
    kind: 'test',
    prep: 'fasting',
    parameters: [
      { name: 'Total cholesterol' },
      { name: 'HDL' },
      { name: 'LDL' },
      { name: 'VLDL' },
      { name: 'Triglycerides' },
      { name: 'TC/HDL ratio' },
      { name: 'LDL/HDL ratio' },
    ],
    about: {
      en: 'Measures cholesterol and triglycerides to assess cardiovascular risk.',
      ml: 'കൊളസ്ട്രോളും ട്രൈഗ്ലിസറൈഡും അളന്ന് ഹൃദ്രോഗ സാധ്യത വിലയിരുത്താൻ സഹായിക്കുന്നു.',
    },
    inPackages: ['cardio', 'royal'],
    viaPackagesOnly: true,
    keywords: ['cholesterol', 'triglycerides', 'hdl', 'ldl', 'heart', 'കൊളസ്ട്രോൾ', 'ഹൃദയം'],
  },
  {
    id: 'lpa',
    name: 'Lipoprotein(a), Lp(a)',
    department: 'biochemistry',
    kind: 'test',
    about: {
      en: 'Measures a largely inherited lipoprotein associated with increased cardiovascular risk.',
      ml: 'പ്രധാനമായും പാരമ്പര്യമായി ലഭിക്കുന്ന ഒരു ലിപ്പോപ്രോട്ടീൻ അളക്കുന്നു. ഇത് കൂടുതലാകുന്നത് ഹൃദ്രോഗ സാധ്യത കൂടുന്നതുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു.',
    },
    inPackages: ['cardio'],
    viaPackagesOnly: true,
    keywords: ['lipoprotein', 'heart', 'cholesterol', 'ഹൃദയം'],
  },
  {
    id: 'hscrp',
    name: 'hs-CRP (high-sensitivity CRP)',
    department: 'biochemistry',
    kind: 'test',
    about: {
      en: 'Measures an inflammation marker that can help assess cardiovascular risk alongside other factors.',
      ml: 'ശരീരത്തിലെ നീർക്കെട്ട് (ഇൻഫ്ലമേഷൻ) കാണിക്കുന്ന ഒരു മാർക്കർ അളക്കുന്നു. മറ്റു ഘടകങ്ങളോടൊപ്പം ഹൃദ്രോഗ സാധ്യത വിലയിരുത്താൻ ഇത് സഹായിക്കും.',
    },
    inPackages: ['cardio'],
    viaPackagesOnly: true,
    keywords: ['high sensitivity c-reactive protein', 'inflammation', 'heart', 'നീർക്കെട്ട്', 'ഹൃദയം'],
  },
  {
    id: 'uric',
    name: 'Uric Acid',
    department: 'biochemistry',
    kind: 'test',
    inPackages: ['royal'],
    viaPackagesOnly: true,
    keywords: ['gout', 'യൂറിക് ആസിഡ്'],
  },
  {
    id: 'electrolytes',
    name: 'Electrolytes',
    department: 'biochemistry',
    kind: 'test',
    parameters: [{ name: 'Sodium' }, { name: 'Potassium' }, { name: 'Chloride' }],
    inPackages: ['royal'],
    viaPackagesOnly: true,
    keywords: ['sodium', 'potassium', 'chloride', 'salt'],
  },
  {
    id: 'tsh',
    name: 'Thyroid Stimulating Hormone (TSH)',
    department: 'biochemistry',
    kind: 'test',
    inPackages: ['royal'],
    viaPackagesOnly: true,
    keywords: ['thyroid', 'hormone', 'തൈറോയ്ഡ്'],
  },
  {
    id: 'vitd',
    name: 'Vitamin D',
    department: 'biochemistry',
    kind: 'test',
    inPackages: ['royal'],
    viaPackagesOnly: true,
    keywords: ['vitamin', 'vit d', 'വിറ്റാമിൻ'],
  },
  {
    id: 'calcium',
    name: 'Calcium',
    department: 'biochemistry',
    kind: 'test',
    inPackages: ['royal'],
    viaPackagesOnly: true,
    keywords: ['bone', 'കാൽസ്യം'],
  },
  {
    id: 'acr',
    name: 'Urine Albumin Creatinine Ratio (ACR)',
    department: 'clinical-pathology',
    kind: 'test',
    sample: URINE,
    about: {
      en: 'Detects early kidney damage before symptoms appear.',
      ml: 'ലക്ഷണങ്ങൾ കാണുന്നതിനു മുമ്പേ വൃക്കയ്ക്ക് (കിഡ്നി) ഉണ്ടാകുന്ന തുടക്കത്തിലെ തകരാർ കണ്ടെത്തുന്നു.',
    },
    inPackages: ['royal'],
    viaPackagesOnly: true,
    keywords: ['kidney', 'microalbumin', 'urine', 'വൃക്ക', 'കിഡ്നി', 'മൂത്രം'],
  },

  // Packages (rows link to the package explorer)
  {
    id: 'pkg-cardio',
    name: 'Cardiovascular Health Package',
    department: 'packages',
    kind: 'package',
    keywords: ['heart', 'cardio', 'cardiac', 'anniversary', 'ഹൃദയം', 'ഹൃദ്രോഗം'],
  },
  {
    id: 'pkg-royal',
    name: 'Royal Package',
    department: 'packages',
    kind: 'package',
    keywords: ['full body', 'checkup', 'check-up', 'master', 'റോയൽ'],
  },

  // Rapid tests and other services
  {
    id: 'rapid-thyroid',
    name: 'Rapid thyroid tests',
    department: 'other',
    kind: 'category',
    keywords: ['thyroid', 'rapid', 'തൈറോയ്ഡ്'],
  },
  {
    id: 'rapid-hormone',
    name: 'Rapid hormone tests',
    department: 'other',
    kind: 'category',
    keywords: ['hormone', 'rapid', 'ഹോർമോൺ'],
  },
  {
    id: 'rapid-cancer',
    name: 'Rapid cancer-marker tests',
    department: 'other',
    kind: 'category',
    keywords: ['cancer', 'tumour', 'tumor', 'marker', 'rapid', 'ക്യാൻസർ', 'കാൻസർ'],
  },
  {
    id: 'rapid-vitamin',
    name: 'Rapid vitamin tests',
    department: 'other',
    kind: 'category',
    keywords: ['vitamin', 'rapid', 'വിറ്റാമിൻ'],
  },
  {
    id: 'rapid-allergy',
    name: 'Rapid allergy tests',
    department: 'other',
    kind: 'category',
    keywords: ['allergy', 'rapid', 'അലർജി'],
  },
  {
    id: 'pft',
    name: 'Pulmonary function test (PFT)',
    department: 'other',
    kind: 'service',
    keywords: ['lung', 'breathing', 'asthma', 'spirometry', 'ശ്വാസകോശം', 'ശ്വാസം'],
  },
  {
    id: 'nebulisation',
    name: 'Nebulisation',
    department: 'other',
    kind: 'service',
    keywords: ['nebulizer', 'nebuliser', 'nebulization', 'breathing', 'lung', 'ശ്വാസം'],
  },
  {
    id: 'ecg',
    name: 'ECG',
    department: 'other',
    kind: 'service',
    keywords: ['heart', 'electrocardiogram', 'ekg', 'ഹൃദയം', 'ഇസിജി'],
  },
];

/**
 * Everyday words mapped to the tests they mean. A query that contains the
 * key (or the key contains the query, for longer typed words) brings in
 * these ids in addition to plain name matches.
 */
export const synonyms: Record<string, string[]> = {
  inflammation: ['crp', 'hscrp'],
  'infection marker': ['crp'],
  infection: ['crp'],
  rheumatoid: ['ra'],
  arthritis: ['ra'],
  ra: ['ra'],
  'joint pain': ['ra'],
  sugar: ['fbs', 'glucose'],
  diabetes: ['fbs', 'glucose'],
  glucose: ['fbs', 'glucose'],
  cholesterol: ['lipid'],
  liver: ['lft'],
  jaundice: ['lft'],
  kidney: ['urea', 'creatinine', 'acr'],
  thyroid: ['tsh', 'rapid-thyroid'],
  'blood count': ['cbc'],
  vitamin: ['vitd', 'rapid-vitamin'],
  heart: ['pkg-cardio', 'lipid', 'lpa', 'hscrp', 'ecg'],
  lung: ['pft', 'nebulisation'],
  urine: ['urine', 'acr'],
  // Malayalam
  'ഷുഗർ': ['fbs', 'glucose'],
  'പ്രമേഹം': ['fbs', 'glucose'],
  'കൊളസ്ട്രോൾ': ['lipid'],
  'കരൾ': ['lft'],
  'ലിവർ': ['lft'],
  'വൃക്ക': ['urea', 'creatinine', 'acr'],
  'കിഡ്നി': ['urea', 'creatinine', 'acr'],
  'തൈറോയ്ഡ്': ['tsh', 'rapid-thyroid'],
  'ഹൃദയം': ['pkg-cardio', 'lipid', 'lpa', 'hscrp', 'ecg'],
  'രക്തം': ['cbc'],
  'മൂത്രം': ['urine', 'acr'],
  'നീർക്കെട്ട്': ['crp', 'hscrp'],
  'വാതം': ['ra'],
  'വിറ്റാമിൻ': ['vitd', 'rapid-vitamin'],
};
