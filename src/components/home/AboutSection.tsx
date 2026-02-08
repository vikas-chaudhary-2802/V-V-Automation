 import { Link } from "react-router-dom";
 import { ArrowRight, CheckCircle2 } from "lucide-react";
 import { motion, useScroll, useTransform } from "framer-motion";
 import { useRef } from "react";
 import TextReveal from "@/components/effects/TextReveal";
 import MagneticButton from "@/components/effects/MagneticButton";
 import cncShop from "@/assets/cnc-shop.jpg";
 
 const AboutSection = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
     target: containerRef,
     offset: ["start end", "end start"],
   });
 
   const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
   const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);
 
   const features = [
     "In-house design and manufacturing",
     "Rigorous quality testing",
     "Technical support across India",
     "Customization available",
   ];
 
   return (
     <section
       ref={containerRef}
       className="section-padding bg-muted relative overflow-hidden"
     >
       {/* Background decoration */}
       <motion.div
         className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
         animate={{
           scale: [1, 1.2, 1],
           opacity: [0.3, 0.5, 0.3],
         }}
         transition={{ duration: 8, repeat: Infinity }}
       />
 
       <div className="container-section relative">
         <div className="grid lg:grid-cols-2 gap-12 items-center">
           {/* Image with parallax */}
           <motion.div style={{ y: imageY }} className="relative">
             <motion.div
               className="relative overflow-hidden rounded-2xl"
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.4 }}
             >
               <img
                 src={cncShop}
                 alt="CNC Manufacturing Facility"
                 className="w-full rounded-2xl shadow-2xl"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
             </motion.div>
 
             {/* Floating badge */}
             <motion.div
               className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-xl glow-accent"
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
             >
               <p className="font-display font-bold text-2xl">10+</p>
               <p className="text-sm opacity-90">Years of Excellence</p>
             </motion.div>
           </motion.div>
 
           {/* Content */}
           <motion.div style={{ y: contentY }}>
             <motion.span
               className="text-accent font-medium text-sm uppercase tracking-wider"
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
               About Us
             </motion.span>
 
             <h2 className="section-title text-foreground mt-2 mb-6">
               <TextReveal>Manufacturing Excellence Since Day One</TextReveal>
             </h2>
 
             <motion.p
               className="text-muted-foreground mb-8 leading-relaxed text-lg"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
             >
               V & V Automation is an Indian manufacturer of CNC machines. We
               don't just assemble—we engineer, build, and test every machine in
               our own facility. Our focus is simple: deliver machines that work
               reliably, year after year.
             </motion.p>
 
             <ul className="space-y-4 mb-8">
               {features.map((item, i) => (
                 <motion.li
                   key={i}
                   className="flex items-center gap-3 text-foreground"
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 + i * 0.1 }}
                 >
                   <motion.div
                     whileHover={{ scale: 1.2, rotate: 10 }}
                     transition={{ type: "spring", stiffness: 300 }}
                   >
                     <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                   </motion.div>
                   <span>{item}</span>
                 </motion.li>
               ))}
             </ul>
 
             <MagneticButton>
               <Link to="/about" className="btn-primary group">
                 Learn More About Us
                 <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
               </Link>
             </MagneticButton>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
 
 export default AboutSection;