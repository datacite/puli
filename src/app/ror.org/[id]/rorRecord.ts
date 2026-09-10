import { cache } from "react";
import { fetchRorOrganization } from "@/data/fetch";
import type { RorHeaderData, RorOrganization } from "@/types";

function capitalizeWords(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatRorType(value: string): string {
  return capitalizeWords(value.replaceAll("-", " "));
}

function getRorDisplayName(org: RorOrganization): string {
  const rorDisplay = org.names?.find((name) => name.types?.includes("ror_display"));
  if (rorDisplay?.value) return rorDisplay.value;
  return "Unknown Organization";
}

export const getRorHeaderData = cache(async (id: string): Promise<RorHeaderData> => {
  try {
    const org = await fetchRorOrganization(id);
    const firstCountry = org.locations?.[0]?.geonames_details?.country_name;
    const formattedTypes = (org.types || []).map(formatRorType).join(" • ");

    return {
      title: getRorDisplayName(org),
      id: org.id || `https://ror.org/${id}`,
      country: firstCountry || "Unknown Country",
      types: formattedTypes || "Unknown Type",
    };
  } catch {
    return {
      title: "Unknown Organization",
      id: `https://ror.org/${id}`,
      country: "Unknown Country",
      types: "Unknown Type",
    };
  }
});
