import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Register = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleContinue = () => {
    if (accountType) {
      setShowAuth(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join BrandCollab to start collaborating
          </p>
        </div>

        {!showAuth ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Select your account type</Label>
              <RadioGroup
                value={accountType || ""}
                onValueChange={setAccountType}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="brand"
                    id="brand"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="brand"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-brandblue [&:has([data-state=checked])]:border-brandblue cursor-pointer"
                  >
                    <span className="text-sm font-medium">Brand</span>
                    <span className="text-xs text-gray-500">
                      I want to work with influencers
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="influencer"
                    id="influencer"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="influencer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-brandblue [&:has([data-state=checked])]:border-brandblue cursor-pointer"
                  >
                    <span className="text-sm font-medium">Influencer</span>
                    <span className="text-xs text-gray-500">
                      I want to work with brands
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              onClick={handleContinue}
              disabled={!accountType}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        ) : (
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
            additionalData={{
              account_type: accountType,
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default Register;