import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductShowcaseCardProps {
  children: React.ReactNode;
  className?: string;
}

const ProductShowcaseCard = ({ children, className }: ProductShowcaseCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl transition-all duration-200",
        className
      )}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl opacity-0 z-0"
        style={{
          background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.3), hsl(var(--accent)))",
          opacity: isHovered ? 1 : 0,
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden z-10 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{
            translateX: isHovered ? "200%" : "-100%",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Card content */}
      <div
        className="relative z-20 h-full bg-card rounded-2xl overflow-hidden border border-border"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>

      {/* Floating particles when hovered */}
      {isHovered && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full z-30"
              style={{
                left: `${20 + i * 20}%`,
                bottom: "10%",
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-10, -40, -60],
                x: [0, (i % 2 === 0 ? 10 : -10)],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default ProductShowcaseCard;
