import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Star } from "lucide-react";

const InfluencerListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Lifestyle",
      followers: "500K+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Lifestyle and wellness content creator",
    },
    {
      id: 2,
      name: "David Chen",
      category: "Technology",
      followers: "750K+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Tech reviewer and gaming enthusiast",
    },
    {
      id: 3,
      name: "Emma Wilson",
      category: "Fashion",
      followers: "1M+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      bio: "Fashion and lifestyle influencer",
    },
  ];

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || influencer.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-brandgray mb-8">Find Influencers</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search influencers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.map((influencer) => (
            <Card key={influencer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 mb-4 mx-auto">
                  <img
                    src={influencer.image}
                    alt={influencer.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <CardTitle className="text-center">{influencer.name}</CardTitle>
                <CardDescription className="text-center">{influencer.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-brandblue" />
                    <span>{influencer.followers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{influencer.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-center">{influencer.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InfluencerListing;