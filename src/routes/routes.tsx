import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { CollaborationsList } from "@/components/dashboard/CollaborationsList";
import { InfluencerActivity } from "@/components/dashboard/influencer/InfluencerActivity";
import { CollaborationDetails } from "@/components/collaborations/CollaborationDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "collaborations",
        element: <CollaborationsList />,
      },
      {
        path: "influencer-activity",
        element: <InfluencerActivity />,
      },
      {
        path: "collaborations/:id",
        element: <CollaborationDetails />,
      },
    ],
  },
]);
