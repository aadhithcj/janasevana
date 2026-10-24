// First-viewport captures with motion on (the live helix running), for review.
// Usage: node scripts/shoot-live.mjs "/,/ml/" "1440x900,1280x800,360x740" tag
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import { serve } from './serve.mjs';

const [routes = '/', sizes = '1280x800,360x740', tag = 'live'] = process.argv.slice(2);
const server = await serve(4181);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
await mkdir('.verify', { recursive: true });
for (const route of routes.split(',')) {
  for (const size of sizes.split(',')) {
    const [w, h] = size.split('x').map(Number);
    const touch = w < 768;
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: touch ? 2 : 1 });
    await page.goto(`http://localhost:4181${route}`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 3000));
    const file = `.verify/${tag}-${route.replace(/\//g, '_')}-${w}.png`;
    await page.screenshot({ path: file });
    console.log(file);
    await page.close();
  }
}
await browser.close();
server.close();
