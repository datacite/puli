import { OTHER_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p) => ({
  publicationYear: p[0],
  alternateIdentifiers: p[1],
  language: p[2],
  sizes: p[3],
  formats: p[4],
  version: p[5],
  geoLocation: p[6],
  relatedItem: p[7],
}));

export const fetchOther = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, [], format);

const useOther = (clientId: string) =>
  createQuery(clientId, "other", fetchOther);
export default useOther;
