import Navbar from "@/components/layout/Navbar";

const Campaigns = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-8">Active Campaigns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-gray-600">
              Our campaigns feature is currently under development. Check back soon!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Campaigns;