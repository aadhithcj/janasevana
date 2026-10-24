import { confirmed } from '@config/confirm';
import { site } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { TeamQuality } from '@/components/home/TeamQuality';
import { ReportGuide } from '@/components/about/ReportGuide';
import s from './AboutView.module.css';

export function AboutView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const cert = confirmed(site.isoCertificate);
  return (
    <>
      <PageHead title={d.about.h1} lede={d.about.lede} />
      <div className={`wrap ${s.grid}`}>
        <section aria-labelledby="equipment-title" className={s.block} data-reveal>
          <h2 id="equipment-title" className={s.heading}>
            {d.about.equipmentTitle}
          </h2>
          <p className={s.line} lang="en">
            {site.lines.automation}
          </p>
          <ul role="list" className={s.list}>
            {d.about.equipment.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
        <div className={s.side}>
          <PhotoSlot photo={site.photos.storefront} caption={d.common.photoSlot.storefront} alt={d.common.photoAlt.storefront} ratio="1473 / 1068" />
        </div>
        <section aria-labelledby="quality-title" className={s.block} data-reveal>
          <h2 id="quality-title" className={s.heading}>
            {d.about.qualityTitle}
          </h2>
          <p className={s.quality}>{d.about.quality}</p>
          {cert && <p>{cert}</p>}
        </section>
      </div>
      <TeamQuality locale={locale} showLink={false} />
      <ReportGuide locale={locale} />
    </>
  );
}
