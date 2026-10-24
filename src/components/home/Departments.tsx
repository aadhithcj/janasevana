import { confirmed } from '@config/confirm';
import { photoFiles } from '@config/photos';
import { site } from '@config/site';
import { tests, type DepartmentId } from '@config/tests';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { DeptIndex } from './DeptIndex';
import s from './Departments.module.css';

const order: DepartmentId[] = ['haematology', 'biochemistry', 'serology', 'clinical-pathology', 'other'];

/**
 * What the lab does, as a sticky scroll. Wide, tall screens: the title and a
 * department index pin on the left while five department cards stack on the
 * right, each sticking a little below the last, so the next one slides over
 * it. The index marks the card in view. Phones: the index becomes a row of
 * chips and the cards a swipeable row. Pure CSS sticky; the script only marks
 * the current card. The number on each card is its real test count.
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
  const depts = order.map((dep) => ({
    dep,
    id: `dept-${dep}`,
    list: tests.filter((t) => t.department === dep),
    kit: site.equipment[dep] ? confirmed(site.equipment[dep]!) : null,
  }));
  return (
    <section className={s.section} aria-labelledby="dept-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.side}>
          <div className={s.sideInner}>
            <h2 id="dept-title" className={s.title}>
              {d.front.deptTitle}
            </h2>
            <p className={s.lede}>
              {d.sections.capabilitiesLede} {d.home.discounts}
            </p>
            <nav aria-labelledby="dept-title">
              <ol role="list" className={s.index} data-dept-index>
                {depts.map(({ dep, id, list }) => (
                  <li key={dep}>
                    <a href={`#${id}`} className={s.indexLink}>
                      <span>{d.tests.departments[dep]}</span>
                      <span className={`${s.indexCount} num`}>{list.length}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        <div className={s.stack} id="dept-row">
          {depts.map(({ dep, id, list, kit }, i) => (
            <article key={dep} id={id} className={s.card} aria-labelledby={`${id}-h`} data-dept-card style={{ '--i': i } as React.CSSProperties}>
              <div className={s.cardText}>
                <p className={`${s.count} num`}>{d.front.deptCount(list.length)}</p>
                <h3 id={`${id}-h`} className={s.name}>
                  {d.tests.departments[dep]}
                </h3>
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
                  <span>{d.front.deptAll(list.length)}</span>
                  <span className={s.allCircle} aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </a>
              </div>
              {kit && (
                <div className={`${s.photo} ${photoFiles[kit.photo].fit === 'contain' ? s.contain : ''}`}>
                  <Photo name={kit.photo} alt={d.common.photoAlt.equipment(kit.name)} sizes="(min-width: 64rem) 22rem, 80vw" />
                  <p className={s.kitName} lang="en">
                    {kit.name}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      <DeptIndex />
    </section>
  );
}
