import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your BrandCollab account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-brandblue hover:bg-blue-600">Sign In</Button>
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-brandblue hover:underline">
              Sign up
            </Link>
          </div>
          <Link to="/" className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;