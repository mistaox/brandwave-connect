import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-r from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brandgray mb-6 animate-float">
            First <span className="text-brandpink">Influencer</span> Hiring
            <br />
            Platform in The World
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a thriving community, connect with top brands, and take your influence to new heights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/brands"
              className="px-8 py-4 bg-brandblue text-white rounded-full hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              Find Influencers
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/influencers"
              className="px-8 py-4 bg-brandpink text-white rounded-full hover:bg-opacity-90 transition-colors inline-flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              Register as Influencer
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;