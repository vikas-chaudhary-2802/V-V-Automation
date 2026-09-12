import { Link } from "react-router-dom";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, Factory, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import QuoteBand from "@/components/QuoteBand";
import SectionHeading from "@/components/SectionHeading";
import { advantages, parts, products, serviceSteps, stats } from "@/data/catalog";
import heroMachine from "@/assets/cnc-hero-branded-v3.jpg";
import cncShop from "@/assets/cnc-shop.jpg";

const HomePage = () => (
  <Layout>
    <section className="home-hero">
      <div className="hero-image" aria-hidden="true"><img src={heroMachine} alt="" fetchPriority="high" /></div>
      <div className="hero-shade" />
      <div className="hero-grid" />
      <div className="hero-mobile-badge" aria-hidden="true">
        <span>VMC Series</span>
        <strong>Built in India</strong>
      </div>

      <div className="container-section hero-content">
        <div className="hero-kicker"><span /> CNC MACHINE MANUFACTURER · DELHI</div>
        <h1>CNC machines built around<em>your ambition.</em></h1>
        <p>
          From engineering to installation, V&amp;V Automation builds dependable CNC,
          engraving, milling and VMC solutions for ambitious Indian manufacturers.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="button button-accent">Explore our machines <ArrowRight size={18} /></Link>
          <Link to="/contact" className="button button-ghost">Share your requirement <ArrowDownRight size={18} /></Link>
        </div>
        <div className="hero-proof" aria-label="Core strengths">
          <div><Factory /><span><strong>In-house</strong>Design &amp; build</span></div>
          <div><BadgeCheck /><span><strong>Quality tested</strong>Before dispatch</span></div>
          <div><MapPin /><span><strong>Pan-India</strong>Supply &amp; support</span></div>
        </div>
        <div className="hero-scroll-cue" aria-hidden="true"><ArrowDown />Scroll to explore</div>
      </div>

      <div className="hero-machine-note" aria-label="Featured machine">
        <span>Featured platform</span>
        <strong>VMC Series</strong>
        <small><i /> Engineered &amp; built in India</small>
      </div>
      <div className="hero-index" aria-hidden="true"><span>V&amp;V / 01</span><span>ENGINEERED IN INDIA</span></div>
    </section>

    <section className="intro-strip">
      <div className="container-section intro-grid" data-reveal="up">
        <p>More than a machine.</p>
        <h2>A dependable manufacturing partner for your production line.</h2>
        <Link to="/about">Discover our approach <ArrowRight size={18} /></Link>
      </div>
    </section>

    <section className="machines-section section-space">
      <div className="container-section">
        <div className="section-topline">
          <SectionHeading
            eyebrow="THE MACHINE RANGE"
            title="Built for real production floors."
            copy="A focused range of CNC systems—from detailed engraving to high-volume vertical machining."
          />
          <Link className="text-link" to="/products">View complete range <ArrowUpRight size={18} /></Link>
        </div>
        <div className="mobile-scroll-hint"><span>Swipe</span><i /><span>04 machines</span></div>

        <div className="machine-grid">
          {products.map((product) => (
            <Link to={`/products#${product.id}`} className="machine-card" key={product.id} data-reveal="up">
              <div className="machine-card-media">
                <span className="machine-card-index">{product.number}</span>
                <span className="machine-card-tag">{product.tag}</span>
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
              </div>
              <div className="machine-card-copy">
                <span>{product.englishName}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>View machine <ArrowRight size={17} /></strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="stats-band" aria-label="Company highlights">
      <div className="container-section stats-grid" data-reveal="up">
        {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </div>
    </section>

    <section className="factory-story">
      <div className="factory-image" data-reveal="image"><img src={cncShop} alt="CNC machines on a modern production floor" loading="lazy" decoding="async" /></div>
      <div className="factory-copy" data-reveal="up">
        <p className="eyebrow eyebrow-light"><span />WHY V&amp;V</p>
        <h2>We manufacture.<br />We do not just resell.</h2>
        <p>
          Every V&amp;V machine is engineered, assembled and tested with direct oversight.
          That means practical customization, faster technical answers and support from people
          who understand how your machine was built.
        </p>
        <div className="advantage-list">
          {advantages.map((item) => {
            const Icon = item.icon;
            return <div key={item.title}><Icon /><span><strong>{item.title}</strong>{item.text}</span></div>;
          })}
        </div>
        <Link to="/about" className="button button-light">Meet V&amp;V Automation <ArrowRight size={18} /></Link>
      </div>
    </section>

    <section className="process-section section-space">
      <div className="container-section">
        <SectionHeading
          eyebrow="FROM BRIEF TO PRODUCTION"
          title="A clearer way to build your machine."
          copy="One engineering-led process, with fewer handoffs and direct accountability at every stage."
        />
        <div className="process-grid">
          {serviceSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article className="process-card" key={step.number} data-reveal="up">
                <div><Icon /><span>{step.number}</span></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="parts-preview section-space">
      <div className="container-section">
        <div className="section-topline">
          <SectionHeading
            eyebrow="CNC PARTS & COMPONENTS"
            title="Keep every axis moving."
            copy="Critical components for maintenance, repair and reliable machine performance."
          />
          <Link className="text-link" to="/parts">Explore all parts <ArrowUpRight size={18} /></Link>
        </div>
        <div className="mobile-scroll-hint"><span>Swipe</span><i /><span>Featured components</span></div>
        <div className="parts-preview-grid">
          {parts.slice(0, 3).map((part) => (
            <Link to={`/parts#${part.id}`} className="part-preview-card" key={part.id} data-reveal="up">
              <img src={part.image} alt={part.name} loading="lazy" decoding="async" />
              <div><span>Component</span><h3>{part.name}</h3><ArrowUpRight /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <QuoteBand />
  </Layout>
);

export default HomePage;
