import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { contact, products } from "@/data/catalog";

const Footer = () => (
  <footer className="site-footer">
    <div className="container-section">
      <div className="footer-lead">
        <div>
          <p className="eyebrow eyebrow-light"><span />BUILT IN INDIA. BUILT TO PERFORM.</p>
          <h2>Precision, from the first drawing to the first cut.</h2>
        </div>
        <Link to="/contact" className="footer-circle" aria-label="Request a quote"><ArrowUpRight /></Link>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand"><span className="brand-mark"><img src={logo} alt="" /></span><span className="brand-copy"><strong>V&amp;V Automation</strong><small>Precision in motion</small></span></Link>
          <p>Indian CNC machine manufacturing, critical components and direct technical support.</p>
        </div>
        <div><h3>Navigate</h3><Link to="/">Home</Link><Link to="/products">Machines</Link><Link to="/parts">CNC Parts</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div>
        <div><h3>Machine range</h3>{products.map((product) => <Link key={product.id} to={`/products#${product.id}`}>{product.name}</Link>)}</div>
        <div className="footer-contact"><h3>Contact</h3><a href={contact.phoneHref}><Phone />{contact.phoneDisplay}</a><a href={`mailto:${contact.email}`}><Mail />{contact.email}</a><p><MapPin />{contact.addressLines.join(", ")}</p></div>
      </div>

      <div className="footer-bottom"><span>© {new Date().getFullYear()} V&amp;V Automation</span><span>Delhi · Made in India · Serving nationwide</span></div>
    </div>
  </footer>
);

export default Footer;
