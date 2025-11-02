import { API_URL, FIELDS } from "@/constants";
import type { Distribution, Present } from "@/types";

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

export function toPresentProperty(item: Present) {
  const field = FIELDS[item.field];
  if (!field) throw new Error(`Field info for "${item.field}" not found`);

  return {
    property: field.label || item.field,
    present: item.percent,
    isHighImpact: field.isHighImpact,
  };
}

export function toDistributionProperty(item: Distribution["values"][number]) {
  return {
    value: item.value,
    present: item.percent,
  };
}

export function fetchApi(...args: Parameters<typeof fetch>) {
  const [input, init] = args;

  const url =
    typeof input === "string"
      ? `${API_URL.replace(/\/$/, "")}/${input.replace(/^\//, "")}`
      : input;

  return fetch(url, init);
}

export function findBuilder<T, U>(
  array: T[],
  fn: (a: T, b: U) => boolean,
  defaultValue?: T,
) {
  if (!Array.isArray(array)) throw new Error("Input is not an array");
  return (b: U) => array.find((a) => fn(a, b)) || defaultValue;
}
