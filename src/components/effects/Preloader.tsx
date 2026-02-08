import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "complete">("loading");

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("revealing"), 200);
          return 100;
        }
        // Accelerating progress
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "revealing") {
      const timer = setTimeout(() => {
        setPhase("complete");
        setTimeout(onComplete, 600);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-primary flex items-center justify-center overflow-hidden"
          exit={{ 
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Scanning lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245, 166, 35, 0.03) 2px, rgba(245, 166, 35, 0.03) 4px)",
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center">
            {/* Logo container with glow */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 bg-accent/30 rounded-full blur-3xl scale-150"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1.5, 1.8, 1.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-8 border-2 border-accent/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-12 border border-accent/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Logo */}
              <motion.img
                src={logo}
                alt="V&V Automation"
                className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10"
                initial={{ filter: "brightness(0.5)" }}
                animate={{ filter: "brightness(1)" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>

            {/* Company name with reveal */}
            <motion.div
              className="overflow-hidden mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h1
                className="text-2xl md:text-4xl font-bold text-primary-foreground tracking-wider"
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                V & V <span className="text-accent">AUTOMATION</span>
              </motion.h1>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 md:w-80 relative">
              {/* Progress track */}
              <div className="h-[2px] bg-primary-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-accent to-orange-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              {/* Progress percentage */}
              <motion.div
                className="mt-4 flex justify-between items-center text-primary-foreground/60 text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>INITIALIZING</span>
                <span className="text-accent">{Math.round(progress)}%</span>
              </motion.div>

              {/* Loading dots */}
              <motion.div 
                className="flex gap-1 justify-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-accent rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-accent/50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-accent/50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-accent/50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-accent/50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
