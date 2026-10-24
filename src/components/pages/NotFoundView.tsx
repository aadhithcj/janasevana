import Link from 'next/link';
import { site, telHref } from '@config/site';
import { en } from '@/i18n/en';
import { ml } from '@/i18n/ml';
import { href, pageIds } from '@/lib/paths';
import { ArrowButton } from '@/components/ui/ArrowButton';
import s from './NotFoundView.module.css';

/** Served for any unknown address, so it speaks both languages. Every page is a white tile on the mist panel. */
export function NotFoundView() {
  return (
    <section className={s.page} aria-labelledby="nf-title">
      <div className={`wrap ${s.inner}`}>
        <p className={s.code} aria-hidden="true">
          404
        </p>
        <div className={s.text}>
          <h1 id="nf-title" className={s.title}>
            {en.notFound.h1}
          </h1>
          <p className={s.titleMl} lang="ml">
            {ml.notFound.h1}
          </p>
          <p className={s.body}>{en.notFound.body}</p>
          <p className={s.body} lang="ml">
            {ml.notFound.body}
          </p>
        </div>
      </div>
      <div className="wrap">
        <ul role="list" className={s.list}>
          {pageIds.map((id) => (
            <li key={id} className={s.tile}>
              <Link href={href('en', id)} className={s.enLink}>
                {en.shell.nav[id]}
              </Link>
              <Link href={href('ml', id)} lang="ml" className={s.mlLink}>
                {ml.shell.nav[id]}
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.call}>
          <ArrowButton href={telHref(site.phones[0].tel)}>
            <span className="num">{en.common.callNumber(site.phones[0].display)}</span>
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
