import { categories, tests as allTests } from '@config/tests';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import { SearchHints } from './SearchHints';
import s from './Search.module.css';

/**
 * "What do you need?" as one mist panel: the question and a line on how to
 * search, one large search (a plain GET form, so it works without script),
 * then the everyday entry points as tiles with their counts, each opening
 * the directory pre-filtered.
 */
export function Search({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const tests = href(locale, 'tests');
  return (
    <section className={s.section} aria-labelledby="search-title">
      <div className="wrap">
        <div className={s.panel}>
          <div className={s.head}>
            <h2 id="search-title" className={s.title}>
              {d.front.searchTitle}
            </h2>
            <p className={s.lede}>{d.front.searchLede}</p>
          </div>
          <form action={tests} method="get" role="search" className={s.form}>
            <label htmlFor="home-q" className="visually-hidden">
              {d.front.searchLabel}
            </label>
            <Icon name="search" className={s.icon} />
            <input id="home-q" name="q" type="search" className={s.input} placeholder={d.front.searchPlaceholder} autoComplete="off" enterKeyHint="search" />
            <button type="submit" className={s.submit}>
              <span className={s.submitLabel}>{d.front.searchSubmit}</span>
              <Icon name="arrow" />
            </button>
          </form>
          <SearchHints target="home-q" prefix={d.front.searchHintPrefix} words={d.front.searchHints} />
          <p className={s.catsLabel} id="search-cats">
            {d.front.searchCats}
          </p>
          <ul role="list" className={s.tiles} aria-labelledby="search-cats">
            {categories.map((c, i) => (
              <li key={c.id} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <a href={`${tests}?cat=${c.id}`} className={s.tile}>
                  <span className={s.tileName}>{d.tests.categories[c.id]}</span>
                  <span className={`${s.tileCount} num`}>{d.sections.categoryTests(c.ids.length)}</span>
                  <span className={s.tileArrow} aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </a>
              </li>
            ))}
            <li data-reveal style={{ '--i': categories.length } as React.CSSProperties}>
              <a href={tests} className={`${s.tile} ${s.tileAll}`}>
                <span className={s.tileName}>{d.front.searchAll}</span>
                <span className={`${s.tileCount} num`}>{d.common.tests(allTests.length)}</span>
                <span className={s.tileArrow} aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
