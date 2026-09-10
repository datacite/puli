import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchEntity } from "@/data/fetch";
import { getDoiRecordWithFallback } from "./doiRecord";

interface LayoutProps {
  params: Promise<{ id: string[] }>;
  children: React.ReactNode;
}

export default async function DoiLayout({
  params,
  children,
}: LayoutProps) {
  const { id } = await params;
  const doiPath = id.join("/");

  try {
    const doiRecord = await getDoiRecordWithFallback(doiPath);

    if (!doiRecord?.data) notFound();

    const clientId = doiRecord.data.relationships?.client?.data?.id;
    const doiTitle = doiRecord.data.attributes?.titles?.[0]?.title || doiPath;
    let clientParent = null;

    if (clientId) {
      try {
        const client = await fetchEntity(clientId);
        if (client) {
          clientParent = client;
        }
      } catch {
      }
    }

    const doiEntity = {
      id: doiPath,
      name: doiTitle,
      type: "doi",
      role: "client",
      parent: clientParent,
      children: [],
    };

    return (
      <>
        <Breadcrumbs entity={doiEntity as any} />
        {children}
      </>
    );
  } catch {
    notFound();
  }
}
