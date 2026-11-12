import { useEffect, useState } from "react";
import { products } from "@/data/catalog";

/** Sticky scroll-spy tab bar for the machine rows. */
const MachineNav = () => {
  const [active, setActive] = useState(products[0].id);

  useEffect(() => {
    const rows = products.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav className="machine-nav" aria-label="Jump to machine family">
      <div className="container-section machine-nav-inner">
        <span className="machine-nav-label">Jump to</span>
        {products.map((p) => (
          <button key={p.id} type="button" onClick={() => jump(p.id)} className={active === p.id ? "active" : undefined} aria-current={active === p.id}>
            <i>{p.number}</i>{p.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MachineNav;
