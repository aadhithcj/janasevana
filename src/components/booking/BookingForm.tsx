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
import { useBasket } from './BasketContext';
import s from './BookingForm.module.css';

type Field = 'patientName' | 'area';
type Status = 'editing' | 'opened' | 'blocked';

const packageItems = {
  cardio: { id: 'pkg-cardio', name: `${cardioPackage.shortName} (${formatInr(cardioPackage.priceInr)})`, kind: 'package' as const },
  royal: { id: 'pkg-royal', name: `${royalPackage.shortName} (${formatInr(royalPackage.priceInr)})`, kind: 'package' as const },
};

/**
 * Collects the minimum (who, where, when, what) and turns it into a
 * WhatsApp message the person reads before sending. Nothing leaves the
 * phone until they press send in WhatsApp.
 */
export function BookingForm({ locale, testsHref }: { locale: Locale; testsHref: string }) {
  const dict = getDict(locale);
  const t = { booking: dict.booking, slip: dict.slip, basket: dict.basket, remove: dict.tests.remove, testsLink: dict.booking.addTests, testsHref };
  const basket = useBasket();
  const uid = useId();
  const [patientName, setPatientName] = useState('');
  const [bookerName, setBookerName] = useState('');
  const [where, setWhere] = useState<'home' | 'lab'>('home');
  const [area, setArea] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('editing');
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { add } = basket;

  // "Book this package" links arrive with ?package=cardio|royal.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('package');
    if (p !== 'cardio' && p !== 'royal') return;
    if (p === 'cardio' && document.documentElement.getAttribute('data-offer') === 'ended') return;
    add(packageItems[p]);
  }, [add]);

  const packages = basket.items.filter((i) => i.kind === 'package').map((i) => i.name);
  const tests = basket.items.filter((i) => i.kind === 'test').map((i) => i.name);
  const message = bookingMessage(
    { patientName: patientName || '…', bookerName, where, area, time, packages, tests },
    locale,
  );
  const url = whatsappUrl(message);

  function validate(): Partial<Record<Field, string>> {
    const e: Partial<Record<Field, string>> = {};
    if (!patientName.trim()) e.patientName = t.booking.errors.patientName;
    if (where === 'home' && !area.trim()) e.area = t.booking.errors.area;
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

  return (
    <div className={s.layout}>
      <form className={s.form} onSubmit={onSubmit} noValidate aria-describedby={fid('intro')}>
        <p id={fid('intro')} className={s.intro}>
          {t.booking.intro} <strong>{t.booking.nothingSent}</strong>
        </p>

        {errorList.length > 0 && (
          <div ref={summaryRef} className={s.summary} tabIndex={-1} role="alert" aria-labelledby={fid('err-title')}>
            <p id={fid('err-title')} className={s.summaryTitle}>
              <Icon name="alert" />
              {t.booking.errorTitle(errorList.length)}
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

        <div className={`${s.field} ${errors.patientName ? s.invalid : ''}`}>
          <label htmlFor={fid('patientName')} className={s.label}>
            {t.booking.patientName}
          </label>
          <p id={fid('patientName-hint')} className={s.hint}>
            {t.booking.patientHint}
          </p>
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
            onChange={(e) => setPatientName(e.target.value)}
            aria-invalid={errors.patientName ? true : undefined}
            aria-describedby={`${fid('patientName-hint')}${errors.patientName ? ` ${fid('patientName-error')}` : ''}`}
            className={s.input}
          />
        </div>

        <div className={s.field}>
          <label htmlFor={fid('bookerName')} className={s.label}>
            {t.booking.bookerName} <span className={s.optional}>({t.booking.optional})</span>
          </label>
          <input
            id={fid('bookerName')}
            name="bookerName"
            type="text"
            value={bookerName}
            onChange={(e) => setBookerName(e.target.value)}
            className={s.input}
          />
        </div>

        <fieldset className={s.fieldset}>
          <legend className={s.label}>{t.booking.where}</legend>
          <div className={s.choices}>
            {(['home', 'lab'] as const).map((w) => (
              <label key={w} className={s.choice}>
                <input
                  type="radio"
                  name="where"
                  value={w}
                  checked={where === w}
                  onChange={() => {
                    setWhere(w);
                    if (w === 'lab') setErrors((e) => ({ ...e, area: undefined }));
                  }}
                />
                <span>{w === 'home' ? t.booking.whereHome : t.booking.whereLab}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {where === 'home' && (
          <div className={`${s.field} ${errors.area ? s.invalid : ''}`}>
            <label htmlFor={fid('area')} className={s.label}>
              {t.booking.area}
            </label>
            <p id={fid('area-hint')} className={s.hint}>
              {t.booking.areaHint}
            </p>
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
              onChange={(e) => setArea(e.target.value)}
              aria-invalid={errors.area ? true : undefined}
              aria-describedby={`${fid('area-hint')}${errors.area ? ` ${fid('area-error')}` : ''}`}
              className={s.input}
            />
          </div>
        )}

        <div className={s.field}>
          <label htmlFor={fid('time')} className={s.label}>
            {t.booking.time} <span className={s.optional}>({t.booking.optional})</span>
          </label>
          <p id={fid('time-hint')} className={s.hint}>
            {t.booking.timeHint}
          </p>
          <input
            id={fid('time')}
            name="time"
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-describedby={fid('time-hint')}
            className={s.input}
          />
        </div>

        <div className={s.fieldset}>
          <p className={s.label} id={fid('items')}>
            {t.booking.items}
          </p>
          {basket.items.length === 0 ? (
            <p className={s.hint}>{t.booking.noItems}</p>
          ) : (
            <ul role="list" className={s.items} aria-labelledby={fid('items')}>
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
                    <span>
                      {t.remove}
                      <span className="visually-hidden">: {i.name}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <a href={t.testsHref} className={s.addLink}>
            {t.testsLink}
          </a>
        </div>

        <div className={s.submitRow}>
          <button type="submit" className={actionClass({ variant: 'whatsapp', size: 'lg' })}>
            <Icon name="chat" />
            <span>{t.booking.submit}</span>
          </button>
          <a href={telHref(landline.tel)} className={actionClass({ variant: 'outline', size: 'lg' })}>
            <Icon name="phone" />
            <span>
              {t.booking.orCall} <span className="num">{landline.display}</span>
            </span>
          </a>
        </div>
      </form>

      <div className={s.side}>
        <div className={s.preview} aria-live="off">
          <MessageQuote caption={t.booking.preview} message={message} />
          <CopyButton text={message} label={t.slip.copy} copied={t.slip.copied} failed={t.slip.copyFailed} />
        </div>

        {status !== 'editing' && (
          <div ref={resultRef} className={s.result} tabIndex={-1} role="status">
            {status === 'opened' ? (
              <>
                <p className={s.resultTitle}>
                  <Icon name="check" />
                  {t.booking.successTitle}
                </p>
                <p>{t.booking.successBody}</p>
              </>
            ) : (
              <p className={s.resultTitle}>
                <Icon name="alert" />
                {t.booking.blocked}
              </p>
            )}
            <p className={s.resultAgain}>
              {t.booking.notOpened}{' '}
              <a href={url} target="_blank" rel="noopener">
                {t.booking.openAgain}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
