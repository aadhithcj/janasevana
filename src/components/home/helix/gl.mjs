// WebGL2 renderer for the hero helix: every particle is placed and drawn on the GPU in one
// instanced call, the fade away from the text column is computed in the shader (no CSS mask),
// and the pointer push is a displacement around a spring-smoothed pointer. Shared by the live
// canvas and the build-time poster, so the poster is exactly frame 0.

const MAXI = 24; // pointer impulses alive at once
const MAXS = 4; // click shockwaves alive at once

const VERT = `#version 300 es
#define GROOVE 2.45
#define MAXI ${MAXI}
#define MAXS ${MAXS}
layout(location=0) in vec2 aCorner;
layout(location=1) in vec4 aA;
layout(location=2) in vec3 aJ;
uniform float uPhase, uR, uK, uRad, uMaxD, uSwell, uStretch, uGlow, uShockW;
uniform vec2 uC, uAxis, uPerp, uOff, uRes;
uniform vec3 uPointer, uColors[4];
uniform vec4 uImp[MAXI], uShock[MAXS];
uniform float uAmp[MAXI];
uniform int uImpN, uShockN;
out vec2 vLocal;
out float vR, vSoft, vAlpha, vLen, vE;
out vec3 vColor;
float sm(float t) { t = clamp(t, 0.0, 1.0); return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
void main() {
  // Kind: 1 backbone A, 2 backbone B, 3 accent grain, 0 rung; +4 dust halo; +8 bead.
  int kind = int(aA.w);
  bool bead = kind >= 8;
  if (bead) kind -= 8;
  bool dust = kind >= 4;
  if (dust) kind -= 4;
  bool rung = aA.z < 1.5;
  float th = aA.y + uPhase;
  // Backbones sit on the circle; rung dots lie on the chord to the other strand.
  vec2 cs = vec2(cos(th), sin(th));
  if (rung) cs = mix(cs, vec2(cos(th + GROOVE), sin(th + GROOVE)), aA.z);
  float z = uR * cs.y + aJ.z;
  float p = 1.0 + 0.22 * z / uR;
  float w = uR * cs.x * p;
  vec2 pos = (uC + aA.x * uAxis + w * uPerp + aJ.xy) * uK + uOff;
  // Depth runs 0 (far side) to 1 (near side) and drives size, opacity, softness and tone.
  float t = clamp(z / uR * 0.5 + 0.5, 0.0, 1.0);
  float size, alpha;
  if (bead) { size = mix(2.0, 4.0, t); alpha = mix(0.55, 1.0, t); }
  else if (rung) { size = mix(0.85, 1.55, t); alpha = mix(0.34, 0.9, t); }
  else { size = mix(1.0, 2.5, t); alpha = mix(0.32, 0.95, t); }
  if (dust) { size *= 0.9; alpha *= 0.55; }
  vec3 col;
  if (kind == 1) col = mix(uColors[1], uColors[2], t);
  else if (kind == 2) col = mix(uColors[0], uColors[1], t);
  else if (kind == 3) col = uColors[3];
  else col = aA.z < 0.5 ? mix(uColors[0], uColors[2], t * 0.85) : mix(uColors[0], uColors[1], t);

  // Pointer: each recent pointer move left an impulse (position, direction, and a spring envelope
  // computed on the CPU). A particle is pushed along the cursor's direction plus a little away from
  // it, scaled by a smooth falloff. Click shockwaves are a travelling ring.
  vec2 disp = vec2(0.0);
  for (int i = 0; i < MAXI; i++) {
    if (i >= uImpN) break;
    vec4 im = uImp[i];
    vec2 d = pos - im.xy;
    float dist = length(d);
    if (dist < uRad) {
      vec2 nrm = dist > 0.5 ? d / dist : vec2(0.0);
      disp += (im.zw + 0.6 * nrm) * (sm(1.0 - dist / uRad) * uAmp[i]);
    }
  }
  for (int i = 0; i < MAXS; i++) {
    if (i >= uShockN) break;
    vec4 sh = uShock[i];
    vec2 d = pos - sh.xy;
    float dist = length(d);
    float u = (dist - sh.z) / uShockW;
    if (abs(u) < 3.0 && dist > 0.5) disp += d / dist * (sh.w * exp(-u * u));
  }
  disp *= 0.55 + 0.9 * fract(sin(dot(aA.xy, vec2(12.9898, 78.233))) * 43758.5453);
  float m = length(disp);
  float cap = max(uMaxD * 1.8, 0.001);
  if (m > 0.001) disp *= cap * tanh(m / cap) / m;
  pos += disp;
  float mm = length(disp);
  // Energy lights a particle up: it swells, stretches along its motion, glows and darkens.
  float e = clamp(mm / max(1.1 * uMaxD, 0.001), 0.0, 1.0);
  if (uPointer.z > 0.001) {
    float dp = length(pos - uPointer.xy);
    if (dp < uRad) e = max(e, sm(1.0 - dp / uRad) * 0.4 * uPointer.z);
  }
  float r = max(0.75, size * uK) * (1.0 + uSwell * e);
  float halfLen = e > 0.02 ? min(2.0 * r, uStretch * e * r * 1.6) : 0.0;
  vec2 dir = mm > 0.5 ? disp / mm : vec2(1.0, 0.0);
  float pad = r * (1.0 + uGlow * e * 2.5) + 1.0;
  vec2 local = aCorner * vec2(halfLen + pad, pad);
  vec2 q = pos + dir * local.x + vec2(-dir.y, dir.x) * local.y;
  vLocal = local;
  vLen = halfLen;
  vR = r;
  vE = e;
  vAlpha = mix(alpha, 1.0, e * 0.5);
  vSoft = (rung ? 0.0 : smoothstep(0.78, 1.0, t)) * (dust ? 1.0 : 0.7) * (1.0 - e);
  vColor = mix(col, uColors[2], clamp(e * 0.9, 0.0, 1.0));
  gl_Position = vec4(q.x / uRes.x * 2.0 - 1.0, 1.0 - q.y / uRes.y * 2.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vLocal;
in float vR, vSoft, vAlpha, vLen, vE;
in vec3 vColor;
uniform vec2 uRes;
uniform vec3 uFade;
uniform float uGlow;
out vec4 o;
void main() {
  // Distance to the particle's core, which is a short segment when it is stretched.
  float d = length(vec2(max(abs(vLocal.x) - vLen, 0.0), vLocal.y));
  float hard = clamp(vR - d + 0.5, 0.0, 1.0);
  float soft = 1.0 - smoothstep(0.45 * vR, vR, d);
  float body = mix(hard, soft, vSoft);
  float halo = vE > 0.01 ? uGlow * vE * 0.5 * exp(-max(d - vR, 0.0) / max(vR * 1.3, 0.6)) : 0.0;
  float a = body + (1.0 - body) * halo;
  vec2 f = gl_FragCoord.xy;
  f.y = uRes.y - f.y;
  float t = uFade.x < 0.5
    ? clamp((f.x / uRes.x - uFade.y) / (uFade.z - uFade.y), 0.0, 1.0)
    : 1.0 - clamp((distance(f, vec2(uRes.x, 0.0)) / length(uRes) - uFade.y) / (uFade.z - uFade.y), 0.0, 1.0);
  a *= vAlpha * t;
  if (a < 0.003) discard;
  o = vec4(vColor * a, a);
}`;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

/** Returns a draw function, or null where WebGL2 is unavailable (the poster then stays). */
export function renderer(canvas, P, n, cfg, colors, preserve = false, look = {}) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: preserve });
  if (!gl) return null;
  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const u = {};
  for (const name of ['uPhase', 'uR', 'uK', 'uRad', 'uC', 'uAxis', 'uPerp', 'uOff', 'uRes', 'uPointer', 'uColors', 'uFade', 'uMaxD', 'uSwell', 'uStretch', 'uGlow', 'uShockW', 'uImp', 'uShock', 'uAmp', 'uImpN', 'uShockN']) u[name] = gl.getUniformLocation(prog, name);

  gl.bindVertexArray(gl.createVertexArray());
  const buffer = (data, loc, size) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    if (loc) gl.vertexAttribDivisor(loc, 1);
  };
  buffer(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), 0, 2);
  const A = new Float32Array(n * 4);
  const J = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    A.set([P.s[i], P.th[i], P.u[i], P.c[i]], i * 4);
    J.set([P.jx[i], P.jy[i], P.jz[i]], i * 3);
  }
  buffer(A, 1, 4);
  buffer(J, 2, 3);

  const t = (cfg.lean * Math.PI) / 180;
  gl.uniform2f(u.uC, cfg.cx, cfg.cy);
  gl.uniform1f(u.uR, cfg.R);
  gl.uniform2f(u.uAxis, Math.sin(t), -Math.cos(t));
  gl.uniform2f(u.uPerp, Math.cos(t), Math.sin(t));
  gl.uniform3fv(u.uColors, colors.flatMap(hex));
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);
  // How a lit particle looks: swell grows it, stretch streaks it along its motion, glow adds a halo.
  gl.uniform1f(u.uSwell, look.swell ?? 0.5);
  gl.uniform1f(u.uStretch, look.stretch ?? 0.4);
  gl.uniform1f(u.uGlow, look.glow ?? 0.4);

  /** fade: [mode, from, to]; mode 0 fades in left to right, mode 1 fades out from the top-right corner. */
  /** fx (optional): { imp: Float32Array(MAXI*4), amp: Float32Array(MAXI), n, shock: Float32Array(MAXS*4), ns, shockW, maxD }. Without it the frame is the plain poster frame. */
  return (phase, count, pointer, rad, fade, fx) => {
    const w = canvas.width;
    const h = canvas.height;
    const k = Math.max(w / cfg.W, h / cfg.H);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(u.uPhase, phase);
    gl.uniform1f(u.uK, k);
    gl.uniform2f(u.uOff, w - cfg.W * k, 0);
    gl.uniform2f(u.uRes, w, h);
    gl.uniform3fv(u.uPointer, pointer);
    gl.uniform1f(u.uRad, rad);
    gl.uniform3fv(u.uFade, fade);
    gl.uniform1i(u.uImpN, fx ? fx.n : 0);
    gl.uniform1i(u.uShockN, fx ? fx.ns : 0);
    gl.uniform1f(u.uMaxD, fx ? fx.maxD : 0);
    gl.uniform1f(u.uShockW, fx ? fx.shockW : 1);
    if (fx && fx.n) {
      gl.uniform4fv(u.uImp, fx.imp);
      gl.uniform1fv(u.uAmp, fx.amp);
    }
    if (fx && fx.ns) gl.uniform4fv(u.uShock, fx.shock);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
  };
}

export { MAXI, MAXS };

/** The text-column fade for each layout, matching the hero's composition. */
export const FADES = { desktop: [0, 0.42, 0.62], mobile: [1, 0.22, 0.64] };
