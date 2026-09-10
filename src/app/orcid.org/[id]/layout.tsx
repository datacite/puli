import Breadcrumbs from "@/components/Breadcrumbs";
import { getOrcidHeaderData } from "./orcidRecord";

type ReportBreadcrumbEntity = {
  id: string;
  name: string;
  type: string;
  role: string;
  parent: null;
  children: [];
};

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export default async function OrcidLayout({
  params,
  children,
}: LayoutProps) {
  const { id } = await params;

  const headerData = await getOrcidHeaderData(id);
  const entity: ReportBreadcrumbEntity = {
    id,
    name: headerData.title || id,
    type: "orcid_report",
    role: "orcid",
    parent: null,
    children: [],
  };

  return (
    <>
      <Breadcrumbs entity={entity as any} />
      {children}
    </>
  );
}
