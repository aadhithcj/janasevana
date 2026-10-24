// Builds web-ready logo files and icons from the extracted logo PNGs.
// Source: public/brand/logo-*.png, extracted from brand/ (the lab's real logo).
// Run: node scripts/build-assets.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const dir = 'public/brand';
await mkdir('src/app', { recursive: true });

for (const name of ['logo-mark', 'logo-wordmark', 'logo-full']) {
  await sharp(`${dir}/${name}.png`).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(`${dir}/${name}.webp`);
  await sharp(`${dir}/${name}.png`).avif({ quality: 70, effort: 7 }).toFile(`${dir}/${name}.avif`);
}

// The header mark shows at 40px: a 120px cut covers 3x screens at a fraction of the full file.
await sharp(`${dir}/logo-mark.png`).resize({ width: 120 }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(`${dir}/logo-mark-120.webp`);

// Square icons: the mark centred with breathing room, on white.
async function squareIcon(size, out, pad = 0.12, background = { r: 255, g: 255, b: 255, alpha: 1 }) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(`${dir}/logo-mark.png`).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ palette: true, quality: 90, effort: 10 })
    .toFile(out);
}

await squareIcon(192, 'src/app/icon.png', 0.06);
await squareIcon(180, 'src/app/apple-icon.png', 0.14);
await squareIcon(48, `${dir}/favicon-48.png`, 0.04);
console.log('assets built');
