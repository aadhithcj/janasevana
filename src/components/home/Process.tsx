'use client';

import React from 'react';
import styles from './Process.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      num: t.process.step1Num,
      title: t.process.step1Title,
      desc: t.process.step1Desc,
    },
    {
      num: t.process.step2Num,
      title: t.process.step2Title,
      desc: t.process.step2Desc,
    },
    {
      num: t.process.step3Num,
      title: t.process.step3Title,
      desc: t.process.step3Desc,
    },
  ];

  return (
    <section className={styles.processSection} aria-label={t.process.heading}>
      <div className="container">
        <SectionHeading
          number={t.process.sectionNum}
          eyebrow="Standard Workflow"
          title={t.process.heading}
          subtitle={t.process.subheading}
        />

        <div className={styles.timeline}>
          {steps.map((step) => (
            <div key={step.num} className={styles.stepCard}>
              <span className={styles.stepNum}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
