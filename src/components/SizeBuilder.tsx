import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { type MachineSize, decodeModel, modelName, sizeLabel } from "@/data/catalog";
import { openEnquiry } from "@/lib/enquiry";

const axes: { key: keyof MachineSize; label: string; hint: string; min: number; max: number }[] = [
  { key: "x", label: "X travel", hint: "Left to right, the longest side of your job", min: 200, max: 900 },
  { key: "y", label: "Y travel", hint: "Front to back", min: 200, max: 900 },
  { key: "z", label: "Z travel", hint: "Up and down, the height of your job plus tooling", min: 100, max: 900 },
];

/** Shows how a V&V model number is formed, and lets the buyer build their own size. */
const SizeBuilder = ({ machine, start = "VV M-542", compact = false }: { machine?: string; start?: string; compact?: boolean }) => {
  const [size, setSize] = useState<MachineSize>(decodeModel(start) ?? { x: 500, y: 400, z: 200 });
  const name = modelName(size);
  const digits = name.slice(-3).split("");
  const set = (key: keyof MachineSize, v: number) => setSize((s) => ({ ...s, [key]: Math.min(900, Math.max(100, v)) }));

  // proportional working-envelope preview (isometric-ish box)
  const k = 0.11, bx = size.x * k, by = size.y * k * 0.5, bz = size.z * k;
  const ox = 30, oy = 20 + bz + by;

  return (
    <div className={`size-builder${compact ? " compact" : ""}`}>
      <div className="sb-code" aria-label={`Model ${name}`}>
        <span className="sb-prefix">VV M-</span>
        {digits.map((d, i) => (
          <span key={i} className={`sb-digit sb-${"xyz"[i]}`}>{d}<small>{"XYZ"[i]}</small></span>
        ))}
      </div>
      <p className="sb-explain">Each digit is the travel on one axis, in hundreds of mm. <strong>{name}</strong> means <strong>{sizeLabel(size)}</strong>.</p>

      <div className="sb-body">
        <div className="sb-controls">
          {axes.map((a, i) => (
            <div className={`sb-axis sb-${a.key}`} key={a.key}>
              <div className="sb-axis-top"><span><i>{"XYZ"[i]}</i>{a.label}</span><strong>{size[a.key]} mm</strong></div>
              <div className="sb-axis-row">
                <button type="button" aria-label={`Decrease ${a.label}`} onClick={() => set(a.key, size[a.key] - 100)} disabled={size[a.key] <= a.min}><Minus /></button>
                <input type="range" min={a.min} max={a.max} step={100} value={size[a.key]} onChange={(e) => set(a.key, Number(e.target.value))} aria-label={a.label} />
                <button type="button" aria-label={`Increase ${a.label}`} onClick={() => set(a.key, size[a.key] + 100)} disabled={size[a.key] >= a.max}><Plus /></button>
              </div>
              {!compact && <small>{a.hint}</small>}
            </div>
          ))}
        </div>
        <svg className="sb-box" viewBox={`0 0 ${bx + by + 60} ${bz + by + 50}`} role="img" aria-label={`Working envelope ${sizeLabel(size)}`}>
          <g fill="none" strokeLinejoin="round" strokeWidth="1.5">
            <path className="sb-face-top" d={`M${ox},${oy - bz} l${bx},0 l${by},${-by} l${-bx},0 z`} />
            <path className="sb-face-front" d={`M${ox},${oy} l${bx},0 l0,${-bz} l${-bx},0 z`} />
            <path className="sb-face-side" d={`M${ox + bx},${oy} l${by},${-by} l0,${-bz} l${-by},${by} z`} />
          </g>
          <text x={ox + bx / 2} y={oy + 18} className="sb-lbl sb-lx">X {size.x}</text>
          <text x={ox + bx + by / 2 + 8} y={oy - by / 2 + 8} className="sb-lbl sb-ly">Y {size.y}</text>
          <text x={ox - 8} y={oy - bz / 2} className="sb-lbl sb-lz" textAnchor="end">Z {size.z}</text>
        </svg>
      </div>

      <div className="sb-cta">
        <button type="button" className="button button-accent" onClick={() => openEnquiry({ machine, model: `${name} (${sizeLabel(size)})` })}>Get price for {name} <ArrowRight size={18} /></button>
        <span>Not sure of your size? Send us your largest part or drawing and we'll size it for you.</span>
      </div>
    </div>
  );
};

export default SizeBuilder;
