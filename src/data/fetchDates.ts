import { DATES_FIELDS as FIELDS } from "@/constants";
import { createFormat, createQuery, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  dates: p[0],
  dateType: d[0],
  dateInformation: p[1],
}));

export const fetchDates = async (clientId: string) =>
  await fetchFields(clientId, FIELDS.present, FIELDS.distribution, format);

const useDates = (clientId: string) =>
  createQuery(clientId, "dates", fetchDates);
export default useDates;
