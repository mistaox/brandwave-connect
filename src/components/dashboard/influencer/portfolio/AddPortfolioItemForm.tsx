import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const AddPortfolioItemForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      media_url: formData.get("media_url"),
      media_type: formData.get("media_type"),
      platform: formData.get("platform"),
      engagement_metrics: {
        likes: formData.get("likes"),
        comments: formData.get("comments"),
        shares: formData.get("shares"),
      },
    };

    try {
      const { error } = await supabase
        .from("portfolio_items")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Portfolio item added successfully",
        duration: 3000,
      });
      
      queryClient.invalidateQueries({ queryKey: ['portfolio-items'] });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error adding portfolio item",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your work"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="media_url">Media URL</Label>
        <Input
          id="media_url"
          name="media_url"
          placeholder="Enter media URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="media_type">Media Type</Label>
        <Select name="media_type">
          <SelectTrigger>
            <SelectValue placeholder="Select media type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="link">Link</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select name="platform">
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="likes">Likes</Label>
          <Input
            id="likes"
            name="likes"
            type="number"
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="comments">Comments</Label>
          <Input
            id="comments"
            name="comments"
            type="number"
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shares">Shares</Label>
          <Input
            id="shares"
            name="shares"
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Item
        </Button>
      </div>
    </form>
  );
};