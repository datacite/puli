import { SUBJECTS_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  subjects: p[0],
  subjectScheme: p[1],
  subjectsSchemeDistribution: d[0],
  valueURI: p[2],
}));

export const fetchSubjects = async (clientId: string, filters: Filters) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    filters,
    format,
  );

export default function useSubjects() {
  return useCreateQuery("subjects", fetchSubjects);
}
