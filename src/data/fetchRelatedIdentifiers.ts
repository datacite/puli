import { RELATED_IDENTIFIER_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  relatedIdentifiers: p[0],
  relationType: d[0],
  relatedIdentifierType: d[1],
  resourceTypeGeneral: d[2],
}));

export const fetchRelatedIdentifiers = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const useRelatedIdentifiers = (clientId: string) =>
  createQuery(clientId, "relatedIdentifiers", fetchRelatedIdentifiers);
export default useRelatedIdentifiers;
