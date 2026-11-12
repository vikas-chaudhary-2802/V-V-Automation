import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";

// Home ships in the first bundle; every other page loads on demand.
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const MachinePage = lazy(() => import("@/pages/MachinePage"));
const PartsPage = lazy(() => import("@/pages/PartsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const QuotePage = lazy(() => import("@/pages/QuotePage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/machines/:id" element={<MachinePage />} />
        <Route path="/parts" element={<PartsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
