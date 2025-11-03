import { CREATOR_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  present: p[0].present,
  properties: p.slice(1, 5),
  nameIdentifier: p[5],
  nameIdentifierScheme: d[0],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[1],
}))

export const fetchCreators = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const useCreators = (clientId: string) =>
  createQuery(clientId, "creators", fetchCreators)
export default useCreators;
