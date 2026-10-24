// The live helix. Loaded after idle only for tiers A and B; tier C keeps the poster.
// A: 8,000 particles at full rate with the pointer push. B: 3,200 at 30fps, drift only.
// Drawing is one WebGL2 call per frame (gl.mjs); without WebGL2 the poster simply stays.
// After a short warm-up, 30 frames are timed; a slow tier steps down and never steps back up.
import { CONFIGS, build } from './geometry.mjs';
import { FADES, renderer } from './gl.mjs';

const TURN = 50000; // ms per rotation about the axis

export function start(root, tier) {
  const hero = root.closest('[data-hero]') || root;
  const css = getComputedStyle(document.documentElement);
  const colors = ['--teal-200', '--teal-500', '--teal-800', '--charcoal-700'].map((v) => css.getPropertyValue(v).trim());
  const wide = matchMedia('(min-width: 64rem)');
  let canvas, draw, cfg, n, fade;
  let raf = 0, last = 0, t0 = 0, phaseOff = 0, target = 0, visible = true, shown = false;
  let probe = [], gaps = [], tick = 0;
  // The pointer is a small spring: it eases toward the cursor, and its strength eases in and out.
  const ptr = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, s: 0, ts: 0 };

  function setup() {
    const layout = wide.matches ? 'desktop' : 'mobile';
    cfg = CONFIGS[layout];
    fade = FADES[layout];
    canvas?.remove();
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    root.appendChild(canvas);
    size();
    const P = build(cfg);
    n = Math.min(P.n, tier === 'A' ? P.n : 3200);
    draw = renderer(canvas, P, P.n, cfg, colors);
    if (!draw) {
      stop();
      canvas.remove();
      root.dataset.tier = 'C';
    }
  }

  function size() {
    const r = root.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(2.4e6 / Math.max(1, r.width * r.height)));
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!t0) t0 = now;
    if (tier === 'B' && now - last < 31) return;
    const gap = last ? now - last : 16;
    last = now;
    const work = performance.now();
    phaseOff += (target - phaseOff) * 0.04;
    ptr.x += (ptr.tx - ptr.x) * 0.25;
    ptr.y += (ptr.ty - ptr.y) * 0.25;
    ptr.s += (ptr.ts - ptr.s) * 0.08;
    const rad = 0.12 * Math.min(hero.clientWidth, hero.clientHeight) * (canvas.width / root.clientWidth);
    draw(((now - t0) / TURN) * Math.PI * 2 + phaseOff, n, [ptr.x, ptr.y, tier === 'A' ? ptr.s : 0], rad, fade);
    // Plain properties, not attributes: writing an attribute every frame would restyle the page.
    root.helixFrames = (root.helixFrames || 0) + 1;
    root.helixPush = tier === 'A' ? ptr.s * rad * 0.4 : 0;
    if (!shown) {
      shown = true;
      root.dataset.live = '';
    }
    // Two signals: the script's own cost, and the gap between frames, which also catches a slow GPU.
    if (probe && ++tick > 12) {
      probe.push(performance.now() - work);
      gaps.push(gap);
      if (probe.length === 30) {
        const avg = probe.reduce((a, b) => a + b, 0) / 30;
        const avgGap = gaps.reduce((a, b) => a + b, 0) / 30;
        root.dataset.frameMs = avg.toFixed(2);
        root.dataset.gapMs = avgGap.toFixed(1);
        probe = null;
        if (avg > (tier === 'A' ? 12 : 16) || avgGap > (tier === 'A' ? 24 : 48)) downgrade();
      }
    }
  }

  function downgrade() {
    if (tier === 'A') {
      tier = 'B';
      root.dataset.tier = 'B';
      n = Math.min(n, 3200);
      ptr.ts = 0;
      probe = [];
      gaps = [];
      tick = 0;
    } else {
      stop();
      delete root.dataset.live;
      root.dataset.tier = 'C';
      setTimeout(() => canvas.remove(), 700);
    }
  }

  function run() {
    if (!raf && draw && visible && !document.hidden && canvas.isConnected) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  setup();
  if (!draw) return;
  root.dataset.tier = tier;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) run();
    else stop();
  }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : run()));
  new ResizeObserver(() => size()).observe(root);
  wide.addEventListener('change', () => {
    stop();
    setup();
    run();
  });

  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      if (tier !== 'A') return;
      const r = root.getBoundingClientRect();
      const s = canvas.width / r.width;
      ptr.tx = (e.clientX - r.left) * s;
      ptr.ty = (e.clientY - r.top) * s;
      if (ptr.s < 0.01) {
        ptr.x = ptr.tx;
        ptr.y = ptr.ty;
      }
      ptr.ts = 1;
      target = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
    });
    hero.addEventListener('pointerleave', () => {
      ptr.ts = 0;
      target = 0;
    });
  }
  run();
}
