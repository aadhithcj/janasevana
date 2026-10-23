import Link from 'next/link';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import s from './Services.module.css';

/** What the lab does, as a ruled index: department on the left, what it covers on the right. */
export function Services({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const dept = d.tests.departments;
  const rows = [
    { name: dept.haematology, body: d.home.services.haematology },
    { name: dept.biochemistry, body: d.home.services.biochemistry },
    { name: dept.serology, body: d.home.services.serology },
    { name: dept['clinical-pathology'], body: d.home.services.clinicalPathology },
    { name: d.home.serviceNames.rapid, body: d.home.services.rapid },
    { name: d.home.serviceNames.lungsHeart, body: d.home.services.lungsHeart },
  ];
  return (
    <section className={s.section} aria-labelledby="services-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.side} data-reveal>
          <h2 id="services-title" className={s.heading}>
            {d.home.servicesTitle}
          </h2>
          <p className={s.intro}>{d.home.servicesIntro}</p>
          <p className={s.discount}>{d.home.discounts}</p>
          <Link href={href(locale, 'tests')} className={s.link}>
            {d.home.servicesLink}
          </Link>
        </div>
        <dl className={s.list} data-reveal>
          {rows.map((r) => (
            <div key={r.name} className={s.row}>
              <dt className={s.name}>{r.name}</dt>
              <dd className={s.body}>{r.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
