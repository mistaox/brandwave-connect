import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PortfolioList = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ImagePlus className="h-4 w-4" />
          Add Work
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">
          Portfolio management coming soon
        </div>
      </CardContent>
    </Card>
  );
};