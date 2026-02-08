import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import MagneticButton from "@/components/effects/MagneticButton";
import TextScramble from "@/components/effects/TextScramble";
import TextReveal from "@/components/effects/TextReveal";
import HeroImageShowcase from "@/components/effects/HeroImageShowcase";

const ParticleField = lazy(() => import("@/components/effects/ParticleField"));
 
 const HeroSection = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
     target: containerRef,
     offset: ["start start", "end start"],
   });
 
   const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
   const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
 
   return (
     <section
       ref={containerRef}
       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
     >
       {/* 3D Particle Background */}
       <Suspense fallback={null}>
         <ParticleField />
       </Suspense>
 
       {/* Gradient overlays */}
       <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary z-[1]" />
       <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary/80 z-[1]" />
 
       <motion.div
         style={{ y, opacity, scale }}
         className="container-section relative z-10"
       >
         <div className="py-20 md:py-28">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             {/* Text Content */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.5 }}
             >
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
               >
                 <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6 glow-accent">
                   CNC Machine Manufacturer
                 </span>
               </motion.div>
 
                <h1 className="hero-title text-primary-foreground mb-6">
                  <TextScramble delay={300} duration={1200}>PRECISION CNC MACHINES</TextScramble>
                  <span className="block mt-2">
                    <span className="text-gradient-accent">
                      <TextReveal delay={0.8}>Engineered in India</TextReveal>
                    </span>
                  </span>
                </h1>
 
               <motion.p
                 className="text-lg text-primary-foreground/80 mb-10 max-w-lg leading-relaxed"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.8 }}
               >
                 V & V Automation designs and manufactures high-quality CNC
                 machines for industries across India. From engraving to milling,
                 we build machines that deliver precision and reliability.
               </motion.p>
 
               <motion.div
                 className="flex flex-col sm:flex-row gap-4"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 1 }}
               >
                 <MagneticButton>
                   <Link to="/products" className="btn-accent group glow-accent">
                     View Our Machines
                     <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                   </Link>
                 </MagneticButton>
                 <MagneticButton>
                   <Link
                     to="/contact"
                     className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                   >
                     Request Quote
                   </Link>
                 </MagneticButton>
               </motion.div>
             </motion.div>
 
              {/* Hero Image Showcase */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <HeroImageShowcase className="w-full" />
              </motion.div>
           </div>
         </div>
       </motion.div>
 
       {/* Scroll indicator */}
       <motion.div
         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 2, duration: 0.6 }}
       >
         <motion.div
           className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center"
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
         >
           <motion.div
             className="w-1.5 h-3 bg-accent rounded-full mt-2"
             animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
         </motion.div>
       </motion.div>
     </section>
   );
 };
 
 export default HeroSection;