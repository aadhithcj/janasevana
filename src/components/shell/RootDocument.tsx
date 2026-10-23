import { cardioPackage } from '@config/packages';
import { getDict } from '@/i18n';
import { headScript } from '@/lib/headScript';
import { BUILD_TIME, offerState } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { businessJsonLd } from '@/lib/seo';
import { BasketProvider } from '@/components/booking/BasketContext';
import { RequestProvider } from '@/components/request/RequestContext';
import { RequestDrawer } from '@/components/request/RequestDrawer';
import { RequestToast } from '@/components/request/RequestToast';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActionBar } from './ActionBar';
import { MenuDialog } from './Menu';
import { MenuExtras } from './MenuExtras';
import '@/styles/global.css';
import s from './RootDocument.module.css';

/**
 * The shared document for both language editions. Each root layout passes
 * its locale, so <html lang> is correct in the pre-rendered HTML, and only
 * /ml/ pages load the Malayalam fonts.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const d = getDict(locale);
  // Build-time state; the head script corrects it on the visitor's day.
  const buildOffer = offerState(cardioPackage.window!, BUILD_TIME);
  return (
    <html lang={locale} data-offer={buildOffer} suppressHydrationWarning>
      {/* App Router root layouts own <head>; next/head does not apply here. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript(locale) }} />
        <link rel="preload" href="/fonts/atkinson.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/anek-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        {locale === 'ml' && (
          <>
            <link rel="preload" href="/fonts/noto-sans-malayalam.woff2" as="font" type="font/woff2" crossOrigin="" />
            <link rel="preload" href="/fonts/anek-malayalam.woff2" as="font" type="font/woff2" crossOrigin="" />
            {/* Plain static stylesheet so the bundler cannot merge it into English pages. */}
            {/* eslint-disable-next-line @next/next/no-css-tags */}
            <link rel="stylesheet" href="/fonts/ml.css" />
          </>
        )}
        <meta name="theme-color" content="#056a6d" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: businessJsonLd(locale) }} />
      </head>
      <body>
        <a href="#main" className={s.skip}>
          {d.shell.skip}
        </a>
        <BasketProvider>
          <RequestProvider>
          <Header locale={locale} />
          <main id="main" tabIndex={-1} className={s.main}>
            {children}
          </main>
          <Footer locale={locale} />
          <ActionBar locale={locale} />
          <MenuDialog locale={locale} labels={d.shell.nav} title={d.shell.menu} closeLabel={d.shell.closeMenu}>
            <MenuExtras locale={locale} />
          </MenuDialog>
          <RequestDrawer locale={locale} testsHref={href(locale, 'tests')} />
          <RequestToast locale={locale} />
          </RequestProvider>
        </BasketProvider>
      </body>
    </html>
  );
}
