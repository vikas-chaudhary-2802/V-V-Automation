import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // User needs to replace this

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          company: formData.company || "N/A",
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `New Inquiry from ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", company: "", email: "", phone: "", message: "" });
        }, 3000);
      } else {
        setError("Failed to send message. Please try again or contact us directly.");
      }
    } catch {
      setError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 93109 35423"],
      action: "tel:+919310935423",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["vikasch2802@gmail.com"],
      action: "mailto:vikasch2802@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Plot no -331, near Naurula Bakery", "Puth Khurd, Industrial Area", "Delhi, 110039"],
      action: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday", "9:00 AM - 6:00 PM IST"],
      action: null,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-bg text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/95" />
          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container-section relative">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="hero-title text-primary-foreground mb-6">
              Let's Discuss Your
              <motion.span 
                className="block text-accent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Requirements
              </motion.span>
            </h1>
            <motion.p 
              className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Whether you need a quote, have technical questions, or want to schedule a facility visit—we're here to help. Reach out and our team will get back to you promptly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding relative overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-section relative">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="section-title text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                We supply CNC machines across India. Contact us to discuss your requirements or schedule a visit to our manufacturing facility.
              </p>

              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const ContentWrapper = item.action ? "a" : "div";
                  const wrapperProps = item.action ? { href: item.action } : {};

                  return (
                    <motion.div 
                      key={index} 
                      className="flex gap-4 group"
                      variants={fadeInUp}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className="w-5 h-5 text-accent" />
                      </motion.div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <ContentWrapper
                          {...wrapperProps}
                          className={item.action ? "block hover:text-accent transition-colors" : ""}
                        >
                          {item.details.map((detail, i) => (
                            <p key={i} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </ContentWrapper>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Pan India Badge */}
              <motion.div 
                className="mt-10 p-4 bg-muted rounded-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-sm font-medium text-foreground flex items-center gap-2">
                  <span className="text-lg">🇮🇳</span>
                  We supply pan-India with on-site installation support
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-500">
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  Send Us an Inquiry
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </motion.div>
                    <h4 className="font-display font-semibold text-xl text-foreground mb-2">
                      Thank You!
                    </h4>
                    <p className="text-muted-foreground">
                      We've received your inquiry and will get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                          placeholder="Your company (optional)"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                          placeholder="+91 00000 00000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2.5 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 resize-none"
                        placeholder="Tell us about your requirements, the type of machine you're interested in, or any questions you have..."
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <motion.button
                      type="submit" 
                      className="btn-accent w-full md:w-auto group disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                      <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-muted">
        <div className="container-section py-8">
          <motion.div 
            className="bg-card rounded-xl overflow-hidden border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[21/9] bg-muted flex items-center justify-center relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="text-center p-8 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                </motion.div>
                <p className="text-muted-foreground">
                  Located in Puth Khurd, Industrial Area, Delhi
                </p>
                <a
                  href="https://maps.google.com/?q=Puth+Khurd,+Delhi,+110039"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline mt-2 text-sm font-medium"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
