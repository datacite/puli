import { RESOURCE_TYPE_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  resourceType: p[0],
  properties: p.slice(1),
  resourceTypeGeneral: d[0],
}));

export const fetchResourceType = async (clientId: string, filters: Filters) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    filters,
    format,
  );

export default function useResourceType() {
  return useCreateQuery("resourceType", fetchResourceType);
}
