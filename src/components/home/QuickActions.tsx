import Link from 'next/link';
import { getDict } from '@/i18n';
import { href, type Locale } from '@/lib/paths';
import { Icon, type IconName } from '@/components/ui/Icon';
import s from './QuickActions.module.css';

type Row = { key: string; icon: IconName; title: string; body: string; detail?: string; href: string; external?: boolean };

export function QuickActions({ locale }: { locale: Locale }) {
  const d = getDict(locale).home;
  // Call and WhatsApp already lead the hero and the phone action bar; these are the next steps.
  const rows: Row[] = [
    { key: 'tests', icon: 'search', ...d.quick.tests, href: href(locale, 'tests') },
    { key: 'home', icon: 'pin', ...d.quick.collection, href: href(locale, 'homeCollection', 'book') },
    { key: 'packages', icon: 'info', ...d.quick.packages, href: href(locale, 'packages') },
  ];
  return (
    <section className={s.section} aria-labelledby="quick-title">
      <div className={`wrap ${s.inner}`}>
        <h2 id="quick-title" className={s.heading}>
          {d.quickTitle}
        </h2>
        <ul role="list" className={s.list}>
          {rows.map((r) => {
            const content = (
              <>
                <span className={`${s.icon} ${r.key === 'wa' ? s.iconWa : ''}`}>
                  <Icon name={r.icon} />
                </span>
                <span className={s.text}>
                  <span className={s.title}>{r.title}</span>
                  <span className={s.body}>{r.body}</span>
                </span>
                {r.detail ? <span className={`${s.detail} num`}>{r.detail}</span> : <Icon name="arrow" className={s.arrow} />}
              </>
            );
            return (
              <li key={r.key}>
                {r.href.startsWith('/') ? (
                  <Link href={r.href} className={s.row}>
                    {content}
                  </Link>
                ) : (
                  <a href={r.href} className={s.row} {...(r.external ? { target: '_blank', rel: 'noopener' } : {})}>
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
