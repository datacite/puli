"use client";

import { useQuery as useTanstackQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FILTERS, SEARCH_PARAMETERS } from "@/constants";
import type { Entity, Filters } from "@/types";

export function useDebounce<T>(
  value: T,
  callback: (value: T) => void,
  delay: number,
) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
      callback(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, callback, delay]);

  return debounceValue;
}

export function useFilters() {
  const searchParams = useSearchParams();

  const openSearchQuery = Object.values(SEARCH_PARAMETERS)
    .filter((f) => searchParams.has(f))
    .map((f) => FILTERS[f](searchParams.get(f) as string))
    .join(" AND ");

  return {
    query: searchParams.get(SEARCH_PARAMETERS.QUERY),
    registered: searchParams.get(SEARCH_PARAMETERS.REGISTRATION_YEAR),
    resourceType: searchParams.get(SEARCH_PARAMETERS.RESOURCE_TYPE),
    openSearchQuery,
  } satisfies Filters;
}

export function useQuery<R>(
  entity: Entity,
  key: string,
  fetch: (entity: Entity, filters: Filters) => Promise<R>,
  placeholderData?: R,
) {
  const filters = useFilters();

  return useTanstackQuery({
    queryKey: [entity.id, filters, key],
    queryFn: () => fetch(entity, filters),
    // @ts-expect-error I don't know exactly why this is giving a type error but it works
    placeholderData,
  });
}
