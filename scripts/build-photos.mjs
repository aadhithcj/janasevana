// Builds web photos from the owner's originals in assets-src/photos (not shipped).
// Writes public/photos/<name>-<width>.avif and .webp at the widths below.
// Run: node scripts/build-photos.mjs
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const photos = [
  // The lab's own shopfront at Kaichoondy Jn., supplied by the owner.
  // Cropped to leave out an out-of-focus white object in the bottom-right corner.
  { name: 'storefront', src: 'storefront.png', widths: [480, 800, 1200], keep: [0.83, 0.88] },
  // Equipment images supplied by the owner (manufacturer photographs of the models the lab uses).
  // The original has a dark 1px column at its right edge: trimmed.
  { name: 'erba-h360', src: 'erba-h360.jpg', widths: [400, 700], trimRight: 2 },
  { name: 'erba-xl200', src: 'erba-xl200.jpg', widths: [400, 700] },
  { name: 'erba-ec90', src: 'erba-ec90.jpg', widths: [400, 700] },
  { name: 'vidas-kube', src: 'vidas-kube.jpg', widths: [400, 700] },
  // Representative stock photos (Unsplash License, free to use; credits in assets-src/photos/stock/CREDITS.md).
  { name: 'stock-blood-tube', src: 'stock/unsplash-sulyok-blood-tube.jpg', widths: [480, 900, 1400] },
  { name: 'stock-heart-model', src: 'stock/unsplash-orrico-heart-model.jpg', widths: [480, 900, 1400] },
];

await mkdir('public/photos', { recursive: true });
for (const p of photos) {
  const meta = await sharp(`assets-src/photos/${p.src}`).metadata();
  const width = Math.round((meta.width - (p.trimRight ?? 0)) * (p.keep?.[0] ?? 1));
  const height = Math.round(meta.height * (p.keep?.[1] ?? 1));
  for (const w of p.widths) {
    const img = sharp(`assets-src/photos/${p.src}`)
      .extract({ left: 0, top: 0, width, height })
      .resize({ width: Math.min(w, width) });
    const a = await img.clone().avif({ quality: 50, effort: 7 }).toFile(`public/photos/${p.name}-${w}.avif`);
    const b = await img.clone().webp({ quality: 74, effort: 6 }).toFile(`public/photos/${p.name}-${w}.webp`);
    console.log(`${p.name}-${w}: ${a.width}x${a.height}, avif ${(a.size / 1024).toFixed(0)}KB, webp ${(b.size / 1024).toFixed(0)}KB`);
  }
}
