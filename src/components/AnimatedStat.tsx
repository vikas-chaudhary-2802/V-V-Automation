import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  value: string;
}

const AnimatedStat = ({ value }: AnimatedStatProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const target = numericMatch ? Number(numericMatch[1]) : null;
  const suffix = numericMatch?.[2] || "";
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (target === null) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startedAt = performance.now();
        const duration = 1150;
        const animate = (time: number) => {
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.55 },
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [suffix, target, value]);

  return <strong ref={elementRef}>{display}</strong>;
};

export default AnimatedStat;
