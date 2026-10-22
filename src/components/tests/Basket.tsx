'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Basket.module.css';
import { useBasket } from './BasketContext';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';

export function Basket() {
  const { items, count, removeTest, clearBasket, isDrawerOpen, setIsDrawerOpen } = useBasket();
  const { t, lang } = useLanguage();

  const [patientName, setPatientName] = useState('');
  const [area, setArea] = useState('');
  const [serviceType, setServiceType] = useState<'lab-visit' | 'home-collection'>('lab-visit');

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus and escape handling for drawer
  useEffect(() => {
    if (isDrawerOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsDrawerOpen(false);
        }
      };
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKey);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (count === 0 && !isDrawerOpen) {
    return null;
  }

  const whatsAppLink = buildWhatsAppLink({
    selectedTests: items,
    patientName,
    area,
    serviceType,
    lang,
  });

  return (
    <>
      {/* Floating Bottom Bar (visible whenever items are selected) */}
      <aside
        className={`${styles.floatingBar} ${count > 0 ? styles.floatingBarVisible : ''}`}
        aria-label="Test selection basket bar"
      >
        <div className={`container ${styles.barInner}`}>
          <div className={styles.barInfo}>
            <span className={styles.badgeCount}>{count}</span>
            <span className={styles.barTitle}>
              {t.testsPage.basketTitle}
            </span>
          </div>

          <div className={styles.barActions}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}
            >
              {t.common.viewSelected} ({count})
            </Button>
            <Button
              href={whatsAppLink}
              variant="whatsapp"
              size="sm"
              isExternal
            >
              {t.common.sendWhatsAppBooking}
            </Button>
          </div>
        </div>
      </aside>

      {/* Review Modal Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label={t.testsPage.basketTitle}
          >
            <div className={styles.drawerHeader}>
              <h2 className={styles.drawerTitle}>
                {t.testsPage.basketTitle} ({count})
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                className={styles.closeButton}
                onClick={() => setIsDrawerOpen(false)}
                aria-label={t.common.close}
              >
                ✕
              </button>
            </div>

            {count === 0 ? (
              <p style={{ color: 'var(--ink-muted)', padding: 'var(--space-6) 0' }}>
                {t.testsPage.basketEmpty}
              </p>
            ) : (
              <>
                <ul className={styles.testList}>
                  {items.map((test) => (
                    <li key={test.id} className={styles.testItem}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{test.nameEn}</span>
                        {lang === 'ml' && (
                          <span style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)' }}>
                            {test.nameMl}
                          </span>
                        )}
                        <span className={styles.itemMeta}>
                          {test.code} · {lang === 'ml' ? test.sampleTypeMl : test.sampleTypeEn}
                        </span>
                      </div>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeTest(test.id)}
                        aria-label={`${t.common.removeFromSelection}: ${test.nameEn}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Pre-fill Details Form for WhatsApp message */}
                <div className={styles.quickBookingBlock}>
                  <label htmlFor="basket-patient-name" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '4px' }}>
                    {t.booking.nameLabel} ({t.common.optional})
                  </label>
                  <input
                    id="basket-patient-name"
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={t.booking.namePlaceholder}
                    className={styles.inputField}
                  />

                  <label htmlFor="basket-area" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '4px' }}>
                    {t.booking.areaLabel} ({t.common.optional})
                  </label>
                  <input
                    id="basket-area"
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder={t.booking.areaPlaceholder}
                    className={styles.inputField}
                  />

                  <div style={{ marginBottom: 'var(--space-3)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '6px' }}>
                      {t.booking.serviceTypeLabel}
                    </span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)', marginBottom: '4px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="basket-service-type"
                        checked={serviceType === 'lab-visit'}
                        onChange={() => setServiceType('lab-visit')}
                      />
                      {t.booking.serviceLabVisit}
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="basket-service-type"
                        checked={serviceType === 'home-collection'}
                        onChange={() => setServiceType('home-collection')}
                      />
                      {t.booking.serviceHomeVisit}
                    </label>
                  </div>

                  <p className={styles.noticeText}>
                    <strong>Note:</strong> Tapping the button below opens official WhatsApp with your message pre-composed. You must press send in WhatsApp. We never store personal data.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <Button
                      href={whatsAppLink}
                      variant="whatsapp"
                      size="lg"
                      fullWidth
                      isExternal
                    >
                      {t.common.sendWhatsAppBooking}
                    </Button>
                    <Button
                      href={`tel:${siteConfig.phones.primaryCallRaw}`}
                      variant="secondary"
                      size="md"
                      fullWidth
                    >
                      {t.common.callUs}: {siteConfig.phones.primaryCall}
                    </Button>
                    <button
                      type="button"
                      onClick={clearBasket}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--ink-muted)',
                        fontSize: 'var(--text-xs)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: '6px 0',
                      }}
                    >
                      {t.common.clearSelection}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
