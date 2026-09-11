import { type FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contact, products } from "@/data/catalog";
import heroImage from "@/assets/cnc-shop.jpg";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

const initialForm: FormState = { name: "", company: "", phone: "", email: "", interest: "", message: "" };

const ContactPage = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Hello V&V Automation, I would like to discuss a requirement.",
      `Name: ${form.name}`,
      `Company: ${form.company || "Not provided"}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Interested in: ${form.interest || "General enquiry"}`,
      `Requirement: ${form.message}`,
    ].join("\n");

    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <Layout>
      <PageHero
        eyebrow="CONTACT / START A CONVERSATION"
        title={<>Tell us what you<br /><em>need to make.</em></>}
        copy="A machine quote, a technical question, a replacement component or a facility visit—start here and speak directly with our team."
        index="05"
        image={heroImage}
      />

      <section className="contact-section section-space">
        <div className="container-section contact-layout">
          <aside className="contact-aside">
            <p className="eyebrow"><span />DIRECT CONTACT</p>
            <h2>Real answers from a technical team.</h2>
            <p>We work with manufacturers across India. Share the application, material, expected output and any technical constraints you already know.</p>
            <div className="contact-methods">
              <a href={contact.phoneHref}><Phone /><span><small>Call us</small><strong>{contact.phoneDisplay}</strong></span></a>
              <a href={`mailto:${contact.email}`}><Mail /><span><small>Email</small><strong>{contact.email}</strong></span></a>
              <div><Clock3 /><span><small>Working hours</small><strong>{contact.hours}</strong></span></div>
              <div><MapPin /><span><small>Manufacturing facility</small>{contact.addressLines.map((line) => <strong key={line}>{line}</strong>)}</span></div>
            </div>
            <div className="india-note"><span>IND</span><p><strong>Pan-India delivery</strong>Installation and technical support available across India.</p></div>
          </aside>

          <div className="enquiry-panel">
            {sent ? (
              <div className="form-success">
                <CheckCircle2 />
                <p className="eyebrow"><span />MESSAGE PREPARED</p>
                <h2>Continue in WhatsApp.</h2>
                <p>Your enquiry has been prepared in a new WhatsApp window. Send it there to start the conversation with our team.</p>
                <Button className="button button-dark" onClick={() => { setForm(initialForm); setSent(false); }}>Create another enquiry</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-heading"><span>Enquiry form</span><h2>Share your requirement</h2><p>Required fields are marked with an asterisk.</p></div>
                <div className="form-grid">
                  <label><span>Name *</span><Input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" /></label>
                  <label><span>Company</span><Input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company or workshop" /></label>
                  <label><span>Phone *</span><Input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 00000 00000" /></label>
                  <label><span>Email *</span><Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@company.com" /></label>
                  <label className="form-full"><span>What are you interested in?</span>
                    <Select value={form.interest} onValueChange={(value) => update("interest", value)}>
                      <SelectTrigger><SelectValue placeholder="Select a machine or service" /></SelectTrigger>
                      <SelectContent>
                        {products.map((product) => <SelectItem key={product.id} value={product.name}>{product.name}</SelectItem>)}
                        <SelectItem value="CNC parts">CNC parts &amp; components</SelectItem>
                        <SelectItem value="Service support">Service support</SelectItem>
                        <SelectItem value="Facility visit">Facility visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                  <label className="form-full"><span>Requirement *</span><Textarea required rows={6} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about the material, job size, production volume, tolerance or part you need..." /></label>
                </div>
                <Button type="submit" className="button button-accent submit-button">Prepare WhatsApp enquiry <MessageCircle /></Button>
                <p className="form-note">Submitting opens WhatsApp with your details prepared. Nothing is stored on this website.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="container-section location-grid">
          <div><p className="eyebrow eyebrow-light"><span />VISIT V&V AUTOMATION</p><h2>See where the machines come together.</h2></div>
          <div><MapPin />{contact.addressLines.map((line) => <p key={line}>{line}</p>)}</div>
          <a href="https://maps.google.com/?q=Plot+331+Puth+Khurd+Industrial+Area+Delhi+110039" target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight /></a>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
