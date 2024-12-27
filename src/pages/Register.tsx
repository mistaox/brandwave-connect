import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accountType, setAccountType] = useState<"brand" | "influencer">("brand");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        toast({
          title: "Registration successful!",
          description: "Welcome to BrandCollab",
        });
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Choose your account type and sign up to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                defaultValue={accountType}
                onValueChange={(value) => setAccountType(value as "brand" | "influencer")}
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
              options={{
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: {
                  account_type: accountType,
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;