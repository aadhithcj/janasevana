// Page-level checks over the static export: axe, overflow, small targets,
// keyboard focus visibility/obscuring, JavaScript-off content, one h1.
//   node scripts/verify-pages.mjs
import puppeteer from 'puppeteer-core';
import { readFileSync } from 'node:fs';
import { serve } from './serve.mjs';

const BASE = 'http://localhost:4177';
const routes = ['/', '/packages/', '/tests/', '/home-collection/', '/about/', '/contact/'];
const all = [...routes, ...routes.map((r) => `/ml${r}`), '/missing-page/'];
const widths = [320, 360, 768, 1280, 1920];
const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

const server = await serve(4177);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
let problems = 0;
const report = (msg) => {
  problems++;
  console.log('  ' + msg);
};

for (const route of all) {
  console.log(route);
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 800 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(BASE + route, { waitUntil: 'networkidle0' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (overflow > 0) report(`${width}px: horizontal overflow ${overflow}px`);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('a[href], button, input, summary, [role="button"]')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height || getComputedStyle(el).visibility === 'hidden') return false;
          // Inline links inside running text are exempt (WCAG 2.5.8 inline exception).
          const inline = getComputedStyle(el).display === 'inline' && el.closest('p, li, dd, address');
          // A native radio inside a large tappable label is covered by the label's area.
          if (el.matches('input[type=radio]') && el.closest('label')?.getBoundingClientRect().height >= 44) return false;
          return !inline && (r.height < 44 || r.width < 44);
        })
        .map((el) => `${(el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 30)} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`),
    );
    if (small.length) report(`${width}px: targets under 44px: ${[...new Set(small)].slice(0, 6).join(' | ')}`);
    if (width === 360 || width === 1280) {
      await page.addScriptTag({ content: axeSource });
      const axe = await page.evaluate(async () => {
        const r = await window.axe.run(document, { resultTypes: ['violations'] });
        return r.violations.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0].target.join(' ')}`);
      });
      axe.forEach((v) => report(`${width}px axe: ${v}`));
      const h1 = await page.$$eval('h1', (els) => els.length);
      if (h1 !== 1) report(`${width}px: ${h1} h1 elements`);
    }
    if (width === 360 && !route.includes('missing')) {
      // Keyboard: tab through the page; every focus must be visible and not under the fixed bar.
      const issues = await page.evaluate(async () => {
        const out = [];
        const focusables = [...document.querySelectorAll('a[href], button, input, summary, [tabindex="0"]')].filter((el) => el.offsetParent !== null);
        const bar = [...document.querySelectorAll('nav')].find((n) => getComputedStyle(n).position === 'fixed');
        for (const el of focusables.slice(0, 80)) {
          el.focus({ preventScroll: false });
          el.scrollIntoView({ block: 'nearest' });
          await new Promise((r) => requestAnimationFrame(r));
          const cs = getComputedStyle(el);
          const ring = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
          const shadow = cs.boxShadow && cs.boxShadow !== 'none';
          if (document.activeElement === el && el.matches(':focus-visible') && !ring && !shadow) out.push(`no visible focus: ${el.textContent.trim().slice(0, 30)}`);
          if (bar && !bar.contains(el)) {
            const r = el.getBoundingClientRect();
            const b = bar.getBoundingClientRect();
            if (getComputedStyle(bar).transform === 'none' && r.top >= b.top && r.bottom <= b.bottom + 1) out.push(`obscured by bar: ${el.textContent.trim().slice(0, 30)}`);
          }
        }
        return out;
      });
      issues.slice(0, 5).forEach((i) => report(`keyboard: ${i}`));
    }
    await page.close();
  }
  // JavaScript off: the page still carries its content and real phone links.
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setViewport({ width: 360, height: 800 });
  await page.goto(BASE + route, { waitUntil: 'networkidle0' });
  const jsOff = await page.evaluate(() => ({
    tel: document.querySelectorAll('a[href^="tel:"]').length,
    wa: document.querySelectorAll('a[href^="https://wa.me/919188490413"]').length,
    text: document.body.innerText.length,
    address: document.body.innerText.includes('Kaichoondy') || document.body.innerText.includes('കൈചൂണ്ടി'),
  }));
  if (!jsOff.tel || !jsOff.wa || jsOff.text < 500 || !jsOff.address) report(`JS off: ${JSON.stringify(jsOff)}`);
  await page.close();
}

await browser.close();
server.close();
console.log(problems ? `\n${problems} problem(s)` : '\nNo problems found');
