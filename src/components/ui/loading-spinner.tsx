import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};