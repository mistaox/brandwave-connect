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
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }
        
        if (session?.user) {
          console.log("Found existing session for user:", session.user.id);
          setUser(session.user);
          
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
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
          // Clear any stale state
          setUser(null);
          setProfile(null);
          
          // Clear any stored session data
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear state and session on error
        setUser(null);
        setProfile(null);
        await supabase.auth.signOut();
        
        toast({
          title: "Authentication Error",
          description: "There was an error initializing authentication",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Initialize auth state
    initializeAuth();

    // Set up auth state change listener
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

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return { user, profile, loading };
};