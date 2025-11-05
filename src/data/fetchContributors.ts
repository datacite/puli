import { CONTRIBUTOR_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  contributors: p[0],
  properties: p.slice(1, 5),
  contributorType: d[0],
  nameIdentifier: p[5],
  nameIdentifierScheme: d[1],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[2],
}));

export const fetchContributors = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const useContributors = (clientId: string) =>
  createQuery(clientId, "contributors", fetchContributors);
export default useContributors;
