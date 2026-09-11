import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import QuoteBand from "@/components/QuoteBand";
import SectionHeading from "@/components/SectionHeading";
import { advantages, milestones, stats } from "@/data/catalog";
import cncShop from "@/assets/cnc-shop.jpg";
import machineImage from "@/assets/vv-vmc-machine-optimized.jpg";

const AboutPage = () => (
  <Layout>
    <PageHero
      eyebrow="ABOUT / V&V AUTOMATION"
      title={<>Built by engineers.<br /><em>Backed by people.</em></>}
      copy="An Indian CNC machine manufacturer focused on practical engineering, accountable support and machines that earn their place on the shop floor."
      index="04"
      image={cncShop}
    />

    <section className="story-section section-space">
      <div className="container-section story-grid" data-reveal="up">
        <div className="story-title">
          <p className="eyebrow"><span />OUR STORY</p>
          <h2>Machines made for the realities of Indian manufacturing.</h2>
        </div>
        <div className="story-copy">
          <p className="story-lead">V&amp;V Automation began with a clear belief: manufacturers should not have to choose between precision, serviceability and local support.</p>
          <p>We started with CNC engraving machines for growing workshops. As our customers' work evolved, so did the range—from compact platforms to milling systems and vertical machining centres.</p>
          <p>The operating idea remains the same. Understand the job. Engineer the right solution. Test it properly. Stand behind it after installation.</p>
        </div>
      </div>
    </section>

    <section className="about-image-break" data-reveal="image">
      <img src={cncShop} alt="Modern CNC manufacturing facility" loading="lazy" decoding="async" />
      <div className="about-image-note"><span>Delhi, India</span><strong>Engineering with ownership.</strong></div>
    </section>

    <section className="about-stats">
      <div className="container-section stats-grid" data-reveal="up">
        {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </div>
    </section>

    <section className="values-section section-space">
      <div className="container-section">
        <SectionHeading eyebrow="HOW WE WORK" title="Precision is a habit, not a headline." copy="Four principles guide the way we design, manufacture and support every system." />
        <div className="values-grid">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return <article key={item.title} data-reveal="up"><span>{String(index + 1).padStart(2, "0")}</span><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>;
          })}
        </div>
      </div>
    </section>

    <section className="timeline-section section-space">
      <div className="container-section timeline-layout">
        <div className="timeline-intro">
          <p className="eyebrow eyebrow-light"><span />A DECADE OF BUILDING</p>
          <h2>Progress measured in capability.</h2>
          <p>From engraving platforms to a broader CNC and VMC portfolio, each chapter has been driven by the work our customers needed to do next.</p>
        </div>
        <ol className="timeline-list" data-reveal="up">
          {milestones.map((milestone) => <li key={milestone.year}><strong>{milestone.year}</strong><p>{milestone.text}</p></li>)}
        </ol>
      </div>
    </section>

    <section className="manufacturer-section section-space">
      <div className="container-section manufacturer-grid" data-reveal="up">
        <div className="manufacturer-machine"><img src={machineImage} alt="V&V vertical machining centre" loading="lazy" decoding="async" /></div>
        <div>
          <p className="eyebrow"><span />THE V&V DIFFERENCE</p>
          <h2>Direct from the people who build it.</h2>
          <p>Fewer layers between your problem and the technical answer. That is the value of working with a manufacturer.</p>
          <ul>
            {["In-house design and manufacturing", "Direct factory support", "Spare parts across the product range", "Installation and operator guidance", "Pan-India service support"].map((item) => <li key={item}><CheckCircle2 />{item}</li>)}
          </ul>
          <Link to="/contact" className="button button-dark">Start a conversation <ArrowRight /></Link>
        </div>
      </div>
    </section>

    <QuoteBand title="Visit the facility. Meet the people behind the machines." />
  </Layout>
);

export default AboutPage;
