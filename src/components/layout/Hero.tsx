import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50" />
      
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-brandpink/10 to-brandblue/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-brandblue/10 to-brandpurple/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-brandgray tracking-tight">
            Connect{" "}
            <span className="text-brandpink bg-clip-text">Brands</span> with
            <br />
            Perfect{" "}
            <span className="text-brandblue bg-clip-text">Influencers</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-600 leading-relaxed">
            Whether you're a brand looking to grow your presence or an influencer seeking partnerships,
            BrandCollab helps you create meaningful collaborations.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-brandblue rounded-full hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Register Your Brand
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-brandpink rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Join as Influencer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="group p-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-brandgray">Brand Management</h3>
              <p className="text-gray-600">
                Create and manage your brand profile, campaigns, and collaborations all in one place.
              </p>
            </div>
            <div className="group p-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-brandgray">Find Influencers</h3>
              <p className="text-gray-600">
                Discover and connect with influencers that align with your brand values and target audience.
              </p>
            </div>
            <div className="group p-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-brandgray">Track Performance</h3>
              <p className="text-gray-600">
                Monitor campaign performance and manage your influencer relationships effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;