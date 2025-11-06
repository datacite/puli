import { RESOURCE_TYPE_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  resourceType: p[0],
  properties: p.slice(1),
  resourceTypeGeneral: d[0],
}));

export const fetchResourceType = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const useResourceType = (clientId: string) =>
  createQuery(clientId, "resourceType", fetchResourceType);
export default useResourceType;
