'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/i18n/LanguageProvider';

export function Footer() {
  const { t, lang } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.tests, href: '/tests' },
    { label: t.nav.homeCollection, href: '/home-collection' },
    { label: t.nav.reports, href: '/reports' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        {/* Top Brand Block */}
        <div className={styles.topBrandRow}>
          <div>
            <div className={styles.brandWordmark}>
              {lang === 'ml' ? siteConfig.name : siteConfig.name}
            </div>
            <p className={styles.brandSub}>
              DIAGNOSTIC PATHOLOGY LABORATORY · ALAPPUZHA, KERALA
            </p>
          </div>
          <div>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: 'var(--teal-300)',
                letterSpacing: '0.1em',
              }}
            >
              LOC: KAICHOONDY JN · PIN 688007
            </span>
          </div>
        </div>

        {/* 3 Structured Columns */}
        <div className={styles.columnsGrid}>
          {/* Col 1: Postal Location & Details */}
          <div>
            <div className={styles.colTitle}>Laboratory Address</div>
            <p className={styles.colText}>
              <strong>{siteConfig.name}</strong>
              <br />
              {siteConfig.address.building}
              <br />
              {siteConfig.address.junction}
              <br />
              {siteConfig.address.city}, Kerala, India
            </p>
            {lang === 'ml' && (
              <p className={styles.colText} style={{ marginTop: 'var(--space-2)' }}>
                {siteConfig.address.fullMl}
              </p>
            )}
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className={styles.colTitle}>{t.footer.quickLinks}</div>
            <ul className={styles.navList}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <div className={styles.colTitle}>{t.footer.contactTitle}</div>
            <div className={styles.phoneList}>
              <a href={`tel:${siteConfig.phones.landlineRaw}`} className={styles.phoneLink}>
                {siteConfig.phones.landline}
              </a>
              <a href={`tel:${siteConfig.phones.mobile1Raw}`} className={styles.phoneLink}>
                {siteConfig.phones.mobile1}
              </a>
              <a href={`tel:${siteConfig.phones.mobile2Raw}`} className={styles.phoneLink}>
                {siteConfig.phones.mobile2}
              </a>
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--whatsapp-green)', fontSize: 'var(--text-sm)', fontWeight: 600, marginTop: '4px' }}
              >
                WhatsApp: {siteConfig.whatsapp.display} ↗
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                style={{ color: 'var(--teal-300)', fontSize: 'var(--text-xs)', marginTop: '4px' }}
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Medical Notice */}
        <div className={styles.bottomLegalRow}>
          <p className={styles.disclaimerText}>{t.footer.disclaimer}</p>
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
