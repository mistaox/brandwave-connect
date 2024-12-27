import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const { session, profile, loading } = useAuth();

  useEffect(() => {
    if (session && profile) {
      // Redirect based on account type
      if (profile.account_type === 'brand') {
        navigate("/dashboard");
      } else if (profile.account_type === 'influencer') {
        navigate("/influencer/dashboard");
      } else {
        navigate("/"); // Fallback to home if account type is not set
      }
    }
  }, [session, profile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Get the current origin dynamically
  const redirectTo = `${window.location.origin}/auth/callback`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to BrandCollab</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0073ea",
                  brandAccent: "#ff3d57",
                },
              },
            },
          }}
          providers={[]}
          redirectTo={redirectTo}
        />
        <div className="text-center mt-4">
          <Button
            variant="link"
            onClick={() => navigate("/reset-password")}
            type="button"
          >
            Forgot Password?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;