import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { contact } from "@/data/catalog";

interface QuoteBandProps {
  title?: string;
  copy?: string;
}

const QuoteBand = ({
  title = "Ready to discuss your next manufacturing challenge?",
  copy = "Share your requirement. Our team will recommend the right machine, configuration and next steps.",
}: QuoteBandProps) => (
  <section className="quote-band">
    <div className="container-section quote-band-inner">
      <div data-reveal="up">
        <p className="eyebrow eyebrow-light"><span />START A CONVERSATION</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="quote-actions" data-reveal="up">
        <Link to="/quote" className="button button-accent">Request a quote <ArrowUpRight size={18} /></Link>
        <a href={contact.phoneHref} className="quote-phone"><Phone size={18} /> {contact.phoneDisplay}</a>
      </div>
    </div>
  </section>
);

export default QuoteBand;
