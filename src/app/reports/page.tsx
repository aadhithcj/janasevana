'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { siteConfig } from '@/config/site';

export default function ReportsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main id="main-content" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0 8rem' }}>
        <div className="container">
          <SectionHeading
            number="01"
            eyebrow="Diagnostic Results"
            title={t.reportsPage.title}
            subtitle={t.reportsPage.subtitle}
          />

          {/* Real Delivery Explanation (No fake lookup form!) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-12)',
            }}
          >
            {/* Counter Pickup */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--teal-500)',
                borderRadius: 'var(--radius-xs)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--teal-700)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Option 01 / Physical Pickup
                </span>
                <h3 style={{ fontSize: '1.45rem', margin: '8px 0', color: 'var(--ink-primary)' }}>
                  {t.reportsPage.counterTitle}
                </h3>
                <p style={{ color: 'var(--ink-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}>
                  {t.reportsPage.counterDesc}
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button href={`tel:${siteConfig.phones.primaryCallRaw}`} variant="primary">
                  {t.reportsPage.callForStatus}: {siteConfig.phones.landline}
                </Button>
              </div>
            </div>

            {/* WhatsApp Delivery */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--whatsapp-green)',
                borderRadius: 'var(--radius-xs)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--whatsapp-deep)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Option 02 / Digital Coordination
                </span>
                <h3 style={{ fontSize: '1.45rem', margin: '8px 0', color: 'var(--ink-primary)' }}>
                  {t.reportsPage.whatsappTitle}
                </h3>
                <p style={{ color: 'var(--ink-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}>
                  {t.reportsPage.whatsappDesc}
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button href={siteConfig.whatsapp.link} variant="whatsapp" isExternal>
                  {t.common.whatsappUs} ({siteConfig.whatsapp.display})
                </Button>
              </div>
            </div>
          </div>

          {/* Number-Free Illustrative Guide to Reading a Lab Report */}
          <div
            style={{
              backgroundColor: 'var(--paper-light)',
              border: '1px solid var(--ink-hairline)',
              borderRadius: 'var(--radius-sm)',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal-700)', fontWeight: 700 }}>
              Clinical Guidance
            </span>
            <h2 style={{ fontSize: 'var(--text-h2)', margin: '6px 0 12px', color: 'var(--ink-primary)' }}>
              {t.reportsPage.guideTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-lead)', color: 'var(--ink-secondary)', maxWidth: '64ch', marginBottom: 'var(--space-8)' }}>
              {t.reportsPage.guideSubhead}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-8)',
              }}
            >
              {t.reportsPage.guidePoints.map((point, idx) => (
                <div key={idx} style={{ borderTop: '1px solid var(--teal-500)', paddingTop: 'var(--space-4)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans-google), var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--teal-700)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    0{idx + 1} / PRINCIPLE
                  </span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--ink-primary)', marginBottom: '8px' }}>
                    {point.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-body)', color: 'var(--ink-secondary)', lineHeight: 'var(--lh-body)', margin: 0 }}>
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Doctor Responsibility Notice */}
          <div
            style={{
              borderLeft: '4px solid var(--teal-500)',
              backgroundColor: '#ffffff',
              padding: 'var(--space-4) var(--space-5)',
              fontSize: 'var(--text-sm)',
              color: 'var(--ink-secondary)',
              lineHeight: 'var(--lh-body)',
            }}
          >
            <strong>Important Medical Reminder:</strong> {t.common.disclaimer} Janasevana Lab technicians ensure calibration and analytical precision; diagnosis and treatment plans are the clinical responsibility of your doctor.
          </div>
        </div>
      </main>
    </>
  );
}
