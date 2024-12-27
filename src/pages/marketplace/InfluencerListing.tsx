import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Star, Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Filter {
  category: string;
  minFollowers: number;
  maxFollowers: number;
  platforms: string[];
  niches: string[];
  rating: number;
}

const InfluencerListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filter>({
    category: "all",
    minFollowers: 0,
    maxFollowers: 1000000,
    platforms: [],
    niches: [],
    rating: 0,
  });

  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn"];
  const niches = ["Fashion", "Technology", "Lifestyle", "Gaming", "Fitness", "Beauty", "Travel", "Food"];

  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Lifestyle",
      followers: 500000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Lifestyle and wellness content creator",
      platforms: ["Instagram", "YouTube"],
      niches: ["Lifestyle", "Fitness"],
    },
    {
      id: 2,
      name: "David Chen",
      category: "Technology",
      followers: 750000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Tech reviewer and gaming enthusiast",
      platforms: ["YouTube", "Twitter"],
      niches: ["Technology", "Gaming"],
    },
    {
      id: 3,
      name: "Emma Wilson",
      category: "Fashion",
      followers: 1000000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      bio: "Fashion and lifestyle influencer",
      platforms: ["Instagram", "TikTok"],
      niches: ["Fashion", "Beauty"],
    },
  ];

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const handlePlatformToggle = (platform: string) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleNicheToggle = (niche: string) => {
    setFilters(prev => ({
      ...prev,
      niches: prev.niches.includes(niche)
        ? prev.niches.filter(n => n !== niche)
        : [...prev.niches, niche],
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      minFollowers: 0,
      maxFollowers: 1000000,
      platforms: [],
      niches: [],
      rating: 0,
    });
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category === "all" || influencer.category.toLowerCase() === filters.category.toLowerCase();
    const matchesFollowers = influencer.followers >= filters.minFollowers && influencer.followers <= filters.maxFollowers;
    const matchesPlatforms = filters.platforms.length === 0 || 
      filters.platforms.some(platform => influencer.platforms.includes(platform));
    const matchesNiches = filters.niches.length === 0 || 
      filters.niches.some(niche => influencer.niches.includes(niche));
    const matchesRating = influencer.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesFollowers && matchesPlatforms && matchesNiches && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-brandgray">Find Influencers</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Filter Influencers</SheetTitle>
                <SheetDescription>
                  Refine your search with advanced filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant={filters.platforms.includes(platform) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handlePlatformToggle(platform)}
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Niches</h3>
                  <div className="flex flex-wrap gap-2">
                    {niches.map((niche) => (
                      <Badge
                        key={niche}
                        variant={filters.niches.includes(niche) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleNicheToggle(niche)}
                      >
                        {niche}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Followers Range</h3>
                  <div className="pt-4">
                    <Slider
                      defaultValue={[filters.minFollowers]}
                      max={1000000}
                      step={1000}
                      onValueChange={([value]) => setFilters(prev => ({ ...prev, minFollowers: value }))}
                    />
                    <div className="mt-2 text-sm text-gray-500">
                      Min: {formatFollowerCount(filters.minFollowers)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Minimum Rating</h3>
                  <Select
                    value={filters.rating.toString()}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, rating: parseFloat(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={resetFilters} variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="relative flex-1 mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search influencers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
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
                    <span>{formatFollowerCount(influencer.followers)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{influencer.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-4">{influencer.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {influencer.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InfluencerListing;