 import { motion, useInView } from "framer-motion";
 import { useRef } from "react";
 import AnimatedCounter from "@/components/effects/AnimatedCounter";
 
 const StatsSection = () => {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   const stats = [
     { value: 10, suffix: "+", label: "Years Experience" },
     { value: 500, suffix: "+", label: "Machines Delivered" },
     { value: 50, suffix: "+", label: "Cities Served" },
     { value: 24, suffix: "/7", label: "Technical Support" },
   ];
 
   return (
     <section
       ref={ref}
       className="relative py-8 bg-accent overflow-hidden"
     >
       {/* Animated shine effect */}
       <motion.div
         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
         animate={{ x: ["-200%", "200%"] }}
         transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
       />
 
       <div className="container-section relative">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {stats.map((stat, index) => (
             <motion.div
               key={index}
               className="text-center"
               initial={{ opacity: 0, y: 30 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5, delay: index * 0.1 }}
             >
               <p className="font-display font-bold text-3xl md:text-4xl text-accent-foreground">
                 {isInView ? (
                   <AnimatedCounter
                     value={stat.value}
                     suffix={stat.suffix}
                     duration={2}
                   />
                 ) : (
                   `0${stat.suffix}`
                 )}
               </p>
               <p className="text-sm text-accent-foreground/80 mt-1">
                 {stat.label}
               </p>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default StatsSection;