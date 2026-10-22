'use client';

import React, { useState } from 'react';
import styles from './BookingForm.module.css';
import { Field } from '@/components/ui/Field';
import { ErrorSummary } from '@/components/ui/ErrorSummary';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useBasket } from '@/components/tests/BasketContext';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';

interface BookingFormProps {
  defaultServiceType?: 'lab-visit' | 'home-collection';
}

export function BookingForm({ defaultServiceType = 'lab-visit' }: BookingFormProps) {
  const { t, lang } = useLanguage();
  const { items } = useBasket();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [serviceType, setServiceType] = useState<'lab-visit' | 'home-collection'>(defaultServiceType);
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{ fieldId: string; message: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { fieldId: string; message: string }[] = [];

    if (!name.trim()) {
      newErrors.push({ fieldId: 'booking-name', message: t.booking.errorName });
    }
    if (!phone.trim() || phone.trim().length < 8) {
      newErrors.push({ fieldId: 'booking-phone', message: t.booking.errorPhone });
    }
    if (serviceType === 'home-collection' && !area.trim()) {
      newErrors.push({ fieldId: 'booking-area', message: t.booking.errorArea });
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      const link = buildWhatsAppLink({
        patientName: name.trim(),
        phone: phone.trim(),
        area: area.trim(),
        serviceType,
        preferredTime: preferredTime.trim(),
        selectedTests: items,
        notes: notes.trim(),
        lang,
      });

      // Open official WhatsApp window
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const getFieldError = (id: string) => errors.find((e) => e.fieldId === id)?.message;

  return (
    <div className={styles.formWrapper} role="region" aria-label={t.booking.title}>
      <h2 className={styles.title}>{t.booking.title}</h2>
      <p className={styles.subtitle}>{t.booking.subtitle}</p>

      <form onSubmit={handleSubmit} noValidate>
        <ErrorSummary errors={errors} />

        <div className={styles.serviceRadioGroup}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            {t.booking.serviceTypeLabel} <span style={{ color: '#b91c1c' }}>*</span>
          </span>

          <label
            className={`${styles.radioOption} ${serviceType === 'lab-visit' ? styles.radioSelected : ''}`}
          >
            <input
              type="radio"
              name="booking-service-type"
              checked={serviceType === 'lab-visit'}
              onChange={() => setServiceType('lab-visit')}
            />
            <span style={{ fontSize: 'var(--text-body)', fontWeight: 500 }}>
              {t.booking.serviceLabVisit}
            </span>
          </label>

          <label
            className={`${styles.radioOption} ${serviceType === 'home-collection' ? styles.radioSelected : ''}`}
          >
            <input
              type="radio"
              name="booking-service-type"
              checked={serviceType === 'home-collection'}
              onChange={() => setServiceType('home-collection')}
            />
            <span style={{ fontSize: 'var(--text-body)', fontWeight: 500 }}>
              {t.booking.serviceHomeVisit}
            </span>
          </label>
        </div>

        <Field
          id="booking-name"
          label={t.booking.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.booking.namePlaceholder}
          required
          error={getFieldError('booking-name')}
        />

        <Field
          id="booking-phone"
          label={t.booking.phoneLabel}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.booking.phonePlaceholder}
          required
          hint="We will only use this number to send confirmation on WhatsApp."
          error={getFieldError('booking-phone')}
        />

        <Field
          id="booking-area"
          label={t.booking.areaLabel}
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder={t.booking.areaPlaceholder}
          required={serviceType === 'home-collection'}
          optional={serviceType === 'lab-visit'}
          error={getFieldError('booking-area')}
        />

        <Field
          id="booking-time"
          label={t.booking.timeLabel}
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
          placeholder={t.booking.timePlaceholder}
          optional
        />

        {items.length > 0 && (
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'var(--teal-50)',
              border: '1px solid var(--teal-200)',
              borderRadius: 'var(--radius-xs)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <strong>{t.booking.selectedTestsLabel} ({items.length}):</strong>
            <ul style={{ margin: '4px 0 0', paddingLeft: 'var(--space-5)' }}>
              {items.map((t) => (
                <li key={t.id}>{t.nameEn} [{t.code}]</li>
              ))}
            </ul>
          </div>
        )}

        <Field
          id="booking-notes"
          as="textarea"
          label={t.booking.additionalNotesLabel}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t.booking.additionalNotesPlaceholder}
          optional
        />

        <div className={styles.privacyCallout}>
          <strong>Direct WhatsApp Interaction:</strong> {t.booking.privacyNote}
        </div>

        <div className={styles.actionRow}>
          <Button type="submit" variant="whatsapp" size="lg">
            {t.booking.submitWhatsApp}
          </Button>
          <Button
            href={`tel:${siteConfig.phones.primaryCallRaw}`}
            variant="secondary"
            size="lg"
          >
            {t.booking.submitCall}: {siteConfig.phones.primaryCall}
          </Button>
        </div>
      </form>
    </div>
  );
}
