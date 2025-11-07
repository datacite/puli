import { RIGHTS_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  rights: p[0],
  properties: p.slice(1),
  rightsIdentifier: d[0],
}));

export const fetchRights = async (clientId: string, query: string) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    query,
    format,
  );

export default function useRights() {
  return useCreateQuery("rights", fetchRights);
}
