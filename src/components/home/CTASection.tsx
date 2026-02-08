 import { Link } from "react-router-dom";
 import { ArrowRight } from "lucide-react";
 import { motion } from "framer-motion";
 import MagneticButton from "@/components/effects/MagneticButton";
 import TextReveal from "@/components/effects/TextReveal";
 
 const CTASection = () => {
   return (
     <section className="section-padding bg-muted relative overflow-hidden">
       {/* Animated decorations */}
       <motion.div
         className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
         animate={{
           x: [0, 50, 0],
           y: [0, -50, 0],
           scale: [1, 1.2, 1],
         }}
         transition={{ duration: 10, repeat: Infinity }}
       />
       <motion.div
         className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl"
         animate={{
           x: [0, -30, 0],
           y: [0, 30, 0],
           scale: [1.2, 1, 1.2],
         }}
         transition={{ duration: 8, repeat: Infinity }}
       />
 
       <div className="container-section relative">
         <motion.div
           className="relative bg-card rounded-3xl p-10 md:p-14 shadow-2xl border border-border text-center max-w-3xl mx-auto overflow-hidden"
           initial={{ opacity: 0, y: 50, scale: 0.95 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
         >
           {/* Inner glow */}
           <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
 
           <div className="relative">
             <h2 className="section-title text-foreground mb-4">
               <TextReveal>Ready to Discuss Your Requirements?</TextReveal>
             </h2>
             <motion.p
               className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
             >
               Get in touch with our team to learn more about our CNC machines or
               request a custom quote for your manufacturing needs.
             </motion.p>
 
             <motion.div
               className="flex flex-col sm:flex-row gap-4 justify-center"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
             >
               <MagneticButton>
                 <Link to="/contact" className="btn-accent group glow-accent">
                   Contact Us
                   <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </Link>
               </MagneticButton>
               <MagneticButton>
                 <a href="tel:+919310935423" className="btn-outline">
                   Call: +91 93109 35423
                 </a>
               </MagneticButton>
             </motion.div>
           </div>
         </motion.div>
       </div>
     </section>
   );
 };
 
 export default CTASection;