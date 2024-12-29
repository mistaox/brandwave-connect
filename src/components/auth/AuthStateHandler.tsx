import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AuthStateHandlerProps {
  onAuthStateChange: (event: string, session: any) => void;
}

export const AuthStateHandler = ({ onAuthStateChange }: AuthStateHandlerProps) => {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(onAuthStateChange);
    return () => {
      subscription.unsubscribe();
    };
  }, [onAuthStateChange]);

  return null;
};