import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { InfluencerCard } from "@/components/marketplace/InfluencerCard";
import { Loader2 } from "lucide-react";

const InfluencerListing = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: influencers, isLoading } = useQuery({
    queryKey: ["influencers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("account_type", "influencer");

      if (error) throw error;
      return data;
    },
  });

  const filteredInfluencers = influencers?.filter((influencer) =>
    influencer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    influencer.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-brandgray mb-8">Find Influencers</h1>
        
        <div className="relative flex-1 mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search influencers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfluencers?.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default InfluencerListing;