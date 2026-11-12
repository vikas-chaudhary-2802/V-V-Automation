import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { openEnquiry } from "@/lib/enquiry";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { products } from "@/data/catalog";

type Scores = Record<string, number>;
interface Option { label: string; hint: string; scores: Scores }
interface Question { key: string; title: string; options: Option[] }

const questions: Question[] = [
  {
    key: "work",
    title: "What will you mainly make?",
    options: [
      { label: "Signs, dies & fine detail", hint: "Engraving, marking, jewellery", scores: { "cnc-engraving": 4, "cnc-machines": 1 } },
      { label: "Prototypes & mixed jobs", hint: "Flexible, repeatable accuracy", scores: { "cnc-machines": 4, "cnc-milling": 1 } },
      { label: "Tough metal & 3D surfaces", hint: "Moulds, tool-room, auto parts", scores: { "cnc-milling": 4, "vmc-machines": 1 } },
      { label: "High-volume precision parts", hint: "Batches, tight tolerances", scores: { "vmc-machines": 4, "cnc-milling": 1 } },
    ],
  },
  {
    key: "material",
    title: "What do you cut most?",
    options: [
      { label: "Wood, acrylic, soft metals", hint: "Light-duty materials", scores: { "cnc-engraving": 3, "cnc-machines": 2 } },
      { label: "Aluminium & brass", hint: "Everyday metalwork", scores: { "cnc-machines": 3, "cnc-milling": 2, "vmc-machines": 1 } },
      { label: "Steel & hardened alloys", hint: "Heavy metal removal", scores: { "cnc-milling": 3, "vmc-machines": 3 } },
    ],
  },
  {
    key: "volume",
    title: "How much output do you need?",
    options: [
      { label: "One-offs & small runs", hint: "Workshop scale", scores: { "cnc-engraving": 2, "cnc-machines": 2 } },
      { label: "Steady batches", hint: "Daily production", scores: { "cnc-machines": 2, "cnc-milling": 2, "vmc-machines": 1 } },
      { label: "Round-the-clock volume", hint: "Factory scale", scores: { "vmc-machines": 4, "cnc-milling": 1 } },
    ],
  },
];

const MachineFinder = () => {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Option[]>([]);
  const done = step >= questions.length;

  const result = useMemo(() => {
    if (!done) return null;
    const totals: Scores = {};
    picked.forEach((o) => Object.entries(o.scores).forEach(([id, n]) => { totals[id] = (totals[id] || 0) + n; }));
    const ranked = products.map((p) => ({ p, score: totals[p.id] || 0 })).sort((a, b) => b.score - a.score);
    const max = ranked[0].score || 1;
    return { best: ranked[0].p, runnerUp: ranked[1].p, match: Math.min(98, Math.round(68 + (ranked[0].score / (max + 3)) * 30)) };
  }, [done, picked]);

  const choose = (option: Option) => {
    setPicked((current) => [...current, option]);
    setStep((s) => s + 1);
  };
  const reset = () => { setPicked([]); setStep(0); };

  return (
    <section className="finder-section section-space" id="finder">
      <div className="container-section finder-layout">
        <div className="finder-intro" data-reveal="up">
          <p className="eyebrow eyebrow-light"><span />MACHINE FINDER</p>
          <h2>Three questions. One right machine.</h2>
          <p>Answer in under 30 seconds and see the V&amp;V platform that fits your work—then take the shortlist straight to our engineers.</p>
          <div className="finder-dots" aria-hidden="true">
            {questions.map((q, i) => <i key={q.key} className={i < step ? "done" : i === step ? "now" : ""} />)}
          </div>
        </div>

        <div className="finder-card" data-reveal="up" aria-live="polite">
          {!done && (
            <div className="finder-step" key={step}>
              <span className="finder-count">Question {step + 1} of {questions.length}</span>
              <h3>{questions[step].title}</h3>
              <div className="finder-options">
                {questions[step].options.map((option) => (
                  <button type="button" key={option.label} onClick={() => choose(option)}>
                    <strong>{option.label}</strong>
                    <small>{option.hint}</small>
                    <ArrowRight />
                  </button>
                ))}
              </div>
            </div>
          )}

          {done && result && (
            <div className="finder-result">
              <span className="finder-count"><Sparkles size={14} /> Your best match · {result.match}%</span>
              <div className="finder-result-body">
                <img src={result.best.image} alt={result.best.name} />
                <div>
                  <h3>{result.best.name}</h3>
                  <p>{result.best.description}</p>
                  <div className="model-list" title="Popular sizes: every machine is built to your working size">{result.best.models.map((m) => <span key={m}>{m}</span>)}</div>
                </div>
              </div>
              <div className="finder-actions">
                <button type="button" onClick={() => openEnquiry({ machine: result.best.name })} className="button button-accent">Get price for this <ArrowRight size={18} /></button>
                <Link to={`/machines/${result.best.id}`} className="text-link">See full details</Link>
                <button type="button" className="finder-reset" onClick={reset}><RotateCcw size={15} /> Start over</button>
              </div>
              <p className="finder-also">Also worth a look: <Link to={`/machines/${result.runnerUp.id}`}>{result.runnerUp.name}</Link></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MachineFinder;
