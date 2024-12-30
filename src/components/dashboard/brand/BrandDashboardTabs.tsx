import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BrandsList } from "@/components/dashboard/BrandsList";
import { CampaignsList } from "@/components/dashboard/CampaignsList";
import { CollaborationsList } from "@/components/dashboard/CollaborationsList";
import { MessagingInterface } from "@/components/messaging/MessagingInterface";
import { ConversationsList } from "@/components/messaging/ConversationsList";
import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface BrandDashboardTabsProps {
  selectedBrandId: string | null;
  onBrandSelect: (brandId: string) => void;
}

export const BrandDashboardTabs = ({ selectedBrandId, onBrandSelect }: BrandDashboardTabsProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const queryClient = useQueryClient();
  const previousTab = useRef(activeTab);

  const handleTabChange = (value: string) => {
    // If switching to campaigns tab, invalidate the campaigns query
    if (value === "campaigns" && previousTab.current !== value) {
      queryClient.invalidateQueries({ queryKey: ["campaigns", selectedBrandId] });
    }
    previousTab.current = value;
    setActiveTab(value);
  };

  const handleBrandSelect = (brandId: string) => {
    onBrandSelect(brandId);
    setActiveTab("campaigns"); // Switch to campaigns tab when a brand is selected
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-8">
      <TabsList className="grid w-full grid-cols-5 lg:w-[750px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="brands">Brands</TabsTrigger>
        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6 space-y-6">
        <DashboardMetrics brandId={selectedBrandId || undefined} />
        <RecentActivity brandId={selectedBrandId || undefined} />
      </TabsContent>
      
      <TabsContent value="brands" className="mt-6">
        <BrandsList onBrandSelect={handleBrandSelect} />
      </TabsContent>
      
      <TabsContent value="campaigns" className="mt-6">
        {selectedBrandId ? (
          <CampaignsList brandId={selectedBrandId} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            Please select a brand to view campaigns
          </div>
        )}
      </TabsContent>

      <TabsContent value="collaborations" className="mt-6">
        {selectedBrandId ? (
          <CollaborationsList brandId={selectedBrandId} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            Please select a brand to view collaborations
          </div>
        )}
      </TabsContent>

      <TabsContent value="messages" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow">
            <ConversationsList
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          </div>
          <div className="md:col-span-2 bg-white rounded-lg shadow">
            <MessagingInterface conversationId={selectedConversation} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};