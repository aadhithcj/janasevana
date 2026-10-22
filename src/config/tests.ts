import { ConfirmationStatus } from './site';

export type DepartmentKey = 'all' | 'haematology' | 'biochemistry' | 'serology' | 'pathology';

export interface DepartmentInfo {
  key: DepartmentKey;
  number: string;
  nameEn: string;
  nameMl: string;
  descriptionEn: string;
  descriptionMl: string;
}

export const departments: DepartmentInfo[] = [
  {
    key: 'haematology',
    number: '01',
    nameEn: 'Haematology',
    nameMl: 'ഹെമറ്റോളജി',
    descriptionEn: 'Cellular analysis of blood, haemoglobin quantification, platelets and clotting indicators.',
    descriptionMl: 'രക്തത്തിലെ കോശങ്ങളുടെ പരിശോധന, ഹീമോഗ്ലോബിൻ, പ്ലേറ്റ്‌ലെറ്റ് നിരക്കുകൾ.',
  },
  {
    key: 'biochemistry',
    number: '02',
    nameEn: 'Biochemistry',
    nameMl: 'ബയോകെമിസ്ട്രി',
    descriptionEn: 'Metabolic markers, renal function profiles, and comprehensive liver enzymes.',
    descriptionMl: 'വൃക്ക, കരൾ തുടങ്ങിയ ആന്തരിക അവയവങ്ങളുടെ പ്രവർത്തന സൂചികകൾ.',
  },
  {
    key: 'serology',
    number: '03',
    nameEn: 'Serology',
    nameMl: 'സീറോളജി',
    descriptionEn: 'Immunological markers, acute phase reactants, and rheumatoid antibodies.',
    descriptionMl: 'രോഗപ്രതിരോധ സൂചകങ്ങൾ, പനി, വീക്കം, സന്ധിവാതം തുടങ്ങിയവയുടെ പരിശോധനകൾ.',
  },
  {
    key: 'pathology',
    number: '04',
    nameEn: 'Clinical Pathology',
    nameMl: 'ക്ലിനിക്കൽ പാത്തോളജി',
    descriptionEn: 'Urine routine, physical characteristics, biochemical dipstick, and sediment microscopy.',
    descriptionMl: 'മൂത്ര പരിശോധന, മൈക്രോസ്കോപ്പിക് നിരീക്ഷണം.',
  },
];

export interface DiagnosticTest {
  id: string;
  code: string;
  nameEn: string;
  nameMl: string;
  department: Exclude<DepartmentKey, 'all'>;
  sampleTypeEn: string;
  sampleTypeMl: string;
  subComponents?: string[];
  subComponentsMl?: string[];
  prepNote: ConfirmationStatus<string>;
  synonyms: string[];
}

export const diagnosticTests: DiagnosticTest[] = [
  // HAEMATOLOGY
  {
    id: 'cbc',
    code: 'HAEM-01',
    nameEn: 'Complete Haemogram (CBC)',
    nameMl: 'കംപ്ലീറ്റ് ഹീമോഗ്രാം (സി.ബി.സി)',
    department: 'haematology',
    sampleTypeEn: 'Whole Blood (EDTA)',
    sampleTypeMl: 'രക്ത സാമ്പിൾ (EDTA)',
    subComponents: ['Hb', 'RBC', 'WBC Total & Differential', 'Platelets', 'PCV', 'MCV', 'MCH', 'MCHC'],
    subComponentsMl: ['ഹീമോഗ്ലോബിൻ', 'ശ്വേതരക്താണുക്കൾ', 'പ്ലേറ്റ്‌ലെറ്റ്സ്', 'പി.സി.വി'],
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Specific fasting or morning draw advice needs lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['cbc', 'complete blood count', 'blood count', 'hb', 'hemoglobin', 'haemoglobin', 'platelet', 'wbc', 'infection', 'fever', 'blood'],
  },
  {
    id: 'esr',
    code: 'HAEM-02',
    nameEn: 'Erythrocyte Sedimentation Rate (ESR)',
    nameMl: 'ഇ.എസ്.ആർ (ESR)',
    department: 'haematology',
    sampleTypeEn: 'Citrated Blood / EDTA',
    sampleTypeMl: 'രക്ത സാമ്പിൾ',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Specific fasting advice needs lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['esr', 'sedimentation rate', 'inflammation', 'joint pain', 'fever'],
  },
  {
    id: 'aec',
    code: 'HAEM-03',
    nameEn: 'Absolute Eosinophil Count (AEC)',
    nameMl: 'അബ്സൊല്യൂട്ട് ഇയോസിനോഫിൽ കൗണ്ട് (AEC)',
    department: 'haematology',
    sampleTypeEn: 'Whole Blood (EDTA)',
    sampleTypeMl: 'രക്ത സാമ്പിൾ (EDTA)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Specific morning timing advice needs lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['aec', 'eosinophil', 'allergy', 'asthma', 'cough', 'skin rash'],
  },
  {
    id: 'platelet-count',
    code: 'HAEM-04',
    nameEn: 'Platelet Count',
    nameMl: 'പ്ലേറ്റ്‌ലെറ്റ് കൗണ്ട്',
    department: 'haematology',
    sampleTypeEn: 'Whole Blood (EDTA)',
    sampleTypeMl: 'രക്ത സാമ്പിൾ (EDTA)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Specific draw requirements need lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['platelet', 'platelets', 'dengue', 'viral fever', 'bleeding', 'clotting'],
  },
  {
    id: 'pcv',
    code: 'HAEM-05',
    nameEn: 'Packed Cell Volume (PCV / Haematocrit)',
    nameMl: 'പി.സി.വി / ഹെമറ്റോക്രിറ്റ് (PCV)',
    department: 'haematology',
    sampleTypeEn: 'Whole Blood (EDTA)',
    sampleTypeMl: 'രക്ത സാമ്പിൾ (EDTA)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Specific draw requirements need lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['pcv', 'haematocrit', 'hematocrit', 'anaemia', 'blood thickness', 'hydration'],
  },

  // BIOCHEMISTRY
  {
    id: 'urea',
    code: 'BIOC-01',
    nameEn: 'Blood Urea',
    nameMl: 'ബ്ലഡ് യൂറിയ',
    department: 'biochemistry',
    sampleTypeEn: 'Serum',
    sampleTypeMl: 'സീറം (രക്തം)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Fasting requirement needs lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['urea', 'blood urea', 'kidney', 'renal', 'kidney function', 'rft', 'kft'],
  },
  {
    id: 'creatinine',
    code: 'BIOC-02',
    nameEn: 'Serum Creatinine',
    nameMl: 'സീറം ക്രിയാറ്റിനിൻ',
    department: 'biochemistry',
    sampleTypeEn: 'Serum',
    sampleTypeMl: 'സീറം (രക്തം)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Fasting requirement needs lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['creatinine', 'serum creatinine', 'kidney', 'renal', 'rft', 'kft', 'filtration'],
  },
  {
    id: 'lft',
    code: 'BIOC-03',
    nameEn: 'Liver Function Test (LFT)',
    nameMl: 'ലിവർ ഫംഗ്ഷൻ ടെസ്റ്റ് (എൽ.എഫ്.ടി)',
    department: 'biochemistry',
    sampleTypeEn: 'Serum',
    sampleTypeMl: 'സീറം (രക്തം)',
    subComponents: [
      'Bilirubin (Total, Direct, Indirect)',
      'SGOT / AST',
      'SGPT / ALT',
      'Alkaline Phosphatase (ALP)',
      'Total Protein & Albumin / Globulin Ratio',
    ],
    subComponentsMl: [
      'ബിലിറൂബിൻ (ടോട്ടൽ, ഡയറക്റ്റ്)',
      'എസ്.ജി.ഒ.ടി / AST',
      'എസ്.ജി.പി.ടി / ALT',
      'ആൽക്കലൈൻ ഫോസ്ഫറ്റേസ് (ALP)',
      'ടോട്ടൽ പ്രോട്ടീൻ & ആൽബുമിൻ',
    ],
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Overnight fasting requirements (usually 8-10 hours) need lab confirmation.',
      fallbackMessageEn: 'Ask the lab if fasting is required',
      fallbackMessageMl: 'ഫാസ്റ്റിംഗ് ആവശ്യമോ എന്ന് ലാബിൽ അന്വേഷിക്കുക',
    },
    synonyms: [
      'liver',
      'lft',
      'liver function',
      'jaundice',
      'bilirubin',
      'sgot',
      'sgpt',
      'ast',
      'alt',
      'alkaline phosphatase',
      'alp',
      'protein',
      'albumin',
    ],
  },

  // SEROLOGY
  {
    id: 'aso-titre',
    code: 'SERO-01',
    nameEn: 'ASO Titre (Antistreptolysin O)',
    nameMl: 'എ.എസ്.ഒ ടൈറ്റർ (ASO)',
    department: 'serology',
    sampleTypeEn: 'Serum',
    sampleTypeMl: 'സീറം (രക്തം)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Sample collection criteria need lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['aso', 'aso titre', 'antistreptolysin', 'streptococcus', 'sore throat', 'rheumatic fever', 'joint pain'],
  },
  {
    id: 'crp',
    code: 'SERO-02',
    nameEn: 'C-Reactive Protein (CRP)',
    nameMl: 'സി-റിയാക്ടീവ് പ്രോട്ടീൻ (സി.ആർ.പി)',
    department: 'serology',
    sampleTypeEn: 'Serum',
    sampleTypeMl: 'സീറം (രക്തം)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Sample collection criteria need lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['crp', 'c reactive protein', 'infection', 'inflammation', 'fever', 'swelling', 'acute phase'],
  },
  {
    id: 'ra-factor',
    code: 'SERO-03',
    nameEn: 'RA Factor (Rheumatoid Arthritis Factor)',
    nameMl: 'ആർ.എ ഫാക്ടർ (റുമാറ്റോയ്ഡ് ഫാക്ടർ)',
    department: 'serology',
    sampleTypeEn: 'Serum',
    sampleTypeMl: 'സീറം (രക്തം)',
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Sample collection criteria need lab confirmation.',
      fallbackMessageEn: 'Ask the lab for preparation instructions',
      fallbackMessageMl: 'തയ്യാറെടുപ്പുകൾക്കായി ലാബുമായി ബന്ധപ്പെടുക',
    },
    synonyms: ['ra', 'ra factor', 'rheumatoid', 'arthritis', 'joint pain', 'rheumatic', 'swelling in joints'],
  },

  // CLINICAL PATHOLOGY
  {
    id: 'urine-routine',
    code: 'PATH-01',
    nameEn: 'Urine Routine & Microscopic Examination',
    nameMl: 'മൂത്ര പരിശോധന (യൂറിൻ റുട്ടീൻ & മൈക്രോസ്കോപ്പിക്)',
    department: 'pathology',
    sampleTypeEn: 'Fresh Midstream Urine (Clean Catch)',
    sampleTypeMl: 'ശുദ്ധമായ മൂത്ര സാമ്പിൾ (മിഡ്-സ്ട്രീം)',
    subComponents: [
      'Physical (Colour, Transparency, Specific Gravity)',
      'Chemical (Reaction/pH, Albumin/Protein, Sugar, Bile Salts, Bile Pigments)',
      'Microscopic (Pus Cells, Epithelial Cells, RBCs, Casts, Crystals)',
    ],
    subComponentsMl: [
      'ഫിസിക്കൽ (നിറം, സുതാര്യത)',
      'കെമിക്കൽ (ഷുഗർ, പ്രോട്ടീൻ, പി.എച്ച്)',
      'മൈക്രോസ്കോപ്പിക് (പസ് സെല്ലുകൾ, ആർ.ബി.സി, ക്രിസ്റ്റലുകൾ)',
    ],
    prepNote: {
      status: 'TODO_CONFIRM',
      note: 'Sterile container and midstream collection instructions need lab confirmation.',
      fallbackMessageEn: 'Clean-catch midstream sample recommended. Collect container from lab.',
      fallbackMessageMl: 'ശുദ്ധമായ മിഡ്-സ്ട്രീം സാമ്പിൾ. കണ്ടെയ്നർ ലാബിൽ നിന്ന് വാങ്ങുക.',
    },
    synonyms: ['urine', 'urine routine', 'urine test', 'pus cells', 'urine infection', 'uti', 'sugar in urine', 'burning sensation'],
  },
];
