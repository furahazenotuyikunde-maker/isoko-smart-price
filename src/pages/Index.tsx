import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PricePrediction from "@/components/PricePrediction";
import PriceChart from "@/components/PriceChart";
import Marketplace from "@/components/Marketplace";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <PricePrediction />
    <PriceChart />
    <Marketplace />
    <AboutSection />
    <Footer />
  </div>
);

export default Index;
