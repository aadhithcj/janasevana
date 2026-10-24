// The live helix. Loaded after idle only for tiers A and B; tier C keeps the poster.
// A: 8,000 particles at full rate with the pointer interaction. B: 3,200 at 30fps, drift only.
// Drawing is one WebGL2 call per frame (gl.mjs); without WebGL2 the poster simply stays.
// After a short warm-up, 30 frames are timed; a slow tier steps down and never steps back up.
//
// Pointer interaction (after React Bits DotGrid): only a MOVING cursor disturbs the helix, scaled by
// its speed. Each move leaves a small impulse; the GPU turns it into a push along the cursor's
// direction (plus a little outward) that springs back with a slight overshoot. Particles near the
// push swell, streak, glow and darken. A click sends a shockwave ring through the helix.
// There is no per-particle CPU work: this file only keeps a short list of recent impulses.
import { CONFIGS, build } from './geometry.mjs';
import { FADES, MAXI, MAXS, renderer } from './gl.mjs';

const TURN = 50000; // ms per rotation about the axis

// Feel, in the DotGrid vocabulary.
const FX = {
  strength: 1, // how hard a moving cursor pushes
  bounce: 0.6, // 0..1, how much the particles overshoot and wobble as they settle
  returnDuration: 0.8, // seconds to settle
  reach: 0.22, // peak push, as a fraction of the hover radius
  shockStrength: 1, // click shockwave strength
  shockRadius: 320, // css px the click wave travels
  travel: 650, // css px per second
  spawnMs: 38, // at most one impulse per this many ms
};
// Damped-spring impulse response, normalised so its peak is 1 (it dips slightly negative when bounce > 0).
const zeta = 1 - 0.85 * Math.min(1, Math.max(0, FX.bounce));
const omega = 4 / (zeta * Math.max(0.2, FX.returnDuration));
const wd = omega * Math.sqrt(Math.max(0, 1 - zeta * zeta));
const under = zeta < 0.999;
const tPeak = under ? Math.atan2(wd, zeta * omega) / wd : 1 / omega;
const hPeak = under ? (Math.exp(-zeta * omega * tPeak) * Math.sin(wd * tPeak)) / wd : tPeak * Math.exp(-omega * tPeak);
const spring = (t) => (under ? (Math.exp(-zeta * omega * t) * Math.sin(wd * t)) / wd : t * Math.exp(-omega * t)) / hPeak;
const LIFE = FX.returnDuration * 1.1; // seconds an impulse stays in the list
const smooth = (t) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export function start(root, tier) {
  const hero = root.closest('[data-hero]') || root;
  const css = getComputedStyle(document.documentElement);
  const colors = ['--teal-200', '--teal-500', '--teal-800', '--charcoal-700'].map((v) => css.getPropertyValue(v).trim());
  const wide = matchMedia('(min-width: 64rem)');
  let canvas, draw, cfg, n, fade;
  let raf = 0, last = 0, t0 = 0, phaseOff = 0, target = 0, visible = true, shown = false;
  let probe = [], gaps = [], tick = 0;
  // The pointer is a small spring: it eases toward the cursor, and its strength eases in and out.
  // It drives the soft hover glow around the cursor.
  const ptr = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, s: 0, ts: 0 };
  // Recent pointer impulses and click shocks, in canvas pixels.
  const imps = [];
  const shocks = [];
  const mv = { x: 0, y: 0, t: 0, vx: 0, vy: 0, spawned: 0, has: false };
  const fx = {
    imp: new Float32Array(MAXI * 4),
    amp: new Float32Array(MAXI),
    n: 0,
    shock: new Float32Array(MAXS * 4),
    ns: 0,
    shockW: 1,
    maxD: 0,
  };

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

  /** Ages the impulses and shocks and packs them into the uniform arrays. Returns the strongest live push, in canvas px. */
  function pack(now, rad, sc) {
    let peak = 0;
    let k = 0;
    for (let i = imps.length - 1; i >= 0; i--) if ((now - imps[i].t) / 1000 > LIFE) imps.splice(i, 1);
    for (const im of imps) {
      const a = im.a * spring((now - im.t) / 1000);
      fx.imp[k * 4] = im.x;
      fx.imp[k * 4 + 1] = im.y;
      fx.imp[k * 4 + 2] = im.dx;
      fx.imp[k * 4 + 3] = im.dy;
      fx.amp[k] = a;
      peak += Math.abs(a);
      if (++k === MAXI) break;
    }
    fx.n = k;
    const radius = FX.shockRadius * sc;
    const width = 0.25 * rad;
    let j = 0;
    for (let i = shocks.length - 1; i >= 0; i--) if (((now - shocks[i].t) / 1000) * FX.travel * sc > radius + width * 3) shocks.splice(i, 1);
    for (const sh of shocks) {
      const front = ((now - sh.t) / 1000) * FX.travel * sc;
      fx.shock[j * 4] = sh.x;
      fx.shock[j * 4 + 1] = sh.y;
      fx.shock[j * 4 + 2] = front;
      fx.shock[j * 4 + 3] = smooth(1 - front / radius) * 0.2 * rad * FX.shockStrength;
      if (++j === MAXS) break;
    }
    fx.ns = j;
    fx.shockW = width;
    fx.maxD = FX.reach * rad;
    return peak;
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
    const sc = canvas.width / root.clientWidth;
    const rad = 0.12 * Math.min(hero.clientWidth, hero.clientHeight) * sc;
    const push = tier === 'A' ? pack(now, rad, sc) : 0;
    draw(((now - t0) / TURN) * Math.PI * 2 + phaseOff, n, [ptr.x, ptr.y, tier === 'A' ? ptr.s : 0], rad, fade, tier === 'A' ? fx : undefined);
    // Plain properties, not attributes: writing an attribute every frame would restyle the page.
    root.helixFrames = (root.helixFrames || 0) + 1;
    root.helixPush = push * 1; // canvas px of live push; 0 when the cursor is still
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
      imps.length = 0;
      shocks.length = 0;
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
      const sc = canvas.width / r.width;
      const x = (e.clientX - r.left) * sc;
      const y = (e.clientY - r.top) * sc;
      const now = performance.now();
      // Smoothed cursor velocity, like DotGrid: it rises with movement and is simply not refreshed when the cursor stops.
      if (mv.has) {
        const dt = Math.max(4, now - mv.t) / 1000;
        mv.vx += ((x - mv.x) / dt - mv.vx) * 0.6;
        mv.vy += ((y - mv.y) / dt - mv.vy) * 0.6;
      } else {
        mv.vx = 0;
        mv.vy = 0;
      }
      mv.x = x;
      mv.y = y;
      mv.t = now;
      mv.has = true;
      const speed = Math.hypot(mv.vx, mv.vy) / sc; // css px per second
      if (speed > 40 && now - mv.spawned >= FX.spawnMs) {
        mv.spawned = now;
        const rad = 0.12 * Math.min(hero.clientWidth, hero.clientHeight) * sc;
        // Each impulse carries a small share of the push; about six overlap at once.
        imps.push({ x, y, t: now, dx: mv.vx / (speed * sc), dy: mv.vy / (speed * sc), a: FX.strength * FX.reach * rad * Math.tanh(speed / 900) * 0.16 });
        if (imps.length > MAXI) imps.shift();
      }
      ptr.tx = x;
      ptr.ty = y;
      if (ptr.s < 0.01) {
        ptr.x = x;
        ptr.y = y;
      }
      ptr.ts = 1;
      target = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
    });
    hero.addEventListener('pointerleave', () => {
      ptr.ts = 0;
      target = 0;
      mv.has = false;
    });
    // A click on empty hero space sends a shockwave. Clicks on links, buttons and fields never do.
    hero.addEventListener('pointerdown', (e) => {
      if (tier !== 'A' || e.pointerType !== 'mouse' || e.target.closest('a,button,input,textarea,select,summary,label,[role="button"]')) return;
      const r = root.getBoundingClientRect();
      const sc = canvas.width / r.width;
      shocks.push({ x: (e.clientX - r.left) * sc, y: (e.clientY - r.top) * sc, t: performance.now() });
      if (shocks.length > MAXS) shocks.shift();
    });
  }
  run();
}
