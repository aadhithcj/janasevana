'use client';

import React from 'react';
import styles from './EmptyState.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.emptyWrapper} role="region" aria-label="Search empty state">
      <h3 className={styles.title}>{t.testsPage.noResultsTitle}</h3>
      <p className={styles.desc}>{t.testsPage.noResultsDesc}</p>

      <div className={styles.actionGroup}>
        <Button href={`tel:${siteConfig.phones.primaryCallRaw}`} variant="primary">
          {t.testsPage.noResultsCall}
        </Button>
        <Button href={siteConfig.whatsapp.link} variant="whatsapp" isExternal>
          {t.testsPage.noResultsWhatsApp}
        </Button>
        <Button variant="ghost" onClick={onClear}>
          Reset Search Filter
        </Button>
      </div>
    </div>
  );
}
