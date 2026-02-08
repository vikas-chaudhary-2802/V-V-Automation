import { motion } from "framer-motion";
import { useRef } from "react";
import vmcMachine from "@/assets/vmc-machine.jpg";

const HeroImageShowcase = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Outer glow effect */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30 rounded-3xl blur-2xl"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main image container with 3D perspective */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{ perspective: "1000px" }}
      >
        {/* Decorative frame corners */}
        <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-accent rounded-tl-xl z-20" />
        <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-accent rounded-tr-xl z-20" />
        <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-accent rounded-bl-xl z-20" />
        <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-accent rounded-br-xl z-20" />

        {/* Image with animated border */}
        <motion.div
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(245, 166, 35, 0.3) 50%, transparent 55%, transparent 100%)",
            }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />

          {/* The main image */}
          <img
            src={vmcMachine}
            alt="V&V CNC/VMC Machine - Precision Manufacturing"
            className="w-full h-auto object-cover"
            style={{ minHeight: "400px" }}
          />

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

          {/* Product label badge */}
          <motion.div
            className="absolute bottom-6 left-6 z-20"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="bg-accent px-6 py-3 rounded-lg shadow-lg">
              <h3 className="text-white font-bold text-lg">CNC/VMC Series</h3>
              <p className="text-white/90 text-sm">Precision Manufacturing</p>
            </div>
          </motion.div>

          {/* Tech specs floating badges */}
          <motion.div
            className="absolute top-6 right-6 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="glass-card px-4 py-2 rounded-lg">
              <span className="text-accent font-semibold text-sm">Made in India</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating tech particles around the image */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default HeroImageShowcase;
