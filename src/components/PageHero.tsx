import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  index: string;
  image?: string;
}

const PageHero = ({ eyebrow, title, copy, index, image }: PageHeroProps) => (
  <section className="page-hero">
    {image && <img className="page-hero-image" src={image} alt="" aria-hidden="true" />}
    <div className="page-hero-overlay" />
    <div className="page-hero-lines" />
    <div className="container-section page-hero-inner">
      <div>
        <p className="eyebrow eyebrow-light"><span />{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-copy">{copy}</p>
      </div>
      <span className="page-number">{index}</span>
    </div>
  </section>
);

export default PageHero;
