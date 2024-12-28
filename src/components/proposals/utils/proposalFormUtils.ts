import { supabase } from "@/integrations/supabase/client";

export interface ProposalFormData {
  proposal_text: string;
  proposal_budget: number;
  proposal_timeline: string;
  proposal_deliverables: string[];
}

export const submitProposal = async (
  collaborationId: string,
  formData: ProposalFormData
) => {
  const proposalData = {
    ...formData,
    proposal_status: "submitted",
    proposal_submitted_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("collaborations")
    .update(proposalData)
    .eq("id", collaborationId);

  if (error) throw error;
};