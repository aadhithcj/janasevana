'use client';

import React from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { SpecimenLabel } from './SpecimenLabel';
import { siteConfig, getFallbackMessage, googleMapsSearchUrl } from '@/config/site';

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className={styles.heroSection} aria-label="Introduction">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Asymmetric Typography & Direct CTAs */}
          <div className={styles.leftCol}>
            <div className={styles.microLabel}>
              <span className={styles.microDot} aria-hidden="true" />
              <span>{t.hero.microLabel}</span>
            </div>

            <h1 className={styles.headline}>
              {lang === 'ml' ? (
                <>
                  {t.hero.headlinePart1}{' '}
                  <span className={styles.headlineEmphasized}>{t.hero.headlineEmphasized}</span>{' '}
                  {t.hero.headlinePart2}
                </>
              ) : (
                <>
                  {t.hero.headlinePart1}{' '}
                  <span className={styles.headlineEmphasized}>{t.hero.headlineEmphasized}</span>{' '}
                  {t.hero.headlinePart2}
                </>
              )}
            </h1>

            <p className={styles.subhead}>{t.hero.subhead}</p>

            <div className={styles.ctaGroup}>
              <Button href="/tests" variant="primary" size="lg">
                {t.hero.ctaBrowseTests}
              </Button>
              <Button
                href={`tel:${siteConfig.phones.primaryCallRaw}`}
                variant="secondary"
                size="lg"
              >
                {t.hero.ctaCallDirect}
              </Button>
              <Button
                href={siteConfig.whatsapp.link}
                variant="whatsapp"
                size="lg"
                isExternal
              >
                {t.common.whatsappUs}
              </Button>
            </div>
          </div>

          {/* Right Column: Signature SpecimenLabel composition */}
          <div className={styles.rightCol}>
            <SpecimenLabel />
          </div>
        </div>

        {/* Ruled Info Strip: Address, Tap-to-call Phone Lines, Hours Notice */}
        <div className={styles.infoStrip}>
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Laboratory Address</span>
              <span className={styles.infoValue}>
                {siteConfig.address.building}, {siteConfig.address.junction}, {siteConfig.address.city}
              </span>
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                {t.common.getDirections} ↗
              </a>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Telephone (Tap to Call)</span>
              <div className={styles.infoValue}>
                <a href={`tel:${siteConfig.phones.landlineRaw}`} className="num-tabular">
                  {siteConfig.phones.landline}
                </a>{' '}
                ·{' '}
                <a href={`tel:${siteConfig.phones.mobile1Raw}`} className="num-tabular">
                  {siteConfig.phones.mobile1}
                </a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Daily Hours</span>
              <span className={styles.infoValue}>
                {t.common.hoursUnconfirmed}
              </span>
              <span className={styles.hoursNoticeBadge}>
                {getFallbackMessage(siteConfig.openingHours, lang)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
