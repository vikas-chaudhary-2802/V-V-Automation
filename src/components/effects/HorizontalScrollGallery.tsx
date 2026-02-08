import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";
import TextScramble from "@/components/effects/TextScramble";
import machine542 from "@/assets/vv-m-542.png";
import machine543 from "@/assets/vv-m-543.png";
import machine433 from "@/assets/vv-m-433.png";
import vmcMachine from "@/assets/vv-vmc-machine.png";

const products = [
  {
    name: "CNC Machines",
    description: "Versatile computer-controlled machines for precision manufacturing operations.",
    image: machine542,
    highlight: "Best Seller",
    specs: ["High Precision", "Auto Tool Change", "Digital Control"],
  },
  {
    name: "CNC Engraving",
    description: "High-precision engraving solutions for detailed surface work.",
    image: machine543,
    highlight: "Popular",
    specs: ["Fine Detail", "Multiple Materials", "Fast Processing"],
  },
  {
    name: "CNC Milling",
    description: "Powerful milling machines for complex metal cutting applications.",
    image: machine433,
    highlight: "Industrial",
    specs: ["Heavy Duty", "High Torque", "Large Capacity"],
  },
  {
    name: "VMC Machines",
    description: "Vertical Machining Centers for high-volume production environments.",
    image: vmcMachine,
    highlight: "Premium",
    specs: ["Production Ready", "High Speed", "Precision Spindle"],
  },
];

const HorizontalScrollGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-primary">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background elements */}
        <motion.div
          className="absolute inset-0 opacity-[0.05]"
          style={{ x: backgroundX }}
        >
          <div
            className="absolute inset-0 w-[200%]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        {/* Section header */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-20 pb-8">
          <div className="container-section">
            <motion.span
              className="inline-flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider bg-accent/10 px-4 py-2 rounded-full mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4" />
              Our Products
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              <TextScramble>CNC MACHINES WE MANUFACTURE</TextScramble>
            </h2>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 text-primary-foreground/60">
            <span className="text-sm font-mono">SCROLL</span>
            <motion.div className="w-32 h-[2px] bg-primary-foreground/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </motion.div>
            <span className="text-sm font-mono">TO EXPLORE</span>
          </div>
        </div>

        {/* Horizontal scrolling content */}
        <motion.div
          ref={scrollRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-8 pl-8 md:pl-16"
          style={{ x }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[60vh] group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-primary-foreground/5 to-primary-foreground/10 rounded-3xl border border-primary-foreground/10 overflow-hidden backdrop-blur-sm">
                {/* Highlight badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-1.5 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {product.highlight}
                  </span>
                </div>

                {/* Product image */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full w-auto object-contain drop-shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-primary-foreground/70 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-foreground/10 text-primary-foreground/80 text-xs font-medium rounded-full border border-primary-foreground/20"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* View button */}
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-accent font-medium group/btn"
                  >
                    <span className="group-hover/btn:underline">View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.15), transparent 70%)",
                  }}
                />
              </div>

              {/* Index number */}
              <div className="absolute -bottom-4 -right-4 text-[8rem] font-bold text-primary-foreground/5 leading-none pointer-events-none">
                0{index + 1}
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            className="relative flex-shrink-0 w-[85vw] md:w-[35vw] h-[60vh] flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                See All Products
              </h3>
              <p className="text-primary-foreground/70 mb-8 max-w-sm mx-auto">
                Explore our complete range of CNC machines and find the perfect solution for your needs.
              </p>
              <MagneticButton>
                <Link to="/products" className="btn-accent glow-accent inline-flex items-center gap-2">
                  <span>Explore All</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
