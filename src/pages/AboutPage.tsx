import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Users, Factory, Wrench, Target } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import cncShop from "@/assets/cnc-shop.jpg";

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

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Precision First",
      description: "Every machine is built to exacting tolerances. We don't ship until it meets our standards.",
    },
    {
      icon: Factory,
      title: "In-House Manufacturing",
      description: "We design and build everything in our own facility—no outsourced assembly, no compromises.",
    },
    {
      icon: Wrench,
      title: "Technical Support",
      description: "Our team provides installation support and after-sales service across India.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "We listen to what our customers need and build machines that solve real problems.",
    },
  ];

  const milestones = [
    { year: "2014", event: "Company founded with a focus on CNC engraving machines" },
    { year: "2016", event: "Expanded to CNC milling machines and VMC series" },
    { year: "2019", event: "Reached 300+ machines delivered milestone" },
    { year: "2022", event: "Pan-India supply network established" },
    { year: "2024", event: "Launched next-generation precision series" },
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
              About Us
            </span>
            <h1 className="hero-title text-primary-foreground mb-6">
              Engineering Quality
              <motion.span 
                className="block text-accent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Since 2014
              </motion.span>
            </h1>
            <motion.p 
              className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              V & V Automation is an Indian CNC machine manufacturer. We don't trade or resell—we design, build, and support every machine that leaves our facility.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={cncShop}
                  alt="V&V Automation Manufacturing Facility"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="section-title text-foreground mt-2 mb-6">
                Built on Engineering, Not Marketing
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  V & V Automation started with a simple idea: Indian manufacturers deserve machines that are built for Indian conditions—reliable, serviceable, and backed by local support.
                </p>
                <p>
                  We began by building CNC engraving machines for small workshops. As word spread about the quality of our machines, demand grew. Today, we manufacture a full range of CNC machines—from compact engraving units to heavy-duty VMCs.
                </p>
                <p>
                  What hasn't changed is our approach. Every machine is designed by our engineering team, built in our facility, and tested before it leaves. We don't cut corners, and we don't make promises we can't keep.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted relative overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="container-section relative">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="section-title text-foreground mt-2">
              Our Approach to Manufacturing
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index} 
                  className="bg-card rounded-lg p-6 border border-border group hover:shadow-xl hover:border-accent/30 transition-all duration-500"
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding relative overflow-hidden">
        <motion.div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-muted blur-3xl"
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-section relative">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Journey</span>
              <h2 className="section-title text-foreground mt-2">
                Key Milestones
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-px"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-center gap-6 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Dot */}
                    <motion.div 
                      className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    />

                    {/* Content */}
                    <div
                      className={`ml-10 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                    >
                      <span className="font-display font-bold text-2xl text-accent">
                        {milestone.year}
                      </span>
                      <p className="text-foreground mt-1">{milestone.event}</p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-transparent"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container-section relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="section-title text-primary-foreground mt-2 mb-6">
                We're Manufacturers, Not Traders
              </h2>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                Many companies sell CNC machines they don't make. We're different. Every V&V machine is designed by our engineers, built in our facility, and backed by our team.
              </p>
              <motion.ul 
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  "Complete in-house design and manufacturing",
                  "Direct factory support—no middlemen",
                  "Spare parts availability for all models",
                  "Installation and training included",
                  "Pan-India service network",
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { value: "10+", label: "Years in Business" },
                { value: "500+", label: "Machines Delivered" },
                { value: "28+", label: "States Covered" },
                { value: "50+", label: "Team Members" },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-primary-foreground/10 rounded-lg p-6 text-center group hover:bg-primary-foreground/15 transition-colors duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-display font-bold text-4xl text-accent">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-section relative text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title text-foreground mb-4">
              Want to Learn More?
            </h2>
            <p className="text-muted-foreground mb-8">
              Visit our facility or get in touch with our team to discuss your requirements.
            </p>
            <Link to="/contact" className="btn-primary group">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
