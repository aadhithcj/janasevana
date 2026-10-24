// Checks the hero helix tiers, pausing, pointer response and legibility on the built site.
// Usage: node scripts/verify-helix.mjs
import puppeteer from 'puppeteer-core';
import { serve } from './serve.mjs';

const PORT = 4179;
const base = `http://localhost:${PORT}`;
const server = await serve(PORT);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
let failed = 0;
const report = (ok, name, detail = '') => {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function open({ width = 1280, height = 900, query = '', js = true, reduce = false, saveData = false, touch = false, cpu = 1, lateCpu = 1 } = {}) {
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(js);
  await page.setViewport({ width, height, hasTouch: touch, isMobile: touch, deviceScaleFactor: touch ? 2 : 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduce ? 'reduce' : 'no-preference' }]);
  if (touch) {
    const cdp = await page.target().createCDPSession();
    await cdp.send('Emulation.setEmitTouchEventsForMouse', { enabled: true, configuration: 'mobile' });
  }
  if (saveData) await page.evaluateOnNewDocument(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true } }));
  if (cpu > 1) {
    const cdp = await page.target().createCDPSession();
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  }
  if (lateCpu > 1) {
    // Throttle once the HTML is in, before the helix loads on idle; a heavy throttle from the start times the page load out.
    await page.goto(`${base}/${query}`, { waitUntil: 'domcontentloaded' });
    const cdp = await page.target().createCDPSession();
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: lateCpu });
    return page;
  }
  await page.goto(`${base}/${query}`, { waitUntil: 'networkidle0' });
  return page;
}

const state = (page) =>
  page.evaluate(() => {
    const h = document.getElementById('hero-helix');
    const before = getComputedStyle(h, '::before');
    return {
      canvas: !!h.querySelector('canvas'),
      live: 'live' in h.dataset,
      tier: h.dataset.tier || 'C',
      frameMs: h.dataset.frameMs,
      gapMs: h.dataset.gapMs,
      poster: before.backgroundImage,
      posterOpacity: before.opacity,
    };
  });

const frames = (page) => page.evaluate(() => document.getElementById('hero-helix').helixFrames || 0);
const push = (page) => page.evaluate(() => document.getElementById('hero-helix').helixPush || 0);

// Tier A, desktop
{
  const page = await open({ query: '?helix=A' });
  await wait(2500);
  const s = await state(page);
  report(s.canvas && s.live && s.tier === 'A', 'tier A runs on desktop with a canvas', `tier ${s.tier}, frame cost ${s.frameMs}ms`);

  // Pointer response: particles near the pointer move away, so the frame differs from an untouched one.
  const box = await page.$eval('#hero-helix', (e) => { const r = e.getBoundingClientRect(); return { x: r.x + r.width * 0.72, y: r.y + r.height * 0.45 }; });
  await page.mouse.move(box.x, box.y, { steps: 8 });
  await wait(300);
  await page.mouse.move(box.x + 40, box.y + 30, { steps: 6 });
  await wait(700);
  const pushed = await push(page);
  report(pushed >= 2, 'pointer pushes particles away', `largest offset ${pushed.toFixed(0)}px`);
  const below = await page.$eval('[data-hero]', (e) => e.getBoundingClientRect().bottom + 20);
  await page.mouse.move(640, Math.min(below, 895), { steps: 4 });
  await wait(2500);
  const settled = await push(page);
  report(settled < 1, 'particles spring back once the pointer leaves', `offset ${settled.toFixed(1)}px`);

  // Pause when scrolled away: the canvas stops changing.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(500);
  const a = await frames(page);
  await wait(700);
  const b = await frames(page);
  report(a === b, 'animation pauses when the hero leaves the viewport', `${b - a} frames while away`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(600);
  const c = await frames(page);
  await wait(300);
  const d = await frames(page);
  report(d > c, 'animation resumes when the hero is back in view', `${d - c} frames in 300ms`);
  await page.close();
}

// Default choice on desktop is A; on touch it is B.
{
  const page = await open();
  await wait(2500);
  const s = await state(page);
  report(s.tier === 'A', 'desktop starts at tier A', `frame ${s.frameMs}ms`);
  await page.close();
}
{
  const page = await open({ width: 390, height: 844, touch: true });
  await wait(3000);
  const s = await state(page);
  report(s.tier === 'B' && s.canvas, 'touch starts at tier B with a canvas', `frame ${s.frameMs}ms`);
  await page.close();
}

// Tier C cases: forced, reduced motion, Save-Data, JS off. The poster shows; no canvas.
for (const [name, opts] of [
  ['forced ?helix=C', { query: '?helix=C' }],
  ['reduced motion', { reduce: true }],
  ['Save-Data', { saveData: true }],
]) {
  const page = await open(opts);
  await wait(2500);
  const s = await state(page);
  report(!s.canvas && s.poster.includes('poster-desktop') && s.posterOpacity === '1', `${name}: poster only, no canvas`);
  await page.close();
}
{
  const page = await open({ js: false });
  const s = await state(page);
  const shift = await page.evaluate(() => document.querySelector('#hero-title').getBoundingClientRect().top);
  report(!s.canvas && s.poster.includes('poster-desktop'), 'JS off: poster shows', `h1 top ${Math.round(shift)}px`);
  await page.close();
}

// 4x CPU throttle: reported. 50x: tier A must step down.
{
  const page = await open({ query: '?helix=A', cpu: 4 });
  await wait(6000);
  const s = await state(page);
  report(true, '4x CPU throttle', `tier ${s.tier}, frame cost ${s.frameMs}ms, frame gap ${s.gapMs}ms`);
  await page.close();
}
{
  const page = await open({ query: '?helix=A', lateCpu: 50 });
  // Wait for the helix to start and for its first probe to finish (slow at this throttle).
  await page.waitForFunction(() => document.getElementById('hero-helix').dataset.frameMs, { timeout: 90000, polling: 500 });
  await wait(4000);
  const s = await state(page);
  report(s.tier !== 'A', '50x CPU throttle steps down from tier A', `now ${s.tier}, last probe ${s.frameMs}ms cost, ${s.gapMs}ms gap`);
  await page.close();
}

// Legibility: hide the text, sample the field behind the headline and lede over several frames.
function lum([r, g, b]) {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const contrast = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
for (const [w, h, touch] of [[1280, 900, false], [1440, 900, false], [360, 740, true]]) {
  const page = await open({ width: w, height: h, touch, query: touch ? '?helix=B' : '?helix=A' });
  await wait(2500);
  const boxes = await page.evaluate(() => {
    const pick = (sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
    const out = { h1: pick('#hero-title'), lede: pick('[data-hero] p'), ink: getComputedStyle(document.querySelector('#hero-title')).color, ink2: getComputedStyle(document.querySelector('[data-hero] p')).color };
    for (const el of document.querySelectorAll('#hero-title, [data-hero] p')) el.style.color = 'transparent';
    return out;
  });
  const rgb = (s) => s.match(/\d+/g).slice(0, 3).map(Number);
  let worstH = Infinity;
  let worstL = Infinity;
  for (let i = 0; i < 6; i++) {
    for (const [key, ink] of [['h1', rgb(boxes.ink)], ['lede', rgb(boxes.ink2)]]) {
      const b = boxes[key];
      const buf = await page.screenshot({ clip: { x: b.x, y: b.y, width: Math.max(1, b.w), height: Math.max(1, b.h) }, encoding: 'base64' });
      const px = await page.evaluate(async (data) => {
        const img = new Image();
        img.src = `data:image/png;base64,${data}`;
        await img.decode();
        const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
        const x = c.getContext('2d');
        x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, img.width, img.height).data;
        let worst = [255, 255, 255];
        let wl = 1;
        for (let i = 0; i < d.length; i += 4) {
          const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
          if (l < wl * 255 || i === 0) {
            wl = l / 255;
            worst = [d[i], d[i + 1], d[i + 2]];
          }
        }
        return worst;
      }, buf);
      const cr = contrast(ink, px);
      if (key === 'h1') worstH = Math.min(worstH, cr);
      else worstL = Math.min(worstL, cr);
    }
    await wait(700);
  }
  report(worstH >= 7, `${w}px: headline contrast at its worst moment ≥ 7:1`, worstH.toFixed(2));
  report(worstL >= 4.5, `${w}px: lede contrast at its worst moment ≥ 4.5:1`, worstL.toFixed(2));
  await page.close();
}

await browser.close();
server.close();
console.log(failed ? `\n${failed} check(s) failed` : '\nAll helix checks passed');
process.exit(failed ? 1 : 0);
