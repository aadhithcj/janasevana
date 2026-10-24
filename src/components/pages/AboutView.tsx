import { confirmed } from '@config/confirm';
import { site } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { TeamQuality } from '@/components/home/TeamQuality';
import { ReportGuide } from '@/components/about/ReportGuide';
import s from './AboutView.module.css';

/** Equipment photos supplied by the owner (manufacturers' photographs of the models; see config/site.ts). */
const kit = [
  { photo: 'erba-h360', name: 'Erba H360', kind: 'haematology' },
  { photo: 'erba-xl200', name: 'Erba XL-200', kind: 'biochemistry' },
  { photo: 'erba-ec90', name: 'Erba EC 90', kind: 'electrolytes' },
  { photo: 'vidas-kube', name: 'bioMérieux VIDAS KUBE', kind: 'immunoassay' },
] as const;

/**
 * About, in the home page's panel language: the equipment as a mist panel
 * (what the lab does as white tiles, the analysers as photo cards), quality
 * as a mist card beside the shopfront, then the team and the report guide.
 */
export function AboutView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const cert = confirmed(site.isoCertificate);
  return (
    <>
      <PageHead title={d.about.h1} lede={d.about.lede} />
      <section aria-labelledby="equipment-title" className={s.section}>
        <div className="wrap">
          <div className={s.panel}>
            <div className={s.head}>
              <h2 id="equipment-title" className={s.heading}>
                {d.about.equipmentTitle}
              </h2>
              <p className={s.line} lang="en">
                {site.lines.automation}
              </p>
            </div>
            <ul role="list" className={s.does}>
              {d.about.equipment.map((e, i) => (
                <li key={e} className={s.doesItem} data-reveal style={{ '--i': i } as React.CSSProperties}>
                  <span className={s.doesIcon} aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <ul role="list" className={s.kit}>
              {kit.map((k, i) => (
                <li key={k.photo} data-reveal style={{ '--i': i } as React.CSSProperties}>
                  <figure className={s.kitItem}>
                    <span className={s.kitStage}>
                      <Photo name={k.photo} alt={d.common.photoAlt.equipment(k.name)} sizes="(min-width: 64rem) 16rem, 45vw" className={s.kitPhoto} />
                    </span>
                    <figcaption>
                      <span lang="en" className={s.kitName}>
                        {k.name}
                      </span>
                      <span className={s.kitKind}>{d.about.kit[k.kind]}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="quality-title" className={s.section}>
        <div className={`wrap ${s.pair}`}>
          <div className={s.quality} data-reveal>
            <h2 id="quality-title" className={s.qualityTitle}>
              {d.about.qualityTitle}
            </h2>
            <p className={s.qualityLine}>{d.about.quality}</p>
            {cert && <p className={s.cert}>{cert}</p>}
          </div>
          <figure className={s.stage}>
            <Photo name="storefront" alt={d.common.photoAlt.storefront} sizes="(min-width: 64rem) 46vw, 92vw" className={s.photo} />
          </figure>
        </div>
      </section>

      <TeamQuality locale={locale} showLink={false} />
      <ReportGuide locale={locale} />
    </>
  );
}
