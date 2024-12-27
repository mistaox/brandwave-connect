import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import FeaturedSection from "../components/marketplace/FeaturedSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedSection />
    </div>
  );
};

export default Index;