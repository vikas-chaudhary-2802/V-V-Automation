 import { useRef, useState } from "react";
 import { motion } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 interface GlowingCardProps {
   children: React.ReactNode;
   className?: string;
 }
 
 const GlowingCard = ({ children, className }: GlowingCardProps) => {
   const ref = useRef<HTMLDivElement>(null);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [isHovered, setIsHovered] = useState(false);
 
   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
     if (!ref.current) return;
     const rect = ref.current.getBoundingClientRect();
     setMousePosition({
       x: e.clientX - rect.left,
       y: e.clientY - rect.top,
     });
   };
 
   return (
     <motion.div
       ref={ref}
       onMouseMove={handleMouseMove}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}
       className={cn("relative overflow-hidden rounded-xl", className)}
       whileHover={{ scale: 1.02, y: -5 }}
       transition={{ type: "spring", stiffness: 300, damping: 20 }}
     >
       {/* Glow effect */}
       {isHovered && (
         <motion.div
           className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-300"
           style={{
             opacity: isHovered ? 1 : 0,
             background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 166, 35, 0.15), transparent 40%)`,
           }}
         />
       )}
       {/* Border glow */}
       <motion.div
         className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
         style={{
           opacity: isHovered ? 1 : 0,
           background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 166, 35, 0.4), transparent 40%)`,
           mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
           maskComposite: "exclude",
           padding: "1px",
         }}
       />
       <div className="relative z-0">{children}</div>
     </motion.div>
   );
 };
 
 export default GlowingCard;