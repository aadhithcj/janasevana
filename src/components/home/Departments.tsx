import { confirmed } from '@config/confirm';
import { photoFiles } from '@config/photos';
import { site } from '@config/site';
import { tests, type DepartmentId } from '@config/tests';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { DeptControls } from './DeptControls';
import s from './Departments.module.css';

const order: DepartmentId[] = ['haematology', 'biochemistry', 'serology', 'clinical-pathology', 'other'];

/**
 * The five departments as tall cards in a snapping row. Each is a native
 * <details name="dept">, so one opens at a time and it all works without
 * JavaScript; the open card turns pale and lists its tests. The numeral on
 * each card is its real test count, not a decorative index. A card shows an
 * equipment photo only where config supplies one.
 */
export function Departments({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const dir = href(locale, 'tests');
  const sv = d.home.services;
  const body: Record<string, string> = {
    haematology: sv.haematology,
    biochemistry: sv.biochemistry,
    serology: sv.serology,
    'clinical-pathology': sv.clinicalPathology,
    other: `${sv.rapid} ${sv.lungsHeart}`,
  };
  return (
    <section className={s.section} aria-labelledby="dept-title">
      <div className={`wrap ${s.head}`}>
        <h2 id="dept-title" className={s.title}>
          {d.front.deptTitle}
        </h2>
        <p className={s.lede}>
          {d.sections.capabilitiesLede} {d.home.discounts}
        </p>
      </div>
      <div className={s.rowWrap}>
        <div className={s.row} id="dept-row">
          {order.map((dep, i) => {
            const list = tests.filter((t) => t.department === dep);
            const kit = site.equipment[dep] ? confirmed(site.equipment[dep]!) : null;
            return (
              <details key={dep} name="dept" className={s.card} open={i === 0}>
                <summary className={s.face}>
                  <span className={`${s.count} num`}>{d.front.deptCount(list.length)}</span>
                  <span className={s.name}>{d.tests.departments[dep]}</span>
                  {kit && (
                    <span className={`${s.photo} ${photoFiles[kit.photo].fit === 'contain' ? s.contain : ''}`}>
                      <Photo name={kit.photo} alt={d.common.photoAlt.equipment(kit.name)} sizes="(min-width: 48rem) 26rem, 90vw" />
                    </span>
                  )}
                  <span className={s.discover}>
                    <span>{d.front.discover}</span>
                    <span className={s.circle} aria-hidden="true">
                      <Icon name="arrow" />
                    </span>
                  </span>
                </summary>
                <div className={s.body}>
                  <p className={s.text}>{body[dep]}</p>
                  <ul role="list" className={s.list}>
                    {list.slice(0, 5).map((t) => (
                      <li key={t.id}>
                        <a href={`${dir}?q=${encodeURIComponent(t.name)}`} className={s.item}>
                          <span>{t.name}</span>
                          <Icon name="arrow" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a href={`${dir}?dept=${dep}`} className={s.all}>
                    {d.front.deptAll(list.length)}
                  </a>
                </div>
              </details>
            );
          })}
        </div>
        <div className={`wrap ${s.foot}`}>
          <span className={s.progress} aria-hidden="true">
            <span />
          </span>
          <DeptControls prev={d.front.deptPrev} next={d.front.deptNext} />
        </div>
      </div>
    </section>
  );
}
