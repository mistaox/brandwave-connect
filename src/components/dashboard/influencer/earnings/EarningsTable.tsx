import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export const EarningsTable = () => {
  const { data: earnings, isLoading } = useQuery({
    queryKey: ['earnings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('earnings')
        .select(`
          *,
          collaborations (
            campaign_id,
            campaigns (
              title
            )
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!earnings?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No earnings recorded yet
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Campaign</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {earnings.map((earning) => (
          <TableRow key={earning.id}>
            <TableCell>
              {format(new Date(earning.created_at), 'MMM d, yyyy')}
            </TableCell>
            <TableCell>
              {earning.collaborations?.campaigns?.title || 'N/A'}
            </TableCell>
            <TableCell className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {earning.amount}
            </TableCell>
            <TableCell className="flex items-center gap-2">
              {getStatusIcon(earning.status)}
              {earning.status}
            </TableCell>
            <TableCell>
              {earning.payment_date
                ? format(new Date(earning.payment_date), 'MMM d, yyyy')
                : 'Pending'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};