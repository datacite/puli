import type { Props as DistributionProps } from "@/components/DistributionChart";
import type { Props as PresentProps } from "@/components/PresentBar";
import { API_URL_COMPLETENESS, API_URL_DATACITE, FIELDS } from "@/constants";
import type {
  ApiResponse,
  Distribution,
  Filters,
  Format,
  Present,
  Resource,
} from "@/types";

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
  return value.toLocaleString();
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
    present: item.percent,
    isHighImpact: field?.isHighImpact || false,
  };
}

function toDistributionProps(item?: Distribution): DistributionProps {
  if (!item) throw new Error("Distribution item is undefined");

  const field = FIELDS[item.field];
  if (!field) console.error(`Field info for "${item.field}" not found`);

  return {
    property: field?.label || item.field,
    data: item.values.map((value) => ({
      value: value.value,
      present: value.percent,
    })),
  };
}

export async function fetchFields<R>(
  resource: Resource,
  fields: { present: readonly string[]; distribution: readonly string[] },
  filters: Filters,
  format: Format<R>,
): Promise<R> {
  const searchParams = new URLSearchParams({
    [`${resource.type}_id`]: resource.id,
    present: fields.present.join(","),
    distribution: fields.distribution.join(","),
    query: filters.openSearchQuery || "",
  }).toString();

  const res = await fetchCompleteness(`?${searchParams}`);
  const json = (await res.json()) as ApiResponse;

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
