'use client';

import React from 'react';
import styles from './Team.module.css';
import { staffMembers } from '@/config/team';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import ProfileCard from '@/components/ui/ProfileCard';
import { siteConfig } from '@/config/site';

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
              <div key={member.id} className={styles.cardWrapper}>
                <ProfileCard
                  name={name}
                  title={role}
                  handle="janasevanalab"
                  status={lang === 'ml' ? 'സ്ഥിരീകരിച്ച ജീവനക്കാർ' : 'Verified Staff'}
                  statusColor="#22c55e"
                  contactText={t.common.callUs}
                  holo={0.55}
                  glare={0.5}
                  tiltStrength={1}
                  parallax={0}
                  radius={8}
                  enableTilt={true}
                  intro={true}
                  showUserInfo={true}
                  enableMobileTilt={false}
                  theme="dark"
                  miniAvatarUrl="/images/brand-emblem.png"
                  onContactClick={() => {
                    window.location.href = `tel:${siteConfig.phones.primaryCallRaw}`;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
