'use client';

import React, { useState } from 'react';
import styles from './TestRow.module.css';
import { DiagnosticTest } from '@/config/tests';
import { useBasket } from './BasketContext';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getFallbackMessage } from '@/config/site';

interface TestRowProps {
  test: DiagnosticTest;
}

export function TestRow({ test }: TestRowProps) {
  const { toggleTest, hasTest } = useBasket();
  const { lang, t } = useLanguage();
  const [showSubComponents, setShowSubComponents] = useState(false);

  const isSelected = hasTest(test.id);
  const prepMessage = getFallbackMessage(test.prepNote, lang);

  const deptNames: Record<string, { en: string; ml: string }> = {
    haematology: { en: 'Haematology', ml: 'ഹെമറ്റോളജി' },
    biochemistry: { en: 'Biochemistry', ml: 'ബയോകെമിസ്ട്രി' },
    serology: { en: 'Serology', ml: 'സീറോളജി' },
    pathology: { en: 'Clinical Pathology', ml: 'ക്ലിനിക്കൽ പാത്തോളജി' },
  };

  return (
    <article
      className={`${styles.row} ${isSelected ? styles.selectedRow : ''}`}
      aria-label={test.nameEn}
    >
      {/* Col 1: Test Name, Code & Subcomponents */}
      <div className={styles.colName}>
        <span className={styles.codeBadge}>{test.code}</span>
        <h3 className={styles.testName}>{test.nameEn}</h3>
        {lang === 'ml' && <span className={styles.testNameMl}>{test.nameMl}</span>}

        {test.subComponents && test.subComponents.length > 0 && (
          <div>
            <button
              type="button"
              className={styles.subComponentsTrigger}
              onClick={() => setShowSubComponents(!showSubComponents)}
              aria-expanded={showSubComponents}
            >
              {showSubComponents ? '▾ Hide parameters' : '▸ View parameters (' + test.subComponents.length + ')'}
            </button>
            {showSubComponents && (
              <div className={styles.subComponentsList}>
                {test.subComponents.map((sub, i) => (
                  <span key={i}>• {sub}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Col 2: Sample Type & Department Tag */}
      <div className={styles.colMeta}>
        <span className={styles.metaLabel}>Sample Matrix:</span>
        <span className={styles.sampleType}>
          {lang === 'ml' ? test.sampleTypeMl : test.sampleTypeEn}
        </span>
        <span className={styles.deptTag}>
          {lang === 'ml' ? deptNames[test.department]?.ml : deptNames[test.department]?.en}
        </span>
      </div>

      {/* Col 3: Preparation / Fasting Requirement */}
      <div className={styles.colPrep}>
        <div className={styles.prepNotice} role="note">
          <span className={styles.prepNoticeIcon} aria-hidden="true">
            ⓘ
          </span>
          <span>{prepMessage}</span>
        </div>
      </div>

      {/* Col 4: Action Add/Remove Button */}
      <div className={styles.colAction}>
        <button
          type="button"
          className={`${styles.addButton} ${isSelected ? styles.addSelected : styles.addNotSelected}`}
          onClick={() => toggleTest(test)}
          aria-pressed={isSelected}
          aria-label={`${isSelected ? t.common.removeFromSelection : t.common.addToSelection}: ${test.nameEn}`}
        >
          {isSelected ? (
            <>
              <span aria-hidden="true">✓</span>
              <span>{t.common.addedToSelection}</span>
            </>
          ) : (
            <>
              <span aria-hidden="true">+</span>
              <span>{t.common.addToSelection}</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
