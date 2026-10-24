// WebGL2 renderer for the hero helix: every particle is placed and drawn on the GPU in one
// instanced call, the fade away from the text column is computed in the shader (no CSS mask),
// and the pointer push is a displacement around a spring-smoothed pointer. Shared by the live
// canvas and the build-time poster, so the poster is exactly frame 0.

const VERT = `#version 300 es
#define GROOVE 2.45
layout(location=0) in vec2 aCorner;
layout(location=1) in vec4 aA;
layout(location=2) in vec3 aJ;
uniform float uPhase, uR, uK, uRad;
uniform vec2 uC, uAxis, uPerp, uOff, uRes;
uniform vec3 uPointer, uColors[4];
out vec2 vLocal;
out float vR, vSoft, vAlpha;
out vec3 vColor;
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
  vAlpha = alpha;
  vSoft = (rung ? 0.0 : smoothstep(0.78, 1.0, t)) * (dust ? 1.0 : 0.7);
  vec3 col;
  if (kind == 1) col = mix(uColors[1], uColors[2], t);
  else if (kind == 2) col = mix(uColors[0], uColors[1], t);
  else if (kind == 3) col = uColors[3];
  else col = aA.z < 0.5 ? mix(uColors[0], uColors[2], t * 0.85) : mix(uColors[0], uColors[1], t);
  vec2 d = pos - uPointer.xy;
  float dist = length(d);
  if (uPointer.z > 0.0 && dist < uRad && dist > 0.5) {
    float f = 1.0 - dist / uRad;
    pos += d / dist * f * f * uRad * 0.4 * uPointer.z;
  }
  vR = max(0.75, size * uK);
  vLocal = aCorner * (vR + 1.0);
  vColor = col;
  vec2 q = pos + vLocal;
  gl_Position = vec4(q.x / uRes.x * 2.0 - 1.0, 1.0 - q.y / uRes.y * 2.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vLocal;
in float vR, vSoft, vAlpha;
in vec3 vColor;
uniform vec2 uRes;
uniform vec3 uFade;
out vec4 o;
void main() {
  float d = length(vLocal);
  float hard = clamp(vR - d + 0.5, 0.0, 1.0);
  float soft = 1.0 - smoothstep(0.45 * vR, vR, d);
  float a = mix(hard, soft, vSoft);
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
export function renderer(canvas, P, n, cfg, colors, preserve = false) {
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
  for (const name of ['uPhase', 'uR', 'uK', 'uRad', 'uC', 'uAxis', 'uPerp', 'uOff', 'uRes', 'uPointer', 'uColors', 'uFade']) u[name] = gl.getUniformLocation(prog, name);

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

  /** fade: [mode, from, to]; mode 0 fades in left to right, mode 1 fades out from the top-right corner. */
  return (phase, count, pointer, rad, fade) => {
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
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
  };
}

/** The text-column fade for each layout, matching the hero's composition. */
export const FADES = { desktop: [0, 0.42, 0.62], mobile: [1, 0.22, 0.64] };
