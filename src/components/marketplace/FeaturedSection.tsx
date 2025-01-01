const FeaturedSection = () => {
  console.log("FeaturedSection component rendering");
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Featured Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-gray-600">
              Stay tuned for exciting collaboration opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;