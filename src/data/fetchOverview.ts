import { useCreateQuery } from "@/hooks";
import type { Facet, Filters } from "@/types";
import { fetchDatacite } from "@/util";

export async function fetchOverview(clientId: string, filters: Filters) {
  const [client, dois] = await Promise.all([
    fetchClient(clientId),
    fetchDois(clientId, filters),
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

async function fetchDois(clientId: string, filters: Filters) {
  const doisSearchParam = new URLSearchParams({
    "client-id": clientId,
    query: filters.query || "",
    registered: filters.registered || "",
    "resource-type-id": filters.resourceType || "",
    facets: ["resourceTypes", "registered"].join(","),
    state: "findable",
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

  // Extract registration counts for the last 3 years
  const registrationYears = json.meta.registered || [];
  const find = (yearNum: number) => {
    const year = yearNum.toString();
    const reg = registrationYears.find((r) => r.id === year);
    return { year, count: reg?.count || 0 };
  };
  const currentYear = new Date().getFullYear();
  const doiRegistrationsData = [
    find(currentYear - 2),
    find(currentYear - 1),
    find(currentYear),
  ];

  return {
    totalDois: json.meta.total,
    resourceTypeData,
    registrationYears,
    doiRegistrationsData,
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
