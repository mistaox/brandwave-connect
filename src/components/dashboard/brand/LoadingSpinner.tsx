import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </div>
  );
};