import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
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
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedSection />
    </div>
  );
};

export default Index;