import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

const BrandListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("all");

  const brands = [
    {
      id: 1,
      name: "TechVision",
      industry: "Technology",
      description: "Leading tech innovation company",
      logo: "https://images.unsplash.com/photo-1622473590773-f588134b6ce7",
    },
    {
      id: 2,
      name: "EcoStyle",
      industry: "Fashion",
      description: "Sustainable fashion brand",
      logo: "https://images.unsplash.com/photo-1606293459339-c0657f07c2f5",
    },
    {
      id: 3,
      name: "GreenEats",
      industry: "Food",
      description: "Organic food delivery service",
      logo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5",
    },
  ];

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industry === "all" || brand.industry.toLowerCase() === industry.toLowerCase();
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-brandgray mb-8">Discover Brands</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Card key={brand.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mb-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <CardTitle>{brand.name}</CardTitle>
                <CardDescription>{brand.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{brand.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BrandListing;