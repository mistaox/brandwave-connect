import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join BrandCollab today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup defaultValue="influencer" className="flex gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-brandpink hover:bg-opacity-90">Create Account</Button>
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-brandblue hover:underline">
              Sign in
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

export default Register;