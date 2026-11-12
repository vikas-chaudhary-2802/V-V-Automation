import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { pageWhatsAppMessage, waLink } from "@/lib/enquiry";

/** Desktop WhatsApp shortcut; the opening message matches the page being read. */
const FloatingWhatsApp = () => {
  const { pathname } = useLocation();
  return (
    <a className="float-whatsapp" href={waLink(pageWhatsAppMessage(pathname))} target="_blank" rel="noreferrer" aria-label="Chat with V&V Automation on WhatsApp">
      <MessageCircle />
      <span>Chat on WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;
