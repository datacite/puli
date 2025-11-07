import { SUBJECTS_FIELDS as FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import { createFormat, fetchFields } from "@/util";

const format = createFormat((p, d) => ({
  subjects: p[0],
  subjectScheme: p[1],
  subjectsSchemeDistribution: d[0],
  valueURI: p[2],
}));

export const fetchSubjects = async (clientId: string, query: string) =>
  await fetchFields(
    clientId,
    FIELDS.present,
    FIELDS.distribution,
    query,
    format,
  );

export default function useSubjects() {
  return useCreateQuery("subjects", fetchSubjects);
}
