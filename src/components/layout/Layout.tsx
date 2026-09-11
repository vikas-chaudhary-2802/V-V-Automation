import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="site-shell">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
