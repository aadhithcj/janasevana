'use client';

import React from 'react';
import styles from './SkipLink.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';

export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a href="#main-content" className={styles.skipLink}>
      {t.common.skipToContent}
    </a>
  );
}
