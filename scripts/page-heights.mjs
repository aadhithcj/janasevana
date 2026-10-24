// Page height at 360px for every route, EN and ML. node scripts/page-heights.mjs
import puppeteer from 'puppeteer-core';
import { serve } from './serve.mjs';
const routes = ['/', '/packages/', '/tests/', '/home-collection/', '/about/', '/contact/'];
const server = await serve(4180);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 360, height: 740 });
for (const r of routes) {
  const out = [];
  for (const p of [r, `/ml${r}`]) {
    await page.goto(`http://localhost:4180${p}`, { waitUntil: 'networkidle0' });
    out.push(await page.evaluate(() => document.documentElement.scrollHeight));
  }
  const vh = (px) => (px / 740).toFixed(1);
  console.log(`${r.padEnd(18)} EN ${String(out[0]).padStart(6)}px (${vh(out[0])} vh)   ML ${String(out[1]).padStart(6)}px (${vh(out[1])} vh)`);
}
await browser.close(); server.close();
