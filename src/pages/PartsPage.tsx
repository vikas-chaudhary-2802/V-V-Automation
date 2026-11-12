import { Link } from "react-router-dom";
import { ArrowRight, Check, PackageCheck, PhoneCall, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import QuoteBand from "@/components/QuoteBand";
import SectionHeading from "@/components/SectionHeading";
import { contact, parts } from "@/data/catalog";
import heroImage from "@/assets/control-panel.webp";

const PartsPage = () => (
  <Layout>
    <PageHero
      eyebrow="PARTS / COMPONENTS"
      title={<>The right component.<br /><em>Less time standing still.</em></>}
      copy="Servo systems, controllers, drives and essential CNC components—selected for fit, reliability and machine performance."
      index="03"
      image={heroImage}
    />

    <section className="parts-catalog section-space">
      <div className="container-section">
        <div className="section-topline">
          <SectionHeading
            eyebrow="WHAT WE SUPPLY"
            title="Critical parts. Clear technical guidance."
            copy="Tell us your machine, existing component details and symptom. We will help narrow the right replacement."
          />
          <a className="text-link" href={contact.phoneHref}>Talk to parts support <PhoneCall size={18} /></a>
        </div>

        <div className="parts-grid">
          {parts.map((part, index) => (
            <article className="part-card" id={part.id} key={part.id} data-reveal="up">
              <div className="part-card-image">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <img src={part.image} alt={part.name} loading="lazy" decoding="async" />
              </div>
              <div className="part-card-body">
                <p>Industrial component</p>
                <h2>{part.name}</h2>
                <p>{part.description}</p>
                <ul>{part.applications.map((item) => <li key={item}><Check />{item}</li>)}</ul>
                <Link to="/quote?machine=CNC%20Parts%20%26%20Components" className="part-card-link">Enquire about this part <ArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="parts-help section-space-sm">
        <div className="container-section parts-help-grid">
          <div data-reveal="up"><Search /><h3>Identify the part</h3><p>Share a clear photo, nameplate, model number and your machine details.</p></div>
          <div data-reveal="up"><PackageCheck /><h3>Confirm compatibility</h3><p>Our team checks the available details before recommending the next step.</p></div>
          <div data-reveal="up"><PhoneCall /><h3>Get direct assistance</h3><p>Speak with someone who understands CNC assemblies and service requirements.</p></div>
      </div>
    </section>

    <QuoteBand title="Looking for a specific CNC component?" copy="Send the component photo or model details and our team will help you identify the right next step." />
  </Layout>
);

export default PartsPage;
