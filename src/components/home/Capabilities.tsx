import Link from 'next/link';
import { tests, type DepartmentId } from '@config/tests';
import { getDict } from '@/i18n';
import { rowFromTest } from '@/lib/indexRows';
import { href, type Locale } from '@/lib/paths';
import { IndexList } from '@/components/index/IndexList';
import { ActiveIndex } from './ActiveIndex';
import s from './Capabilities.module.css';

type Block = { id: string; dept?: DepartmentId; name: string; body: string; ids: string[] };

/**
 * Capabilities: the department index pins on wide, tall screens while each
 * department's Index teaser scrolls beside it. A small observer only marks
 * the department in view; everything reads in full without it.
 */
export function Capabilities({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const dept = d.tests.departments;
  const by = (dep: DepartmentId) => tests.filter((t) => t.department === dep && t.kind !== 'package').map((t) => t.id);
  const blocks: Block[] = [
    { id: 'cap-haem', dept: 'haematology', name: dept.haematology, body: d.home.services.haematology, ids: by('haematology') },
    { id: 'cap-bio', dept: 'biochemistry', name: dept.biochemistry, body: d.home.services.biochemistry, ids: by('biochemistry') },
    { id: 'cap-sero', dept: 'serology', name: dept.serology, body: d.home.services.serology, ids: by('serology') },
    { id: 'cap-path', dept: 'clinical-pathology', name: dept['clinical-pathology'], body: d.home.services.clinicalPathology, ids: by('clinical-pathology') },
    { id: 'cap-rapid', name: d.home.serviceNames.rapid, body: d.home.services.rapid, ids: tests.filter((t) => t.kind === 'category').map((t) => t.id) },
    { id: 'cap-lung', name: d.home.serviceNames.lungsHeart, body: d.home.services.lungsHeart, ids: ['pft', 'nebulisation', 'ecg'] },
  ];
  return (
    <section className={s.band} aria-labelledby="cap-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.side}>
          <div className={s.sideInner}>
            <h2 id="cap-title" className={s.title}>
              {d.sections.capabilities}
            </h2>
            <p className={s.lede}>{d.sections.capabilitiesLede}</p>
            <nav aria-labelledby="cap-title">
              <ol className={s.index} data-active-index>
                {blocks.map((b) => (
                  <li key={b.id}>
                    <a href={`#${b.id}`} className={s.indexLink}>
                      <span>{b.name}</span>
                      <span className={`${s.indexCount} num`}>{b.ids.length}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <p className={s.discount}>{d.home.discounts}</p>
          </div>
        </div>

        <div className={s.main}>
          {blocks.map((b) => (
            <section key={b.id} id={b.id} className={s.block} aria-labelledby={`${b.id}-h`} data-active-target>
              <h3 id={`${b.id}-h`} className={s.blockTitle}>
                {b.name} <span className="num">{b.ids.length}</span>
              </h3>
              <p className={s.body}>{b.body}</p>
              {/* Rapid tests and lungs/heart are fully named in their sentence; the rest show a short Index teaser. */}
              {b.dept && (
              <IndexList
                rows={b.ids
                  .slice(0, 4)
                  .map((id) => tests.find((t) => t.id === id)!)
                  .map(rowFromTest)}
                density="teaser"
                locale={locale}
                t={d.index}
              />
              )}
            </section>
          ))}
          <Link href={href(locale, 'tests')} className={s.all}>
            {d.sections.seeAll}
          </Link>
        </div>
      </div>
      <ActiveIndex />
    </section>
  );
}
