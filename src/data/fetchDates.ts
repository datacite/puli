import { DATES_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  dates: p[0],
  dateType: d[0],
  dateInformation: p[1],
}));

export const fetchDates = async (id: string, filters: Filters) =>
  await fetchFields(id, FIELDS.present, FIELDS.distribution, filters, format);

export default function useDates() {
  return useCreateQuery("dates", fetchDates);
}
