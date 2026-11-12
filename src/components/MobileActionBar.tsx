import { useLocation } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { contact, products } from "@/data/catalog";
import { openEnquiry, pageWhatsAppMessage, waLink } from "@/lib/enquiry";

const MobileActionBar = () => {
  const { pathname } = useLocation();
  const machine = products.find((p) => pathname === `/machines/${p.id}`);
  return (
    <aside className="mobile-action-bar" aria-label="Quick contact options">
      <a href={contact.phoneHref}><Phone /><span>Call</span></a>
      <a href={waLink(pageWhatsAppMessage(pathname))} target="_blank" rel="noreferrer"><MessageCircle /><span>WhatsApp</span></a>
      <a href="#enquire" onClick={(e) => { e.preventDefault(); openEnquiry({ machine: machine?.name }); }}>{machine ? "Get price" : "Get a quick price"}</a>
    </aside>
  );
};

export default MobileActionBar;
