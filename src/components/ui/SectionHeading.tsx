import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  level?: 'h1' | 'h2' | 'h3';
  inverse?: boolean;
  className?: string;
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
  level = 'h2',
  inverse = false,
  className = '',
}: SectionHeadingProps) {
  const HeadingTag = level;

  return (
    <div className={`${styles.wrapper} ${inverse ? styles.inverse : ''} ${className}`}>
      {(number || eyebrow) && (
        <div className={styles.eyebrowRow}>
          {number && <span className={styles.sectionNumber}>{number} /</span>}
          {eyebrow && <span className={styles.eyebrowText}>{eyebrow}</span>}
        </div>
      )}
      <HeadingTag className={styles.heading}>{title}</HeadingTag>
      {subtitle && <p className={styles.subheading}>{subtitle}</p>}
    </div>
  );
}
