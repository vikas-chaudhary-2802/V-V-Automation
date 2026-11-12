import { type FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Factory,
  FileText,
  LockKeyhole,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contact, parts, products } from "@/data/catalog";
import partsImage from "@/assets/control-panel.webp";
import supportImage from "@/assets/cnc-shop.webp";
import quotationMachine from "@/assets/cnc-hero-branded-v3.webp";

type QuoteStep = 1 | 2 | 3;

interface QuoteFormState {
  solution: string;
  model: string;
  material: string;
  application: string;
  dimensions: string;
  volume: string;
  tolerance: string;
  city: string;
  timeline: string;
  budget: string;
  services: string[];
  name: string;
  company: string;
  phone: string;
  email: string;
  contactPreference: string;
  notes: string;
}

const baseForm: QuoteFormState = {
  solution: "",
  model: "",
  material: "",
  application: "",
  dimensions: "",
  volume: "",
  tolerance: "",
  city: "",
  timeline: "",
  budget: "",
  services: [],
  name: "",
  company: "",
  phone: "",
  email: "",
  contactPreference: "WhatsApp",
  notes: "",
};

const solutionOptions = [
  ...products.map((product) => ({
    name: product.name,
    description: product.englishName,
    image: product.image,
  })),
  {
    name: "CNC Parts & Components",
    description: `${parts.length} critical component categories`,
    image: partsImage,
  },
  {
    name: "Retrofit & Technical Support",
    description: "Upgrade, installation and service support",
    image: supportImage,
  },
];

const stepLabels = [
  { number: "01", title: "Select a solution", copy: "Choose the machine or support you need." },
  { number: "02", title: "Define the work", copy: "Tell us what the solution must deliver." },
  { number: "03", title: "Review & connect", copy: "Confirm your details and send the brief." },
];

const serviceOptions = ["Installation", "Operator training", "Application setup", "After-sales plan"];
const quotationPdf = "/VV-Automation-Standard-Quotation.pdf";

const QuotePage = () => {
  const [searchParams] = useSearchParams();
  const requestedSolution = searchParams.get("machine") || "";
  const matchedSolution = solutionOptions.find((option) => option.name.toLowerCase() === requestedSolution.toLowerCase());
  const [form, setForm] = useState<QuoteFormState>(() => ({ ...baseForm, solution: matchedSolution?.name || "" }));
  const [step, setStep] = useState<QuoteStep>(1);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [reference] = useState(() => `VV-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`);

  const selectedProduct = useMemo(
    () => products.find((product) => product.name === form.solution),
    [form.solution],
  );

  const update = <K extends keyof QuoteFormState>(field: K, value: QuoteFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const selectSolution = (solution: string) => {
    setForm((current) => ({ ...current, solution, model: "" }));
    setError("");
  };

  const toggleService = (service: string) => {
    update(
      "services",
      form.services.includes(service)
        ? form.services.filter((item) => item !== service)
        : [...form.services, service],
    );
  };

  const canContinue = () => {
    if (step === 1) return Boolean(form.solution);
    if (step === 2) return Boolean(form.material && form.application.trim() && form.city.trim() && form.timeline);
    return Boolean(form.name.trim() && form.phone.trim() && form.email.trim());
  };

  const nextStep = () => {
    if (!canContinue()) {
      setError(step === 1 ? "Please select a solution to continue." : "Please complete the required fields before continuing.");
      return;
    }
    setStep((current) => Math.min(3, current + 1) as QuoteStep);
    setError("");
  };

  const previousStep = () => {
    setStep((current) => Math.max(1, current - 1) as QuoteStep);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canContinue()) {
      setError("Please complete your name, phone number and email address.");
      return;
    }

    const message = [
      "Hello V&V Automation, I would like a quotation.",
      `Request reference: ${reference}`,
      "",
      `Solution: ${form.solution}`,
      `Preferred model: ${form.model || "Please recommend"}`,
      `Material: ${form.material}`,
      `Application / component: ${form.application}`,
      `Maximum job size: ${form.dimensions || "To be discussed"}`,
      `Expected volume: ${form.volume || "To be discussed"}`,
      `Tolerance / finish: ${form.tolerance || "To be discussed"}`,
      `Installation city: ${form.city}`,
      `Purchase timeline: ${form.timeline}`,
      `Budget range: ${form.budget || "Not specified"}`,
      `Additional support: ${form.services.length ? form.services.join(", ") : "Not specified"}`,
      "",
      `Name: ${form.name}`,
      `Company: ${form.company || "Not provided"}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Preferred contact: ${form.contactPreference}`,
      `Notes: ${form.notes || "None"}`,
    ].join("\n");

    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const resetQuote = () => {
    setForm(baseForm);
    setStep(1);
    setError("");
    setSubmitted(false);
    setShowForm(true);
    setWhatsappUrl("");
  };

  return (
    <Layout>
      <section className="quote-page">
        <div className="quote-page-grid" aria-hidden="true" />
        <div className="container-section quote-shell">
          <aside className="quote-intro">
            {!showForm && !submitted ? (
              <>
                <p className="eyebrow eyebrow-light"><span />STANDARD QUOTATION</p>
                <h1>Ready before<br /><em>the form.</em></h1>
                <p className="quote-intro-copy">
                  Your no-price technical and commercial proposal is available immediately. Download it first, then share details only if you want a tailored recommendation.
                </p>
                <div className="quote-pdf-trust">
                  <div><FileText /><span><strong>3-page proposal</strong>Portfolio, scope and commercial framework</span></div>
                  <div><LockKeyhole /><span><strong>No details required</strong>Download without submitting personal information</span></div>
                </div>
              </>
            ) : (
              <>
                <p className="eyebrow eyebrow-light"><span />REQUEST A QUOTATION</p>
                <h1>Built around<br /><em>your production.</em></h1>
                <p className="quote-intro-copy">
                  Give our engineering team the right starting information. We will use it to recommend a practical machine, configuration and next step.
                </p>

                <ol className="quote-step-list" aria-label="Quotation request progress">
                  {stepLabels.map((item, index) => {
                    const itemStep = (index + 1) as QuoteStep;
                    const complete = step > itemStep || submitted;
                    return (
                      <li key={item.number} className={step === itemStep && !submitted ? "active" : complete ? "complete" : ""}>
                        <span>{complete ? <Check /> : item.number}</span>
                        <div><strong>{item.title}</strong><small>{item.copy}</small></div>
                      </li>
                    );
                  })}
                </ol>

                <div className="quote-trust">
                  <div><Clock3 /><span><strong>Quick review</strong>Technical response during working hours</span></div>
                  <div><LockKeyhole /><span><strong>Private by design</strong>Your details are not stored on this website</span></div>
                </div>
              </>
            )}
          </aside>

          <div className="quote-workspace">
            {submitted ? (
              <div className="quote-success" aria-live="polite">
                <span className="quote-success-icon"><CheckCircle2 /></span>
                <p className="eyebrow"><span />REQUEST {reference}</p>
                <h2>Your requirement is ready.</h2>
                <p>Your complete quotation brief has opened in WhatsApp. Send the prepared message there and our technical team can continue the conversation with the right context.</p>
                <div className="quote-success-actions">
                  <a className="button button-accent" href={whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp again <MessageCircle /></a>
                  <button type="button" onClick={resetQuote}>Create another request <ArrowRight /></button>
                </div>
                <div className="quote-success-contact"><Phone /><span>Prefer to speak now?<a href={contact.phoneHref}>{contact.phoneDisplay}</a></span></div>
              </div>
            ) : !showForm ? (
              <div className="quote-pdf-gateway">
                <header className="quote-pdf-gateway-header">
                  <div><span>INSTANT ACCESS</span><strong>Standard quotation PDF</strong></div>
                  <p><FileText />Ready to download</p>
                </header>
                <div className="quote-pdf-gateway-body">
                  <article className="quote-pdf-preview" aria-label="Preview of the V&V Automation standard quotation">
                    <img src={quotationMachine} alt="Branded V&V Automation CNC machining centre" />
                    <span className="quote-pdf-preview-shade" />
                    <div className="quote-pdf-preview-brand">V&V <b>AUTOMATION</b></div>
                    <div className="quote-pdf-preview-copy">
                      <small>STANDARD TECHNICAL &amp;<br />COMMERCIAL PROPOSAL</small>
                      <strong>Built for the job.<br /><em>Specified around you.</em></strong>
                      <span>NO-PRICE / CONFIGURATION-LED</span>
                    </div>
                    <footer>VVA-STD-2026-01 <b>01 / 03</b></footer>
                  </article>

                  <div className="quote-pdf-gateway-copy">
                    <p className="eyebrow"><span />NO PRICE. NO FORM REQUIRED.</p>
                    <h2>Your standard quotation is ready.</h2>
                    <p>Get the company overview, machine portfolio, standard engineering scope and commercial framework in one polished document. No contact details are needed.</p>
                    <div className="quote-pdf-highlights">
                      <span><FileText /><strong>3 A4 pages</strong>Complete, print-ready proposal</span>
                      <span><Sparkles /><strong>Premium format</strong>Easy to review and share</span>
                    </div>
                    <div className="quote-pdf-actions">
                      <a className="button button-accent" href={quotationPdf} download="VV-Automation-Standard-Quotation.pdf">Download PDF <Download /></a>
                      <a href={quotationPdf} target="_blank" rel="noreferrer">Open in browser <ArrowRight /></a>
                    </div>
                    <button className="quote-pdf-continue" type="button" onClick={() => setShowForm(true)}>
                      <span><strong>Need a tailored recommendation?</strong>Continue with optional production details</span><ArrowRight />
                    </button>
                    <small className="quote-pdf-note"><LockKeyhole />The PDF downloads only when you select Download PDF. The detailed request remains entirely optional.</small>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <header className="quote-workspace-header">
                  <div><span>STEP {String(step).padStart(2, "0")} / 03</span><strong>{stepLabels[step - 1].title}</strong></div>
                  <div className="quote-progress" aria-hidden="true"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
                </header>

                {step === 1 && (
                  <div className="quote-stage">
                    <div className="quote-stage-heading"><h2>What can we help you build?</h2><p>Select the closest starting point. Our team can refine the exact configuration with you.</p></div>
                    <div className="quote-solution-grid">
                      {solutionOptions.map((option, index) => (
                        <button
                          type="button"
                          key={option.name}
                          className={form.solution === option.name ? "selected" : ""}
                          onClick={() => selectSolution(option.name)}
                          aria-pressed={form.solution === option.name}
                        >
                          <span className="quote-solution-image"><img src={option.image} alt="" /><i>{String(index + 1).padStart(2, "0")}</i></span>
                          <span className="quote-solution-copy"><strong>{option.name}</strong><small>{option.description}</small></span>
                          <span className="quote-choice-check"><Check /></span>
                        </button>
                      ))}
                    </div>
                    {selectedProduct && (
                      <label className="quote-model-select"><span>Preferred model <small>Optional</small></span>
                        <Select value={form.model} onValueChange={(value) => update("model", value)}>
                          <SelectTrigger><SelectValue placeholder="Let V&V recommend the model" /></SelectTrigger>
                          <SelectContent>{selectedProduct.models.map((model) => <SelectItem key={model} value={model}>{model}</SelectItem>)}</SelectContent>
                        </Select>
                      </label>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="quote-stage">
                    <div className="quote-stage-heading"><h2>Define the production need.</h2><p>Approximate information is absolutely fine. It gives our engineers a more useful first picture.</p></div>
                    <div className="quote-form-grid">
                      <label><span>Primary material *</span>
                        <Select value={form.material} onValueChange={(value) => update("material", value)}>
                          <SelectTrigger><SelectValue placeholder="Select material" /></SelectTrigger>
                          <SelectContent>
                            {["Aluminium", "Mild steel", "Stainless steel", "Brass / copper", "Plastic / composite", "Wood / non-metal", "Multiple / other"].map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </label>
                      <label><span>Installation city *</span><Input value={form.city} onChange={(event) => update("city", event.target.value)} placeholder="City, State" /></label>
                      <label className="quote-form-full"><span>Application or component *</span><Input value={form.application} onChange={(event) => update("application", event.target.value)} placeholder="Example: aluminium moulds, auto components, nameplates..." /></label>
                      <label><span>Maximum job size</span><Input value={form.dimensions} onChange={(event) => update("dimensions", event.target.value)} placeholder="L × W × H in mm" /></label>
                      <label><span>Expected production volume</span><Input value={form.volume} onChange={(event) => update("volume", event.target.value)} placeholder="Parts per day or month" /></label>
                      <label><span>Tolerance or finish</span><Input value={form.tolerance} onChange={(event) => update("tolerance", event.target.value)} placeholder="Example: ±0.02 mm" /></label>
                      <label><span>Purchase timeline *</span>
                        <Select value={form.timeline} onValueChange={(value) => update("timeline", value)}>
                          <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                          <SelectContent>{["Immediately", "Within 1–3 months", "Within 3–6 months", "Planning for later"].map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent>
                        </Select>
                      </label>
                      <label className="quote-form-full"><span>Indicative budget</span>
                        <Select value={form.budget} onValueChange={(value) => update("budget", value)}>
                          <SelectTrigger><SelectValue placeholder="Optional — select a working range" /></SelectTrigger>
                          <SelectContent>{["Under ₹10 lakh", "₹10–25 lakh", "₹25–50 lakh", "Above ₹50 lakh", "Need guidance"].map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent>
                        </Select>
                      </label>
                    </div>
                    <fieldset className="quote-services"><legend>Support to include <small>Optional</small></legend><div>{serviceOptions.map((service) => <button type="button" key={service} className={form.services.includes(service) ? "selected" : ""} onClick={() => toggleService(service)} aria-pressed={form.services.includes(service)}><Check />{service}</button>)}</div></fieldset>
                  </div>
                )}

                {step === 3 && (
                  <div className="quote-stage">
                    <div className="quote-stage-heading"><h2>Where should we reach you?</h2><p>Review the requirement summary, then prepare a complete WhatsApp message for our team.</p></div>
                    <div className="quote-contact-grid">
                      <div className="quote-form-grid">
                        <label><span>Your name *</span><Input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Full name" /></label>
                        <label><span>Company</span><Input value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company or workshop" /></label>
                        <label><span>Phone *</span><Input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91 00000 00000" /></label>
                        <label><span>Email *</span><Input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="name@company.com" /></label>
                        <label className="quote-form-full"><span>Preferred contact</span>
                          <Select value={form.contactPreference} onValueChange={(value) => update("contactPreference", value)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{["WhatsApp", "Phone call", "Email"].map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent>
                          </Select>
                        </label>
                        <label className="quote-form-full"><span>Anything else we should know?</span><Textarea rows={4} value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Tooling, existing setup, special constraints or questions..." /></label>
                      </div>
                      <aside className="quote-review">
                        <p>Requirement summary</p>
                        <dl>
                          <div><dt>Solution</dt><dd>{form.solution}</dd></div>
                          <div><dt>Material</dt><dd>{form.material}</dd></div>
                          <div><dt>Application</dt><dd>{form.application}</dd></div>
                          <div><dt>Location</dt><dd>{form.city}</dd></div>
                          <div><dt>Timeline</dt><dd>{form.timeline}</dd></div>
                        </dl>
                        <button type="button" onClick={() => setStep(2)}>Edit requirement</button>
                      </aside>
                    </div>
                  </div>
                )}

                <footer className="quote-form-footer">
                  <div className="quote-form-error" aria-live="polite">{error}</div>
                  <div>
                    {step > 1 && <Button type="button" variant="ghost" className="quote-back" onClick={previousStep}><ArrowLeft />Back</Button>}
                    {step < 3 ? (
                      <Button type="button" className="button button-accent quote-primary" onClick={nextStep}>Continue<ArrowRight /></Button>
                    ) : (
                      <Button type="submit" className="button button-accent quote-primary">Prepare quote request<MessageCircle /></Button>
                    )}
                  </div>
                  <p><LockKeyhole />Nothing is stored on this website. Your request is prepared for WhatsApp.</p>
                </footer>
              </form>
            )}
          </div>
        </div>

        <div className="container-section quote-page-foot">
          <span><Factory />In-house engineering</span><span><BadgeCheck />Tested before dispatch</span><Link to="/contact">Have a general question? Contact us <ArrowRight /></Link>
        </div>
      </section>
    </Layout>
  );
};

export default QuotePage;
