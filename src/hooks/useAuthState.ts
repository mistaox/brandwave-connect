import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log("Found existing session:", session.user.id);
          setUser(session.user);
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            toast({
              title: "Error loading profile",
              description: "There was an error loading your profile",
              variant: "destructive",
            });
          } else {
            console.log("Loaded profile:", profile);
            setProfile(profile);
          }
        } else {
          console.log("No active session found");
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        toast({
          title: "Authentication Error",
          description: "There was an error initializing authentication",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(profile);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return { user, profile, loading };
};