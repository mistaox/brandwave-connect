import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accountType, setAccountType] = useState<"brand" | "influencer">("brand");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        toast({
          title: "Registration successful!",
          description: "Welcome to BrandCollab",
        });
        navigate("/dashboard");
      } else if (event === 'USER_UPDATED' && session?.user) {
        navigate("/dashboard");
      } else if (event === 'SIGNED_UP') {
        // Clear any existing errors on successful signup
        setError(null);
      }
    });

    // Listen for auth errors
    const authListener = supabase.auth.onError((error) => {
      if (error.message.includes('user_already_exists')) {
        setError('This email is already registered. Please try logging in instead.');
      } else {
        setError(error.message);
      }
    });

    return () => {
      subscription.unsubscribe();
      authListener.data.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleLoginClick = () => {
    navigate('/login');
  };

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
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  {error}
                  {error.includes('already registered') && (
                    <Button
                      variant="link"
                      className="p-0 ml-2 text-white underline"
                      onClick={handleLoginClick}
                    >
                      Go to login
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}

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
              redirectTo={`${window.location.origin}/auth/callback`}
              additionalData={{
                account_type: accountType,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;