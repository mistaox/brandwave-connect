import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BrandsList } from "@/components/dashboard/BrandsList";
import { CollaborationsList } from "@/components/dashboard/CollaborationsList";
import { MessagingInterface } from "@/components/messaging/MessagingInterface";
import { ConversationsList } from "@/components/messaging/ConversationsList";
import { useState } from "react";

interface BrandDashboardTabsProps {
  selectedBrandId: string | null;
  onBrandSelect: (brandId: string) => void;
}

export const BrandDashboardTabs = ({ selectedBrandId, onBrandSelect }: BrandDashboardTabsProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
      <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="brands">Brands</TabsTrigger>
        <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6 space-y-6">
        <DashboardMetrics brandId={selectedBrandId || undefined} />
        <RecentActivity brandId={selectedBrandId || undefined} />
      </TabsContent>
      
      <TabsContent value="brands" className="mt-6">
        <BrandsList onBrandSelect={onBrandSelect} />
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