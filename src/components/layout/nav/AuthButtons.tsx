import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  onSignOut: () => void;
  isAuthenticated: boolean;
  onClose?: () => void;
}

export const AuthButtons = ({ onSignOut, isAuthenticated, onClose }: AuthButtonsProps) => {
  if (isAuthenticated) {
    return (
      <Button
        variant="ghost"
        onClick={() => {
          onSignOut();
          onClose?.();
        }}
        className="text-gray-600 hover:text-brandblue"
      >
        Sign Out
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link to="/login" onClick={onClose}>
        <Button variant="ghost" className="text-gray-600 hover:text-brandblue">
          Sign In
        </Button>
      </Link>
      <Link to="/register" onClick={onClose}>
        <Button className="bg-brandblue text-white hover:bg-brandblue/90">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};