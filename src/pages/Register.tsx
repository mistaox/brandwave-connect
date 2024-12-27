import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Register = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [accountType, setAccountType] = useState<"brand" | "influencer">("influencer");

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        
        <div className="mb-6">
          <Label className="text-base mb-2 block">I am a...</Label>
          <RadioGroup
            defaultValue={accountType}
            onValueChange={(value) => setAccountType(value as "brand" | "influencer")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="influencer" id="influencer" />
              <Label htmlFor="influencer">Influencer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="brand" id="brand" />
              <Label htmlFor="brand">Brand</Label>
            </div>
          </RadioGroup>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={window.location.origin}
          view="sign_up"
          localization={{
            variables: {
              sign_up: {
                email_label: "Email",
                password_label: "Password",
                button_label: "Sign up",
              },
            },
          }}
          onSubmit={(formData) => {
            // Add account type to the metadata
            return {
              ...formData,
              options: {
                data: {
                  account_type: accountType,
                },
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default Register;