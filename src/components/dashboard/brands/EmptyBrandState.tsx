import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { AddBrandForm } from "../AddBrandForm";

interface EmptyBrandStateProps {
  onAddSuccess: () => void;
}

export const EmptyBrandState = ({ onAddSuccess }: EmptyBrandStateProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-4">No brands yet</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add your first brand</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Brand</DialogTitle>
              <DialogDescription>
                Create a new brand to manage your campaigns
              </DialogDescription>
            </DialogHeader>
            <AddBrandForm onSuccess={onAddSuccess} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};