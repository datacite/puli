import { RESOURCE_TYPE_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  resourceType: p[0],
  properties: p.slice(1),
  resourceTypeGeneral: d[0],
}));

export const fetchResourceType = async (clientId: string, query: string) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    query,
    format,
  );

export default function useResourceType() {
  return useCreateQuery("resourceType", fetchResourceType);
}
