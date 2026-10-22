'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookingForm } from '@/components/booking/BookingForm';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { siteConfig } from '@/config/site';

export default function HomeCollectionPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main id="main-content" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0 8rem' }}>
        <div className="container">
          <SectionHeading
            number="01"
            eyebrow="Doorstep Phlebotomy"
            title={t.homeCollectionPage.title}
            subtitle={t.homeCollectionPage.subtitle}
          />

          {/* Honest Status Notice (Unconfirmed Coverage Areas) */}
          <div
            style={{
              backgroundColor: 'var(--amber-bg)',
              border: '1px solid var(--amber-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>
                ⓘ
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-sans-google), var(--font-sans)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--amber-text)',
                  margin: 0,
                }}
              >
                {t.homeCollectionPage.noticeTitle}
              </h3>
            </div>
            <p style={{ color: 'var(--amber-text)', fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--space-4)' }}>
              {t.homeCollectionPage.noticeText}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Button href={`tel:${siteConfig.phones.primaryCallRaw}`} variant="primary">
                {t.homeCollectionPage.callToBook}
              </Button>
              <Button href={siteConfig.whatsapp.link} variant="whatsapp" isExternal>
                {t.homeCollectionPage.whatsappToBook}
              </Button>
            </div>
          </div>

          {/* Preparation Guidelines */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h3 style={{ fontSize: 'var(--text-h3)', marginBottom: 'var(--space-4)', color: 'var(--ink-primary)' }}>
              {t.homeCollectionPage.guidelinesTitle}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {t.homeCollectionPage.guidelines.map((g, i) => (
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
                    0{i + 1} / PROTOCOL
                  </span>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--ink-primary)', marginBottom: '6px' }}>
                    {g.title}
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Booking Form */}
          <div style={{ maxWidth: '720px' }}>
            <BookingForm defaultServiceType="home-collection" />
          </div>
        </div>
      </main>
    </>
  );
}
