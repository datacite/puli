import { RELATED_IDENTIFIER_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  relatedIdentifiers: p[0],
  relationType: d[0],
  relatedIdentifierType: d[1],
  resourceTypeGeneral: d[2],
}));

export const fetchRelatedIdentifiers = async (
  clientId: string,
  query: string,
) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    query,
    format,
  );

export default function useRelatedIdentifiers() {
  return useCreateQuery("relatedIdentifiers", fetchRelatedIdentifiers);
}
