'use client';

import React from 'react';
import styles from './Team.module.css';
import { staffMembers } from '@/config/team';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Team() {
  const { t, lang } = useLanguage();

  return (
    <section className={styles.teamSection} aria-label={t.team.heading}>
      <div className="container">
        <SectionHeading
          number={t.team.sectionNum}
          eyebrow="Clinical Personnel"
          title={t.team.heading}
          subtitle={t.team.subheading}
        />

        <div className={styles.teamGrid}>
          {staffMembers.map((member) => {
            const name = lang === 'ml' ? member.nameMl : member.nameEn;
            const role = lang === 'ml' ? member.roleMl : member.roleEn;

            return (
              <article key={member.id} className={styles.memberCard}>
                {/* Intentional Duotone Teal Photo Slot */}
                <div className={styles.photoSlot} aria-label={`${name} portrait slot`}>
                  <div className={styles.photoPattern} aria-hidden="true" />
                  <span className={styles.initials} aria-hidden="true">
                    {member.initials}
                  </span>
                  <span className={styles.photoBadge}>
                    PHOTO PENDING OWNER CONFIRMATION
                  </span>
                </div>

                <div className={styles.roleSmallCaps}>{role}</div>
                <h3 className={styles.memberName}>{name}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
