import Link from 'next/link';
import { cardioPackage, formatInr, royalPackage, type HealthPackage } from '@config/packages';
import { tests } from '@config/tests';
import { getDict } from '@/i18n';
import { packageItem } from '@/lib/basketItems';
import { formatDate } from '@/lib/offer';
import { href, type Locale } from '@/lib/paths';
import { enquiryMessage, whatsappUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { AddToBooking } from '@/components/index/AddToBooking';
import s from './HomePackages.module.css';

/**
 * The packages, laid out like a product page: a large photo with frosted
 * fact cards at the left, following the chosen package; at the right a
 * switch between the Royal Package and the dated offer (while it runs), then
 * the name, price, what is in it and one large booking action. The switch is
 * plain radio buttons, so it all works without script.
 */
export function HomePackages({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  // One photo per package; representative stock photos, captioned as such.
  const shots = [
    { pkg: 'royal', name: 'stock-blood-tube', alt: d.front.stockAlt.tube },
    { pkg: 'cardio', name: 'stock-heart-model', alt: d.front.stockAlt.heart },
  ];
  return (
    <section className={s.section} aria-labelledby="pk-title">
      <div className={`wrap ${s.grid}`}>
        <h2 id="pk-title" className="visually-hidden">
          {d.sections.packages}
        </h2>

        <div className={s.gallery} data-reveal>
          <div className={s.stage}>
            {shots.map((p) => (
              <figure key={p.name} className={s.shot} data-shot={p.pkg}>
                <Photo name={p.name} alt={p.alt} sizes="(min-width: 64rem) 46vw, 92vw" className={s.shotImg} />
                <figcaption className={s.stockNote}>{d.front.stockCaption}</figcaption>
              </figure>
            ))}
            {/* Frosted fact cards over the photo: the count follows the chosen package. */}
            <div className={`${s.glass} ${s.glassTop}`} aria-hidden="true">
              <span className={`${s.glassBig} num`}>
                <span data-for="royal">{royalPackage.tests.length}</span>
                <span data-for="cardio">{cardioPackage.tests.length}</span>
              </span>
              <span className={s.glassSmall}>
                {d.front.pkgCardWord} {d.front.pkgCardIn}
              </span>
            </div>
            <div className={`${s.glass} ${s.glassBottom}`}>
              <p className={s.glassTitle}>{d.common.freeHomeCollection}</p>
              <p className={s.glassText}>{d.front.pkgCardVisit}</p>
            </div>
          </div>
        </div>

        <div className={s.details}>
          <div className={s.switch} role="radiogroup" aria-label={d.front.pkgSwitch} data-when-offer="live upcoming">
            {[royalPackage, cardioPackage].map((pkg) => (
              <label key={pkg.id} className={s.tab}>
                <input type="radio" name="pk" className={s.radio} data-pkg-radio={pkg.id} defaultChecked={pkg.id === 'royal'} />
                {/* After React Bits' PillNav: a fill rises from below into the package under the pointer
                    (and stays in the chosen one), while the label rolls up and a white copy rolls in. */}
                <span className={s.fill} aria-hidden="true" />
                <span className={s.face}>
                  <span className={s.tabName}>{pkg.name[locale]}</span>
                  <span className={`${s.tabPrice} num`}>{formatInr(pkg.priceInr)}</span>
                </span>
                <span className={`${s.face} ${s.faceAlt}`} aria-hidden="true">
                  <span className={s.tabName}>{pkg.name[locale]}</span>
                  <span className={`${s.tabPrice} num`}>{formatInr(pkg.priceInr)}</span>
                </span>
              </label>
            ))}
          </div>
          <Panel pkg={royalPackage} locale={locale} />
          <Panel pkg={cardioPackage} locale={locale} />
        </div>
      </div>
    </section>
  );
}

function Panel({ pkg, locale }: { pkg: HealthPackage; locale: Locale }) {
  const d = getDict(locale);
  const id = `home-pk-${pkg.id}`;
  const dated = Boolean(pkg.window);
  const shown = pkg.tests.slice(0, pkg.id === 'royal' ? 6 : pkg.tests.length);
  const more = pkg.tests.length - shown.length;
  // Phones show four tests, so the count beside the link differs there.
  const morePhone = pkg.tests.length - Math.min(4, shown.length);
  const fasting = pkg.tests.some((t) => tests.find((x) => x.id === t.testId)?.prep === 'fasting');
  return (
    <article className={`${s.panel} ${pkg.id === 'royal' ? s.royal : s.cardio}`} aria-labelledby={id} data-panel={pkg.id} data-when-offer={dated ? 'live upcoming' : undefined}>
      <p className={s.chips}>
        <span className={s.chip}>{pkg.label[locale]}</span>
        <span className={`${s.chip} ${s.chipSoft}`}>
          <Icon name="check" />
          {d.common.freeHomeCollection}
        </span>
      </p>
      <h3 id={id} className={s.name}>
        {pkg.name[locale]}
      </h3>
      <p className={s.summary}>{pkg.id === 'royal' ? d.home.royalSummary : d.home.cardioSummary}</p>
      <p className={s.priceRow}>
        <span className={`${s.price} num`}>{formatInr(pkg.priceInr)}</span>
        <span className={s.priceFor}>{d.front.pkgFor(pkg.tests.length)}</span>
      </p>
      {pkg.window && (
        <p className={s.period}>
          {d.common.validity(formatDate(pkg.window.startDate, locale), formatDate(pkg.window.endDate, locale))}. {d.hero.callToConfirm}
        </p>
      )}
      <ul role="list" className={s.checks}>
        {shown.map((t) => (
          <li key={t.name}>
            <span className={s.tick} aria-hidden="true">
              <Icon name="check" />
            </span>
            {t.name}
          </li>
        ))}
      </ul>
      {morePhone > 0 && (
        <Link href={href(locale, 'packages', pkg.id)} className={`${s.more} ${more === 0 ? s.phoneOnly : ''}`}>
          <span className={s.wideOnly}>{d.front.pkgMore(more)}</span>
          <span className={s.phoneOnly}>{d.front.pkgMore(morePhone)}</span>
          <Icon name="arrow" />
        </Link>
      )}
      {pkg.notice && (
        <p className={s.notice}>
          <Icon name="info" />
          <span>{pkg.notice[locale]}</span>
        </p>
      )}
      <div className={s.actions}>
        <AddToBooking
          item={packageItem(pkg)}
          size="lg"
          labels={{
            add: d.packages.select,
            added: d.packages.selected,
            remove: d.tests.remove,
            addedLive: d.basket.addedLive(pkg.shortName),
            removedLive: d.basket.removedLive(pkg.shortName),
          }}
        />
      </div>
      <ul role="list" className={s.facts}>
        <li>
          <Icon name="pin" />
          {d.common.freeHomeCollection}
        </li>
        <li>
          <Icon name="check" />
          {d.common.tests(pkg.tests.length)}
        </li>
        {fasting && (
          <li className={s.factFasting}>
            <Icon name="clock" />
            {d.front.pkgFasting}
          </li>
        )}
      </ul>
      <p className={s.links}>
        <Link href={href(locale, 'packages', pkg.id)}>
          {d.front.pkgSee}
          <Icon name="arrow" />
        </Link>
        <a href={whatsappUrl(enquiryMessage(pkg.shortName, locale))} target="_blank" rel="noopener">
          {d.packages.askWhatsapp}
          <Icon name="arrow" />
        </a>
      </p>
    </article>
  );
}
