import { cache } from "react";
import { fetchOrcidRecord } from "@/data/fetch";
import type { OrcidHeaderData, OrcidRecord } from "@/types";

function getOrcidDisplayName(record: OrcidRecord): string {
  const givenNames = record.person?.name?.["given-names"]?.value || "";
  const familyName = record.person?.name?.["family-name"]?.value || "";
  return `${givenNames} ${familyName}`.trim() || "Unknown Person";
}

export const getOrcidHeaderData = cache(async (id: string): Promise<OrcidHeaderData> => {
  try {
    const record = await fetchOrcidRecord(id);

    const otherNames =
      record.person?.["other-names"]?.["other-name"]
        ?.map((name) => name.value)
        .filter((value): value is string => Boolean(value && value.trim()))
        .join(" • ") || "";

    const employer =
      record["activities-summary"]?.employments?.["affiliation-group"]
        ?.flatMap((group) => group.summaries || [])
        .map((summary) => summary["employment-summary"]?.organization?.name)
        .find((name): name is string => Boolean(name && name.trim())) || "";

    return {
      title: getOrcidDisplayName(record),
      id: record["orcid-identifier"]?.uri || `https://orcid.org/${id}`,
      otherNames,
      employer,
    };
  } catch {
    return {
      title: "Unknown Person",
      id: `https://orcid.org/${id}`,
      otherNames: "",
      employer: "",
    };
  }
});
