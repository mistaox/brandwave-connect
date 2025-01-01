import { useEffect } from "react";
import Hero from "../components/layout/Hero";
import FeaturedSection from "../components/marketplace/FeaturedSection";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, profile } = useAuth();

  useEffect(() => {
    console.log("Index component mounted");
    console.log("Current user:", user);
    console.log("Current profile:", profile);
  }, [user, profile]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <Hero />
        <FeaturedSection />
      </div>
    </div>
  );
};

export default Index;