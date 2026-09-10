import RorPageClient from "./RorPageClient";
import { getRorHeaderData } from "./rorRecord";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RorPage({ params }: PageProps) {
  const { id } = await params;

  const headerData = await getRorHeaderData(id);

  return <RorPageClient id={id} headerData={headerData} />;
}

