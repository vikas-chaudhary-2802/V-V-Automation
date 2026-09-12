import { Link } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { contact } from "@/data/catalog";

const MobileActionBar = () => (
  <aside className="mobile-action-bar" aria-label="Quick contact options">
    <a href={contact.phoneHref}><Phone /><span>Call</span></a>
    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle /><span>WhatsApp</span></a>
    <Link to="/quote">Request a quote</Link>
  </aside>
);

export default MobileActionBar;
