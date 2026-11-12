import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Pages load on demand, so wait (briefly) for the anchor to exist.
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView();
        else if (tries++ < 40) setTimeout(seek, 50);
      };
      seek();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
