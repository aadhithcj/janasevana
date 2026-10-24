import { categories } from '@config/tests';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { SearchHints } from './SearchHints';
import s from './Search.module.css';

/**
 * "What do you need?": one large search that goes straight to the Tests
 * directory (a plain GET form, so it works without JavaScript), then the
 * everyday entry points, each opening the directory pre-filtered.
 */
export function Search({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const tests = href(locale, 'tests');
  return (
    <section className={s.section} aria-labelledby="search-title">
      <div className={`wrap ${s.inner}`}>
        <h2 id="search-title" className={s.title}>
          {d.front.searchTitle}
        </h2>
        <form action={tests} method="get" role="search" className={s.form}>
          <label htmlFor="home-q" className="visually-hidden">
            {d.front.searchLabel}
          </label>
          <Icon name="search" className={s.icon} />
          <input id="home-q" name="q" type="search" className={s.input} placeholder={d.front.searchPlaceholder} autoComplete="off" enterKeyHint="search" />
          <button type="submit" className={s.submit}>
            <span className="visually-hidden">{d.front.searchSubmit}</span>
            <Icon name="arrow" />
          </button>
        </form>
        <p className={s.catsLabel} id="search-cats">
          {d.front.searchCats}
        </p>
        <SearchHints target="home-q" prefix={d.front.searchHintPrefix} words={d.front.searchHints} />
        <ul role="list" className={s.cats} aria-labelledby="search-cats">
          {categories.map((c, i) => (
            <li key={c.id} data-reveal style={{ '--i': i } as React.CSSProperties}>
              <a href={`${tests}?cat=${c.id}`} className={s.cat}>
                {d.tests.categories[c.id]}
                <Icon name="arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
