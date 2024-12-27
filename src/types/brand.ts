export interface Brand {
  id: string;
  name: string;
  industry: string | null;
  company_size: string | null;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  location: string | null;
  created_at: string | null;
  updated_at: string | null;
  owner_id: string;
}