import { PUBLISHER_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  publisher: p[0],
  publisherIdentifier: p[1],
  publisherIdentifierScheme: d[0],
}));

export const fetchPublisher = async (id: string, filters: Filters) =>
  await fetchFields(id, FIELDS.present, FIELDS.distribution, filters, format);

export default function usePublisher() {
  return useCreateQuery("publisher", fetchPublisher);
}
