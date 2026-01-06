"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { FILTERS, SEARCH_PARAMETERS } from "@/constants";
import type { Filters } from "@/types";

export function useClientId() {
  const { clientId } = useParams<{ clientId: string }>();
  return clientId;
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
