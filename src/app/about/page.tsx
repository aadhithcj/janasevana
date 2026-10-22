'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Team } from '@/components/home/Team';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { siteConfig } from '@/config/site';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main id="main-content" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0 8rem' }}>
        <div className="container">
          <SectionHeading
            number="01"
            eyebrow="Institution & Purpose"
            title={t.aboutPage.title}
            subtitle={t.aboutPage.subtitle}
          />

          {/* Narrative Content */}
          <div
            style={{
              maxWidth: '75ch',
              marginBottom: 'var(--space-12)',
            }}
          >
            <h2 style={{ fontSize: 'var(--text-h2)', color: 'var(--teal-900)', marginBottom: 'var(--space-4)' }}>
              {t.aboutPage.missionTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--lh-body)', color: 'var(--ink-primary)', marginBottom: 'var(--space-4)' }}>
              {t.aboutPage.missionP1}
            </p>
            <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-secondary)', marginBottom: 'var(--space-6)' }}>
              {t.aboutPage.missionP2}
            </p>
          </div>

          {/* Ethical Standards / Values */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h3 style={{ fontSize: 'var(--text-h3)', color: 'var(--ink-primary)', marginBottom: 'var(--space-4)' }}>
              {t.aboutPage.valuesTitle}
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {t.aboutPage.values.map((v, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 'var(--space-5)',
                    border: '1px solid var(--ink-hairline)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
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
                    0{i + 1} / COMMITMENT
                  </span>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--ink-primary)', marginBottom: '6px' }}>
                    {v.title}
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Laboratory Personnel Section */}
        <Team />

        {/* Action footer */}
        <div className="container" style={{ marginTop: 'var(--space-12)' }}>
          <div
            style={{
              padding: 'var(--space-6)',
              backgroundColor: 'var(--paper-light)',
              border: '1px solid var(--ink-hairline)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--ink-primary)', margin: 0 }}>
                Have questions for our technical team?
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-secondary)', margin: '4px 0 0' }}>
                Contact us directly at our Kaichoondy Junction laboratory.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Button href={`tel:${siteConfig.phones.primaryCallRaw}`} variant="primary">
                {t.common.callUs}
              </Button>
              <Button href="/contact" variant="secondary">
                {t.nav.contact}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
