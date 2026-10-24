// End-to-end checks against the static export. Run after `npm run build`:
//   node scripts/verify-interactions.mjs
import puppeteer from 'puppeteer-core';
import { serve } from './serve.mjs';

const BASE = 'http://localhost:4176';
const server = await serve(4176);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};

async function open(path, width = 1280) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  page.on('pageerror', (e) => console.log('PAGE ERROR', path, e.message));
  await page.evaluateOnNewDocument(() => {
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(url);
      return null;
    };
  });
  await page.goto(BASE + path, { waitUntil: 'networkidle0' });
  return page;
}

// Index rows carry data-test; the test name is the row's English-language label.
const names = (page) => page.$$eval('main li[data-test] summary [lang="en"]', (els) => els.map((e) => e.textContent.trim()));

async function search(page, q) {
  const input = await page.$('input[type="search"]');
  await input.click({ clickCount: 3 });
  await page.keyboard.press('Backspace');
  if (q) await input.type(q);
  await new Promise((r) => setTimeout(r, 150));
  return names(page);
}

// ---------- Search synonyms ----------
{
  const page = await open('/tests/');
  const all = await names(page);
  check('directory renders all rows before search', all.length >= 30, `${all.length} rows`);
  const cases = [
    ['inflammation', ['CRP', 'hs-CRP (high-sensitivity CRP)']],
    ['rheumatoid', ['RA Factor']],
    ['arthritis', ['RA Factor']],
    ['RA', ['RA Factor']],
    ['infection marker', ['CRP']],
    ['sugar', ['Fasting Blood Sugar (FBS)', 'Glucose (fasting / random)']],
    ['cholesterol', ['Lipid Profile']],
    ['liver', ['Liver Function Test (LFT)']],
    ['kidney', ['Urea', 'Creatinine', 'Urine Albumin Creatinine Ratio (ACR)']],
    ['thyroid', ['Thyroid Stimulating Hormone (TSH)']],
    ['blood count', ['Complete Haemogram (CBC)']],
    ['vitamin', ['Vitamin D']],
    ['heart', ['Cardiovascular Health Package']],
  ];
  for (const [q, expected] of cases) {
    const got = await search(page, q);
    const missing = expected.filter((e) => !got.includes(e));
    check(`search "${q}"`, missing.length === 0, missing.length ? `missing ${missing.join(', ')}; got ${got.join(', ')}` : `${got.length} rows`);
  }
  // CRP and hs-CRP stay separate rows
  const inflam = await search(page, 'inflammation');
  check('CRP and hs-CRP are separate rows', inflam.includes('CRP') && inflam.includes('hs-CRP (high-sensitivity CRP)'));
  // Empty state
  await search(page, 'zzqq');
  const empty = await page.evaluate(() => document.body.innerText.includes('Nothing found for'));
  const emptyLinks = await page.$$eval('a', (as) => as.filter((a) => /tel:|wa\.me/.test(a.href) && a.closest('main')).map((a) => a.href));
  check('empty state shows with Call and WhatsApp', empty && emptyLinks.some((h) => h.startsWith('tel:')) && emptyLinks.some((h) => h.includes('wa.me')));
  await search(page, '');

  // Filter
  const pressed = await page.$$('button[aria-pressed]');
  await pressed[3].click(); // Serology
  await new Promise((r) => setTimeout(r, 100));
  const sero = await names(page);
  check('Serology filter', sero.length === 3 && sero.includes('CRP') && sero.includes('RA Factor'), sero.join(', '));
  await pressed[0].click();

  // Basket
  await search(page, 'liver');
  await page.click('main li[data-test] button');
  await search(page, 'thyroid');
  const addButtons = await page.$$('main li[data-test] button');
  await addButtons[0].click();
  await new Promise((r) => setTimeout(r, 150));
  // The selection shows up in the booking form on the same page.
  const basketText = await page.$eval('#book', (a) => a.innerText);
  check('basket holds added tests', basketText.includes('Liver Function Test (LFT)') && basketText.includes('Thyroid Stimulating Hormone (TSH)'));
  const live = await page.evaluate(() => [...document.querySelectorAll('[role="status"]')].map((e) => e.textContent).join(' | '));
  check('add announced politely', /added to your booking/.test(live), live);

  // Booking form on the same page: empty submit
  await page.click('#book button[type="submit"]');
  await new Promise((r) => setTimeout(r, 200));
  const summary = await page.evaluate(() => {
    const a = document.activeElement;
    return { focusedRole: a?.getAttribute('role'), text: a?.innerText ?? '' };
  });
  check('empty submit focuses the error summary', summary.focusedRole === 'alert' && /Enter the patient/.test(summary.text) && /area/.test(summary.text), summary.text.replace(/\n/g, ' / '));
  const invalid = await page.$$eval('#book [aria-invalid="true"]', (els) => els.length);
  check('invalid fields marked aria-invalid', invalid === 2, `${invalid}`);
  const opened0 = await page.evaluate(() => window.__opened.length);
  check('nothing opened on invalid submit', opened0 === 0);

  // Partially valid: name only
  await page.type('#book input[name="patientName"]', 'Lakshmi Amma');
  await page.click('#book button[type="submit"]');
  await new Promise((r) => setTimeout(r, 200));
  const stillInvalid = await page.$$eval('#book [aria-invalid="true"]', (els) => els.map((e) => e.name));
  check('area still required for home collection', stillInvalid.length === 1 && stillInvalid[0] === 'area', stillInvalid.join(','));

  // Valid
  await page.type('#book input[name="bookerName"]', 'Anu');
  await page.type('#book input[name="area"]', 'Near Kaichoondy Jn. & temple');
  await page.type('#book input[name="time"]', 'Tomorrow 7 am');
  await page.click('#book button[type="submit"]');
  await new Promise((r) => setTimeout(r, 200));
  const opened = await page.evaluate(() => window.__opened);
  const url = opened[0] ?? '';
  check('valid submit opens one wa.me URL', opened.length === 1 && url.startsWith('https://wa.me/919188490413?text='), url.slice(0, 60));
  const text = decodeURIComponent(url.split('?text=')[1] ?? '');
  console.log('      message:\n' + text.split('\n').map((l) => '        ' + l).join('\n'));
  check('message has name, booker, area, time, tests', ['Lakshmi Amma', 'Anu', 'Near Kaichoondy Jn. & temple', 'Tomorrow 7 am', 'Liver Function Test (LFT)', 'Thyroid Stimulating Hormone (TSH)'].every((x) => text.includes(x)));
  check('URL is fully encoded (no raw spaces, &, newlines)', !/[ \n&](?![^?]*$)/.test(url.split('?text=')[1] ?? '') && !/[ \n]/.test(url));
  const success = await page.evaluate(() => document.activeElement?.innerText ?? '');
  check('success state focused with resend link', /WhatsApp should now be open/.test(success) && /Open WhatsApp again/.test(success));
  await page.close();
}

// ---------- Category deep links ----------
for (const [cat, expected] of [
  ['inflammation', ['CRP', 'hs-CRP (high-sensitivity CRP)']],
  ['kidney', ['Urea', 'Creatinine', 'Urine Albumin Creatinine Ratio (ACR)']],
  ['heart', ['Cardiovascular Health Package', 'Lipid Profile', 'Lipoprotein(a), Lp(a)', 'hs-CRP (high-sensitivity CRP)', 'ECG']],
]) {
  const page = await open(`/tests/?cat=${cat}`);
  await new Promise((r) => setTimeout(r, 150));
  const got = await names(page);
  const ok = got.length === expected.length && expected.every((e) => got.includes(e));
  check(`?cat=${cat} shows exactly its tests`, ok, got.join(', '));
  await page.close();
}

// ---------- ?package= prefill ----------
{
  const page = await open('/home-collection/?package=royal#book');
  await new Promise((r) => setTimeout(r, 200));
  const items = await page.$eval('#book', (el) => el.innerText);
  check('?package=royal prefills the form', items.includes('Royal Package (₹2,000)'));
  await page.close();
  const p2 = await open('/home-collection/?package=cardio&preview-date=2026-11-20#book');
  await new Promise((r) => setTimeout(r, 200));
  const items2 = await p2.$eval('#book', (el) => el.innerText);
  check('ended cardio offer is not prefilled', !items2.includes('Cardiovascular Health Package ('));
  await p2.close();
}

// ---------- Malayalam message ----------
{
  const page = await open('/ml/home-collection/');
  await page.evaluate(() => localStorage.clear());
  await page.type('#book input[name="patientName"]', 'ലക്ഷ്മി');
  await page.type('#book input[name="area"]', 'കൈചൂണ്ടി');
  await page.click('#book button[type="submit"]');
  await new Promise((r) => setTimeout(r, 200));
  const url = (await page.evaluate(() => window.__opened[0])) ?? '';
  const text = decodeURIComponent(url.split('?text=')[1] ?? '');
  check('Malayalam message is in Malayalam and encoded', text.startsWith('നമസ്കാരം ജനസേവന ലാബ്') && !/[^\x00-\x7F]/.test(url));
  await page.close();
}

// ---------- Offer dates ----------
for (const [date, expect] of [['2026-10-20', 'upcoming'], ['2026-10-23T00:00', 'live'], ['2026-11-15T23:59', 'live'], ['2026-11-16T00:00', 'ended']]) {
  const page = await open(`/?preview-date=${date}`);
  const state = await page.evaluate(() => document.documentElement.getAttribute('data-offer'));
  const cardioVisible = await page.evaluate(() => {
    const el = document.getElementById('hero-offer-cardio');
    return !!el && el.offsetParent !== null;
  });
  check(`offer on ${date} is ${expect}`, state === expect && cardioVisible === (expect !== 'ended'), `state=${state} cardioVisible=${cardioVisible}`);
  await page.close();
}

// ---------- Sticky panels: pin only at >=1024 wide AND >=720 tall (Packages is the one sticky place) ----------
for (const [route, sel] of [['/packages/', '#royal [class*="summary"]']]) {
  for (const [w, h, expect] of [[1280, 900, 'sticky'], [1280, 600, 'static'], [900, 900, 'static']]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(BASE + route, { waitUntil: 'networkidle0' });
    const r = await page.$eval(sel, (el) => ({ pos: getComputedStyle(el).position, h: el.getBoundingClientRect().height }));
    const fits = r.pos !== 'sticky' || r.h <= h * 0.8 + 1;
    check(`${route} panel at ${w}x${h} is ${expect}`, r.pos === expect && fits, `${r.pos}, ${Math.round(r.h)}px tall`);
    await page.close();
  }
}

// ---------- Home departments: a sticky scroll on wide screens, a swipe row on phones ----------
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  const cardPos = await page.$eval('[data-dept-card]', (el) => getComputedStyle(el).position);
  check('department cards stack (sticky) at 1440x900', cardPos === 'sticky', cardPos);
  const active = async () => page.$$eval('[data-dept-index] a', (as) => as.findIndex((a) => a.getAttribute('aria-current') === 'true'));
  const first = await active();
  await page.click('[data-dept-index] a[href="#dept-serology"]');
  await new Promise((r) => setTimeout(r, 1500));
  const later = await active();
  const top = await page.$eval('#dept-serology', (el) => Math.round(el.getBoundingClientRect().top - parseFloat(getComputedStyle(el).top)));
  check('clicking the index brings that card into place and marks it', first === 0 && later === 2 && Math.abs(top) <= 2, `${first} then ${later}, offset ${top}px`);
  await page.setViewport({ width: 1280, height: 600 });
  await new Promise((r) => setTimeout(r, 200));
  const shortPos = await page.$eval('[data-dept-card]', (el) => getComputedStyle(el).position);
  check('department cards do not pin at 1280x600', shortPos !== 'sticky', shortPos);
  await page.close();
}
{
  const page = await open('/', 390);
  await page.$eval('#dept-row', (row) => row.scrollTo({ left: row.scrollWidth, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 300));
  const last = await page.$$eval('[data-dept-index] a', (as) => as.findIndex((a) => a.getAttribute('aria-current') === 'true'));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  check('phone swipe row moves the active chip', last === 4, String(last));
  check('phone page has no sideways scroll', !overflow);
  await page.close();
}
{
  const page = await open('/tests/?dept=serology');
  await new Promise((r) => setTimeout(r, 400));
  const groups = await page.$$eval('main h2[id^="dep-"]', (els) => els.map((e) => e.id));
  check('?dept=serology shows only Serology', groups.length === 1 && groups[0] === 'dep-serology', groups.join(','));
  await page.close();
}
{
  const page = await open('/');
  await page.type('#home-q', 'sugar');
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }), page.keyboard.press('Enter')]);
  check('home search goes to the directory with the query', page.url().includes('/tests/?q=sugar'), page.url());
  await page.close();
}

// ---------- Language memory ----------
{
  const page = await open('/tests/');
  await page.click('a[data-set-lang="ml"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
  check('toggle goes to the equivalent Malayalam page', page.url().endsWith('/ml/tests/'), page.url());
  const lang = await page.evaluate(() => document.documentElement.lang);
  check('html lang is ml', lang === 'ml');
  await page.goto(BASE + '/packages/', { waitUntil: 'networkidle0' });
  check('remembered choice redirects / pages to /ml/', page.url().endsWith('/ml/packages/'), page.url());
  await page.click('a[data-set-lang="en"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
  await page.goto(BASE + '/ml/', { waitUntil: 'networkidle0' });
  check('switching back to English is remembered', page.url() === BASE + '/', page.url());
  await page.close();
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
