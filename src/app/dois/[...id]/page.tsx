import DoiTabbedClient from "./DoiTabbedClient";
import { getDoiRecordWithFallback } from "./doiRecord";
import type { DoiHeaderData } from "@/types";
import { asNumber } from "@/util";

interface PageProps {
  params: Promise<{ id: string[] }>;
}

export default async function DoiPage({ params }: PageProps) {
  const { id: idArray } = await params;
  const id = Array.isArray(idArray) ? idArray.join("/") : idArray;

  const doiRecord = await getDoiRecordWithFallback(id);
  const attributes = doiRecord?.data?.attributes;
  const versionOfRelationshipIds =
    doiRecord?.data?.relationships?.versionOf?.data
      ?.map((entry) => entry?.id)
      .filter(
        (value): value is string =>
          typeof value === "string" && value.trim().length > 0,
      ) || [];

  const headerData: DoiHeaderData = {
    title: attributes?.titles?.[0]?.title || "Untitled",
    id: `https://doi.org/${id}`,
    resourceTypeGeneral: attributes?.types?.resourceTypeGeneral || "Unknown Type",
    publicationYear: attributes?.publicationYear?.toString() || "Unknown Year",
    publisher: attributes?.publisher || "Unknown Publisher",
    version: attributes?.version || "",
    citationCount: asNumber(attributes?.citationCount || 0),
    versionOfRelationshipIds,
  };

  return <DoiTabbedClient id={id} headerData={headerData} />;
}
