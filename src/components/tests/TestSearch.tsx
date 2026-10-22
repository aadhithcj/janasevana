'use client';

import React from 'react';
import styles from './TestSearch.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';

interface TestSearchProps {
  query: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function TestSearch({ query, onChange, resultCount }: TestSearchProps) {
  const { t, lang } = useLanguage();

  const suggestedSynonyms =
    lang === 'ml'
      ? ['CBC', 'ലിവർ (Liver)', 'യൂറിൻ (Urine)', 'രക്തപരിശോധന', 'കിഡ്നി']
      : ['Blood Count (CBC)', 'Liver (LFT)', 'Urine Routine', 'Kidney (Creatinine)', 'Fever'];

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="test-search-input" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
        {t.testsPage.searchPlaceholder}
      </label>

      <div className={styles.inputGroup}>
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>
        <input
          id="test-search-input"
          type="search"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.testsPage.searchPlaceholder}
          className={styles.searchInput}
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => onChange('')}
            aria-label="Clear search query"
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.metaRow}>
        <div className={styles.synonymPills}>
          <span className={styles.pillLabel}>Quick Suggestions:</span>
          {suggestedSynonyms.map((syn) => {
            const rawTerm = syn.split(' ')[0].replace(/[\(\)]/g, '');
            return (
              <button
                key={syn}
                type="button"
                className={styles.synonymTag}
                onClick={() => onChange(rawTerm)}
              >
                {syn}
              </button>
            );
          })}
        </div>

        <div>
          <span className="num-tabular" style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>
            {resultCount}
          </span>{' '}
          {t.testsPage.searchResultCount}
        </div>
      </div>
    </div>
  );
}
