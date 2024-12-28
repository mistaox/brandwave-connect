import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Register = () => {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Choose your account type and sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                defaultValue="brand"
                onValueChange={(value) => {
                  const metaData = { account_type: value };
                  supabase.auth.updateUser({ data: metaData });
                }}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="brand" id="brand" />
                  <Label htmlFor="brand">Brand</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="influencer" id="influencer" />
                  <Label htmlFor="influencer">Influencer</Label>
                </div>
              </RadioGroup>
            </div>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#0073ea',
                      brandAccent: '#0073ea',
                    },
                  },
                },
              }}
              providers={[]}
              view="sign_up"
              redirectTo={`${window.location.origin}/auth/callback`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;