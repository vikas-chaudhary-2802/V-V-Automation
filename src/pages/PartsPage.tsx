import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import servoMotor from "@/assets/servo-motor.jpg";
import controlPanel from "@/assets/control-panel.jpg";
import mpgHandwheel from "@/assets/mpg-handwheel.jpg";
import spindleMotor from "@/assets/spindle-motor.webp";
import servoDrives from "@/assets/servo-drives.jpg";
import powerSupply from "@/assets/power-supply.jpg";

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

const PartsPage = () => {
  const parts = [
    {
      id: "servo-motors",
      name: "Servo Motors",
      image: servoMotor,
      description:
        "High-precision servo motors for accurate positioning and smooth motion control in CNC machines. Essential for achieving tight tolerances in machining operations.",
      applications: [
        "Axis positioning",
        "Spindle control",
        "Tool changers",
        "Robotic arms",
      ],
    },
    {
      id: "spindle-motors",
      name: "Spindle Motors",
      image: spindleMotor,
      description:
        "Powerful spindle motors designed for high-speed cutting operations. Available in various power ratings to match your machining requirements.",
      applications: [
        "High-speed milling",
        "Precision drilling",
        "Surface finishing",
        "Engraving operations",
      ],
    },
    {
      id: "controllers",
      name: "CNC Controllers",
      image: controlPanel,
      description:
        "Advanced CNC controllers with intuitive interfaces and powerful processing capabilities. The brain of your CNC machine for precise motion coordination.",
      applications: [
        "Machine automation",
        "G-code processing",
        "Multi-axis coordination",
        "Real-time monitoring",
      ],
    },
    {
      id: "drives",
      name: "Servo Drives",
      image: servoDrives,
      description:
        "High-performance servo drives that provide precise current and velocity control for servo motors. Ensures smooth, responsive machine movement.",
      applications: [
        "Motor control",
        "Speed regulation",
        "Torque management",
        "Energy efficiency",
      ],
    },
    {
      id: "power-supplies",
      name: "Power Supplies",
      image: powerSupply,
      description:
        "Industrial-grade power supplies designed for CNC applications. Reliable power delivery for consistent machine performance.",
      applications: [
        "Control system power",
        "Motor power supply",
        "Auxiliary systems",
        "Emergency backup",
      ],
    },
    {
      id: "handwheels",
      name: "MPG Handwheels",
      image: mpgHandwheel,
      description:
        "Manual Pulse Generators for precise manual positioning and jog operations. Essential for setup, calibration, and fine adjustments.",
      applications: [
        "Manual positioning",
        "Tool setup",
        "Calibration",
        "Precision adjustments",
      ],
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
              CNC Parts & Components
            </span>
            <h1 className="hero-title text-primary-foreground mb-6">
              Quality CNC Parts
              <span className="block text-accent">For Your Machines</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
              Along with manufacturing CNC machines, V & V Automation supplies essential CNC components—servo motors, controllers, drives, and more—to keep your machines running at peak performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parts Grid */}
      <section className="section-padding">
        <div className="container-section">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">What We Supply</span>
            <h2 className="section-title text-foreground mt-2 mb-4">
              Essential CNC Components
            </h2>
            <p className="section-subtitle mx-auto">
              We supply high-quality CNC parts and components to ensure your machines operate reliably and efficiently.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {parts.map((part, index) => (
              <motion.div
                key={part.id}
                variants={fadeInUp}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-500"
              >
                <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {part.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {part.description}
                  </p>
                  <div>
                    <h4 className="font-medium text-foreground text-sm mb-2">Applications:</h4>
                    <ul className="grid grid-cols-2 gap-1.5">
                      {part.applications.map((app, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container-section relative">
          <motion.div 
            className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Need CNC Parts?
            </span>
            <h2 className="section-title text-foreground mb-4">
              Contact Us for Inquiry
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Looking for specific CNC components? Get in touch with our team to discuss your requirements and get competitive quotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/contact" className="btn-accent">
                Send Inquiry
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a href="tel:+919310935423" className="btn-outline">
                <Phone className="mr-2 w-4 h-4" />
                Call Now
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
              <a href="tel:+919310935423" className="flex items-center justify-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                +91 93109 35423
              </a>
              <a href="mailto:vikasch2802@gmail.com" className="flex items-center justify-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                vikasch2802@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PartsPage;
