'use client';

import React from 'react';
import styles from './CategoryTabs.module.css';
import { DepartmentKey, departments, diagnosticTests } from '@/config/tests';
import { useLanguage } from '@/i18n/LanguageProvider';

interface CategoryTabsProps {
  selectedDept: DepartmentKey;
  onSelectDept: (dept: DepartmentKey) => void;
}

export function CategoryTabs({ selectedDept, onSelectDept }: CategoryTabsProps) {
  const { t, lang } = useLanguage();

  const tabs: { key: DepartmentKey; label: string; count: number }[] = [
    {
      key: 'all',
      label: t.testsPage.allCategories,
      count: diagnosticTests.length,
    },
    ...departments.map((dept) => ({
      key: dept.key,
      label: lang === 'ml' ? dept.nameMl : dept.nameEn,
      count: diagnosticTests.filter((item) => item.department === dept.key).length,
    })),
  ];

  return (
    <div role="tablist" aria-label="Filter investigations by department" className={styles.tabList}>
      {tabs.map((tab) => {
        const isSelected = selectedDept === tab.key;
        return (
          <div key={tab.key} role="presentation" className={styles.tabItem}>
            <button
              role="tab"
              type="button"
              id={`tab-${tab.key}`}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.key}`}
              className={`${styles.tabButton} ${isSelected ? styles.tabActive : ''}`}
              onClick={() => onSelectDept(tab.key)}
            >
              <span>{tab.label}</span>
              <span className={styles.tabCount}>{tab.count}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
