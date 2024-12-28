import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const useBrandProfile = () => {
  const { user, profile: authProfile } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user?.id) {
          setProfile(authProfile);
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);

        // Get the first brand for initial load
        const { data: brands, error: brandsError } = await supabase
          .from("brands")
          .select("id")
          .eq("owner_id", user.id)
          .limit(1)
          .maybeSingle();

        if (brandsError) {
          console.error("Error loading brands:", brandsError);
        } else if (brands) {
          setSelectedBrandId(brands.id);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Error loading profile",
          description: "Using demo profile instead",
          variant: "destructive",
        });
        setProfile(authProfile);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, authProfile, toast]);

  return { profile, loading, selectedBrandId, setSelectedBrandId };
};