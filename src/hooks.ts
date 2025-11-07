"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { SEARCH_PARAMETERS } from "@/constants";

const { QUERY, REGISTRATION_YEAR, RESOURCE_TYPE } = SEARCH_PARAMETERS;

const PARAMETERS = [QUERY, REGISTRATION_YEAR, RESOURCE_TYPE] as const;
const FILTERS_PREFIX = {
  [QUERY]: "",
  [REGISTRATION_YEAR]: "publicationYear:",
  [RESOURCE_TYPE]: "types.resourceTypeGeneral:",
} as const;

export function useClientId() {
  const { clientId } = useParams<{ clientId: string }>();
  return clientId;
}

export function useFilterQuery() {
  const searchParams = useSearchParams();

  const filterQuery = PARAMETERS.filter((f) => searchParams.has(f))
    .map((f) => `${FILTERS_PREFIX[f]}"${searchParams.get(f)}"`)
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
