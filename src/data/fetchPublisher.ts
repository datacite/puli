import { PUBLISHER_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  present: p[0].present,
  publisherIdentifier: p[1],
  publisherIdentifierScheme: d[0],
}));

export const fetchPublisher = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const usePublisher = (clientId: string) =>
  createQuery(clientId, "publisher", fetchPublisher);
export default usePublisher;
