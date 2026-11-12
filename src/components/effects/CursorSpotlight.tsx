import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Pointer-driven effects (fine pointers only, skipped for reduced motion):
 *  - a soft accent spotlight that trails the cursor
 *  - magnetic pull on primary buttons
 */
const CursorSpotlight = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty, frame = 0;

    const follow = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      root.style.setProperty("--spot-x", `${cx.toFixed(1)}px`);
      root.style.setProperty("--spot-y", `${cy.toFixed(1)}px`);
      frame = requestAnimationFrame(follow);
    };
    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; root.classList.add("spot-on"); };
    const onLeave = () => root.classList.remove("spot-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(follow);

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".button-accent, .button-light, .button-dark, .footer-circle"));
    const cleanups = targets.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); el.style.transform = ""; };
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("spot-on");
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return <div className="cursor-spotlight" aria-hidden="true" />;
};

export default CursorSpotlight;
