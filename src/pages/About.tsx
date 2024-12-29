const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-8">About BrandCollab</h1>
        <div className="max-w-3xl mx-auto prose prose-blue">
          <p className="text-lg text-gray-600 mb-6">
            BrandCollab is a cutting-edge platform that connects brands with influencers, 
            making collaboration easier and more effective than ever before.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We aim to revolutionize the way brands and influencers connect, collaborate, 
            and create impactful content together.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Why Choose BrandCollab?</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Advanced matching algorithms</li>
            <li>Secure and transparent collaboration</li>
            <li>Comprehensive campaign management</li>
            <li>Real-time analytics and reporting</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default About;