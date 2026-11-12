interface MarqueeProps {
  items: string[];
  reverse?: boolean;
}

/** Infinite, CSS-only ticker. Content is duplicated for a seamless loop. */
const Marquee = ({ items, reverse = false }: MarqueeProps) => (
  <div className={`marquee${reverse ? " marquee-reverse" : ""}`} aria-hidden="true">
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <ul key={copy}>
          {items.map((item) => (
            <li key={`${copy}-${item}`}><i />{item}</li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default Marquee;
