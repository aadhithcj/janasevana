'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { Rule } from '@/components/ui/Rule';
import { Field } from '@/components/ui/Field';
import { ErrorSummary } from '@/components/ui/ErrorSummary';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function SpecimenPage() {
  const { lang, setLang, t } = useLanguage();

  const tealRamp = [
    { name: '--teal-50', hex: '#eef8f8', darkText: true },
    { name: '--teal-100', hex: '#d6f0f1', darkText: true },
    { name: '--teal-200', hex: '#b0e3e4', darkText: true },
    { name: '--teal-300', hex: '#7ccfd1', darkText: true },
    { name: '--teal-400', hex: '#3eb5b8', darkText: false },
    { name: '--teal-500 (Logo Primary)', hex: '#048e92', darkText: false },
    { name: '--teal-600', hex: '#03777b', darkText: false },
    { name: '--teal-700', hex: '#035f62', darkText: false },
    { name: '--teal-800', hex: '#054c4f', darkText: false },
    { name: '--teal-900', hex: '#043f41', darkText: false },
    { name: '--teal-950 (Deep Band)', hex: '#022325', darkText: false },
  ];

  const neutrals = [
    { name: 'Paper Light', hex: '#fcfbf8', var: 'var(--paper-light)' },
    { name: 'Paper Warm', hex: '#f6f3eb', var: 'var(--paper-warm)' },
    { name: 'Paper Muted', hex: '#ece8dd', var: 'var(--paper-muted)' },
    { name: 'Ink Primary', hex: '#151919', var: 'var(--ink-primary)' },
    { name: 'Ink Charcoal', hex: '#434448', var: 'var(--ink-secondary)' },
    { name: 'Ink Muted', hex: '#676c6d', var: 'var(--ink-muted)' },
  ];

  return (
    <main style={{ padding: 'var(--space-8) 0', minHeight: '100vh' }}>
      <div className="container">
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-8)',
            borderBottom: 'var(--hairline-light)',
            paddingBottom: 'var(--space-4)',
          }}
        >
          <div>
            <span style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-500)', fontWeight: 600 }}>
              Design Token & Typography Specimen · Phase 1
            </span>
            <h1 style={{ fontSize: 'var(--text-h2)', margin: '4px 0 0' }}>
              Janasevana Lab Design System
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button
              size="sm"
              variant={lang === 'en' ? 'primary' : 'secondary'}
              onClick={() => setLang('en')}
            >
              EN
            </Button>
            <Button
              size="sm"
              variant={lang === 'ml' ? 'primary' : 'secondary'}
              onClick={() => setLang('ml')}
            >
              മലയാളം
            </Button>
          </div>
        </div>

        {/* Brand Logo Reference */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <SectionHeading number="01" eyebrow="Brand Artifacts" title="Extracted Official Logo" />
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-8)',
              alignItems: 'center',
              flexWrap: 'wrap',
              background: '#ffffff',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-sm)',
              border: 'var(--hairline-light)',
            }}
          >
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                Primary Logo (Extracted from authentic brand file, unconfirmed tagline omitted)
              </p>
              <Image
                src="/images/brand-logo.png"
                alt="Janasevana Lab Logo"
                width={280}
                height={160}
                style={{ width: 'auto', height: '80px', objectFit: 'contain' }}
                priority
              />
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                Emblem Mark (JS Monogram)
              </p>
              <Image
                src="/images/brand-emblem.png"
                alt="Janasevana Lab Emblem"
                width={80}
                height={80}
                style={{ width: 'auto', height: '80px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </section>

        {/* Color Palette Specimen */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <SectionHeading number="02" eyebrow="Color Palette" title="Authentic Teal Ramp & Functional Accents" />
          
          <h3 style={{ fontSize: 'var(--text-h3)', marginBottom: 'var(--space-3)' }}>
            Teal Tonal Ramp (Derived from Logo #048E92)
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {tealRamp.map((item) => (
              <div
                key={item.name}
                style={{
                  backgroundColor: item.hex,
                  color: item.darkText ? '#151919' : '#ffffff',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-xs)',
                  minHeight: '85px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: item.hex === '#eef8f8' ? '1px solid #d5e5e6' : 'none',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600 }}>{item.name}</span>
                <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{item.hex}</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 'var(--text-h3)', marginBottom: 'var(--space-3)' }}>
            Strictly Purpose-Bound Accents
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
            <div
              style={{
                backgroundColor: 'var(--amber-bg)',
                border: '1px solid var(--amber-border)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <span style={{ color: 'var(--amber-text)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                Amber: Fasting & Prep Notices Only
              </span>
              <p style={{ color: 'var(--amber-text)', fontSize: 'var(--text-sm)', margin: '4px 0 0' }}>
                Used strictly when sample preparation (e.g. overnight water-only fasting) is needed.
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #86efac',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <span style={{ color: '#166534', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                Green: WhatsApp Direct Action Only
              </span>
              <p style={{ color: '#166534', fontSize: 'var(--text-sm)', margin: '4px 0 0' }}>
                Used exclusively for the official WhatsApp link builder and action button.
              </p>
            </div>
          </div>
        </section>

        {/* Typography Specimen */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <SectionHeading number="03" eyebrow="Typography" title="Bilingual Display & UI Hierarchy" />

          <div
            style={{
              background: '#ffffff',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-sm)',
              border: 'var(--hairline-light)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <p style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal-500)', fontWeight: 600 }}>
              Hero Headline Scale (Newsreader Display Serif)
            </p>
            <div style={{ fontSize: 'var(--text-hero)', lineHeight: '1.02', margin: 'var(--space-3) 0' }}>
              Careful testing for <em style={{ fontStyle: 'italic', fontWeight: 400 }}>clear, honest</em> health answers.
            </div>

            <Rule withTicks />

            <p style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal-500)', fontWeight: 600 }}>
              Malayalam Headline (Noto Serif Malayalam)
            </p>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: '1.3', margin: 'var(--space-3) 0' }} lang="ml">
              വ്യക്തവും വിശ്വസനീയവുമായ ആരോഗ്യ വിവരങ്ങൾക്കായി കൃത്യമായ പരിശോധന.
            </div>

            <Rule withTicks />

            <p style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal-500)', fontWeight: 600 }}>
              Body Copy & Tabular Numbers (18px Base, 65ch Line Length)
            </p>
            <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)', maxWidth: '65ch', color: 'var(--ink-secondary)' }}>
              Janasevana Lab is located at Kattungal Building, Kaichoondy Junction, Alappuzha. Telephone:{' '}
              <span className="num-tabular" style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>
                0477-2288413
              </span>{' '}
              or mobile{' '}
              <span className="num-tabular" style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>
                +91 91884 90413
              </span>
              . Every sample is catalogued with strict standard laboratory operating protocols.
            </p>
          </div>
        </section>

        {/* UI Components Specimen */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <SectionHeading number="04" eyebrow="UI Library" title="Precision Components" />

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Hairline</Button>
            <Button variant="ghost">Underline Ghost</Button>
            <Button variant="whatsapp">WhatsApp Action</Button>
          </div>

          <div style={{ maxWidth: '600px', marginTop: 'var(--space-6)' }}>
            <ErrorSummary
              errors={[
                { fieldId: 'demo-name', message: 'Please enter patient name.' },
                { fieldId: 'demo-phone', message: 'Please enter a valid phone number.' },
              ]}
            />
            <Field
              id="demo-name"
              label="Patient Name"
              required
              placeholder="e.g. Sreekumar P."
              error="Please enter patient name."
            />
            <Field
              id="demo-phone"
              label="Contact Phone"
              required
              placeholder="e.g. 9188490413"
              hint="We will only use this to send confirmation details."
            />
          </div>
        </section>
      </div>

      {/* Deep Teal Band Specimen */}
      <section className="band-deep-teal" style={{ padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <SectionHeading
            number="05"
            eyebrow="Rhythm Band"
            title="Full-Bleed Deep Teal Band"
            subtitle="Deep teal (#022325) bands alternate with paper backgrounds to create architectural rhythm."
            inverse
          />
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <Button variant="inverse">Inverse Primary</Button>
            <Button variant="whatsapp">WhatsApp Consultation</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
