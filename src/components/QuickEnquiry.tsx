import { type FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle2, MessageCircle, Phone, X } from "lucide-react";
import { contact, products } from "@/data/catalog";
import { type EnquiryNeed, type EnquiryRequest, waLink } from "@/lib/enquiry";

const needs: EnquiryNeed[] = ["Price quote", "Live demo", "Trial cut on my part", "Spare part", "Service / retrofit"];
const machineOptions = [...products.map((p) => p.name), "Not sure yet: help me choose"];

/**
 * 30-second enquiry: four fields, no account, lands in WhatsApp already written.
 * Opened anywhere via openEnquiry({ machine, model, need }).
 */
const QuickEnquiry = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const [model, setModel] = useState("");
  const [machine, setMachine] = useState("");
  const [need, setNeed] = useState<EnquiryNeed>("Price quote");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<EnquiryRequest>).detail || {};
      setMachine(d.machine || "");
      setModel(d.model || "");
      setNeed(d.need || "Price quote");
      setError("");
      setSent("");
      ref.current?.showModal();
      document.body.classList.add("enquiry-open");
    };
    window.addEventListener("vv:enquire", onOpen);
    return () => window.removeEventListener("vv:enquire", onOpen);
  }, []);

  const close = () => {
    ref.current?.close();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(digits)) return setError("Please enter a valid 10-digit mobile number.");
    const lines = [
      `Hello V&V Automation, I'd like a ${need.toLowerCase()}.`,
      "",
      `Machine: ${machine || "Not sure yet"}${model ? ` (${model})` : ""}`,
      `Name: ${name.trim()}`,
      `Mobile: +91 ${digits}`,
      city.trim() ? `City: ${city.trim()}` : "",
    ].filter((l, i, a) => l || a[i - 1] !== "");
    const url = waLink(lines.join("\n"));
    setSent(url);
    window.open(url, "_blank", "noopener");
  };

  return (
    <dialog
      ref={ref}
      className="enquiry-dialog"
      aria-labelledby="enquiry-title"
      onClose={() => document.body.classList.remove("enquiry-open")}
      onClick={(e) => { if (e.target === ref.current) close(); }}
    >
      <div className="qe-panel">
        <button type="button" className="enquiry-close" onClick={close} aria-label="Close"><X /></button>
        {sent ? (
          <div className="enquiry-done">
            <CheckCircle2 />
            <h2 id="enquiry-title">Your enquiry is ready in WhatsApp.</h2>
            <p>Press send in WhatsApp and our team will reply with pricing and next steps. If WhatsApp did not open, use the button below.</p>
            <a className="button button-accent" href={sent} target="_blank" rel="noreferrer">Open WhatsApp <MessageCircle size={18} /></a>
            <a className="enquiry-call" href={contact.phoneHref}><Phone size={16} /> Prefer a call? {contact.phoneDisplay}</a>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="eyebrow"><span />Quick enquiry · 30 seconds</p>
            <h2 id="enquiry-title">{model ? `Get the price for ${model}` : machine ? `Get the price for ${machine}` : "Tell us what you need."}</h2>
            <p className="enquiry-sub">No long forms. We'll reply on WhatsApp with price, specs and delivery time.</p>

            <fieldset className="enquiry-needs">
              <legend>I'm looking for</legend>
              {needs.map((n) => (
                <label key={n} className={need === n ? "on" : ""}>
                  <input type="radio" name="need" value={n} checked={need === n} onChange={() => setNeed(n)} />{n}
                </label>
              ))}
            </fieldset>

            <div className="enquiry-grid">
              <label className="enquiry-field enquiry-wide">
                <span>Machine</span>
                <select value={machine} onChange={(e) => { setMachine(e.target.value); setModel(""); }}>
                  <option value="">Select a machine</option>
                  {machineOptions.map((m) => <option key={m}>{m}</option>)}
                </select>
              </label>
              <label className="enquiry-field">
                <span>Your name</span>
                <input value={name} onChange={(e) => { setName(e.target.value); setError(""); }} autoComplete="name" placeholder="Full name" />
              </label>
              <label className="enquiry-field">
                <span>Mobile number</span>
                <div className="enquiry-phone"><b>+91</b><input value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} /></div>
              </label>
              <label className="enquiry-field enquiry-wide">
                <span>City <i>(optional, helps us plan delivery)</i></span>
                <input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" placeholder="e.g. Ludhiana" />
              </label>
            </div>

            {error && <p className="enquiry-error" role="alert">{error}</p>}
            <button type="submit" className="button button-accent enquiry-submit">Send on WhatsApp <MessageCircle size={18} /></button>
            <p className="enquiry-foot">Your number is only used to reply to this enquiry. Or call <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.</p>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default QuickEnquiry;
