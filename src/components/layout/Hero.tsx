const Hero = () => {
  console.log("Hero component rendering");
  
  return (
    <div className="py-20">
      <h1 className="text-4xl font-bold text-center mb-6">
        Connect with Amazing Brands
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
        Join our platform to collaborate with leading brands and create impactful campaigns
      </p>
    </div>
  );
};

export default Hero;