import OrcidPageClient from "./OrcidPageClient";
import { getOrcidHeaderData } from "./orcidRecord";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function OrcidPage({ params }: PageProps) {
  const { id } = await params;

  const headerData = await getOrcidHeaderData(id);

  return <OrcidPageClient id={id} headerData={headerData} />;
}

