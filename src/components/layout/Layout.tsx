import { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileActionBar from "@/components/MobileActionBar";
import ScrollExperience from "@/components/ScrollExperience";
import FloatingWhatsApp from "@/components/effects/FloatingWhatsApp";
import CursorSpotlight from "@/components/effects/CursorSpotlight";
import QuickEnquiry from "@/components/QuickEnquiry";
import { usePageMeta } from "@/hooks/use-page-meta";

const staticMeta: Record<string, [string, string]> = {
  "/parts": ["CNC Spare Parts: Servo, Spindle, Controllers | V&V Automation", "Servo motors and drives, spindle motors, CNC controllers, power supplies and MPG handwheels. Send a photo of your part on WhatsApp."],
  "/about": ["About V&V Automation | CNC Machine Manufacturer, Delhi", "An engineering-led CNC and VMC machine manufacturer in Delhi, building and supporting machines for manufacturers across India."],
  "/contact": ["Contact V&V Automation | Call, WhatsApp or Visit Our Delhi Facility", "Call, WhatsApp or visit V&V Automation at Puth Khurd Industrial Area, Delhi. Monday to Saturday, 9 AM to 6 PM."],
  "/quote": ["Request a Quote | V&V Automation", "Share your CNC or VMC requirement and get a written quotation from V&V Automation."],
};

const Canonical = ({ path }: { path: string }) => {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = `https://www.vv-automation.com${path === "/" ? "" : path}`;
  }, [path]);
  return null;
};

const StaticMeta = ({ path }: { path: string }) => {
  const meta = staticMeta[path];
  usePageMeta(meta?.[0] ?? document.title, meta?.[1]);
  return null;
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  return (
    <div className={`site-shell route-${pathname.split("/")[1] || "home"}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Canonical path={pathname} />
      {staticMeta[pathname] && <StaticMeta path={pathname} />}
      <ScrollExperience />
      <CursorSpotlight />
      <div className="route-scan" key={`${pathname}-scan`} aria-hidden="true" />
      <Header />
      <main id="main" tabIndex={-1} className="route-stage" key={pathname}>{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
      <QuickEnquiry />
    </div>
  );
};

export default Layout;
