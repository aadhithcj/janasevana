'use client';

import React from 'react';
import styles from './LocationPanel.module.css';
import { siteConfig, googleMapsSearchUrl, getFallbackMessage } from '@/config/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/Button';

export function LocationPanel() {
  const { t, lang } = useLanguage();

  return (
    <section className={styles.panelSection} aria-label={t.locationPanel.heading}>
      <div className="container">
        {/* Letterhead-style high-contrast panel */}
        <div className={styles.letterheadPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.labTitle}>{siteConfig.name}</h2>
              <p className={styles.labSub}>
                DIAGNOSTIC PATHOLOGY LABORATORY · ALAPPUZHA, KERALA
              </p>
            </div>

            <button
              type="button"
              className={`${styles.printBadge} no-print`}
              onClick={() => window.print()}
              aria-label={t.locationPanel.printCta}
            >
              <span aria-hidden="true">🖨</span>
              <span>{t.locationPanel.printCta}</span>
            </button>
          </div>

          <div className={styles.contentGrid}>
            {/* Left Col: Address, Directions, Email */}
            <div>
              <div className={styles.blockTitle}>{t.locationPanel.addressTitle}</div>
              <p className={styles.addressText}>
                {siteConfig.address.building}
                <br />
                {siteConfig.address.junction}
                <br />
                {siteConfig.address.city}, Kerala - {siteConfig.address.pincode}
              </p>
              {lang === 'ml' && (
                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', marginBottom: 'var(--space-4)' }}>
                  {siteConfig.address.fullMl}
                </p>
              )}

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span className={styles.blockTitle}>Direct Email</span>
                <br />
                <a href={`mailto:${siteConfig.email}`} className={styles.emailLine}>
                  {siteConfig.email}
                </a>
              </div>

              <div className={styles.actionRow}>
                <Button
                  href={googleMapsSearchUrl}
                  variant="primary"
                  isExternal
                >
                  {t.locationPanel.directionsCta} ↗
                </Button>
                <Button
                  href={siteConfig.whatsapp.link}
                  variant="whatsapp"
                  isExternal
                >
                  {t.common.whatsappUs}
                </Button>
              </div>
            </div>

            {/* Right Col: Tap-to-call tabular numbers & Hours */}
            <div>
              <div className={styles.blockTitle}>{t.locationPanel.phoneTitle}</div>
              <div className={styles.phoneList}>
                <div className={styles.phoneItem}>
                  <span className={styles.phoneLabel}>Landline (Laboratory)</span>
                  <a
                    href={`tel:${siteConfig.phones.landlineRaw}`}
                    className={styles.phoneLink}
                    aria-label={`Call landline: ${siteConfig.phones.landline}`}
                  >
                    {siteConfig.phones.landline}
                  </a>
                </div>

                <div className={styles.phoneItem}>
                  <span className={styles.phoneLabel}>Mobile / WhatsApp</span>
                  <a
                    href={`tel:${siteConfig.phones.mobile1Raw}`}
                    className={styles.phoneLink}
                    aria-label={`Call mobile: ${siteConfig.phones.mobile1}`}
                  >
                    {siteConfig.phones.mobile1}
                  </a>
                </div>

                <div className={styles.phoneItem}>
                  <span className={styles.phoneLabel}>Mobile Line 2</span>
                  <a
                    href={`tel:${siteConfig.phones.mobile2Raw}`}
                    className={styles.phoneLink}
                    aria-label={`Call mobile line 2: ${siteConfig.phones.mobile2}`}
                  >
                    {siteConfig.phones.mobile2}
                  </a>
                </div>
              </div>

              <div className={styles.blockTitle}>{t.locationPanel.hoursTitle}</div>
              <div className={styles.hoursNoticeBox}>
                <strong>{t.common.hoursUnconfirmed}:</strong>
                <p style={{ margin: '4px 0 0' }}>
                  {getFallbackMessage(siteConfig.openingHours, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
