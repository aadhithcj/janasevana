'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Departments.module.css';
import { departments } from '@/config/tests';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Departments() {
  const { t, lang } = useLanguage();

  return (
    <section className={styles.departmentsSection} aria-label={t.departments.heading}>
      <div className="container">
        <div className={styles.introRow}>
          <SectionHeading
            number={t.departments.sectionNum}
            eyebrow="Clinical Disciplines"
            title={t.departments.heading}
            subtitle={t.departments.subheading}
            inverse
          />
        </div>

        <div className={styles.deptGrid}>
          {departments.map((dept) => {
            const name = lang === 'ml' ? dept.nameMl : dept.nameEn;
            const desc = lang === 'ml' ? dept.descriptionMl : dept.descriptionEn;

            return (
              <article key={dept.key} className={styles.deptItem}>
                <div className={styles.numRow}>
                  <span className={styles.deptNum}>{dept.number}</span>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-inv-muted)',
                    }}
                  >
                    DISCIPLINE · ALAPPUZHA
                  </span>
                </div>

                <h3 className={styles.deptName}>{name}</h3>
                <p className={styles.deptDesc}>{desc}</p>

                <Link href={`/tests`} className={styles.viewLink}>
                  {t.departments.viewTestsInDept} {name} →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
