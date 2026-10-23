// Prints computed styles for selectors on a page. Usage: node scripts/probe.mjs /path/ width "sel1|sel2"
import puppeteer from 'puppeteer-core';
import { serve } from './serve.mjs';
const [route, width, sels] = process.argv.slice(2);
const server = await serve(4175);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 900 });
await page.goto(`http://localhost:4175${route}`, { waitUntil: 'networkidle0' });
const out = await page.evaluate((sels) => sels.split('|').map((sel) => {
  const el = document.querySelector(sel);
  if (!el) return `${sel}: missing`;
  const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
  return `${sel}: font ${cs.fontSize} ${cs.fontFamily.slice(0, 40)} | box ${Math.round(r.width)}x${Math.round(r.height)} | class ${el.className}`;
}), sels);
console.log(out.join('\n'));
await browser.close(); server.close();
