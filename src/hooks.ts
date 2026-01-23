"use client";

import { useQuery as useTanstackQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { FILTERS, SEARCH_PARAMETERS } from "@/constants";
import type { Filters, Resource } from "@/types";
import { useResource } from "./data/fetch";

export function useId() {
  const { id } = useParams<{ id: string }>();
  return id;
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
  initialData?: R,
  enabled?: boolean,
) {
  const id = useId();
  const filters = useFilters();

  return useTanstackQuery({
    queryKey: [id, filters, key],
    queryFn: () => fetch(id, filters),
    initialData,
    staleTime: 0,
    enabled,
  });
}

export function useQueryResource<R>(
  key: string,
  fetch: (resource: Resource, filters: Filters) => Promise<R>,
  initialData?: R,
) {
  const { data: resource } = useResource();

  return useQueryId<R>(
    key,
    (_, filters) => fetch(resource!, filters),
    initialData,
    !!resource && !!resource.id === !!resource.type,
  );
}
