import { CREATOR_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  creators: p[0],
  properties: p.slice(1, 5),
  nameIdentifier: p[5],
  nameIdentifierScheme: d[0],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[1],
}));

export const fetchCreators = async (id: string, filters: Filters) =>
  await fetchFields(id, FIELDS.present, FIELDS.distribution, filters, format);

export default function useCreators() {
  return useCreateQuery("creators", fetchCreators);
}
