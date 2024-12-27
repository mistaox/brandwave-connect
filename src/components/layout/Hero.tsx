import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
            Unlock Your Business Potential
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with top influencers and brands to create meaningful collaborations that drive growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/brands"
              className="px-8 py-4 bg-white text-brandblue rounded-full hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 font-semibold"
            >
              Find Influencers
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/influencers"
              className="px-8 py-4 bg-brandorange text-brandgray rounded-full hover:bg-opacity-90 transition-colors inline-flex items-center justify-center gap-2 font-semibold"
            >
              Join as Influencer
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;