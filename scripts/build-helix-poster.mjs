// Renders the hero helix's frame 0 with the same geometry and WebGL2 renderer the live
// canvas uses (fade included), then writes AVIF and WebP posters with alpha for the CSS image-set.
// Run after changing src/components/home/helix/geometry.mjs or the teal tokens:
//   node scripts/build-helix-poster.mjs
import { readFile, mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const geometry = await readFile('src/components/home/helix/geometry.mjs', 'utf8');
const gl = await readFile('src/components/home/helix/gl.mjs', 'utf8');
const tokens = await readFile('src/styles/tokens.css', 'utf8');
const token = (name) => tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`))[1];
const colors = ['--teal-200', '--teal-500', '--teal-800', '--charcoal-700'].map(token);

const posters = [
  { name: 'desktop', width: 1440 },
  { name: 'mobile', width: 540 },
];

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
const page = await browser.newPage();
await page.goto('about:blank');
await mkdir('public/helix', { recursive: true });

for (const { name, width } of posters) {
  const dataUrl = await page.evaluate(
    async (geometry, gl, name, width, colors) => {
      const load = (src) => import(`data:text/javascript;base64,${btoa(src)}`);
      const g = await load(geometry);
      const r = await load(gl);
      const cfg = g.CONFIGS[name];
      const height = Math.round((cfg.H * width) / cfg.W);
      const cv = Object.assign(document.createElement('canvas'), { width, height });
      const P = g.build(cfg);
      const draw = r.renderer(cv, P, P.n, cfg, colors, true);
      if (!draw) throw new Error('WebGL2 unavailable in the poster browser');
      draw(0, P.n, [-1e4, -1e4, 0], 1, r.FADES[name]);
      return cv.toDataURL('image/png');
    },
    geometry,
    gl,
    name,
    width,
    colors,
  );
  const png = Buffer.from(dataUrl.split(',')[1], 'base64');
  const avif = await sharp(png).avif({ quality: 42, effort: 8 }).toFile(`public/helix/poster-${name}.avif`);
  const webp = await sharp(png).webp({ quality: 70, alphaQuality: 70, effort: 6 }).toFile(`public/helix/poster-${name}.webp`);
  console.log(`poster-${name}: ${avif.width}x${avif.height}, avif ${(avif.size / 1024).toFixed(1)}KB, webp ${(webp.size / 1024).toFixed(1)}KB`);
}

await browser.close();
