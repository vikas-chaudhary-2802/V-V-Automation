import { contact, products } from "@/data/catalog";

export type EnquiryNeed = "Price quote" | "Live demo" | "Trial cut on my part" | "Spare part" | "Service / retrofit";

export interface EnquiryRequest {
  machine?: string;
  model?: string;
  need?: EnquiryNeed;
}

/** Open the quick-enquiry dialog from anywhere on the site. */
export const openEnquiry = (detail: EnquiryRequest = {}) => {
  window.dispatchEvent(new CustomEvent<EnquiryRequest>("vv:enquire", { detail }));
};

export const waLink = (text: string) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

/** A WhatsApp opener that matches the page the visitor is reading. */
export const pageWhatsAppMessage = (pathname: string) => {
  const machine = products.find((p) => pathname === `/machines/${p.id}`);
  if (machine) return `Hello V&V Automation, I am interested in your ${machine.name} (${machine.models.join(" / ")}). Please share the price and spec sheet.`;
  if (pathname.startsWith("/parts")) return "Hello V&V Automation, I need a CNC spare part. I can share a photo / model number.";
  if (pathname.startsWith("/products")) return "Hello V&V Automation, I am looking for a CNC / VMC machine. Can you help me choose the right one?";
  return "Hello V&V Automation, I would like to discuss a machine requirement.";
};
