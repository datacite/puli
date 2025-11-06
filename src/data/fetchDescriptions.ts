import { DESCRIPTIONS_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  descriptions: p[0],
  descriptionType: d[0],
}));

export const fetchDescriptions = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const useDescriptions = (clientId: string) =>
  createQuery(clientId, "descriptions", fetchDescriptions);
export default useDescriptions;
