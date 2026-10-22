'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LocationPanel } from '@/components/home/LocationPanel';
import { BookingForm } from '@/components/booking/BookingForm';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main id="main-content" style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0 8rem' }}>
        <div className="container">
          <SectionHeading
            number="01"
            eyebrow="Direct Enquiries"
            title={t.contactPage.title}
            subtitle={t.contactPage.subtitle}
          />
        </div>

        {/* High-contrast Letterhead Location Panel */}
        <LocationPanel />

        {/* Contact & Enquiry Form */}
        <div className="container" style={{ marginTop: 'var(--space-8)' }}>
          <div style={{ maxWidth: '780px' }}>
            <BookingForm defaultServiceType="lab-visit" />
          </div>
        </div>
      </main>
    </>
  );
}
