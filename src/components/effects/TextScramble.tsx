import { useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextScrambleProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  scrambleOnHover?: boolean;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const TextScramble = ({
  children,
  className = "",
  delay = 0,
  duration = 1500,
  scrambleOnHover = false,
}: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasScrambled = useRef(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const originalText = children;
    const length = originalText.length;
    const iterations = length * 3;
    let currentIteration = 0;

    const interval = setInterval(() => {
      const progress = currentIteration / iterations;
      const revealedChars = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (originalText[i] === " ") {
          result += " ";
        } else if (i < revealedChars) {
          result += originalText[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);
      currentIteration++;

      if (currentIteration >= iterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, duration / iterations);

    return () => clearInterval(interval);
  }, [children, duration, isScrambling]);

  useEffect(() => {
    if (isInView && !hasScrambled.current) {
      hasScrambled.current = true;
      const timer = setTimeout(scramble, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, scramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      scramble();
    }
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={char !== children[i] ? "text-accent" : ""}
          style={{
            transition: "color 0.1s ease",
          }}
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
};

export default TextScramble;
