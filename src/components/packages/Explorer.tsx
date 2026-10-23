import type { HealthPackage } from '@config/packages';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { Icon } from '@/components/ui/Icon';
import s from './Explorer.module.css';

/**
 * Each test in a package. Tests with sub-parameters or a line from the lab
 * open (native <details>, so it works without JavaScript); tests with
 * nothing more to say stay as plain rows rather than pretending to open.
 */
export function Explorer({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale).packages;
  return (
    <ol className={s.list}>
      {pkg.tests.map((t, i) => {
        const expandable = Boolean(t.parameters?.length || t.about);
        const head = (
          <>
            <span className={s.index} aria-hidden="true">
              {i + 1}
            </span>
            <span className={s.name}>{t.name}</span>
          </>
        );
        if (!expandable) {
          return (
            <li key={`${t.name}-${i}`} className={s.row}>
              {head}
            </li>
          );
        }
        return (
          <li key={`${t.name}-${i}`} className={s.itemWrap}>
            <details className={s.item}>
              <summary className={s.summary}>
                {head}
                <span className={s.meta}>
                  {t.parameters?.length ? (
                    <span className="num" aria-hidden="true">
                      {t.parameters.length}
                    </span>
                  ) : null}
                  <Icon name="chevron" className={s.chevron} />
                </span>
              </summary>
              <div className={s.body}>
                {t.about && (
                  <div className={s.about}>
                    <p className={s.subhead}>{d.measures}</p>
                    <p>{t.about[locale]}</p>
                  </div>
                )}
                {t.parameters?.length ? (
                  <div>
                    <p className={s.subhead}>{d.includes}</p>
                    <ul role="list" className={s.params} lang="en">
                      {t.parameters.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}
