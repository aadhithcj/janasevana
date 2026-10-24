import { categories } from '@config/tests';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import s from './Categories.module.css';

/** Everyday entry points, set as a typographic list; each opens the directory pre-filtered. */
export function Categories({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const tests = href(locale, 'tests');
  return (
    <section className={s.section} aria-labelledby="cat-title">
      <div className={`wrap ${s.inner}`}>
        <h2 id="cat-title" className={s.title}>
          {d.sections.categories}
        </h2>
        <ul role="list" className={s.list} data-reveal>
          {categories.map((c) => (
            <li key={c.id}>
              <a href={`${tests}?cat=${c.id}`} className={s.item}>
                <span className={s.word}>{d.tests.categories[c.id]}</span>
                <span className={`${s.count} num`}>{d.sections.categoryTests(c.ids.length)}</span>
                <Icon name="arrow" className={s.arrow} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
