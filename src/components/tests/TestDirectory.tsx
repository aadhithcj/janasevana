'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { cardioPackage, royalPackage } from '@config/packages';
import { site, telHref } from '@config/site';
import { categories, departments, tests, type CategoryId, type DepartmentId, type Test } from '@config/tests';
import { getDict } from '@/i18n';
import { packageItem } from '@/lib/basketItems';
import { rowFromTest, type IndexRow } from '@/lib/indexRows';
import type { Locale } from '@/lib/paths';
import { searchTests } from '@/lib/search';
import { whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { actionClass } from '@/components/ui/Action';
import { useBasket, type BasketItem } from '@/components/booking/BasketContext';
import { IndexList } from '@/components/index/IndexList';
import { AddToBooking } from '@/components/index/AddToBooking';
import s from './TestDirectory.module.css';

type Filter = 'all' | DepartmentId;

function basketItem(t: Test): BasketItem {
  if (t.id === 'pkg-cardio') return packageItem(cardioPackage);
  if (t.id === 'pkg-royal') return packageItem(royalPackage);
  return { id: t.id, name: t.name, kind: 'test' };
}

/**
 * The full-density Index: search with everyday words (English and
 * Malayalam), department filters, category deep links (?cat=, ?q=), a
 * visible count, add and remove. Without JavaScript the server render shows
 * every test, grouped.
 */
export function TestDirectory({ locale, packagesHref, bookHref }: { locale: Locale; packagesHref: string; bookHref: string }) {
  const d = getDict(locale);
  const basket = useBasket();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [category, setCategory] = useState<CategoryId | null>(null);
  const searchId = useId();

  // Deep links from the home page: /tests/?cat=heart, /tests/?q=sugar or /tests/?dept=serology
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const q = params.get('q');
    const dept = params.get('dept');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL once after mount keeps the static HTML identical
    if (cat && categories.some((c) => c.id === cat)) setCategory(cat as CategoryId);
    if (q) setQuery(q.slice(0, 60));
    if (dept && departments.includes(dept as DepartmentId)) setFilter(dept as DepartmentId);
  }, []);

  const hits = useMemo(() => searchTests(tests, query), [query]);
  const inCategory = category ? new Set(categories.find((c) => c.id === category)!.ids) : null;
  const visible = tests.filter(
    (x) => hits.has(x.id) && (filter === 'all' || x.department === filter) && (!inCategory || inCategory.has(x.id)),
  );
  const groups = departments
    .map((dep) => ({ dep, rows: visible.filter((x) => x.department === dep) }))
    .filter((g) => g.rows.length > 0);
  const landline = site.phones[0];
  const askMessage =
    locale === 'ml'
      ? `നമസ്കാരം ജനസേവന ലാബ്,\n“${query.trim()}” ടെസ്റ്റ് ലാബിൽ ചെയ്യുമോ?`
      : `Hello Janasevana Lab,\nDo you do the “${query.trim()}” test?`;

  const action = (row: IndexRow) => {
    const test = tests.find((x) => x.id === row.testId)!;
    // hs-CRP exists only inside the Cardiovascular Health Package, so it links there instead of being added alone.
    if (test.kind === 'package' || test.id === 'hscrp') {
      const anchor = test.id === 'pkg-royal' ? 'royal' : 'cardio';
      return (
        <a href={`${packagesHref}#${anchor}`} className={s.pkgLink}>
          {d.tests.viewPackage}
        </a>
      );
    }
    const item = basketItem(test);
    return (
      <AddToBooking
        item={item}
        labels={{
          add: d.tests.add,
          added: d.tests.added,
          remove: d.tests.remove,
          addedLive: d.basket.addedLive(item.name),
          removedLive: d.basket.removedLive(item.name),
        }}
      />
    );
  };

  const deptLabel = (row: IndexRow) => (row.department ? d.tests.departments[row.department] : undefined);
  const filters: Filter[] = ['all', ...departments];
  const count = basket.loaded ? basket.items.length : 0;

  return (
    <div className={s.layout}>
      <div className={s.controls}>
        <div className={s.searchRow} role="search">
          <label htmlFor={searchId} className="visually-hidden">
            {d.tests.searchLabel}
          </label>
          <div className={s.searchBox}>
            <Icon name="search" className={s.searchIcon} />
            <input
              id={searchId}
              type="search"
              value={query}
              placeholder={d.tests.searchHint}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              enterKeyHint="search"
              className={s.search}
            />
            {query && (
              <button type="button" className={s.clear} onClick={() => setQuery('')}>
                <Icon name="close" />
                <span className="visually-hidden">{d.tests.clearSearch}</span>
              </button>
            )}
          </div>
          {count > 0 && (
            <a href={bookHref} className={s.selection}>
              <span className={`${s.selCount} num`} key={count}>
                {count}
              </span>
              <span>{d.tests.selected(count)}</span>
              <span className={s.selReview}>{d.basket.review}</span>
            </a>
          )}
        </div>

        <div className={s.filters} role="group" aria-label={d.tests.filterLabel}>
          {filters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} className={s.filter} onClick={() => setFilter(f)}>
              {f === 'all' ? d.tests.all : d.tests.departments[f]}
            </button>
          ))}
        </div>

        <div className={s.status}>
          <p className={s.count} role="status" aria-live="polite">
            {d.tests.showing(visible.length)}
          </p>
          {category && (
            <p className={s.catChip}>
              <span>{d.tests.categoryActive(d.tests.categories[category])}</span>
              <button type="button" className={s.catClear} onClick={() => setCategory(null)}>
                <Icon name="close" />
                <span>{d.tests.showAll}</span>
              </button>
            </p>
          )}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className={s.empty}>
          <p className={s.emptyTitle}>{d.tests.emptyTitle(query.trim())}</p>
          <p>{d.tests.emptyBody}</p>
          <div className={s.emptyActions}>
            <a href={telHref(landline.tel)} className={actionClass({ size: 'lg' })}>
              <Icon name="phone" />
              <span>{d.common.callNumber(landline.display)}</span>
            </a>
            <a href={whatsappUrl(askMessage)} target="_blank" rel="noopener" className={actionClass({ variant: 'whatsapp', size: 'lg' })}>
              <Icon name="chat" />
              <span>WhatsApp</span>
            </a>
          </div>
          <button
            type="button"
            className={s.textButton}
            onClick={() => {
              setQuery('');
              setFilter('all');
              setCategory(null);
            }}
          >
            {d.tests.clearSearch}
          </button>
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.dep} className={s.group} aria-labelledby={`dep-${g.dep}`}>
            <h2 id={`dep-${g.dep}`} className={s.groupTitle}>
              {d.tests.departments[g.dep]} <span className="num">{g.rows.length}</span>
            </h2>
            <IndexList
              rows={g.rows.map(rowFromTest)}
              density="full"
              locale={locale}
              t={d.index}
              renderAction={action}
              showDepartment={filter === 'all' && !category ? undefined : deptLabel}
              labelledBy={`dep-${g.dep}`}
            />
          </section>
        ))
      )}
    </div>
  );
}
