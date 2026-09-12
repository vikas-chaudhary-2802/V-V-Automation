import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileActionBar from "@/components/MobileActionBar";
import ScrollExperience from "@/components/ScrollExperience";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  return (
    <div className="site-shell">
      <ScrollExperience />
      <div className="route-scan" key={`${pathname}-scan`} aria-hidden="true" />
      <Header />
      <main className="route-stage" key={pathname}>{children}</main>
      <Footer />
      <MobileActionBar />
    </div>
  );
};

export default Layout;
