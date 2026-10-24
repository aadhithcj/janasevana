// Screenshots of the static export. Usage:
//   node scripts/shoot.mjs "/,/ml/" "360,1280" [tag] [--full] [--js-off] [--date=YYYY-MM-DD]
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import { serve } from './serve.mjs';

const [routes = '/', widths = '360,1280', tag = 'shot', ...flags] = process.argv.slice(2);
const full = flags.includes('--full');
const jsOff = flags.includes('--js-off');
const date = flags.find((f) => f.startsWith('--date='))?.slice(7);
const click = flags.find((f) => f.startsWith('--click='))?.slice(8);
const outDir = flags.find((f) => f.startsWith('--out='))?.slice(6) ?? '.verify';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
await mkdir(outDir, { recursive: true });
const server = await serve(4174);
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] });
for (const route of routes.split(',')) {
  for (const w of widths.split(',').map(Number)) {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(!jsOff);
    await page.setViewport({ width: w, height: w < 768 ? 740 : 900, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    const url = `http://localhost:4174${route}${date ? `?preview-date=${date}` : ''}`;
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    if (click) {
      for (const el of await page.$$(click)) await el.click().catch(() => {}); // hidden matches are skipped
      await new Promise((r) => setTimeout(r, 400));
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    const name = `${outDir}/${tag}-${route.replace(/[/?=&]/g, '_') || 'root'}-${w}.png`;
    await page.screenshot({ path: name, fullPage: full });
    console.log(name, overflow > 0 ? `OVERFLOW ${overflow}px` : 'ok');
    await page.close();
  }
}
await browser.close();
server.close();
