'use client';

import React from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px',
        backgroundColor: 'var(--paper-muted)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--ink-hairline)',
      }}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        style={{
          minWidth: '38px',
          minHeight: '34px',
          padding: '4px 10px',
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-sans-google), var(--font-sans)',
          fontWeight: lang === 'en' ? 700 : 500,
          color: lang === 'en' ? '#ffffff' : 'var(--ink-secondary)',
          backgroundColor: lang === 'en' ? 'var(--teal-500)' : 'transparent',
          borderRadius: 'var(--radius-xs)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all var(--duration-fast) ease',
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('ml')}
        aria-pressed={lang === 'ml'}
        lang="ml"
        style={{
          minWidth: '54px',
          minHeight: '34px',
          padding: '4px 10px',
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-ml-sans-google), var(--font-sans)',
          fontWeight: lang === 'ml' ? 700 : 500,
          color: lang === 'ml' ? '#ffffff' : 'var(--ink-secondary)',
          backgroundColor: lang === 'ml' ? 'var(--teal-500)' : 'transparent',
          borderRadius: 'var(--radius-xs)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all var(--duration-fast) ease',
        }}
      >
        മലയാളം
      </button>
    </div>
  );
}
