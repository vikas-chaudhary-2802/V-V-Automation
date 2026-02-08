 import { useRef, useState } from "react";
 import { motion } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 interface MagneticButtonProps {
   children: React.ReactNode;
   className?: string;
   onClick?: () => void;
   as?: "button" | "div";
 }
 
 const MagneticButton = ({
   children,
   className,
   onClick,
   as = "button",
 }: MagneticButtonProps) => {
   const ref = useRef<HTMLDivElement>(null);
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [isHovered, setIsHovered] = useState(false);
 
   const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
     if (!ref.current) return;
     const { clientX, clientY } = e;
     const { left, top, width, height } = ref.current.getBoundingClientRect();
     const x = clientX - (left + width / 2);
     const y = clientY - (top + height / 2);
     setPosition({ x: x * 0.3, y: y * 0.3 });
   };
 
   const handleMouseLeave = () => {
     setPosition({ x: 0, y: 0 });
     setIsHovered(false);
   };
 
   const Component = as === "button" ? motion.button : motion.div;
 
   return (
     <motion.div
       ref={ref}
       onMouseMove={handleMouse}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={handleMouseLeave}
       className="relative"
     >
       <Component
         onClick={onClick}
         animate={{ x: position.x, y: position.y }}
         transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
         className={cn("relative", className)}
       >
         {children}
         {isHovered && (
           <motion.div
             className="absolute inset-0 -z-10 rounded-lg bg-accent/30 blur-xl"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1.5 }}
             exit={{ opacity: 0 }}
           />
         )}
       </Component>
     </motion.div>
   );
 };
 
 export default MagneticButton;