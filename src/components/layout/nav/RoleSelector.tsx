import { UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RoleSelectorProps {
  profile: any;
  impersonateRole: (role: 'brand' | 'influencer') => void;
  onClose?: () => void;
}

export const RoleSelector = ({ profile, impersonateRole, onClose }: RoleSelectorProps) => {
  const handleRoleSelect = (role: 'brand' | 'influencer') => {
    impersonateRole(role);
    onClose?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <UserCircle2 className="mr-2 h-4 w-4" />
          {profile?.account_type || 'Select Role'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleRoleSelect('brand')}>
          Brand
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleSelect('influencer')}>
          Influencer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};