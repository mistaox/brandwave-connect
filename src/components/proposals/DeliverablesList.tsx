import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DeliverablesListProps {
  deliverables: string[];
  onAdd: (deliverable: string) => void;
  onRemove: (index: number) => void;
}

export const DeliverablesList = ({
  deliverables,
  onAdd,
  onRemove,
}: DeliverablesListProps) => {
  const [deliverable, setDeliverable] = useState("");

  const handleAdd = () => {
    if (deliverable.trim()) {
      onAdd(deliverable.trim());
      setDeliverable("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={deliverable}
          onChange={(e) => setDeliverable(e.target.value)}
          placeholder="Add a deliverable"
        />
        <Button type="button" onClick={handleAdd}>
          Add
        </Button>
      </div>
      {deliverables.length > 0 && (
        <ul className="mt-2 space-y-2">
          {deliverables.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-muted p-2 rounded"
            >
              <span>{item}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};