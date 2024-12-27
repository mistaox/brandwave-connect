import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PortfolioGrid } from "./portfolio/PortfolioGrid";
import { AddPortfolioItemForm } from "./portfolio/AddPortfolioItemForm";

export const PortfolioList = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsAddingItem(true)}
        >
          <ImagePlus className="h-4 w-4" />
          Add Work
        </Button>
      </CardHeader>
      <CardContent>
        <PortfolioGrid />
      </CardContent>

      <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Portfolio Item</DialogTitle>
          </DialogHeader>
          <AddPortfolioItemForm onClose={() => setIsAddingItem(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};