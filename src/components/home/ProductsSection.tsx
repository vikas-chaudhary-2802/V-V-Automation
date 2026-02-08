import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ProductShowcaseCard from "@/components/effects/ProductShowcaseCard";
import MagneticButton from "@/components/effects/MagneticButton";
import TextReveal from "@/components/effects/TextReveal";
import machine542 from "@/assets/vv-m-542.png";
import machine543 from "@/assets/vv-m-543.png";
import machine433 from "@/assets/vv-m-433.png";
import vmcMachine from "@/assets/vv-vmc-machine.png";

const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const productCategories = [
    {
      name: "CNC Machines",
      description:
        "Versatile computer-controlled machines for precision manufacturing operations.",
      image: machine542,
      highlight: "Best Seller",
    },
    {
      name: "CNC Engraving",
      description: "High-precision engraving solutions for detailed surface work.",
      image: machine543,
      highlight: "Popular",
    },
    {
      name: "CNC Milling",
      description:
        "Powerful milling machines for complex metal cutting applications.",
      image: machine433,
      highlight: "Industrial",
    },
    {
      name: "VMC Machines",
      description:
        "Vertical Machining Centers for high-volume production environments.",
      image: vmcMachine,
      highlight: "Premium",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-section relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider bg-accent/10 px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            Our Products
          </motion.span>
          <h2 className="section-title text-foreground mt-2 mb-4">
            <TextReveal>CNC Machines We Manufacture</TextReveal>
          </h2>
          <p className="section-subtitle mx-auto">
            From engraving to heavy-duty milling, we build a range of CNC
            machines to suit different industrial needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="perspective-1000"
            >
              <ProductShowcaseCard>
                <Link
                  to="/products"
                  className="block h-full group"
                >
                  {/* Image container with parallax effect */}
                  <div className="relative aspect-square bg-gradient-to-br from-muted via-muted to-muted/50 p-6 flex items-center justify-center overflow-hidden">
                    {/* Highlight badge */}
                    <motion.div
                      className="absolute top-4 left-4 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-lg">
                        {category.highlight}
                      </span>
                    </motion.div>

                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Product image with hover effects */}
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="max-h-full w-auto object-contain relative z-10 drop-shadow-xl"
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: hoveredIndex === index ? 3 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    {/* Tech lines overlay */}
                    <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" viewBox="0 0 100 100">
                      <motion.line
                        x1="0" y1="50" x2="100" y2="50"
                        stroke="hsl(var(--accent))"
                        strokeWidth="0.5"
                        strokeDasharray="5 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                      />
                      <motion.line
                        x1="50" y1="0" x2="50" y2="100"
                        stroke="hsl(var(--accent))"
                        strokeWidth="0.5"
                        strokeDasharray="5 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </svg>
                  </div>

                  {/* Content area */}
                  <div className="p-6 relative overflow-hidden">
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent via-accent to-transparent"
                      initial={{ width: "0%" }}
                      whileInView={{ width: hoveredIndex === index ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />

                    <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>

                    {/* View more indicator */}
                    <motion.div
                      className="flex items-center gap-2 mt-4 text-accent text-sm font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0, 
                        x: hoveredIndex === index ? 0 : -10 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Link>
              </ProductShowcaseCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton>
            <Link to="/products" className="btn-primary group inline-flex items-center gap-2">
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;