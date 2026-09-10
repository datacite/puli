import Breadcrumbs from "@/components/Breadcrumbs";
import { getRorHeaderData } from "./rorRecord";

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

export default async function RorLayout({
  params,
  children,
}: LayoutProps) {
  const { id } = await params;

  const headerData = await getRorHeaderData(id);
  const entity: ReportBreadcrumbEntity = {
    id,
    name: headerData.title || id,
    type: "ror_report",
    role: "ror",
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
