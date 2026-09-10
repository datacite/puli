import { BookCheck, Building2, Contact, GitCompare, Globe, Quote, Shapes, SquareArrowOutUpRight } from "lucide-react";
import type { DoiRecord, HeaderInfo, ResultListItem } from "@/types";
import { asNumber } from "@/util";

function normalizeLabelContent(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(" • ");
  }

  return value?.trim() || "";
}

function capitalizeWords(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatRorType(value: string) {
  return capitalizeWords(value);
}

export function buildDoiRecordListItem(record: DoiRecord): ResultListItem {
  return {
    id: record.id,
    title: record.attributes.titles?.[0]?.title || "Untitled",
    href: `/dois/${record.attributes.doi}`,
    subtitle: `https://doi.org/${record.attributes.doi}`,
    subtitleHref: `https://doi.org/${record.attributes.doi}`,
    subtitleExternal: true,
    attributes: [
      record.attributes.types.resourceTypeGeneral
        ? {
          type: "type",
          content: record.attributes.types.resourceTypeGeneral,
          icon: <Shapes className="size-3" />,
        }
        : null,
      record.attributes.publicationYear
        ? {
          type: "year",
          content: String(record.attributes.publicationYear),
          icon: <BookCheck className="size-3" />,
        }
        : null,
      record.attributes.publisher
        ? {
          type: "publisher",
          content: record.attributes.publisher,
          icon: <Building2 className="size-3" />,
        }
        : null,
      record.attributes.version
        ? {
          type: "version",
          content: record.attributes.version,
          icon: <GitCompare className="size-3" />,
        }
        : null,
      {
        type: "citations",
        content: asNumber(record.attributes.citationCount || 0),
        icon: <Quote className="size-3" />,
      },
    ].filter((value): value is NonNullable<typeof value> => Boolean(value)),
    description: record.attributes.descriptions?.[0]?.description,
  };
}

export function buildOrcidHeaderLabels(values: {
  employer?: string | string[];
}): HeaderInfo["labels"] {
  const labels: HeaderInfo["labels"] = [];
  const employer = Array.isArray(values.employer) ? values.employer[0] : values.employer;

  if (employer) {
    labels.push({
      type: "employer",
      content: employer,
      icon: <Building2 className="size-3" />,
    });
  }

  if (labels.length === 0) {
    labels.push({
      type: "info",
      content: "No record details available",
      icon: <Contact className="size-3" />,
    });
  }

  return labels;
}

export function buildRorHeaderLabels(values: {
  country?: string;
  types?: string | string[];
}): HeaderInfo["labels"] {
  const country = normalizeLabelContent(values.country);
  const types = Array.isArray(values.types)
    ? values.types.map(formatRorType).join(" • ")
    : normalizeLabelContent(values.types);

  return [
    {
      type: "country",
      content: country || "Unknown Country",
      icon: <Globe className="size-3" />,
    },
    {
      type: "types",
      content: types || "Unknown Type",
      icon: <Shapes className="size-3" />,
    },
  ];
}

export const externalSubtitleIcon = <SquareArrowOutUpRight className="ml-1 inline-block size-3" />;