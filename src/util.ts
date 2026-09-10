import type { Props as DistributionProps } from "@/components/DistributionChart";
import type { Props as PresentProps } from "@/components/PresentBar";
import {
  API_URL_COMPLETENESS,
  API_URL_DATACITE,
  FIELDS,
} from "@/constants";
import type {
  Distribution,
  DoiFacetValue,
  DoiFacetValueField,
  DoiFacetValueFormat,
  Entity,
  Filters,
  Format,
  Present,
} from "@/types";

export type MetadataDrilldownKind = "with" | "without";

export function pascal(str: string) {
  return str
    .replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase())
    .replace(/\s+/g, "");
}

export function round(num: number, places = 1) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}

export function asPercent(value: number | string) {
  return `${value}%`;
}

export function asRoundedPercent(value: number, places = 1) {
  return asPercent(round(value, places));
}

export function asNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function escapeQuery(query: string) {
  return query.replace(/[+\-=&|><!(){}[\]^"~*?:\\/.]/g, "\\$&");
}

export function escapeDoiQuery(query: string) {
  return query.replace(/[+\-=&|><!(){}[\]^"~*?:\\.]/g, "\\$&");
}

export function normalizeDoiBaseQuery(query: string, advancedSearch?: boolean) {
  const trimmed = query.trim();
  if (!trimmed) return "";
  return advancedSearch ? trimmed : escapeDoiQuery(trimmed);
}

export function formatMissingFacetTitle(value: string) {
  if (/^[a-z0-9]+(?:[-_][a-z0-9]+)+$/.test(value)) {
    return value
      .split(/[-_]+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  return value;
}

export function buildDoiFacetClause(
  queryField: string,
  values: DoiFacetValue[],
  valueField: DoiFacetValueField = "title",
  valueFormat: DoiFacetValueFormat = "raw",
  valuePrefix = "",
) {
  if (values.length === 0) return "";

  if (valueFormat === "year-range") {
    const ranges = values
      .map((value) => (valueField === "id" ? value.id : value.title))
      .filter((year) => /^\d{4}$/.test(year))
      .map((year) => `[${year}-01-01 TO ${year}-12-31]`);

    if (ranges.length === 0) return "";
    if (ranges.length === 1) return `${queryField}:${ranges[0]}`;

    return `${queryField}:(${ranges.join(" OR ")})`;
  }

  if (values.length === 1) {
    const raw = valueField === "id" ? values[0].id : values[0].title;
    return `${queryField}:"${(valuePrefix + raw).replace(/"/g, '\\"')}"`;
  }

  const joined = values
    .map((value) => {
      const raw = valueField === "id" ? value.id : value.title;
      return `"${(valuePrefix + raw).replace(/"/g, '\\"')}"`;
    })
    .join(" OR ");

  return `${queryField}:(${joined})`;
}

export function buildCombinedDoiQuery(baseQuery: string, facetClauses: string[]) {
  const cleanBase = baseQuery.trim();
  const cleanFacets = facetClauses.filter(Boolean);

  if (!cleanBase && cleanFacets.length === 0) return "";
  if (!cleanBase) return cleanFacets.join(" AND ");
  if (cleanFacets.length === 0) return cleanBase;

  return `(${cleanBase}) AND (${cleanFacets.join(" AND ")})`;
}

export function withFixedDoiQuery(fixedQuery: string | undefined, query: string) {
  if (!fixedQuery?.trim()) return query;

  const clean = query.trim();
  return clean ? `(${fixedQuery}) AND (${clean})` : fixedQuery;
}

export function parseCommaSeparatedParam(value: string | null) {
  if (!value) return [] as string[];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getDoiFacetStoredValues(
  values: Record<string, DoiFacetValue[]>,
  facetKey: string,
  valueField?: DoiFacetValueField,
) {
  const field = valueField === "id" ? "id" : "title";
  return values[facetKey]?.map((item) => item[field]) || [];
}

export function buildMetadataDrilldownQuery({
  field,
  kind,
  value,
}: {
  field: string;
  kind: MetadataDrilldownKind;
  value?: string;
}) {
  const hasValue = typeof value === "string" && value.trim().length > 0;
  if (hasValue) {
    return `${kind === "without" ? "NOT " : ""}${field}:"${value.trim()}"`;
  }

  return `${kind === "without" ? "NOT " : ""}${field}:*`;
}

export function buildEntityScopeClause(
  entityId: string | undefined,
  entityType?: Entity["type"],
) {
  if (!entityId) return undefined;

  const scopeField = entityType === "repository"
    ? "client.id"
    : entityType === "consortium"
      ? "consortium_id"
      : entityType
        ? "provider.id"
        : entityId.includes(".")
          ? "client.id"
          : "provider.id";

  return `${scopeField}:${entityId}`;
}

export function fetchApiBase(
  baseUrl: string,
  ...args: Parameters<typeof fetch>
) {
  const [input, init] = args;

  const url =
    typeof input === "string"
      ? `${baseUrl.replace(/\/$/, "")}/${input.replace(/^\//, "")}`
      : input;

  return fetch(url, init);
}

export function fetchCompleteness(...args: Parameters<typeof fetch>) {
  return fetchApiBase(API_URL_COMPLETENESS, ...args);
}

export function fetchDatacite(...args: Parameters<typeof fetch>) {
  const [input, init] = args;

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/vnd.api+json",
      ...(init?.headers ?? {}),
    },
    ...init,
  };

  return fetchApiBase(API_URL_DATACITE, input, options);
}

export function createFormat<R>(fn: Format<R>): Format<R> {
  return fn;
}

function toPresentProps(item?: Present): PresentProps {
  if (!item) throw new Error("Present item is undefined");

  const field = FIELDS[item.field];
  if (!field) console.error(`Field info for "${item.field}" not found`);

  return {
    property: field?.label || item.field,
    metadataField: item.field,
    present: item.percent,
    withCount: item.count,
    withoutCount: item.absent_count,
    isHighImpact: field?.isHighImpact || false,
  };
}

function toDistributionProps(item?: Distribution): DistributionProps {
  if (!item) throw new Error("Distribution item is undefined");

  const field = FIELDS[item.field];
  if (!field) console.error(`Field info for "${item.field}" not found`);

  return {
    property: field?.label || item.field,
    metadataField: item.field,
    data: item.values.map((value) => ({
      value: value.value,
      present: value.percent,
    })),
  };
}

export function buildPlaceholderData<R>(
  format: Format<R>,
  fields: { present: readonly string[]; distribution: readonly string[] },
) {
  return format(
    fields.present.map((f) =>
      toPresentProps({ field: f, percent: 0, count: 0, absent_count: 0 }),
    ),
    fields.distribution.map((f) =>
      toDistributionProps({ field: f, values: [] }),
    ),
  );
}

export async function fetchFields<R>(
  entity: Entity,
  fields: { present: readonly string[]; distribution: readonly string[] },
  filters: Filters,
  format: Format<R>,
): Promise<R> {
  const searchParams = new URLSearchParams({
    ...(entity.role !== "datacite" && { [`${entity.role}_id`]: entity.id }),
    present: fields.present.join(","),
    distribution: fields.distribution.join(","),
    query: filters.openSearchQuery || "",
  }).toString();

  const res = await fetchCompleteness(`?${searchParams}`);
  const json = (await res.json()) as {
    present: Present[];
    distribution: Distribution[];
  };

  const findInPresent = findBuilder(
    json.present,
    (item, desired: string) => item.field === desired,
  );
  const findInDistribution = findBuilder(
    json.distribution,
    (item, desired: string) => item.field === desired,
  );

  const present = fields.present.map(findInPresent).map(toPresentProps);
  const distribution = fields.distribution
    .map(findInDistribution)
    .map(toDistributionProps);

  return format(present, distribution);
}

export const isClient = (id: string) => id.includes(".");

export function findBuilder<T, U>(
  array: T[],
  fn: (a: T, b: U) => boolean,
  defaultValue?: T,
) {
  return (b: U) => array.find((a) => fn(a, b)) || defaultValue;
}

export function formatFieldName(field: string) {
  const fields = field.split(".");
  const formatted = fields.map((f) => FIELDS[f]?.label || f).join(" > ");
  return formatted.charAt(0).toLowerCase() + formatted.slice(1);
}

