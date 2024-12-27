import { ArrowRight, Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-r from-white to-gray-50 relative overflow-hidden">
      {/* Floating Social Media Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Facebook className="absolute text-gray-200 animate-float" style={{ top: '15%', left: '10%', animationDelay: '0s' }} size={32} />
        <Instagram className="absolute text-gray-200 animate-float" style={{ top: '45%', left: '5%', animationDelay: '0.5s' }} size={40} />
        <Twitter className="absolute text-gray-200 animate-float" style={{ top: '25%', right: '15%', animationDelay: '1s' }} size={36} />
        <Youtube className="absolute text-gray-200 animate-float" style={{ top: '60%', right: '10%', animationDelay: '1.5s' }} size={44} />
        <Linkedin className="absolute text-gray-200 animate-float" style={{ bottom: '20%', left: '20%', animationDelay: '2s' }} size={38} />
        <Facebook className="absolute text-gray-200 animate-float" style={{ bottom: '30%', right: '25%', animationDelay: '2.5s' }} size={34} />
        <Instagram className="absolute text-gray-200 animate-float" style={{ top: '35%', right: '35%', animationDelay: '3s' }} size={42} />
        <Twitter className="absolute text-gray-200 animate-float" style={{ bottom: '40%', left: '35%', animationDelay: '3.5s' }} size={30} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brandgray mb-6 animate-float">
            Connect <span className="text-brandpink">Brands</span> with
            <br />
            Perfect <span className="text-brandblue">Influencers</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're a brand looking to grow your presence or an influencer seeking partnerships,
            BrandCollab helps you create meaningful collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="px-8 py-4 bg-brandblue text-white rounded-full hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              Register Your Brand
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-brandpink text-white rounded-full hover:bg-opacity-90 transition-colors inline-flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              Join as Influencer
              <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-brandgray">Brand Management</h3>
              <p className="text-gray-600">Create and manage your brand profile, campaigns, and collaborations all in one place.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-brandgray">Find Influencers</h3>
              <p className="text-gray-600">Discover and connect with influencers that align with your brand values and target audience.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-brandgray">Track Performance</h3>
              <p className="text-gray-600">Monitor campaign performance and manage your influencer relationships effectively.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;