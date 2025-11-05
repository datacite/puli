import { FUNDING_REFERENCES_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  fundingReferences: p[0],
  funderProperties: p.slice(1, 3),
  funderIdentifierType: d[0],
  awardProperties: p.slice(-3),
}));

export const fetchFundingReferences = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const useFundingReferences = (clientId: string) =>
  createQuery(clientId, "fundingReferences", fetchFundingReferences);
export default useFundingReferences;
