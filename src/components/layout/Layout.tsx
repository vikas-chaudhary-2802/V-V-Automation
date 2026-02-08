 import { ReactNode, lazy, Suspense } from "react";
 import Header from "./Header";
 import Footer from "./Footer";
 import ScrollProgress from "@/components/effects/ScrollProgress";
 
 const CursorGlow = lazy(() => import("@/components/effects/CursorGlow"));
 
 interface LayoutProps {
   children: ReactNode;
 }
 
 const Layout = ({ children }: LayoutProps) => {
   return (
     <div className="min-h-screen flex flex-col custom-cursor">
       <Suspense fallback={null}>
         <CursorGlow />
       </Suspense>
       <ScrollProgress />
       <Header />
       <main className="flex-1">{children}</main>
       <Footer />
     </div>
   );
 };
 
 export default Layout;