import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronRight, Eye, FileText, Headphones, MessageCircle, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/SectionHeading";
import QuoteBand from "@/components/QuoteBand";
import { contact, decodeModel, products, serviceSteps, sizeLabel } from "@/data/catalog";
import SizeBuilder from "@/components/SizeBuilder";
import { openEnquiry, waLink } from "@/lib/enquiry";
import { usePageMeta } from "@/hooks/use-page-meta";

const profileLabels: [keyof (typeof products)[number]["profile"], string][] = [
  ["detail", "Fine detail & finish"],
  ["power", "Cutting power"],
  ["speed", "Speed"],
  ["volume", "Production volume"],
];

const included = [
  { icon: ShieldCheck, title: "Tested before dispatch", text: "Functional, motion and output checks at our Delhi facility." },
  { icon: Truck, title: "Delivered pan-India", text: "Packed and shipped to your shop floor anywhere in India." },
  { icon: Wrench, title: "Installation on site", text: "Our own team sets up, levels and commissions the machine." },
  { icon: BadgeCheck, title: "Operator training", text: "Hands-on guidance so your team is productive from day one." },
  { icon: Headphones, title: "Direct after-sales support", text: "Talk to the people who built your machine, not a call centre." },
];

const buyerFaqs = [
  { q: "What is the price?", a: "Price depends on the model, bed size, spindle and controller you choose. Send us your requirement on WhatsApp and we'll share a written quotation." },
  { q: "Can I see the machine running before I buy?", a: "Yes, ask us for a live demo at our Delhi facility or a video of the machine running. You can also send a drawing or sample for a trial cut." },
  { q: "How long does delivery take?", a: "It depends on the model and configuration. We confirm the delivery timeline in your quotation." },
  { q: "Do you provide spare parts and service later?", a: "Yes. We stock critical CNC components and support our machines directly." },
];

const MachinePage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [stuck, setStuck] = useState(false);

  usePageMeta(
    product ? `${product.name} | ${product.models.join(", ")} | V&V Automation` : "Machine not found | V&V Automation",
    product ? `${product.name} by V&V Automation: ${product.description} Models ${product.models.join(", ")}. Built in Delhi, installed pan-India.` : undefined,
  );

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) return <Navigate to="/products" replace />;
  const others = products.filter((p) => p.id !== product.id);
  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length];

  return (
    <Layout>
      <section className="mp-hero">
        <div className="container-section">
          <nav className="mp-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevronRight /><Link to="/products">Machines</Link><ChevronRight /><span aria-current="page">{product.name}</span>
          </nav>
          <div className="mp-hero-grid">
            <div className="mp-media" data-reveal="image">
              <span className="mp-tag">{product.tag}</span>
              <img src={product.image} alt={`${product.name}: V&V Automation ${product.models[0]}`} fetchPriority="high" />
            </div>
            <div className="mp-copy">
              <p className="eyebrow"><span />{product.englishName}</p>
              <h1>{product.name}</h1>
              <p className="mp-lead">{product.description}</p>
              <p className="mp-models-label">Popular sizes</p>
              <div className="mp-models" aria-label="Popular sizes">
                {product.models.map((m) => <span key={m}>{m}</span>)}
              </div>
              <div className="mp-cta">
                <button type="button" className="button button-accent" onClick={() => openEnquiry({ machine: product.name })}>Get price &amp; specs <ArrowRight size={18} /></button>
                <button type="button" className="button button-outline" onClick={() => openEnquiry({ machine: product.name, need: "Live demo" })}><Eye size={18} /> Book a live demo</button>
              </div>
              <a className="mp-call" href={contact.phoneHref}><Phone size={16} /> Or call the factory: <strong>{contact.phoneDisplay}</strong></a>
              <ul className="mp-assure">
                <li><Check />Built to your working size</li>
                <li><Check />Made in-house in Delhi</li>
                <li><Check />Installation &amp; training included</li>
                <li><Check />Pan-India delivery &amp; service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mp-section section-space-sm">
        <div className="container-section mp-split">
          <div data-reveal="up">
            <SectionHeading eyebrow="WHAT IT'S BUILT FOR" title="Jobs this machine pays for itself on." copy="Typical work our customers run on this platform. Doing something different? Send us the drawing." />
            <div className="mp-apps">
              {product.applications.map((a, i) => <div key={a}><span>{String(i + 1).padStart(2, "0")}</span>{a}</div>)}
            </div>
          </div>
          <div className="mp-profile" data-reveal="up" aria-label="Capability profile">
            <p className="mp-profile-title">Capability profile <small>relative to our range</small></p>
            {profileLabels.map(([key, label]) => (
              <div className="mp-bar" key={key}>
                <span>{label}</span>
                <i aria-hidden="true">{[1, 2, 3, 4, 5].map((n) => <b key={n} className={n <= product.profile[key] ? "on" : ""} />)}</i>
                <em>{product.profile[key]}/5</em>
              </div>
            ))}
            <Link to="/products#compare" className="text-link">Compare all machines <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="mp-models-section section-space-sm">
        <div className="container-section">
          <SectionHeading eyebrow="POPULAR SIZES" title="Start from a popular size, or build yours." copy="Every machine is built to order. The model number is the working size: the three digits are X, Y and Z travel in hundreds of millimetres." />
          <div className="mp-model-grid">
            {product.models.map((m, i) => (
              <article key={m} className="mp-model" data-reveal="up">
                <span className="mp-model-size">{i === 0 ? "Most requested" : "Popular size"}</span>
                <h3>{m}</h3>
                {decodeModel(m) && (
                  <dl className="mp-travel">
                    {(["x", "y", "z"] as const).map((a) => <div key={a}><dt>{a.toUpperCase()}</dt><dd>{decodeModel(m)![a]}<small>mm</small></dd></div>)}
                  </dl>
                )}
                <div className="mp-model-actions">
                  <button type="button" className="button button-dark" onClick={() => openEnquiry({ machine: product.name, model: decodeModel(m) ? `${m} (${sizeLabel(decodeModel(m)!)})` : m })}>Get price</button>
                  <a href={waLink(`Hello V&V Automation, please share the spec sheet for ${m} (${product.name}).`)} target="_blank" rel="noreferrer"><FileText size={16} /> Spec sheet</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section section-space-sm" id="build-your-size">
        <div className="container-section mp-split mp-sb-split">
          <SectionHeading eyebrow="BUILT TO YOUR SIZE" title="Need a different size? Build it here." copy="Set the travel you need on each axis. We'll build that exact working area, so you don't pay for a bigger machine than your parts need." />
          <SizeBuilder machine={product.name} start={product.models[0]} />
        </div>
      </section>

      <section className="mp-demo">
        <div className="container-section mp-demo-inner" data-reveal="up">
          <div>
            <p className="eyebrow eyebrow-light"><span />SEE BEFORE YOU BUY</p>
            <h2>Watch it cut your part before you pay.</h2>
            <p>Visit our Delhi facility for a live demo, or send your drawing or sample and ask for a trial cut on the {product.name} platform before you decide.</p>
          </div>
          <div className="mp-demo-actions">
            <button type="button" className="button button-accent" onClick={() => openEnquiry({ machine: product.name, need: "Live demo" })}>Book a live demo <ArrowRight size={18} /></button>
            <button type="button" className="button button-light" onClick={() => openEnquiry({ machine: product.name, need: "Trial cut on my part" })}>Request a trial cut</button>
          </div>
        </div>
      </section>

      <section className="mp-section section-space-sm">
        <div className="container-section">
          <SectionHeading eyebrow="INCLUDED WITH EVERY MACHINE" title="You buy a working machine, not a crate." />
          <div className="mp-included">
            {included.map(({ icon: Icon, title, text }) => (
              <div key={title} data-reveal="up"><Icon /><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section mp-process section-space-sm">
        <div className="container-section mp-split">
          <SectionHeading eyebrow="HOW BUYING WORKS" title="From enquiry to first part." copy="One team from the first call to commissioning, with no dealer in between." />
          <ol className="mp-steps">
            {serviceSteps.map((s) => <li key={s.number}><span>{s.number}</span><div><strong>{s.title}</strong><p>{s.text}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="mp-section section-space-sm">
        <div className="container-section mp-split">
          <SectionHeading eyebrow="BUYER QUESTIONS" title="Before you place the order." />
          <div className="faq-list">
            {buyerFaqs.map((f, i) => (
              <details key={f.q} name="mp-faq">
                <summary><span>{String(i + 1).padStart(2, "0")}</span>{f.q}<i aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-related section-space-sm">
        <div className="container-section">
          <div className="section-topline">
            <SectionHeading eyebrow="ALSO IN THE RANGE" title="Other machine families." />
            <Link className="text-link" to={`/machines/${next.id}`}>Next: {next.name} <ArrowRight size={18} /></Link>
          </div>
          <div className="mp-related-grid">
            {others.map((p) => (
              <Link key={p.id} to={`/machines/${p.id}`} className="mp-related-card">
                <img src={p.image} alt="" loading="lazy" decoding="async" />
                <div><span>{p.tag}</span><h3>{p.name}</h3><p>{p.models.join(" · ")}</p></div>
                <ArrowRight />
              </Link>
            ))}
          </div>
          <Link to="/products" className="mp-back"><ArrowLeft size={16} /> Back to all machines</Link>
        </div>
      </section>

      <QuoteBand title="Ready for a written quotation?" copy={`Send your job details for ${product.name} and get a quotation with configuration, delivery time and installation.`} />

      <div className={`mp-sticky${stuck ? " show" : ""}`} aria-hidden={!stuck}>
        <div className="container-section mp-sticky-inner">
          <img src={product.image} alt="" />
          <div><strong>{product.name}</strong><span>{product.models.join(" · ")}</span></div>
          <a href={waLink(`Hello V&V Automation, I am interested in your ${product.name}. Please share the price.`)} target="_blank" rel="noreferrer" className="mp-sticky-wa" tabIndex={stuck ? 0 : -1}><MessageCircle size={18} /> WhatsApp</a>
          <button type="button" className="button button-accent" onClick={() => openEnquiry({ machine: product.name })} tabIndex={stuck ? 0 : -1}>Get price</button>
        </div>
      </div>
    </Layout>
  );
};

export default MachinePage;
