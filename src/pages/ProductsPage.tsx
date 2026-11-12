import { Link } from "react-router-dom";
import { ArrowRight, Check, MoveRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import QuoteBand from "@/components/QuoteBand";
import SectionHeading from "@/components/SectionHeading";
import MachineNav from "@/components/effects/MachineNav";
import MachineCompare from "@/components/effects/MachineCompare";
import SizeBuilder from "@/components/SizeBuilder";
import { products } from "@/data/catalog";
import { openEnquiry } from "@/lib/enquiry";
import { usePageMeta } from "@/hooks/use-page-meta";
import heroImage from "@/assets/vmc-machine.webp";

const ProductsPage = () => {
  usePageMeta("CNC, Engraving, Milling & VMC Machines | V&V Automation", "Compare V&V Automation CNC, engraving, milling and VMC machines. Built in Delhi, installed and supported across India. Get a price on WhatsApp.");
  return (
  <Layout>
    <PageHero
      eyebrow="MACHINES / PRODUCT RANGE"
      title={<>Engineered to turn<br /><em>precision into output.</em></>}
      copy="Four focused machine families. One commitment to robust engineering, repeatable performance and direct factory support."
      index="02"
      image={heroImage}
    />

    <section className="catalog-intro section-space-sm">
      <div className="container-section catalog-intro-grid" data-reveal="up">
        <p className="eyebrow"><span />SELECT YOUR PLATFORM</p>
        <h2>Start with the work.<br />Then choose the machine.</h2>
        <p>Our team helps match your material, component size, finish, cycle time and production volume to the right platform.</p>
      </div>
    </section>

    <div className="product-zone">
    <MachineNav />

    <section className="product-list">
      <div className="container-section">
        {products.map((product) => (
          <article id={product.id} className="product-row" key={product.id} data-reveal="up">
            <div className="product-row-media">
              <span>{product.number}</span>
              <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
              <p>{product.tag}</p>
            </div>
            <div className="product-row-copy">
              <p className="eyebrow"><span />{product.englishName}</p>
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="product-detail-grid">
                <div>
                  <h3>Typical applications</h3>
                  <ul>{product.applications.map((item) => <li key={item}><Check />{item}</li>)}</ul>
                </div>
                <div>
                  <h3>Popular sizes <small>· or built to your size</small></h3>
                  <div className="model-list">{product.models.map((model) => <span key={model}>{model}</span>)}</div>
                </div>
              </div>
              <div className="product-row-actions">
                <Link to={`/machines/${product.id}`} className="button button-dark">View machine details <MoveRight size={18} /></Link>
                <button type="button" className="button button-outline" onClick={() => openEnquiry({ machine: product.name })}>Get price</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
    </div>

    <section id="build-your-size" className="sb-section section-space">
      <div className="container-section mp-split mp-sb-split">
        <SectionHeading eyebrow="BUILT TO YOUR SIZE" title="Our model number is your working size." copy="We don't sell fixed catalogue sizes. Every CNC, engraving, milling and VMC machine is built to the travel your parts need. VV M-542 means 500 × 400 × 200 mm. Build yours and get a price for that exact machine." />
        <SizeBuilder />
      </div>
    </section>

    <MachineCompare />

    <section className="selection-section section-space">
      <div className="container-section">
        <SectionHeading eyebrow="A BETTER STARTING POINT" title="Not sure which platform fits?" copy="Bring us these four inputs. We will help translate them into a practical machine configuration." />
        <div className="selection-grid">
          {[['01','Material','What you cut'],['02','Work envelope','Maximum job size'],['03','Accuracy','Tolerance & finish'],['04','Throughput','Volume & cycle time']].map(([number,title,copy]) => (
            <div key={number} data-reveal="up"><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
        <Link to="/quote" className="text-link">Share your application <ArrowRight size={18} /></Link>
      </div>
    </section>

    <QuoteBand title="Need a configuration built around your application?" />
  </Layout>
  );
};

export default ProductsPage;
