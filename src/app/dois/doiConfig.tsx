import {
  BookCheck,
  BookKey,
  CalendarIcon,
  Globe,
  Languages,
  PackageOpen,
  Shapes,
  Tag,
  User,
} from "lucide-react";
import type { DoiFacetConfig, SelectOption } from "@/types";

export const DOI_RESOURCE_TYPE_PARAM = "resourceType";
export const DOI_PUBLISHED_PARAM = "published";
export const DOI_PAGE_SIZE_PARAM = "pageSize";
export const DOI_PAGE_PARAM = "page";
export const DOI_SORT_PARAM = "sort";

export const DOI_DEFAULT_PAGE_SIZE = 25;
export const DOI_DEFAULT_SORT = "-updated";

export const DOI_FACET_URL_PARAMS: Record<string, string> = {
  resourceTypes: DOI_RESOURCE_TYPE_PARAM,
  published: DOI_PUBLISHED_PARAM,
};

export const DOI_PAGE_SIZE_OPTIONS: SelectOption[] = [
  { id: "25", title: "25" },
  { id: "50", title: "50" },
  { id: "250", title: "250" },
  { id: "1000", title: "1000" },
];

export const DOI_SORT_OPTIONS: SelectOption[] = [
  { id: "relevance", title: "Relevance" },
  { id: "title", title: "Title (A-Z)" },
  { id: "-title", title: "Title (Z-A)" },
  { id: "-created", title: "Created (Newest)" },
  { id: "created", title: "Created (Oldest)" },
  { id: "-updated", title: "Updated (Newest)" },
  { id: "updated", title: "Updated (Oldest)" },
  { id: "-citation-count", title: "Most Cited" },
  { id: "-view-count", title: "Most Viewed" },
  { id: "-download-count", title: "Most Downloaded" },
];

export const DOI_FACET_CONFIGS: DoiFacetConfig[] = [
  {
    key: "resourceTypes",
    label: "Resource Types",
    queryField: "resource_type_id",
    valueField: "id",
    icon: <Shapes className="size-4" />,
  },
  {
    key: "published",
    label: "Publication Year",
    queryField: "publication_year",
    icon: <BookCheck className="size-4" />,
  },
  {
    key: "affiliations",
    label: "Affiliations",
    queryField: "affiliation_id",
    valueField: "id",
    icon: <Globe className="size-4" />,
  },
  {
    key: "creatorsAndContributors",
    label: "Creators & Contributors",
    queryField: "creators_and_contributors.nameIdentifiers.nameIdentifier",
    valueField: "id",
    icon: <User className="size-4" />,
  },
  {
    key: "languages",
    label: "Languages",
    queryField: "language",
    valueField: "id",
    icon: <Languages className="size-4" />,
  },
  {
    key: "prefixes",
    label: "Prefixes",
    queryField: "prefix",
    valueField: "id",
    icon: <Tag className="size-4" />,
  },
  {
    key: "clients",
    label: "Repositories",
    queryField: "client.id",
    valueField: "id",
    icon: <PackageOpen className="size-4" />,
  },
  {
    key: "created",
    label: "Record Created Year",
    queryField: "created",
    valueField: "id",
    valueFormat: "year-range",
    icon: <CalendarIcon className="size-4" />,
  },
  {
    key: "schemaVersions",
    label: "Schema Versions",
    queryField: "schemaVersion",
    valueField: "id",
    valuePrefix: "http://datacite.org/schema/kernel-",
    icon: <BookKey className="size-4" />,
  },
];