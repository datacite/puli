import { FUNDING_REFERENCES_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  fundingReferences: p[0],
  funderProperties: p.slice(1, 3),
  funderIdentifierType: d[0],
  awardProperties: p.slice(-3),
}));

export const fetchFundingReferences = async (
  clientId: string,
  filters: Filters,
) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    filters,
    format,
  );

export default function useFundingReferences() {
  return useCreateQuery("fundingReferences", fetchFundingReferences);
}
