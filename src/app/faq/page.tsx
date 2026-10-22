'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { siteConfig } from '@/config/site';

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main id="main-content" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0 8rem' }}>
        <div className="container">
          <SectionHeading
            number="01"
            eyebrow="Patient Guidance"
            title={t.faqPage.title}
            subtitle={t.faqPage.subtitle}
            level="h1"
          />

          <div
            style={{
              maxWidth: '820px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-12)',
            }}
          >
            {t.faqPage.questions.map((faq, i) => (
              <details
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--ink-hairline)',
                  borderRadius: 'var(--radius-xs)',
                  padding: 'var(--space-4) var(--space-5)',
                  cursor: 'pointer',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'var(--font-serif-google), var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--ink-primary)',
                    padding: 'var(--space-2) 0',
                    outline: 'none',
                    listStylePosition: 'inside',
                  }}
                >
                  {faq.q}
                </summary>
                <p
                  style={{
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--lh-body)',
                    color: 'var(--ink-secondary)',
                    marginTop: 'var(--space-3)',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px solid var(--ink-hairline)',
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          {/* Need specific test prep advice? */}
          <div
            style={{
              padding: 'var(--space-6)',
              backgroundColor: 'var(--paper-light)',
              border: '1px solid var(--ink-hairline)',
              borderRadius: 'var(--radius-sm)',
              maxWidth: '820px',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: 'var(--ink-primary)', marginBottom: '8px' }}>
              Have questions about a specific test not answered here?
            </h3>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--ink-secondary)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--space-4)' }}>
              Different clinical investigations require different sample preparation protocols. Please call our laboratory staff and we will verify the requirements for your specific investigation.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Button href={`tel:${siteConfig.phones.primaryCallRaw}`} variant="primary">
                {t.common.callUs}: {siteConfig.phones.landline}
              </Button>
              <Button href={siteConfig.whatsapp.link} variant="whatsapp" isExternal>
                {t.common.whatsappUs}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
