import type { Props as DistributionProps } from "@/components/DistributionChart";
import type { Props as PresentProps } from "@/components/PresentBar";
import { API_URL, FIELDS } from "@/constants";
import type { ApiResponse, Distribution, Format, Present } from "@/types";
import { useQuery } from "@tanstack/react-query";

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

export function fetchApi(...args: Parameters<typeof fetch>) {
  const [input, init] = args;

  const url =
    typeof input === "string"
      ? `${API_URL.replace(/\/$/, "")}/${input.replace(/^\//, "")}`
      : input;

  return fetch(url, init);
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
  clientId: string,
  presentFields: readonly string[],
  distributionFields: readonly string[],
  format: Format<R>,
): Promise<R> {
  const searchParams = new URLSearchParams({
    client_id: clientId,
    present: presentFields.join(","),
    distribution: distributionFields.join(","),
  }).toString();

  const res = await fetchApi(`?${searchParams}`);
  const json = (await res.json()) as ApiResponse;

  const findInPresent = findBuilder(
    json.present,
    (item, desired: string) => item.field === desired,
  );
  const findInDistribution = findBuilder(
    json.distribution,
    (item, desired: string) => item.field === desired,
  );

  const present = presentFields.map(findInPresent).map(toPresentProps);
  const distribution = distributionFields
    .map(findInDistribution)
    .map(toDistributionProps);

  return format(present, distribution);
}

export function createQuery<R>(
  clientId: string,
  key: string,
  fetch: (clientId: string) => Promise<R>,
) {
  return useQuery({
    queryKey: [clientId, key],
    queryFn: () => fetch(clientId),
  });
}

export function findBuilder<T, U>(
  array: T[],
  fn: (a: T, b: U) => boolean,
  defaultValue?: T,
) {
  return (b: U) => array.find((a) => fn(a, b)) || defaultValue;
}
