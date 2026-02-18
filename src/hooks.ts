"use client";

import { useQuery as useTanstackQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { FILTERS, SEARCH_PARAMETERS } from "@/constants";
import type { Entity, Filters } from "@/types";
import { useEntity } from "./data/fetch";

export function useId() {
  const { id: slug } = useParams<{ id?: string[] }>();
  return slug?.[0] || "";
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

export function useQueryId<R>(
  key: string,
  fetch: (id: string, filters: Filters) => Promise<R>,
  placeholderData?: R,
  enabled?: boolean,
) {
  const id = useId();
  const filters = useFilters();

  return useTanstackQuery({
    queryKey: [id, filters, key],
    queryFn: () => fetch(id, filters),
    // @ts-expect-error I don't know exactly why this is giving a type error but it works
    placeholderData,
    enabled,
  });
}

export function useQueryEntity<R>(
  key: string,
  fetch: (entity: Entity, filters: Filters) => Promise<R>,
  placeholderData?: R,
) {
  const { data: entity } = useEntity();

  return useQueryId<R>(
    key,
    (_, filters) => fetch(entity!, filters),
    placeholderData,
    !!entity,
  );
}
