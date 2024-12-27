import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const { data: brandData } = useQuery({
    queryKey: ["brand", paths[1]],
    queryFn: async () => {
      if (paths[0] === "brands" && paths[1]) {
        const { data, error } = await supabase
          .from("brands")
          .select("name")
          .eq("id", paths[1])
          .single();

        if (error) throw error;
        return data;
      }
      return null;
    },
    enabled: paths[0] === "brands" && !!paths[1],
  });

  const getBreadcrumbLabel = (path: string, index: number) => {
    if (path === "brands" && index === 0) return "Brands";
    if (paths[0] === "brands" && index === 1 && brandData) {
      return brandData.name;
    }
    if (path === "campaigns") return "Campaigns";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getPathUrl = (index: number) => {
    return "/" + paths.slice(0, index + 1).join("/");
  };

  if (paths.length <= 1) return null;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {paths.map((path, index) => (
          <BreadcrumbItem key={path}>
            {index === paths.length - 1 ? (
              <BreadcrumbPage>{getBreadcrumbLabel(path, index)}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link to={getPathUrl(index)}>
                    {getBreadcrumbLabel(path, index)}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};