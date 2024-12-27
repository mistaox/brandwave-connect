import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const Register = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("brand");

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkSession();
  }, [navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-gray-500">Choose your account type and sign up below</p>
        </div>
        
        <div className="space-y-4">
          <Label className="text-base">I am a...</Label>
          <RadioGroup
            value={accountType}
            onValueChange={setAccountType}
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
                  brand: "#0073ea",
                  brandAccent: "#ff3d57",
                },
              },
            },
          }}
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
          options={{
            emailRedirectTo: `${window.location.origin}`,
            data: {
              account_type: accountType,
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Register;