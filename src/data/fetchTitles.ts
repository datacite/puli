import { TITLES_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  titles: p[0],
  titleType: d[0],
}));

export const fetchTitles = async (clientId: string, filters: Filters) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    filters,
    format,
  );

export default function useTitles() {
  return useCreateQuery("titles", fetchTitles);
}
