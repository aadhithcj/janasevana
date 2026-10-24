/** Web photos built by scripts/build-photos.mjs into public/photos/<name>-<width>.(avif|webp). */
/** fit: 'contain' for product shots on white, which must not be cropped. */
export const photoFiles: Record<string, { width: number; height: number; widths: number[]; fit?: 'contain' }> = {
  storefront: { width: 1223, height: 940, widths: [480, 800, 1200] },
  'erba-h360': { width: 788, height: 1000, widths: [400, 700], fit: 'contain' },
  'erba-xl200': { width: 900, height: 687, widths: [400, 700], fit: 'contain' },
  'erba-ec90': { width: 900, height: 598, widths: [400, 700] },
  'vidas-kube': { width: 1280, height: 853, widths: [400, 700] },
  // Representative stock photos (Unsplash License); shown with a "Representative photo" caption.
  'stock-blood-tube': { width: 2000, height: 1333, widths: [480, 900, 1400] },
  'stock-blood-vials': { width: 2000, height: 1333, widths: [480, 900, 1400] },
};
