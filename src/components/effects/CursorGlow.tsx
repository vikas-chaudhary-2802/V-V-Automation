 import { useEffect, useState } from "react";
 import { motion, useSpring } from "framer-motion";
 
 const CursorGlow = () => {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [isVisible, setIsVisible] = useState(false);
 
   const springConfig = { damping: 25, stiffness: 300 };
   const cursorX = useSpring(0, springConfig);
   const cursorY = useSpring(0, springConfig);
 
   useEffect(() => {
     const updateMousePosition = (e: MouseEvent) => {
       setMousePosition({ x: e.clientX, y: e.clientY });
       cursorX.set(e.clientX);
       cursorY.set(e.clientY);
       setIsVisible(true);
     };
 
     const handleMouseLeave = () => setIsVisible(false);
     const handleMouseEnter = () => setIsVisible(true);
 
     window.addEventListener("mousemove", updateMousePosition);
     document.addEventListener("mouseleave", handleMouseLeave);
     document.addEventListener("mouseenter", handleMouseEnter);
 
     return () => {
       window.removeEventListener("mousemove", updateMousePosition);
       document.removeEventListener("mouseleave", handleMouseLeave);
       document.removeEventListener("mouseenter", handleMouseEnter);
     };
   }, [cursorX, cursorY]);
 
   return (
     <>
       {/* Large glow */}
       <motion.div
         className="pointer-events-none fixed z-[9999] hidden lg:block"
         style={{
           x: cursorX,
           y: cursorY,
           translateX: "-50%",
           translateY: "-50%",
         }}
       >
         <motion.div
           className="h-[400px] w-[400px] rounded-full bg-gradient-radial from-accent/20 via-accent/5 to-transparent blur-3xl"
           animate={{ opacity: isVisible ? 1 : 0 }}
           transition={{ duration: 0.3 }}
         />
       </motion.div>
       {/* Small cursor dot */}
       <motion.div
         className="pointer-events-none fixed z-[9999] h-4 w-4 rounded-full bg-accent mix-blend-difference hidden lg:block"
         style={{
           x: cursorX,
           y: cursorY,
           translateX: "-50%",
           translateY: "-50%",
         }}
         animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
         transition={{ duration: 0.2 }}
       />
     </>
   );
 };
 
 export default CursorGlow;