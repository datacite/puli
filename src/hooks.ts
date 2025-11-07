"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export function useClientId() {
  const { clientId } = useParams<{ clientId: string }>();
  return clientId;
}

export function useFilterQuery() {
  const searchParams = useSearchParams();
  const filterQuery = ["query", "registrationYear", "resourceType"]
    .map((p) => searchParams.get(p))
    .filter(Boolean)
    .join(" AND ");

  return filterQuery;
}

export function useCreateQuery<R>(
  key: string,
  fetch: (clientId: string, query: string) => Promise<R>,
) {
  const clientId = useClientId();
  const query = useFilterQuery();

  return useQuery({
    queryKey: [clientId, query, key],
    queryFn: () => fetch(clientId, query),
  });
}
