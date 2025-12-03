import { DESCRIPTIONS_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  descriptions: p[0],
  descriptionType: d[0],
}));

export const fetchDescriptions = async (clientId: string, filters: Filters) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    filters,
    format,
  );

export default function useDescriptions() {
  return useCreateQuery("descriptions", fetchDescriptions);
}
