import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-section section-padding relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img 
                src={logo} 
                alt="V and V Automation" 
                className="h-14 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Leading CNC machine manufacturer in India. We design, build, and supply precision CNC machines across the nation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Our Products", path: "/products" },
                { name: "CNC Parts", path: "/parts" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Our Products</h4>
            <ul className="space-y-3">
              {[
                "CNC Machines",
                "CNC Engraving Machines",
                "CNC Milling Machines",
                "VMC Machines",
              ].map((product, index) => (
                <li key={index}>
                  <Link 
                    to="/products" 
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all hover:after:w-full"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 text-accent mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-sm">
                  <a href="tel:+919310935423" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    +91 93109 35423
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-accent mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <a href="mailto:vikasch2802@gmail.com" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  vikasch2802@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-primary-foreground/80 text-sm">
                  Plot no -331, near Naurula Bakery,<br />
                  Puth Khurd, Industrial Area,<br />
                  Delhi, 110039
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} V & V Automation. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Made in India 🇮🇳 | Serving Pan-India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
