import { Link } from "react-router-dom";
import { ArrowRight, Check, MoveRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import QuoteBand from "@/components/QuoteBand";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/data/catalog";
import heroImage from "@/assets/vmc-machine.jpg";

const ProductsPage = () => (
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
                  <h3>Available models</h3>
                  <div className="model-list">{product.models.map((model) => <span key={model}>{model}</span>)}</div>
                </div>
              </div>
              <Link to={`/quote?machine=${encodeURIComponent(product.name)}`} className="button button-dark">Discuss this machine <MoveRight size={18} /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>

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

export default ProductsPage;
