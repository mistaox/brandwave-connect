export const getProposalStatusColor = (status: string | null) => {
  if (!status) return null;

  const statusColors = {
    draft: "bg-gray-500",
    submitted: "bg-blue-500",
    accepted: "bg-green-500",
    rejected: "bg-red-500",
    revision_requested: "bg-yellow-500",
  };

  return statusColors[status as keyof typeof statusColors];
};