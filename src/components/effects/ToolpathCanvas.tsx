import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

/** Builds a zig-zag "pocketing" toolpath with a contour pass, in 0..1 space. */
const buildPath = (): Point[] => {
  const pts: Point[] = [];
  const left = 0.06, right = 0.94, top = 0.1, bottom = 0.9;
  const rows = 11;
  // Pocketing passes
  for (let i = 0; i <= rows; i++) {
    const y = top + ((bottom - top) * i) / rows;
    const inset = Math.sin((i / rows) * Math.PI) * 0.1;
    const a = { x: left + inset, y };
    const b = { x: right - inset, y };
    pts.push(...(i % 2 === 0 ? [a, b] : [b, a]));
  }
  // Contour pass
  pts.push({ x: left, y: bottom }, { x: left, y: top }, { x: right, y: top }, { x: right, y: bottom }, { x: left, y: bottom });
  return pts;
};

const ToolpathCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [readout, setReadout] = useState({ x: 0, y: 0, z: -2.5, rpm: 12000, feed: 1800, line: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = buildPath();
    const segLengths = path.slice(1).map((p, i) => Math.hypot(p.x - path[i].x, p.y - path[i].y));
    const total = segLengths.reduce((a, b) => a + b, 0);
    const SPEED = 0.16; // path-units per second
    let progress = reduced ? total : 0;
    let width = 0, height = 0, last = performance.now(), frame = 0, visible = true, tick = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const locate = (dist: number): Point => {
      let d = dist;
      for (let i = 0; i < segLengths.length; i++) {
        if (d <= segLengths[i]) {
          const t = segLengths[i] === 0 ? 0 : d / segLengths[i];
          return { x: path[i].x + (path[i + 1].x - path[i].x) * t, y: path[i].y + (path[i + 1].y - path[i].y) * t };
        }
        d -= segLengths[i];
      }
      return path[path.length - 1];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const px = (p: Point) => ({ x: p.x * width, y: p.y * height });

      // Faint full path (the "programme")
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,.07)";
      ctx.beginPath();
      path.forEach((p, i) => { const q = px(p); i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); });
      ctx.stroke();

      // Cut portion
      ctx.strokeStyle = "rgba(255,122,82,.85)";
      ctx.shadowColor = "rgba(255,110,64,.7)";
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      let remaining = progress;
      const s = px(path[0]);
      ctx.moveTo(s.x, s.y);
      for (let i = 0; i < segLengths.length; i++) {
        const e = remaining >= segLengths[i] ? path[i + 1] : locate(progress);
        const q = px(e);
        ctx.lineTo(q.x, q.y);
        if (remaining < segLengths[i]) break;
        remaining -= segLengths[i];
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tool head
      const head = px(locate(progress));
      const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 34);
      glow.addColorStop(0, "rgba(255,150,100,.9)");
      glow.addColorStop(0.25, "rgba(255,110,64,.35)");
      glow.addColorStop(1, "rgba(255,110,64,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(head.x, head.y, 34, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(head.x, head.y, 2.6, 0, Math.PI * 2); ctx.fill();
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) {
        progress += SPEED * dt;
        if (progress > total + 0.25) progress = 0;
        const p = Math.min(progress, total);
        draw();
        if (++tick % 6 === 0) {
          const h = locate(p);
          setReadout({
            x: +(h.x * 320).toFixed(2), y: +(h.y * 200).toFixed(2),
            z: p > total * 0.92 ? -1.0 : -2.5,
            rpm: 12000, feed: p > total * 0.92 ? 2400 : 1800,
            line: Math.max(1, Math.round((p / total) * 148)),
          });
        }
      }
      frame = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 });
    io.observe(canvas);
    if (reduced) draw(); else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <div className="toolpath" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="gcode-readout">
        <span className="gcode-live"><i /> LIVE TOOLPATH</span>
        <code>N{String(readout.line).padStart(4, "0")} G01 X{readout.x.toFixed(2)} Y{readout.y.toFixed(2)}</code>
        <code>Z{readout.z.toFixed(1)} F{readout.feed} S{readout.rpm}</code>
      </div>
    </div>
  );
};

export default ToolpathCanvas;
