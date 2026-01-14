import { useCreateQuery } from "@/hooks";
import type { Facet, Filters } from "@/types";
import { fetchDatacite } from "@/util";

export async function fetchOverview(id: string, filters: Filters) {
  const [client, dois] = await Promise.all([
    fetchClient(id),
    fetchDois(id, filters),
  ]);

  return {
    ...client,
    ...dois,
  };
}

export default function useOverview() {
  return useCreateQuery("overview", fetchOverview);
}

async function fetchClient(clientId: string) {
  const res = await fetchDatacite(`clients/${clientId}`);
  const json = (await res.json()) as ApiClientResponse;

  return {
    name: json.data.attributes.name,
  };
}

export const fetchDoisSearchParams = (id: string, filters: Filters) =>
  ({
    "client-id": id,
    query: filters.query || "",
    registered: filters.registered || "",
    "resource-type-id": filters.resourceType || "",
    state: "findable",
  }) as const;

async function fetchDois(id: string, filters: Filters) {
  const doisSearchParam = new URLSearchParams({
    ...fetchDoisSearchParams(id, filters),
    facets: ["resourceTypes", "registered"].join(","),
    "page[size]": "0",
  }).toString();

  const res = await fetchDatacite(`dois?${doisSearchParam}`);
  const json = (await res.json()) as ApiDoisResponse;

  const resourceTypeData =
    json.meta.resourceTypes?.map((f) => ({
      id: f.id,
      type: f.title,
      count: f.count,
    })) || [];

  const registrationYears = json.meta.registered || [];

  return {
    totalDois: json.meta.total,
    resourceTypeData,
    registrationYears,
    doiRegistrationsData: registrationYears.reverse().map((f) => ({
      year: f.id,
      count: f.count,
    })),
  };
}

type ApiClientResponse = {
  data: {
    id: string;
    attributes: {
      name: string;
    };
  };
};

type ApiDoisResponse = {
  meta: {
    total: number;
    totalPages: number;
    page: number;
    resourceTypes: Facet[];
    registered: Facet[];
  };
};
