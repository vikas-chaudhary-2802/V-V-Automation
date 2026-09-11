import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileActionBar from "@/components/MobileActionBar";
import ScrollExperience from "@/components/ScrollExperience";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="site-shell">
    <ScrollExperience />
    <Header />
    <main>{children}</main>
    <Footer />
    <MobileActionBar />
  </div>
);

export default Layout;
