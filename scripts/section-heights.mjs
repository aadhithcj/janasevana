// Height of each top-level section of a page at 360x740. node scripts/section-heights.mjs /path/
import puppeteer from 'puppeteer-core';
import { serve } from './serve.mjs';
const route = process.argv[2] || '/';
const server = await serve(4181);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 360, height: 740 });
await page.goto(`http://localhost:4181${route}`, { waitUntil: 'networkidle0' });
const rows = await page.evaluate(() =>
  [document.querySelector('header'), ...document.querySelectorAll('main > *'), document.querySelector('footer')].map((el) => {
    const h = el.querySelector('h1,h2');
    return `${String(Math.round(el.getBoundingClientRect().height)).padStart(6)}px  ${el.tagName.toLowerCase()} ${(h?.textContent || '').trim().slice(0, 40)}`;
  }),
);
console.log(rows.join('\n'));
await browser.close(); server.close();
