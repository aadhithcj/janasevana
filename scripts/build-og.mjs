// Renders public/og.png (1200x630) from an HTML template in the site's own fonts and colours.
import puppeteer from 'puppeteer-core';
import { readFileSync } from 'node:fs';

// Inline every asset as a data URI; a page set from memory cannot load file:// URLs.
const f = (p) => {
  const type = p.endsWith('.png') ? 'image/png' : 'font/woff2';
  return `data:${type};base64,${readFileSync(p).toString('base64')}`;
};
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Anek;src:url(${f('public/fonts/anek-latin.woff2')}) format('woff2');font-weight:500 780;font-stretch:75% 100%}
@font-face{font-family:AnekRupee;src:url(${f('public/fonts/anek-rupee.woff2')}) format('woff2');font-weight:500 780}
@font-face{font-family:AnekML;src:url(${f('public/fonts/anek-malayalam.woff2')}) format('woff2');font-weight:500 760;font-stretch:80% 100%}
@font-face{font-family:Atk;src:url(${f('public/fonts/atkinson.woff2')}) format('woff2');font-weight:400 700}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#056a6d;color:#fff;font-family:Atk;position:relative;overflow:hidden}
.slip{position:absolute;left:64px;top:72px;width:420px;height:420px;background:#fff;border-radius:4px;box-shadow:0 30px 60px -30px rgba(1,50,52,.6);display:grid;place-items:center}
.slip img{width:340px}
.copy{position:absolute;left:552px;top:96px;right:64px}
h1{font-family:Anek,AnekRupee;font-weight:740;font-stretch:78%;font-size:84px;line-height:.98}
.ml{font-family:AnekML;font-weight:680;font-stretch:88%;font-size:46px;line-height:1.3;margin-top:18px;color:#dcefee}
.meta{margin-top:30px;font-size:28px;line-height:1.45;color:#c9ecE9}
.meta b{color:#fff;font-family:Anek;font-weight:650;font-size:34px}
svg{position:absolute;left:0;bottom:0;width:1200px;height:120px}
</style></head><body>
<div class="slip"><img src="${f('public/brand/logo-full.png')}"></div>
<div class="copy"><h1>Janasevana Lab</h1><p class="ml">ജനസേവന ലാബ്</p>
<p class="meta">Kaichoondy Jn., Alappuzha<br>Free home sample collection<br><b>0477 2288 413</b></p></div>
<svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0 120V70C420 128 860 116 1200 26V120Z" fill="#f7faf9"/><path d="M0 62C420 120 860 108 1200 18" fill="none" stroke="#058e92" stroke-width="4"/></svg>
</body></html>`;

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto('data:text/html,' + encodeURIComponent('<p>loading</p>'));
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('public/og.png written');
