"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { SEARCH_PARAMETERS } from "@/constants";
import type { Filters } from "@/types";

const { QUERY, REGISTRATION_YEAR, RESOURCE_TYPE } = SEARCH_PARAMETERS;

const PARAMETERS = [QUERY, REGISTRATION_YEAR, RESOURCE_TYPE] as const;
const FILTERS: Record<string, (str: string) => string> = {
  [QUERY]: (query) => query,
  [REGISTRATION_YEAR]: (year) => `registered:[${year}-01-01 TO ${year}-12-31]`,
  [RESOURCE_TYPE]: (rt) => `types.resourceTypeGeneral:"${rt}"`,
} as const;

export function useClientId() {
  const { clientId } = useParams<{ clientId: string }>();
  return clientId;
}

export function useFilters() {
  const searchParams = useSearchParams();

  const openSearchQuery = PARAMETERS.filter((f) => searchParams.has(f))
    .map((f) => FILTERS[f](searchParams.get(f) as string))
    .join(" AND ");

  return {
    query: searchParams.get(QUERY),
    registered: searchParams.get(REGISTRATION_YEAR),
    resourceType: searchParams.get(RESOURCE_TYPE),
    openSearchQuery,
  } satisfies Filters;
}

export function useCreateQuery<R>(
  key: string,
  fetch: (clientId: string, filters: Filters) => Promise<R>,
) {
  const clientId = useClientId();
  const filters = useFilters();

  return useQuery({
    queryKey: [clientId, filters, key],
    queryFn: () => fetch(clientId, filters),
  });
}
