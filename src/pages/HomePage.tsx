import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import HorizontalScrollGallery from "@/components/effects/HorizontalScrollGallery";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <HorizontalScrollGallery />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default HomePage;
