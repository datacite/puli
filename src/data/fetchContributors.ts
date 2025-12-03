import { CONTRIBUTOR_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  contributors: p[0],
  properties: p.slice(1, 5),
  contributorType: d[0],
  nameIdentifier: p[5],
  nameIdentifierScheme: d[1],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[2],
}));

export const fetchContributors = async (clientId: string, filters: Filters) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    filters,
    format,
  );

export default function useContributors() {
  return useCreateQuery("contributors", fetchContributors);
}
