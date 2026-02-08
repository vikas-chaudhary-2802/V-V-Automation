import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import machine542 from "@/assets/vv-m-542.png";
import machine543 from "@/assets/vv-m-543.png";
import machine433 from "@/assets/vv-m-433.png";
import vmcMachine from "@/assets/vv-vmc-machine.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const ProductsPage = () => {
  const products = [
    {
      id: "cnc-machines",
      name: "CNC Machines",
      subtitle: "Precision Manufacturing Series",
      image: machine542,
      description:
        "Our CNC machines are designed for versatile manufacturing applications. With computer-controlled precision, these machines handle complex operations with consistent accuracy, making them ideal for both prototyping and production runs.",
      applications: [
        "Metal component manufacturing",
        "Prototype development",
        "Small to medium batch production",
        "Precision part machining",
      ],
      models: ["VV M-542", "VV M-540", "VV M-538"],
    },
    {
      id: "cnc-engraving",
      name: "CNC Engraving Machines",
      subtitle: "High-Detail Engraving Series",
      image: machine543,
      description:
        "Built for precision surface work, our CNC engraving machines deliver exceptional detail on a variety of materials. Whether it's intricate patterns or text engraving, these machines provide clean, consistent results.",
      applications: [
        "Signage and nameplates",
        "Mold and die engraving",
        "Jewelry and decorative items",
        "Industrial part marking",
      ],
      models: ["VV M-543", "VV E-320", "VV E-215"],
    },
    {
      id: "cnc-milling",
      name: "CNC Milling Machines",
      subtitle: "Heavy-Duty Milling Series",
      image: machine433,
      description:
        "Our CNC milling machines are engineered for demanding metal cutting applications. With robust construction and powerful spindles, they handle everything from light milling to heavy material removal with precision.",
      applications: [
        "Complex 3D surface machining",
        "Metal cutting and shaping",
        "Tool and die manufacturing",
        "Automotive components",
      ],
      models: ["VV M-433", "VV M-430", "VV M-425"],
    },
    {
      id: "vmc-machines",
      name: "VMC Machines",
      subtitle: "Vertical Machining Centers",
      image: vmcMachine,
      description:
        "Our Vertical Machining Centers (VMC) are built for high-volume production environments. These machines combine speed, precision, and reliability to maximize throughput while maintaining tight tolerances.",
      applications: [
        "High-volume production runs",
        "Precision component manufacturing",
        "Aerospace and automotive parts",
        "Industrial equipment components",
      ],
      models: ["VV VMC-850", "VV VMC-640", "VV VMC-540"],
      featured: true,
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
              Our Products
            </span>
            <h1 className="hero-title text-primary-foreground mb-6">
              CNC Machines
              <motion.span 
                className="block text-accent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Built for Industry
              </motion.span>
            </h1>
            <motion.p 
              className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We manufacture a complete range of CNC machines—from precision engraving to heavy-duty milling. Every machine is engineered in-house and built to perform in demanding industrial environments.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products List */}
      <section className="section-padding relative overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-muted/50 blur-3xl"
          animate={{ 
            x: [-100, 0, -100],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            x: [100, 0, 100],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-section relative">
          <div className="space-y-24">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                id={product.id}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Image */}
                <motion.div 
                  className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-muted rounded-xl p-8 lg:p-12 relative overflow-hidden group">
                    {/* Animated gradient border */}
                    <motion.div 
                      className="absolute -inset-[1px] bg-gradient-to-r from-accent via-accent/50 to-accent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-[1px] bg-muted rounded-xl" />
                    
                    {/* Scanning line effect */}
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(245, 166, 35, 0.2) 50%, transparent 55%, transparent 100%)",
                      }}
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1,
                      }}
                    />

                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full max-w-md mx-auto relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                    />

                    {/* Tech corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/50 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50 rounded-tr opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/50 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/50 rounded-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <motion.span 
                    className="text-accent font-medium text-sm uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {product.subtitle}
                  </motion.span>
                  <h2 className="section-title text-foreground mt-2 mb-4">
                    {product.name}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-display font-semibold text-foreground mb-3">
                      Typical Applications
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.applications.map((app, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                          <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                          {app}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-display font-semibold text-foreground mb-3">
                      Available Models
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.models.map((model, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1.5 bg-muted text-foreground text-sm rounded-md font-medium hover:bg-accent/10 hover:text-accent transition-colors duration-300"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          {model}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <Link to="/contact" className="btn-accent group">
                    Enquire Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted relative overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-section relative text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title text-foreground mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8">
              We can work with you to customize our machines for your specific requirements. Get in touch to discuss your project.
            </p>
            <Link to="/contact" className="btn-primary group">
              Contact Our Team
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
