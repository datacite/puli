"use client";

import { useRef } from "react";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { fetchDoiFacetValues } from "@/data/fetch";
import type { DoiFacetValue } from "@/types";

export type DoiFacetQueryRequest = {
  id: string;
  facetKey: string;
  query: string;
  enabled?: boolean;
};

type DoiFacetQueryState = {
  valuesById: Record<string, DoiFacetValue[]>;
  isPendingById: Record<string, boolean>;
  isFetchingById: Record<string, boolean>;
  isFetchedById: Record<string, boolean>;
};

function normalizeFacetQuery(query: string) {
  return query.trim();
}

export function getDoiFacetQueryKey(facetKey: string, query: string) {
  return ["dois-page", "facet-values", facetKey, normalizeFacetQuery(query)] as const;
}

export function useDoiFacetValues(requests: DoiFacetQueryRequest[]): DoiFacetQueryState {
  const lastKnownValuesRef = useRef<Record<string, DoiFacetValue[]>>({});

  const queryResults = useQueries({
    queries: requests.map((request) => {
      const normalizedQuery = normalizeFacetQuery(request.query);

      return {
        queryKey: getDoiFacetQueryKey(request.facetKey, normalizedQuery),
        queryFn: () => fetchDoiFacetValues(request.facetKey, normalizedQuery),
        enabled: request.enabled ?? true,
        staleTime: 30 * 1000,
        placeholderData: keepPreviousData,
      };
    }),
  });

  const valuesById: Record<string, DoiFacetValue[]> = {};
  const isPendingById: Record<string, boolean> = {};
  const isFetchingById: Record<string, boolean> = {};
  const isFetchedById: Record<string, boolean> = {};

  requests.forEach((request, index) => {
    const result = queryResults[index];
    const nextValues = result.data;

    if (nextValues !== undefined) {
      lastKnownValuesRef.current[request.id] = nextValues;
    }

    valuesById[request.id] = nextValues ?? lastKnownValuesRef.current[request.id] ?? [];
    isPendingById[request.id] = result.isPending;
    isFetchingById[request.id] = result.isFetching;
    isFetchedById[request.id] = result.isFetched;
  });

  return {
    valuesById,
    isPendingById,
    isFetchingById,
    isFetchedById,
  };
}
