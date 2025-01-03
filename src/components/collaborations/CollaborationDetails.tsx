import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ProposalStatus } from "@/components/proposals/ProposalStatus";
import { format } from "date-fns";

export const CollaborationDetails = () => {
  const { id } = useParams();

  const { data: collaboration, isLoading } = useQuery({
    queryKey: ["collaboration", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collaborations")
        .select(`
          *,
          campaigns (
            title,
            description,
            budget,
            requirements,
            brand:brands (
              name
            )
          ),
          influencer:profiles (
            full_name,
            avatar_url,
            bio
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!collaboration) {
    return <div>Collaboration not found</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">
          {collaboration.campaigns?.title}
        </h1>
        <ProposalStatus status={collaboration.proposal_status} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Brand</h3>
              <p>{collaboration.campaigns?.brand?.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{collaboration.campaigns?.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Budget</h3>
              <p>${collaboration.campaigns?.budget}</p>
            </div>
            <div>
              <h3 className="font-semibold">Requirements</h3>
              <p>{collaboration.campaigns?.requirements}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proposal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {collaboration.proposal_submitted_at ? (
              <>
                <div>
                  <h3 className="font-semibold">Submitted</h3>
                  <p>
                    {format(
                      new Date(collaboration.proposal_submitted_at),
                      "PPP"
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Proposed Budget</h3>
                  <p>${collaboration.proposal_budget}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Timeline</h3>
                  <p>{collaboration.proposal_timeline}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Deliverables</h3>
                  <ul className="list-disc pl-4">
                    {collaboration.proposal_deliverables?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Proposal Text</h3>
                  <p>{collaboration.proposal_text}</p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">No proposal submitted yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};