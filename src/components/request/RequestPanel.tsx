'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cardioPackage, formatInr, royalPackage } from '@config/packages';
import { site, telHref } from '@config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { bookingMessage, whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { actionClass } from '@/components/ui/Action';
import { MessageQuote } from '@/components/slip/MessageQuote';
import { CopyButton } from '@/components/slip/CopyButton';
import { useBasket } from '@/components/booking/BasketContext';
import { useRequest } from './RequestContext';
import s from './RequestPanel.module.css';

type Field = 'patientName' | 'area';
type Status = 'editing' | 'opened' | 'blocked';

export const packageItems = {
  cardio: { id: 'pkg-cardio', name: `${cardioPackage.shortName} (${formatInr(cardioPackage.priceInr)})`, kind: 'package' as const },
  royal: { id: 'pkg-royal', name: `${royalPackage.shortName} (${formatInr(royalPackage.priceInr)})`, kind: 'package' as const },
};

const VISIBLE_ITEMS = 3;

/**
 * The request: what to book, for whom, where and when, and the exact
 * WhatsApp message it becomes. Used in the drawer and inline on the Home
 * Collection page; both share one set of fields. Nothing is sent until the
 * person presses send in WhatsApp.
 */
export function RequestPanel({
  locale,
  testsHref,
  variant = 'drawer',
  titleId,
}: {
  locale: Locale;
  testsHref: string;
  variant?: 'drawer' | 'inline';
  titleId?: string;
}) {
  const d = getDict(locale);
  const basket = useBasket();
  const { fields, setField } = useRequest();
  const uid = useId();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('editing');
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { add } = basket;

  // "Book this package" links arrive with ?package=cardio|royal (also the no-JS path).
  useEffect(() => {
    if (variant !== 'inline') return;
    const p = new URLSearchParams(window.location.search).get('package');
    if (p !== 'cardio' && p !== 'royal') return;
    if (p === 'cardio' && document.documentElement.getAttribute('data-offer') === 'ended') return;
    add(packageItems[p]);
  }, [add, variant]);

  const { patientName, bookerName, where, area, time } = fields;
  const packages = basket.items.filter((i) => i.kind === 'package').map((i) => i.name);
  const tests = basket.items.filter((i) => i.kind === 'test').map((i) => i.name);
  const message = bookingMessage({ patientName: patientName || '…', bookerName, where, area, time, packages, tests }, locale);
  const url = whatsappUrl(message);

  function validate(): Partial<Record<Field, string>> {
    const e: Partial<Record<Field, string>> = {};
    if (!patientName.trim()) e.patientName = d.booking.errors.patientName;
    if (where === 'home' && !area.trim()) e.area = d.booking.errors.area;
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus('editing');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // On phones wa.me hands over to the WhatsApp app; on desktop it opens WhatsApp Web in a new tab.
    try {
      window.open(url, '_blank', 'noopener');
      setStatus('opened');
    } catch {
      setStatus('blocked');
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  const errorList = (Object.entries(errors) as [Field, string][]).filter(([, v]) => v);
  const fid = (f: string) => `${uid}-${f}`;
  const landline = site.phones[0];
  const shown = basket.items.slice(0, VISIBLE_ITEMS);
  const rest = basket.items.slice(VISIBLE_ITEMS);

  const itemRow = (i: (typeof basket.items)[number]) => (
    <li key={i.id}>
      <span>{i.name}</span>
      <button
        type="button"
        className={s.remove}
        onClick={() => {
          basket.remove(i.id);
          basket.announce(d.basket.removedLive(i.name));
        }}
      >
        <Icon name="close" />
        <span className="visually-hidden">
          {d.tests.remove}: {i.name}
        </span>
      </button>
    </li>
  );

  return (
    <form className={`${s.panel} ${variant === 'inline' ? s.inline : ''}`} onSubmit={onSubmit} noValidate aria-labelledby={titleId}>
      <div className={s.fields}>
        <p className={s.intro}>{d.request.intro}</p>

        {errorList.length > 0 && (
          <div ref={summaryRef} className={s.summary} tabIndex={-1} role="alert" aria-labelledby={fid('err-title')}>
            <p id={fid('err-title')} className={s.summaryTitle}>
              <Icon name="alert" />
              {d.booking.errorTitle(errorList.length)}
            </p>
            <ul role="list">
              {errorList.map(([f, msg]) => (
                <li key={f}>
                  <a href={`#${fid(f)}`}>{msg}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={s.group}>
          <p className={s.label} id={fid('items')}>
            {d.booking.items}
          </p>
          {basket.items.length === 0 ? (
            <p className={s.hint}>{d.booking.noItems}</p>
          ) : (
            <>
              <ul role="list" className={s.items} aria-labelledby={fid('items')}>
                {shown.map(itemRow)}
              </ul>
              {rest.length > 0 && (
                <details className={s.more}>
                  <summary>
                    {d.request.showAll(basket.items.length)}
                    <Icon name="chevron" className={s.chev} />
                  </summary>
                  <ul role="list" className={s.items}>
                    {rest.map(itemRow)}
                  </ul>
                </details>
              )}
            </>
          )}
          <a href={testsHref} className={s.textLink}>
            {d.booking.addTests}
          </a>
        </div>

        <div className={`${s.field} ${errors.patientName ? s.invalid : ''}`}>
          <label htmlFor={fid('patientName')} className={s.label}>
            {d.booking.patientName}
          </label>
          {errors.patientName && (
            <p id={fid('patientName-error')} className={s.error}>
              <Icon name="alert" />
              {errors.patientName}
            </p>
          )}
          <input
            id={fid('patientName')}
            name="patientName"
            type="text"
            autoComplete="name"
            value={patientName}
            onChange={(e) => setField('patientName', e.target.value)}
            aria-invalid={errors.patientName ? true : undefined}
            aria-describedby={`${fid('patientName-hint')}${errors.patientName ? ` ${fid('patientName-error')}` : ''}`}
            className={s.input}
          />
          <p id={fid('patientName-hint')} className={s.hint}>
            {d.booking.patientHint}
          </p>
        </div>

        <div className={s.field}>
          <label htmlFor={fid('bookerName')} className={s.label}>
            {d.booking.bookerName} <span className={s.optional}>({d.booking.optional})</span>
          </label>
          <input
            id={fid('bookerName')}
            name="bookerName"
            type="text"
            value={bookerName}
            onChange={(e) => setField('bookerName', e.target.value)}
            className={s.input}
          />
        </div>

        <fieldset className={s.group}>
          <legend className={s.label}>{d.booking.where}</legend>
          <div className={s.choices}>
            {(['home', 'lab'] as const).map((w) => (
              <label key={w} className={s.choice}>
                <input
                  type="radio"
                  name={fid('where')}
                  value={w}
                  checked={where === w}
                  onChange={() => {
                    setField('where', w);
                    if (w === 'lab') setErrors((e) => ({ ...e, area: undefined }));
                  }}
                />
                <span>{w === 'home' ? d.booking.whereHome : d.booking.whereLab}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {where === 'home' && (
          <div className={`${s.field} ${errors.area ? s.invalid : ''}`}>
            <label htmlFor={fid('area')} className={s.label}>
              {d.booking.area}
            </label>
            {errors.area && (
              <p id={fid('area-error')} className={s.error}>
                <Icon name="alert" />
                {errors.area}
              </p>
            )}
            <input
              id={fid('area')}
              name="area"
              type="text"
              value={area}
              onChange={(e) => setField('area', e.target.value)}
              aria-invalid={errors.area ? true : undefined}
              aria-describedby={`${fid('area-hint')}${errors.area ? ` ${fid('area-error')}` : ''}`}
              className={s.input}
            />
            <p id={fid('area-hint')} className={s.hint}>
              {d.booking.areaHint}
            </p>
          </div>
        )}

        <div className={s.field}>
          <label htmlFor={fid('time')} className={s.label}>
            {d.booking.time} <span className={s.optional}>({d.booking.optional})</span>
          </label>
          <input
            id={fid('time')}
            name="time"
            type="text"
            value={time}
            onChange={(e) => setField('time', e.target.value)}
            aria-describedby={fid('time-hint')}
            className={s.input}
          />
          <p id={fid('time-hint')} className={s.hint}>
            {d.booking.timeHint}
          </p>
        </div>
      </div>

      <div className={s.send}>
        <MessageQuote caption={d.booking.preview} message={message} />
        <button type="submit" className={actionClass({ variant: 'whatsapp', size: 'lg', block: true })}>
          <Icon name="chat" />
          <span>{d.booking.submit}</span>
        </button>
        <div className={s.secondary}>
          <a href={telHref(landline.tel)} className={actionClass({ variant: 'outline' })}>
            <Icon name="phone" />
            <span className="num">{landline.display}</span>
          </a>
          <CopyButton text={message} label={d.slip.copy} copied={d.slip.copied} failed={d.slip.copyFailed} />
        </div>
        <p className={s.nothingSent}>{d.booking.nothingSent}</p>

        {status !== 'editing' && (
          <div ref={resultRef} className={s.result} tabIndex={-1} role="status">
            <p className={s.resultTitle}>
              <Icon name={status === 'opened' ? 'check' : 'alert'} />
              {status === 'opened' ? d.booking.successTitle : d.booking.blocked}
            </p>
            {status === 'opened' && <p>{d.booking.successBody}</p>}
            <p>
              {d.booking.notOpened}{' '}
              <a href={url} target="_blank" rel="noopener">
                {d.booking.openAgain}
              </a>
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
