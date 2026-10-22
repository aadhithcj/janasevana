'use client';

import React from 'react';
import styles from './SpecimenLabel.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';
import { siteConfig } from '@/config/site';

interface SpecimenLabelProps {
  className?: string;
}

export function SpecimenLabel({ className = '' }: SpecimenLabelProps) {
  const { t, lang } = useLanguage();

  // Precise SVG barcode bars pattern (Code 128 look, realistic rhythm)
  // Zero patient data, no fake clinical patient numbers
  const barPattern = [
    3, 1, 1, 2, 1, 3, 2, 1, 1, 4, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 3, 1, 2, 1, 1,
    2, 3, 1, 2, 1, 1, 3, 2, 2, 1, 1, 4, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1,
    3, 2, 1, 1, 2, 4, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 4, 2, 1,
  ];

  let currentX = 10;
  const renderedBars = barPattern.map((width, index) => {
    const isBar = index % 2 === 0;
    const x = currentX;
    currentX += width * 2.8;
    if (!isBar) return null;
    return (
      <rect
        key={index}
        x={x}
        y={0}
        width={width * 2.5}
        height={44}
        fill="#151919"
      />
    );
  });

  return (
    <div className={`${styles.labelWrapper} ${className}`} aria-label={t.specimenLabel.barcodeAlt}>
      {/* Perforated Edge */}
      <div className={styles.perforatedTop} aria-hidden="true" />

      {/* Registration Marks (+) in all 4 corners */}
      <span className={`${styles.cornerMark} ${styles.topLeft}`} aria-hidden="true" />
      <span className={`${styles.cornerMark} ${styles.topRight}`} aria-hidden="true" />
      <span className={`${styles.cornerMark} ${styles.bottomLeft}`} aria-hidden="true" />
      <span className={`${styles.cornerMark} ${styles.bottomRight}`} aria-hidden="true" />

      {/* Label Header */}
      <div className={styles.labelHeader}>
        <div>
          <div className={styles.labTitle}>
            {lang === 'ml' ? 'ജനസേവന ലാബ്' : 'JANASEVANA LAB'}
          </div>
          <div className={styles.labLocation}>
            {lang === 'ml' ? 'കൈചൂണ്ടി ജംഗ്ഷൻ, ആലപ്പുഴ' : 'KAICHOONDY JN., ALAPPUZHA'}
          </div>
        </div>
        <div className={styles.badgeAccreditation}>
          CLINICAL LAB
        </div>
      </div>

      {/* Ruled Form Grid */}
      <div className={styles.ruledGrid}>
        <div className={styles.gridCell}>
          <span className={styles.cellLabel}>ACCESSION PROTOCOL</span>
          <span className={styles.cellValue}>JS-ALPY-688007</span>
        </div>
        <div className={styles.gridCell}>
          <span className={styles.cellLabel}>SERVICE DISCIPLINE</span>
          <span className={styles.cellValue}>DIAGNOSTIC PATHOLOGY</span>
        </div>
        <div className={styles.gridCell}>
          <span className={styles.cellLabel}>PRIMARY MATRICES</span>
          <span className={styles.cellValue}>EDTA · SERUM · URINE</span>
        </div>
        <div className={styles.gridCell}>
          <span className={styles.cellLabel}>FACILITY PIN</span>
          <span className={styles.cellValue}>ALAPPUZHA 688007</span>
        </div>
        <div className={styles.gridCellFull}>
          <span className={styles.cellLabel}>ADDRESS SPECIFICATION</span>
          <span className={styles.cellValue}>
            {siteConfig.address.building}, {siteConfig.address.junction}
          </span>
        </div>
      </div>

      {/* SVG Barcode Strip */}
      <div className={styles.barcodeSection}>
        <svg
          viewBox="0 0 240 44"
          preserveAspectRatio="none"
          className={styles.barcodeSvg}
          role="img"
          aria-label={t.specimenLabel.barcodeAlt}
        >
          {renderedBars}
        </svg>
        <span className={styles.barcodeDigits}>* JS-ALPY-688007-LAB *</span>
      </div>

      {/* Footer Line */}
      <div className={styles.labelFooter}>
        <span className={styles.statusIndicator}>
          <span className={styles.statusDot} aria-hidden="true" />
          ACTIVE DIAGNOSTICS
        </span>
        <span>STANDARDIZED PROTOCOL</span>
      </div>
    </div>
  );
}
