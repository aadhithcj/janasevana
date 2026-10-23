'use client';

import { useId, useMemo, useState } from 'react';
import { cardioPackage, formatInr, royalPackage } from '@config/packages';
import { site, telHref } from '@config/site';
import { departments, tests, type DepartmentId, type Test } from '@config/tests';
import { getDict, type Dict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { searchTests } from '@/lib/search';
import { whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { actionClass } from '@/components/ui/Action';
import { useBasket, type BasketItem } from '@/components/booking/BasketContext';
import s from './TestDirectory.module.css';

type Strings = { tests: Dict['tests']; basket: Dict['basket']; common: Dict['common'] };
type Filter = 'all' | DepartmentId;

const packageNames: Record<string, { name: string; anchor: 'cardio' | 'royal' }> = {
  'pkg-cardio': { name: `${cardioPackage.shortName} (${formatInr(cardioPackage.priceInr)})`, anchor: 'cardio' },
  'pkg-royal': { name: `${royalPackage.shortName} (${formatInr(royalPackage.priceInr)})`, anchor: 'royal' },
};

function basketItem(t: Test): BasketItem {
  if (t.kind === 'package') return { id: t.id, name: packageNames[t.id].name, kind: 'package' };
  return { id: t.id, name: t.name, kind: 'test' };
}

export function TestDirectory({ locale, packagesHref, bookHref }: { locale: Locale; packagesHref: string; bookHref: string }) {
  const dict = getDict(locale);
  const t: Strings = { tests: dict.tests, basket: dict.basket, common: dict.common };
  const basket = useBasket();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const searchId = useId();

  const hits = useMemo(() => searchTests(tests, query), [query]);
  const visible = tests.filter((x) => hits.has(x.id) && (filter === 'all' || x.department === filter));
  const groups = departments
    .map((dep) => ({ dep, rows: visible.filter((x) => x.department === dep) }))
    .filter((g) => g.rows.length > 0);
  const landline = site.phones[0];
  const askMessage =
    locale === 'ml'
      ? `നമസ്കാരം ജനസേവന ലാബ്,\n“${query.trim()}” ടെസ്റ്റ് ലാബിൽ ചെയ്യുമോ?`
      : `Hello Janasevana Lab,\nDo you do the “${query.trim()}” test?`;

  function toggle(test: Test) {
    const item = basketItem(test);
    if (basket.has(test.id)) {
      basket.remove(test.id);
      basket.announce(t.basket.removedLive(item.name));
    } else {
      basket.add(item);
      basket.announce(t.basket.addedLive(item.name));
    }
  }

  const filters: Filter[] = ['all', ...departments];

  return (
    <div className={s.layout}>
      <div className={s.main}>
        <div className={s.controls} role="search">
          <label htmlFor={searchId} className={s.searchLabel}>
            {t.tests.searchLabel}
          </label>
          <p id={`${searchId}-hint`} className={s.hint}>
            {t.tests.searchHint}
          </p>
          <div className={s.searchBox}>
            <Icon name="search" className={s.searchIcon} />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-describedby={`${searchId}-hint`}
              autoComplete="off"
              enterKeyHint="search"
              className={s.search}
            />
            {query && (
              <button type="button" className={s.clear} onClick={() => setQuery('')}>
                <Icon name="close" />
                <span className="visually-hidden">{t.tests.clearSearch}</span>
              </button>
            )}
          </div>

          <div className={s.filters} role="group" aria-label={t.tests.filterLabel}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                className={s.filter}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? t.tests.all : t.tests.departments[f]}
              </button>
            ))}
          </div>
          <p className={s.count} role="status" aria-live="polite">
            {t.tests.showing(visible.length)}
          </p>
        </div>

        {groups.length === 0 ? (
          <div className={s.empty}>
            <p className={s.emptyTitle}>{t.tests.emptyTitle(query.trim())}</p>
            <p>{t.tests.emptyBody}</p>
            <div className={s.emptyActions}>
              <a href={telHref(landline.tel)} className={actionClass({ size: 'lg' })}>
                <Icon name="phone" />
                <span>
                  {t.common.callNumber(landline.display)}
                </span>
              </a>
              <a href={whatsappUrl(askMessage)} target="_blank" rel="noopener" className={actionClass({ variant: 'whatsapp', size: 'lg' })}>
                <Icon name="chat" />
                <span>WhatsApp</span>
              </a>
            </div>
            <button type="button" className={s.textButton} onClick={() => { setQuery(''); setFilter('all'); }}>
              {t.tests.clearSearch}
            </button>
          </div>
        ) : (
          groups.map((g) => (
            <section key={g.dep} className={s.group} aria-labelledby={`dep-${g.dep}`}>
              <h2 id={`dep-${g.dep}`} className={s.groupTitle}>
                {t.tests.departments[g.dep]}
              </h2>
              <ul role="list" className={s.rows}>
                {g.rows.map((x) => (
                  <Row key={x.id} test={x} t={t} locale={locale} added={basket.has(x.id)} onToggle={() => toggle(x)} packagesHref={packagesHref} />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <aside className={s.basket} aria-labelledby="basket-title" data-basket={basket.items.length > 0 ? 'full' : 'empty'}>
        <h2 id="basket-title" className={s.basketTitle}>
          {t.basket.title}
          <span className={`${s.basketCount} num`} key={basket.items.length}>
            {basket.items.length}
          </span>
        </h2>
        {basket.items.length === 0 ? (
          <p className={s.hint}>{t.basket.empty}</p>
        ) : (
          <>
            <ul role="list" className={s.basketList}>
              {basket.items.map((i) => (
                <li key={i.id}>
                  <span>{i.name}</span>
                  <button
                    type="button"
                    className={s.remove}
                    onClick={() => {
                      basket.remove(i.id);
                      basket.announce(t.basket.removedLive(i.name));
                    }}
                  >
                    <Icon name="close" />
                    <span className="visually-hidden">
                      {t.tests.remove}: {i.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <a href={bookHref} className={actionClass({ block: true })}>
              {t.basket.continue}
            </a>
            <button type="button" className={s.textButton} onClick={basket.clear}>
              {t.basket.clear}
            </button>
          </>
        )}
      </aside>

      {basket.items.length > 0 && (
        <div className={s.strip} data-basket-strip>
          <span className={s.stripCount}>
            <span className={`${s.basketCount} num`} key={basket.items.length}>
              {basket.items.length}
            </span>
            <span>{t.basket.title}</span>
            <span className="visually-hidden">{t.basket.count(basket.items.length)}</span>
          </span>
          <a href={bookHref} className={actionClass({ className: s.stripAction })}>
            {t.basket.continue}
          </a>
        </div>
      )}
    </div>
  );
}

function Row({
  test,
  t,
  locale,
  added,
  onToggle,
  packagesHref,
}: {
  test: Test;
  t: Strings;
  locale: Locale;
  added: boolean;
  onToggle: () => void;
  packagesHref: string;
}) {
  const ask = t.common.askLab;
  const pkgLink = test.kind === 'package' ? `${packagesHref}#${packageNames[test.id].anchor}` : null;
  const inPkgs = test.inPackages?.map((p) => (p === 'cardio' ? cardioPackage.shortName : royalPackage.shortName));
  return (
    <li className={s.row} data-when-offer={test.id === 'pkg-cardio' ? 'live upcoming' : undefined}>
      <div className={s.head}>
        <p className={s.name} lang="en">
          {test.name}
        </p>
        {test.about && <p className={s.about}>{test.about[locale]}</p>}
      </div>

      {test.kind === 'test' && !test.nameOnly && (
        <dl className={s.facts}>
          {/* Method and sample only where the lab's report states them; preparation is always answered. */}
          {(test.method || test.parameters?.some((p) => p.method)) && (
            <div>
              <dt>{t.tests.method}</dt>
              <dd>{test.method ?? t.tests.methodPerPart}</dd>
            </div>
          )}
          {test.sample && (
            <div>
              <dt>{t.tests.sample}</dt>
              <dd>{t.tests.samples[test.sample]}</dd>
            </div>
          )}
          <div>
            <dt>{t.tests.prep}</dt>
            <dd>{test.prep === 'fasting' ? <span className={s.fasting}>{t.tests.fastingPrep}</span> : ask}</dd>
          </div>
        </dl>
      )}

      <div className={s.notes}>
        {test.nameOnly && <p>{t.tests.nameOnly}</p>}
        {test.kind === 'category' && <p>{t.tests.categoryNote}</p>}
        {test.viaPackagesOnly && <p>{t.tests.viaPackages}</p>}
        {inPkgs && !test.viaPackagesOnly && <p>{t.tests.inPackage(inPkgs.join(' / '))}</p>}
        {test.parameters && test.parameters.length > 0 && (
          <details className={s.params}>
            <summary>
              {t.tests.includes} <span className="num">({test.parameters.length})</span>
              <Icon name="chevron" className={s.chev} />
            </summary>
            <ul role="list" lang="en">
              {test.parameters.map((p) => (
                <li key={p.name}>
                  <span>{p.name}</span>
                  {p.method && <span className={s.paramMethod}>{p.method}</span>}
                </li>
              ))}
            </ul>
          </details>
        )}
        {pkgLink && (
          <a href={pkgLink} className={s.pkgLink}>
            {t.tests.viewPackage}
          </a>
        )}
      </div>

      <div className={s.action}>
        {added ? (
          <button type="button" className={s.added} onClick={onToggle}>
            <Icon name="check" className={s.check} />
            <span>{t.tests.added}</span>
            <span className={s.addedRemove}>
              {t.tests.remove}
              <span className="visually-hidden">: {test.name}</span>
            </span>
          </button>
        ) : (
          <button type="button" className={s.add} onClick={onToggle}>
            <Icon name="plus" />
            <span>
              {t.tests.add}
              <span className="visually-hidden">: {test.name}</span>
            </span>
          </button>
        )}
      </div>
    </li>
  );
}
