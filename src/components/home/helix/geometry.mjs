// The hero helix: seeded, deterministic particles shared by the live canvas (live.mjs)
// and the build-time poster (scripts/build-helix-poster.mjs). gl.mjs places and draws them.

/** Design spaces. The box maps onto them with "cover", anchored right-top, exactly like the poster's CSS. */
export const CONFIGS = {
  desktop: { W: 1600, H: 1000, cx: 1120, cy: 470, lean: 28, len: 1500, R: 210, turns: 2.3, count: 8000, seed: 7 },
  mobile: { W: 600, H: 600, cx: 405, cy: 230, lean: 28, len: 820, R: 112, turns: 1.6, count: 3200, seed: 11 },
};

/** The second strand trails the first by this angle (radians), so the helix shows a major and a minor groove like real DNA. */
export const GROOVE = 2.45;

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
    const q = r();
    if (r() < 0.54) {
      // Strand: a tight, continuous line of dots in the deeper teals, with a few loose grains.
      P.s[i] = (r() - 0.5) * cfg.len;
      P.th[i] = k * P.s[i] + (r() < 0.5 ? 0 : GROOVE);
      P.u[i] = 2; // marks a strand particle for the shader
      sig = cfg.R * (r() < 0.04 ? 0.3 : 0.035);
      P.c[i] = q < 0.55 ? 1 : q < 0.97 ? 2 : 3;
    } else {
      // Base pair: a rung every pi/5 of rotation, drawn as a pale line between the two strands.
      const j = Math.floor(r() * rungs);
      P.s[i] = (j * Math.PI) / 5 / k - cfg.len / 2 + g() * cfg.R * 0.01;
      P.th[i] = k * P.s[i];
      P.u[i] = 0.04 + r() * 0.92; // position along the rung, 0 at the first strand, 1 at the second
      sig = cfg.R * 0.014;
      P.c[i] = q < 0.75 ? 0 : 1;
    }
    P.jx[i] = g() * sig;
    P.jy[i] = g() * sig;
    P.jz[i] = g() * sig;
  }
  return P;
}
