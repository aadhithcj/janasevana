/** English strings. Facts (prices, names, numbers) come from config/, not from here. */
export const en = {
  meta: {
    siteTitle: 'Janasevana Lab, Kaichoondy Jn., Alappuzha',
    siteDescription:
      'Diagnostic laboratory at Kattungal Building, Kaichoondy Jn., Alappuzha. Blood and urine tests, rapid tests, ECG and lung function tests, with free home sample collection. Call 0477 2288 413 or WhatsApp +91 91884 90413.',
    pages: {
      home: 'Janasevana Lab, Kaichoondy Jn., Alappuzha',
      packages: 'Health packages',
      tests: 'Find a test',
      homeCollection: 'Free home sample collection',
      about: 'About the lab',
      contact: 'Contact and directions',
    },
    descriptions: {
      packages: 'The Royal Package (16 tests, ₹2,000) and the Cardiovascular Health Package, each with free home sample collection.',
      tests: 'Search the tests Janasevana Lab does by name or by an everyday word, and add them to a WhatsApp booking.',
      homeCollection: 'A sample collector from Janasevana Lab visits your home for free. Book by call or WhatsApp.',
      about: 'The lab, its equipment, its team and how to read a Janasevana Lab report.',
      contact: 'Address, phone numbers, WhatsApp, email and directions for Janasevana Lab, Kaichoondy Jn., Alappuzha.',
    },
  },

  shell: {
    skip: 'Skip to main content',
    nav: {
      home: 'Home',
      packages: 'Packages',
      tests: 'Tests',
      homeCollection: 'Home collection',
      about: 'About',
      contact: 'Contact',
    },
    navLabel: 'Main',
    book: 'Book home collection',
    bookShort: 'Book a visit',
    menu: 'Menu',
    closeMenu: 'Close menu',
    language: 'Language',
    homeLink: 'Janasevana Lab, home page',
    call: 'Call',
    whatsapp: 'WhatsApp',
    actionBarLabel: 'Call or message the lab',
  },

  common: {
    unconfirmed: 'Call us to confirm.',
    askLab: 'Ask the lab',
    freeHomeCollection: 'Free home sample collection',
    tests: (n: number) => `${n} tests`,
    validity: (from: string, to: string) => `${from} to ${to}`,
    offerEnded: (to: string) => `This offer ended on ${to}.`,
    offerUpcoming: (from: string) => `This offer starts on ${from}.`,
    callNumber: (n: string) => `Call ${n}`,
    landline: 'Landline',
    whatsappAndCall: 'WhatsApp and call',
    mobile: 'Mobile',
    email: 'Email',
    directions: 'Get directions',
    directionsNote: 'The map searches our address. Call us if you need the exact spot.',
    hours: 'Opening hours',
    iso: 'ISO 9001:2015 certified',
    photoSlot: {
      storefront: 'Photo of the lab front, coming soon',
      team: 'Team photo, coming soon',
      collection: 'Photo of a home visit, coming soon',
    },
    opensWhatsapp: 'Opens WhatsApp',
  },

  slip: {
    heading: 'The message we will open for you',
    sendWhatsapp: 'Send on WhatsApp',
    copy: 'Copy message',
    copied: 'Copied. Paste it into WhatsApp or a text message.',
    copyFailed: 'Could not copy. Press and hold the message to select it.',
    nothingSent: 'Nothing is sent until you press send in WhatsApp.',
  },

  home: {
    place: 'Kattungal Building, Kaichoondy Jn., Alappuzha',
    h1: ['The lab at Kaichoondy Junction', 'that comes to your home.'],
    lede:
      'Blood and urine tests, rapid tests, ECG and lung function tests. Free home sample collection: call or WhatsApp, and a sample collector visits you.',
    callCta: 'Call the lab',
    whatsappCta: 'WhatsApp us',
    otherNumbers: 'Other numbers',
    offerDetails: 'What each test measures',
    bookPackage: 'Book this package',
    bookWithDetails: 'Book with the patient’s details',
    offerLine: (name: string, price: string, to: string) => `${name}, ${price}, until ${to}`,
    seeOffer: 'See the offer',
    allTests: (n: number) => `See all ${n} tests`,
    quickTitle: 'What would you like to do?',
    quick: {
      call: { title: 'Call the lab', body: 'Speak to the lab directly.' },
      whatsapp: { title: 'WhatsApp the lab', body: 'Send us a message on WhatsApp.' },
      tests: { title: 'Find a test', body: 'Search by name or an everyday word, like “sugar”.' },
      collection: { title: 'Book home collection', body: 'Free. A sample collector visits your home.' },
      packages: { title: 'Compare the two packages', body: 'Royal Package and the Cardiovascular Health Package, test by test.' },
    },
    packagesTitle: 'Two health packages, both with free home collection.',
    packagesLink: 'See both packages in full',
    royalSummary: 'Sixteen tests covering blood count, sugar, cholesterol, liver, kidney, thyroid, vitamin D, calcium and urine.',
    cardioSummary: 'Four tests that help assess heart risk.',
    servicesTitle: 'What the lab does',
    servicesIntro: 'Fully automated, imported laboratory equipment, run by experienced, qualified professionals.',
    services: {
      haematology: 'Complete haemogram (CBC), ESR and absolute eosinophil count.',
      biochemistry: 'Sugar, cholesterol, liver and kidney function, uric acid, electrolytes, thyroid (TSH), vitamin D and calcium.',
      serology: 'ASO titre, CRP and RA factor.',
      clinicalPathology: 'Urine routine and microscopic examination, and urine albumin creatinine ratio.',
      rapid: 'Thyroid, hormone, cancer-marker, vitamin and allergy tests on modern automated machines, with results in minutes. Ask the lab which panels are available.',
      lungsHeart: 'Pulmonary function test (PFT) to check how well the lungs work, nebulisation, and ECG.',
    },
    serviceNames: {
      rapid: 'Rapid tests',
      lungsHeart: 'Lungs and heart',
    },
    discounts: 'Discounts of 10%–50%. Ask us which tests.',
    servicesLink: 'Search all tests',
    collectionTitle: 'The lab comes to your home',
    collectionLede: 'Book by call or WhatsApp, and a blood sample collector visits to take the sample. There is no charge for the visit.',
    collectionLink: 'Home collection and fasting',
    teamTitle: 'The people who run your tests',
    teamQuality: 'Quality',
    qualityLines: ['ISO 9001:2015 certified.', 'Laboratory automation and smart technology.', 'Experienced, qualified professionals.'],
    aboutLink: 'About the lab',
    contactTitle: 'Find the lab',
  },

  steps: {
    title: 'How home collection works',
    items: [
      {
        title: 'Book by call or WhatsApp',
        body: 'Tell us the tests or package, the patient’s name and your area. You can book for a parent or relative.',
      },
      {
        title: 'A sample collector visits',
        body: 'A blood sample collector comes to the home and takes the sample. Home collection is free.',
      },
      {
        title: 'You get the report',
        body: 'The lab tests the sample and prepares your report. Ask us how you would like to receive it.',
      },
    ],
  },

  fasting: {
    title: 'Fasting and preparation',
    body: 'Some tests need fasting. The Fasting Blood Sugar (FBS) and the fasting lipid profile are fasting tests. The lab will tell you how long to fast when you book.',
    other: 'For every other test, ask the lab whether any preparation is needed.',
  },

  packages: {
    h1: 'Health packages',
    intro: 'Two packages, each with free home sample collection. Open a test to see what it checks.',
    testsHeading: 'Tests in this package',
    noticeLabel: 'Please read',
    bookThis: 'Book this package',
    explain: 'Open a test to see what it includes.',
    includes: 'Includes',
    measures: 'What it measures',
  },

  tests: {
    h1: 'Find a test',
    intro: 'Search by the test name or by an everyday word, like “sugar”, “thyroid” or “kidney”. Add tests to your booking and send it on WhatsApp.',
    searchLabel: 'Search tests',
    searchHint: 'Try a test name or an everyday word.',
    filterLabel: 'Show',
    all: 'All',
    showing: (n: number) => (n === 1 ? 'Showing 1 test' : `Showing ${n} tests`),
    department: 'Department',
    method: 'Method',
    sample: 'Sample',
    prep: 'Preparation',
    includes: 'Includes',
    methodPerPart: 'Listed for each part below',
    samples: { serum: 'Serum', urine: 'Urine' },
    fastingPrep: 'Fasting test. The lab confirms how long.',
    inPackage: (names: string) => `In the ${names}`,
    viaPackages: 'Offered in our packages. Ask the lab about booking it on its own.',
    nameOnly: 'Ask the lab about the method, sample and preparation.',
    categoryNote: 'Ask the lab which panels are available.',
    add: 'Add to booking',
    added: 'Added',
    remove: 'Remove',
    viewPackage: 'See the package',
    emptyTitle: (q: string) => `Nothing found for “${q}”`,
    emptyBody: 'The lab may still do this test. Call or WhatsApp and ask.',
    clearSearch: 'Clear search',
    departments: {
      haematology: 'Haematology',
      biochemistry: 'Biochemistry',
      serology: 'Serology',
      'clinical-pathology': 'Clinical pathology',
      packages: 'Packages',
      other: 'Rapid tests and other services',
    },
  },

  basket: {
    title: 'Your booking',
    empty: 'Nothing added yet. Add tests from the list, or book a package.',
    count: (n: number) => (n === 1 ? '1 item' : `${n} items`),
    clear: 'Clear all',
    continue: 'Continue to booking',
    addedLive: (name: string) => `${name} added to your booking.`,
    removedLive: (name: string) => `${name} removed from your booking.`,
  },

  request: {
    title: 'Your request',
    open: 'Your request',
    close: 'Close',
    added: (name: string) => `${name} added to your request.`,
    review: 'Review',
    showAll: (n: number) => `Show all ${n}`,
    more: 'More options',
    addPackage: 'Add to my request',
    book: 'Book this package',
    intro: 'Check the details. We open WhatsApp with this message for you to send.',
  },

  search: {
    title: 'What do you need?',
    label: 'Search tests',
    hint: 'Type a test name or an everyday word.',
    submit: 'Search',
    try: 'Common searches',
    words: ['heart', 'sugar', 'thyroid', 'kidney', 'liver', 'cholesterol', 'vitamin'],
  },

  booking: {
    title: 'Book a test or a home visit',
    intro: 'Fill in a few details. We turn them into a WhatsApp message for you to check and send.',
    nothingSent: 'Nothing is sent until you press send in WhatsApp.',
    patientName: 'Patient’s name',
    patientHint: 'The person who will give the sample.',
    bookerName: 'Your name, if you are booking for someone else',
    optional: 'optional',
    where: 'Where should the sample be taken?',
    whereHome: 'At home (free collection)',
    whereLab: 'At the lab',
    area: 'Area or landmark',
    areaHint: 'A nearby landmark is enough. You can share the full address in the chat.',
    time: 'Preferred day and time',
    timeHint: 'For example, “tomorrow morning”.',
    items: 'Tests and packages',
    noItems: 'Nothing chosen yet. You can still send the message and tell the lab in the chat.',
    addTests: 'Add tests',
    submit: 'Open WhatsApp with this message',
    orCall: 'Or call the lab',
    errorTitle: (n: number) => (n === 1 ? 'Please fix 1 thing:' : `Please fix ${n} things:`),
    errors: {
      patientName: 'Enter the patient’s name.',
      area: 'Enter your area or a nearby landmark, so the collector can find you.',
    },
    preview: 'Your message',
    successTitle: 'WhatsApp should now be open',
    successBody: 'Your message is ready there. Press send in WhatsApp to book.',
    notOpened: 'Didn’t open?',
    blocked: 'WhatsApp could not be opened from this page. Use the button below, or copy the message and send it yourself.',
    openAgain: 'Open WhatsApp again',
    noscript: 'This form needs JavaScript. You can still book: call the lab or WhatsApp us.',
  },

  collection: {
    h1: 'Free home sample collection',
    lede: 'The lab comes to your home. Book by call or WhatsApp, and a blood sample collector visits to take the sample. There is no charge for the visit.',
    areaTitle: 'Area and timings',
    area: 'Call to confirm your area and a visit time.',
    bookingTitle: 'Book a visit',
  },

  about: {
    h1: 'About Janasevana Lab',
    lede: 'A diagnostic laboratory at Kattungal Building, Kaichoondy Jn., Alappuzha. The lab tests blood and urine samples, runs rapid tests, and offers ECG and lung function tests, with free home sample collection.',
    equipmentTitle: 'Equipment',
    equipment: [
      'Fully automated, imported laboratory equipment.',
      'Rapid tests for thyroid, hormones, cancer markers, vitamins and allergies on modern automated machines, with results in minutes.',
      'Pulmonary function testing and nebulisation, and ECG.',
    ],
    teamTitle: 'The team',
    teamIntro: 'Experienced, qualified professionals. These are the names printed on the lab’s reports.',
    qualityTitle: 'Quality',
    quality: 'Janasevana Lab is ISO 9001:2015 certified.',
    reportTitle: 'Understanding your report',
    reportIntro: 'Every report is laid out in the same columns. Here is what each one means.',
    reportColumns: [
      { name: 'Test', body: 'The name of the test or the part of it being measured, grouped by department, like Haematology or Biochemistry.' },
      { name: 'Observed value and unit', body: 'Your result, with its unit of measurement.' },
      { name: 'Reference range', body: 'The range usually seen in healthy people. Ranges differ by age and sex, and each report prints its own.' },
      { name: 'Method', body: 'How the lab measured it, for example “Enzymatic” or “Immunoturbidimetry”.' },
      { name: 'Sample', body: 'What was tested, such as serum or urine.' },
    ],
    reportDoctor: 'A value outside the reference range is not a diagnosis on its own. Please take questions about your results to your doctor.',
    reportDelivery: 'How reports reach you',
  },

  contact: {
    h1: 'Contact the lab',
    lede: 'Call, WhatsApp or visit. If you are not sure which test you need, ask us.',
    addressTitle: 'Address',
    phonesTitle: 'Phone',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Message us on +91 91884 90413.',
    emailTitle: 'Email',
    print: 'Print this page',
  },

  notFound: {
    title: 'Page not found',
    h1: 'This page isn’t here.',
    body: 'The link may be old or mistyped. Everything on the site is one step away from here.',
    home: 'Go to the home page',
  },

  footer: {
    navTitle: 'Pages',
    contactTitle: 'Reach the lab',
    copyright: (y: number) => `© ${y} Janasevana Lab`,
  },
};

type Widen<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends string
    ? string
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : T extends object
        ? { [K in keyof T]: Widen<T[K]> }
        : T;

export type Dict = Widen<typeof en>;
