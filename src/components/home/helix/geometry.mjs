// The hero helix: seeded, deterministic particles shared by the live canvas (live.mjs)
// and the build-time poster (scripts/build-helix-poster.mjs). gl.mjs places and draws them.

/** Design spaces. The box maps onto them with "cover", anchored right-top, exactly like the poster's CSS. */
export const CONFIGS = {
  desktop: { W: 1600, H: 1000, cx: 1130, cy: 470, lean: 28, len: 1500, R: 235, turns: 1.85, count: 6000, seed: 7 },
  mobile: { W: 600, H: 600, cx: 410, cy: 230, lean: 28, len: 820, R: 120, turns: 1.3, count: 2500, seed: 11 },
};

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Particles in a random interleaved order, so the first n are an even subset for lighter tiers. */
export function build(cfg) {
  const n = cfg.count;
  const r = rng(cfg.seed);
  const g = () => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
  const P = {
    n,
    s: new Float32Array(n),
    th: new Float32Array(n),
    u: new Float32Array(n),
    jx: new Float32Array(n),
    jy: new Float32Array(n),
    jz: new Float32Array(n),
    c: new Uint8Array(n),
  };
  const k = (2 * Math.PI * cfg.turns) / cfg.len;
  const rungs = Math.floor((cfg.turns * 2 * Math.PI) / (Math.PI / 5));
  for (let i = 0; i < n; i++) {
    let sig;
    if (r() < 0.72) {
      // Strand: a dusty ribbon, with a few loose grains around it.
      P.s[i] = (r() - 0.5) * cfg.len;
      P.th[i] = k * P.s[i] + (r() < 0.5 ? 0 : Math.PI);
      P.u[i] = 1;
      sig = cfg.R * (r() < 0.15 ? 0.45 : 0.12);
    } else {
      // Base-pair rung every pi/5 of rotation, sparser, along the line between the strands.
      const j = Math.floor(r() * rungs);
      P.s[i] = (j * Math.PI) / 5 / k - cfg.len / 2 + g() * cfg.R * 0.02;
      P.th[i] = k * P.s[i];
      P.u[i] = r() * 2 - 1;
      sig = cfg.R * 0.05;
    }
    P.jx[i] = g() * sig;
    P.jy[i] = g() * sig;
    P.jz[i] = g() * sig;
    const q = r();
    P.c[i] = q < 0.3 ? 0 : q < 0.7 ? 1 : q < 0.96 ? 2 : 3;
  }
  return P;
}
