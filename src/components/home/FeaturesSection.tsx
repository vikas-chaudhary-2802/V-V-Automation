 import { Settings, Shield, Zap, Award } from "lucide-react";
 import { motion } from "framer-motion";
 import TextReveal from "@/components/effects/TextReveal";
 
 const FeaturesSection = () => {
   const features = [
     {
       icon: Settings,
       title: "Precision Engineering",
       description:
         "Each machine is built with exacting tolerances for consistent, accurate results.",
     },
     {
       icon: Shield,
       title: "Built for Reliability",
       description:
         "Robust construction designed for demanding industrial environments.",
     },
     {
       icon: Zap,
       title: "High Performance",
       description:
         "Optimized for speed and efficiency without compromising on quality.",
     },
     {
       icon: Award,
       title: "Made in India",
       description:
         "Proudly manufactured in India with pan-India supply and support.",
     },
   ];
 
   return (
     <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
       {/* Animated background effects */}
       <div className="absolute inset-0">
         <motion.div
           className="absolute top-0 left-0 w-full h-full"
           style={{
             background:
               "radial-gradient(circle at 20% 80%, hsl(var(--accent) / 0.15), transparent 50%)",
           }}
           animate={{ opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 5, repeat: Infinity }}
         />
         <motion.div
           className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl"
           animate={{
             scale: [1, 1.3, 1],
             x: [0, -50, 0],
             y: [0, 50, 0],
           }}
           transition={{ duration: 10, repeat: Infinity }}
         />
       </div>
 
       <div className="container-section relative">
         <motion.div
           className="text-center max-w-2xl mx-auto mb-16"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
           <span className="text-accent font-medium text-sm uppercase tracking-wider">
             Why V & V
           </span>
           <h2 className="section-title text-primary-foreground mt-2 mb-4">
             <TextReveal>Built for Performance. Backed by Service.</TextReveal>
           </h2>
         </motion.div>
 
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {features.map((feature, index) => {
             const Icon = feature.icon;
             return (
               <motion.div
                 key={index}
                 className="text-center group"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.15 }}
               >
                 <motion.div
                   className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-accent group-hover:scale-110"
                   whileHover={{ rotate: 10 }}
                 >
                   <Icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors" />
                 </motion.div>
                 <h3 className="font-display font-semibold text-xl mb-3">
                   {feature.title}
                 </h3>
                 <p className="text-primary-foreground/70 leading-relaxed">
                   {feature.description}
                 </p>
               </motion.div>
             );
           })}
         </div>
       </div>
     </section>
   );
 };
 
 export default FeaturesSection;