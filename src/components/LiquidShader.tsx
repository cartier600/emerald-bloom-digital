import { useEffect, useRef } from "react";

// Lightweight fragment-shader driven liquid gradient. Morphs between three
// brand colors (cannabis green, hot pink, warm gold) and reacts to scroll
// position + pointer movement. Falls back silently if WebGL is unavailable.

const VERT = `
attribute vec2 a;
void main(){ gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;

// Brand palette
const vec3 GREEN = vec3(0.184, 0.490, 0.196);   // #2f7d32
const vec3 PINK  = vec3(0.902, 0.224, 0.275);   // #e63946
const vec3 GOLD  = vec3(0.957, 0.706, 0.000);   // #f4b400

// Cheap pseudo-noise
float n(vec2 p){
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float sn(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = n(i);
  float b = n(i + vec2(1.0, 0.0));
  float c = n(i + vec2(0.0, 1.0));
  float d = n(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.18 + uScroll * 2.5;
  vec2 m = (uMouse - 0.5) * 1.4;

  // Drifting blob centers
  vec2 c1 = vec2(0.25 + 0.20 * sin(t * 0.9) + m.x * 0.15, 0.55 + 0.18 * cos(t * 0.7));
  vec2 c2 = vec2(0.75 + 0.18 * cos(t * 0.6) + m.y * 0.10, 0.45 + 0.22 * sin(t * 1.1));
  vec2 c3 = vec2(0.50 + 0.30 * sin(t * 0.4 + 1.7), 0.50 + 0.25 * cos(t * 0.5));

  float w = sn(p * 2.2 + t * 0.6) * 0.18;

  float d1 = distance(p, c1) + w;
  float d2 = distance(p, c2) + w;
  float d3 = distance(p, c3) + w;

  float r = 0.55;
  float a = smoothstep(r, 0.0, d1);
  float b = smoothstep(r, 0.0, d2);
  float g = smoothstep(r, 0.0, d3);

  vec3 col = GREEN * a + PINK * b + GOLD * g;
  float total = max(a + b + g, 0.0001);
  col /= total;

  // Cream backdrop blend
  vec3 cream = vec3(0.965, 0.945, 0.886);
  float mixAmt = clamp((a + b + g) * 0.85, 0.0, 0.85);
  vec3 outCol = mix(cream, col, mixAmt);

  gl_FragColor = vec4(outCol, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function LiquidShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    let scroll = 0;
    const mouse = { x: 0.5, y: 0.5 };
    let raf = 0;
    let running = true;

    const onScroll = () => {
      const rect = canvas.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = 1 - (rect.top + rect.height) / (vh + rect.height);
      scroll = Math.max(0, Math.min(1, p));
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    // Pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "100px" },
    );
    io.observe(canvas);

    const start = performance.now();
    const loop = () => {
      if (!running) return;
      resize();
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uScroll, scroll);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(loop);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}