import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/catalog";

const metrics = [
  { key: "detail", label: "Fine detail" },
  { key: "power", label: "Cutting power" },
  { key: "speed", label: "Speed" },
  { key: "volume", label: "Production volume" },
] as const;

/** Interactive relative-positioning chart: pick a machine to spotlight it. */
const MachineCompare = () => {
  const [focus, setFocus] = useState(products[3].id);
  const current = products.find((p) => p.id === focus) ?? products[0];

  return (
    <section id="compare" className="compare-section section-space">
      <div className="container-section compare-layout">
        <div className="compare-intro" data-reveal="up">
          <p className="eyebrow eyebrow-light"><span />COMPARE THE RANGE</p>
          <h2>See where each platform shines.</h2>
          <p>Relative positioning across the V&amp;V range. Select a machine to spotlight it; exact specifications are confirmed against your application.</p>
          <div className="compare-tabs" role="tablist" aria-label="Choose a machine">
            {products.map((p) => (
              <button key={p.id} type="button" role="tab" aria-selected={focus === p.id} className={focus === p.id ? "active" : undefined} onClick={() => setFocus(p.id)}>
                <i>{p.number}</i>{p.name}
              </button>
            ))}
          </div>
          <Link to={`/machines/${current.id}`} className="button button-accent">Explore {current.name} <ArrowRight size={18} /></Link>
        </div>

        <div className="compare-chart" data-reveal="up">
          {metrics.map((m) => (
            <div className="compare-row" key={m.key}>
              <h3>{m.label}</h3>
              {products.map((p) => {
                const value = p.profile[m.key];
                return (
                  <div className={`compare-bar${p.id === focus ? " is-focus" : ""}`} key={p.id} onMouseEnter={() => setFocus(p.id)}>
                    <span>{p.name}</span>
                    <div role="meter" aria-label={`${p.name} ${m.label}`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={value}>
                      <b style={{ width: `${value * 20}%` }} />
                    </div>
                    <em>{value}/5</em>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineCompare;
