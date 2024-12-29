import { DeliverablesList } from "../../DeliverablesList";

interface DeliverablesStepProps {
  deliverables: string[];
  onAdd: (deliverable: string) => void;
  onRemove: (index: number) => void;
}

export const DeliverablesStep = ({
  deliverables,
  onAdd,
  onRemove,
}: DeliverablesStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Define Deliverables</h3>
      <p className="text-sm text-muted-foreground">
        List the specific deliverables you will provide for this campaign.
      </p>
      <DeliverablesList
        deliverables={deliverables}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    </div>
  );
};