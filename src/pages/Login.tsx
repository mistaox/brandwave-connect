import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const { session, profile } = useAuth();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            redirectTo={`${window.location.origin}/auth/callback`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;