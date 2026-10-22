import type { Metadata, Viewport } from 'next';
import { fontClassNames } from '@/styles/fonts';
import '@/styles/global.css';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { SkipLink } from '@/components/layout/SkipLink';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Janasevana Lab | Diagnostic Laboratory in Kaichoondy, Alappuzha',
    template: '%s | Janasevana Lab',
  },
  description:
    'Janasevana Lab provides dependable clinical laboratory testing and diagnostic services at Kattungal Building, Kaichoondy Junction, Alappuzha, Kerala. Call 0477-2288413 or 91884 90413.',
  keywords: [
    'Janasevana Lab',
    'Diagnostic laboratory Alappuzha',
    'Clinical laboratory Kaichoondy',
    'Blood test Alappuzha',
    'Urine test Alappuzha',
    'CBC test Alappuzha',
    'Home collection Alappuzha',
    'Kattungal Building Kaichoondy',
  ],
  authors: [{ name: 'Janasevana Lab' }],
  creator: 'Janasevana Lab',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.siteUrl,
    title: 'Janasevana Lab | Diagnostic Laboratory in Alappuzha, Kerala',
    description:
      'Diagnostic pathology testing at Kaichoondy Junction, Alappuzha. Clear sample collection, accurate clinical testing, and personal attention.',
    siteName: 'Janasevana Lab',
    images: [
      {
        url: '/images/brand-logo.png',
        width: 560,
        height: 321,
        alt: 'Janasevana Lab Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janasevana Lab | Alappuzha',
    description: 'Diagnostic pathology and clinical tests at Kaichoondy Junction, Alappuzha.',
    images: ['/images/brand-logo.png'],
  },
  icons: {
    icon: '/images/brand-emblem.png',
    apple: '/images/brand-emblem.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#048E92',
};

// JSON-LD structured data with ONLY verified facts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness', 'DiagnosticLab'],
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  image: `${siteConfig.siteUrl}/images/brand-logo.png`,
  logo: `${siteConfig.siteUrl}/images/brand-logo.png`,
  telephone: [siteConfig.phones.primaryCall, siteConfig.phones.landline],
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kattungal Building, Kaichoondy Junction',
    addressLocality: 'Alappuzha',
    addressRegion: 'Kerala',
    postalCode: '688007',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.5108,
    longitude: 76.3264,
  },
  url: siteConfig.siteUrl,
  areaServed: {
    '@type': 'City',
    name: 'Alappuzha',
  },
  priceRange: '₹₹',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <SkipLink />
          <div id="root-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
