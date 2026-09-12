import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollExperience = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const revealGroups = new Map<HTMLElement, HTMLElement[]>();
    elements.forEach((element) => {
      const parent = element.parentElement;
      if (!parent) return;
      revealGroups.set(parent, [...(revealGroups.get(parent) || []), element]);
    });
    revealGroups.forEach((group) => {
      group.forEach((element, index) => {
        const delay = Math.min(index * (window.innerWidth < 760 ? 45 : 70), 210);
        element.style.setProperty("--reveal-delay", `${delay}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.style.removeProperty("--reveal-delay"));
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallaxElements = reducedMotion
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const updateMotion = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      document.documentElement.classList.toggle("page-scrolled", window.scrollY > 20);

      const motionScale = window.innerWidth < 760 ? 0.5 : 1;
      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
        const speed = Number.parseFloat(element.dataset.parallax || "0.04");
        const distanceFromCentre = window.innerHeight / 2 - (rect.top + rect.height / 2);
        const shift = Math.max(-34, Math.min(34, distanceFromCentre * speed * motionScale));
        element.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      parallaxElements.forEach((element) => element.style.removeProperty("--parallax-shift"));
      document.documentElement.classList.remove("page-scrolled");
    };
  }, [pathname]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(
      ".machine-card, .part-card, .process-card, .values-grid article, .selection-grid > div, .quote-pdf-preview",
    ));
    const cleanups = cards.map((card) => {
      card.classList.add("motion-card");
      const handleMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        card.style.setProperty("--motion-x", `${(x * 100).toFixed(1)}%`);
        card.style.setProperty("--motion-y", `${(y * 100).toFixed(1)}%`);
        card.style.setProperty("--tilt-x", `${((0.5 - y) * 2.2).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${((x - 0.5) * 2.2).toFixed(2)}deg`);
        card.style.setProperty("--motion-glow", "1");
      };
      const handleLeave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--motion-glow", "0");
      };
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
      return () => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
        card.classList.remove("motion-card");
        ["--motion-x", "--motion-y", "--tilt-x", "--tilt-y", "--motion-glow"].forEach((property) => card.style.removeProperty(property));
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
};

export default ScrollExperience;
