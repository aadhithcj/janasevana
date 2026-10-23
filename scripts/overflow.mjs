// Lists elements wider than the viewport. node scripts/overflow.mjs /path/ width
import puppeteer from 'puppeteer-core';
import { serve } from './serve.mjs';
const [route, width] = process.argv.slice(2);
const server = await serve(4178);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 800 });
await page.goto(`http://localhost:4178${route}`, { waitUntil: 'networkidle0' });
console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && e.children.length === 0).slice(0, 8).map((e) => `${e.tagName}.${e.className} r=${Math.round(e.getBoundingClientRect().right)} "${(e.textContent || '').trim().slice(0, 40)}"`).join('\n')));
await browser.close(); server.close();
