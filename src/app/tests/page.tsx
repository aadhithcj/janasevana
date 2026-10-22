'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CategoryTabs } from '@/components/tests/CategoryTabs';
import { TestSearch } from '@/components/tests/TestSearch';
import { TestRow } from '@/components/tests/TestRow';
import { EmptyState } from '@/components/tests/EmptyState';
import { Basket } from '@/components/tests/Basket';
import { DepartmentKey } from '@/config/tests';
import { filterTests } from '@/lib/search';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function TestsPage() {
  const { t } = useLanguage();
  const [selectedDept, setSelectedDept] = useState<DepartmentKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return filterTests(searchQuery, selectedDept);
  }, [searchQuery, selectedDept]);

  return (
    <>
      <Header />
      <main id="main-content" style={{ padding: 'clamp(2rem, 5vw, 4.5rem) 0 8rem' }}>
        <div className="container">
          <SectionHeading
            level="h1"
            number="01"
            eyebrow="Clinical Investigations"
            title={t.testsPage.title}
            subtitle={t.testsPage.subtitle}
          />

          <CategoryTabs
            selectedDept={selectedDept}
            onSelectDept={setSelectedDept}
          />

          <TestSearch
            query={searchQuery}
            onChange={setSearchQuery}
            resultCount={filtered.length}
          />

          {/* Table Column Labels for Desktop */}
          <div
            style={{
              display: 'none',
              padding: '0 var(--space-3) var(--space-2)',
              borderBottom: '2px solid var(--teal-500)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--teal-900)',
              fontWeight: 700,
            }}
            className="tests-table-header"
          >
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.5fr 140px', width: '100%', gap: 'var(--space-4)' }}>
              <span>{t.testsPage.tableHeaderTest}</span>
              <span>{t.testsPage.tableHeaderSample}</span>
              <span>{t.testsPage.tableHeaderPrep}</span>
              <span style={{ textAlign: 'right' }}>{t.testsPage.tableHeaderAction}</span>
            </div>
          </div>

          <style jsx>{`
            @media (min-width: 860px) {
              .tests-table-header {
                display: block !important;
              }
            }
          `}</style>

          {/* Test Rows */}
          {filtered.length > 0 ? (
            <div role="feed" aria-label="Diagnostic test list">
              {filtered.map((test) => (
                <TestRow key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <EmptyState
              onClear={() => {
                setSearchQuery('');
                setSelectedDept('all');
              }}
            />
          )}

          {/* Reassurance Disclaimer */}
          <div
            style={{
              marginTop: 'var(--space-8)',
              padding: 'var(--space-4) var(--space-5)',
              backgroundColor: 'var(--paper-light)',
              border: '1px solid var(--ink-hairline)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-sm)',
              color: 'var(--ink-secondary)',
              lineHeight: 'var(--lh-body)',
            }}
          >
            <strong>Note on clinical interpretation:</strong> {t.common.disclaimer} Each test report issued by Janasevana Lab prints its verified biological reference interval.
          </div>
        </div>
      </main>

      <Basket />
    </>
  );
}
