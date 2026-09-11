interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}

const SectionHeading = ({ eyebrow, title, copy, light = false }: SectionHeadingProps) => (
  <div className={`section-heading${light ? " section-heading-light" : ""}`}>
    <p className="eyebrow"><span />{eyebrow}</p>
    <h2>{title}</h2>
    {copy && <p className="section-copy">{copy}</p>}
  </div>
);

export default SectionHeading;
