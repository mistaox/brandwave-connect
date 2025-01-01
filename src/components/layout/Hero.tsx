const Hero = () => {
  console.log("Hero component rendering");
  
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Connect with Amazing Brands
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our platform to collaborate with leading brands and create impactful campaigns
        </p>
      </div>
    </section>
  );
};

export default Hero;