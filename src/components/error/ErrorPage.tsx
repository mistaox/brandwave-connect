import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigate = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-8 relative">
          <img
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
            alt="Error Illustration"
            className="w-64 h-64 mx-auto object-cover rounded-full shadow-lg animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Something's Not Quite Right
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          It seems you've wandered into uncharted territory. 
          Let's get you back on track!
        </p>
        
        <Button
          onClick={handleNavigate}
          className="bg-brandblue hover:bg-brandblue/90 text-white px-8 py-3 rounded-lg text-lg"
        >
          {user ? 'Go to Dashboard' : 'Go Home'}
        </Button>
      </div>
    </div>
  );
};