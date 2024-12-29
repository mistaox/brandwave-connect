import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { AddPortfolioItemForm } from "./AddPortfolioItemForm";
import { PortfolioGrid } from "./PortfolioGrid";

export const PortfolioManager = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: portfolioItems, isLoading } = useQuery({
    queryKey: ['portfolio-items', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('influencer_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio</CardTitle>
        <Button
          onClick={() => setShowAddForm(true)}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <div className="mb-6">
            <AddPortfolioItemForm onClose={() => setShowAddForm(false)} />
          </div>
        )}
        <PortfolioGrid items={portfolioItems || []} />
      </CardContent>
    </Card>
  );
};