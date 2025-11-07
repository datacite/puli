import type { Facet } from "@/types";
import { createQuery, fetchApiDatacite } from "@/util";

export async function fetchOverview(clientId: string) {
  const [client, dois, registrations] = await Promise.all([
    fetchClient(clientId),
    fetchDois(clientId),
    fetchRegistrations(clientId),
  ]);

  return {
    ...client,
    ...dois,
    ...registrations,
  };
}

const useOverview = (clientId: string) =>
  createQuery(clientId, "overview", fetchOverview);
export default useOverview;

async function fetchClient(clientId: string) {
  const res = await fetchApiDatacite(`clients/${clientId}`);
  const json = (await res.json()) as ApiClientResponse;

  return {
    name: json.data.attributes.name,
  };
}

async function fetchDois(clientId: string) {
  const doisSearchParam = new URLSearchParams({
    "client-id": clientId,
    facets: ["resourceTypes"].join(","),
    state: "findable",
    "page[size]": "0",
  }).toString();

  const res = await fetchApiDatacite(`dois?${doisSearchParam}`);
  const json = (await res.json()) as ApiDoisResponse;

  return {
    totalDois: json.meta.total,
    resourceTypeData: json.meta.resourceTypes.map((f) => ({
      type: f.title,
      count: f.count,
    })),
  };
}

async function fetchRegistrations(clientId: string) {
  const clientsSearchParam = new URLSearchParams({
    "provider-id": clientId.split(".")[0],
    state: "findable",
  }).toString();

  const res = await fetchApiDatacite(`clients/totals?${clientsSearchParam}`);
  const json = (await res.json()) as ApiClientTotalsResponse;

  const client = json.find((item) => item.id === clientId);
  if (!client)
    throw new Error(`Client with ID ${clientId} not found in overview data.`);

  const doiRegistrationsData = [
    client.temporal.two_years_ago,
    client.temporal.last_year,
    client.temporal.this_year,
  ].map((year) => ({ year: year[0]?.title || "", count: year[0]?.count || 0 }));

  return { doiRegistrationsData };
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
  };
};

type ApiClientTotalsResponse = {
  id: string;
  title: string;
  count: number;
  temporal: {
    this_month: Facet[];
    this_year: Facet[];
    last_year: Facet[];
    two_years_ago: Facet[];
  };
  states: Facet[];
}[];
