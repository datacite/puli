import { useCreateQuery } from "@/hooks";
import type { Facet, Filters } from "@/types";
import { fetchDatacite, isClient } from "@/util";

export async function fetchResource(id: string) {
  const resourceData = (
    (await (
      await fetchDatacite(`${isClient(id) ? "clients" : "providers"}/${id}`)
    ).json()) as ApiResourceResponse
  ).data;

  return {
    type:
      resourceData.type === "clients"
        ? ("client" as const)
        : resourceData.attributes.memberType === "consortium"
          ? ("consortium" as const)
          : ("provider" as const),
    id,
    name: resourceData.attributes.name,
  };
}

export async function fetchDois(resource: Resource, filters: Filters) {
  const doisSearchParam = new URLSearchParams({
    ...fetchDoisSearchParams(resource, filters),
    facets: ["resourceTypes", "registered"].join(","),
    "page[size]": "0",
  }).toString();

  const doisMeta = (
    (await (
      await fetchDatacite(`dois?${doisSearchParam}`)
    ).json()) as ApiDoisResponse
  ).meta;

  const resourceTypeData =
    doisMeta.resourceTypes?.map((f) => ({
      id: f.id,
      type: f.title,
      count: f.count,
    })) || [];

  const registrationYears = doisMeta.registered || [];

  return {
    total: doisMeta.total,
    resourceTypeData,
    registrationYears,
    registrationsData: registrationYears.reverse().map((f) => ({
      year: f.id,
      count: f.count,
    })),
  };
}

export function useResource() {
  return useCreateQuery("resource", fetchResource);
}

export function useDois() {
  const { data } = useResource();

  return useCreateQuery(
    "overview",
    (_, filters) => fetchDois(data!, filters),
    !!data,
  );
}

export const fetchDoisSearchParams = (resource: Resource, filters: Filters) =>
  ({
    [`${resource.type}-id`]: resource.id,
    query: filters.query || "",
    registered: filters.registered || "",
    "resource-type-id": filters.resourceType || "",
    state: "findable",
  }) as const;

type ApiClientResponse = {
  data: {
    id: string;
    type: "clients";
    attributes: {
      name: string;
      clientType: "repository";
    };
  };
};

type ApiDirectMemberResponse = {
  data: {
    id: string;
    type: "providers";
    attributes: {
      name: string;
      memberType: "direct_member";
    };
  };
};

type ApiConsortiumOrganizationResponse = {
  data: {
    id: string;
    type: "providers";
    attributes: {
      name: string;
      memberType: "consortium_organization";
    };
  };
};

type ApiConsortiumResponse = {
  data: {
    id: string;
    type: "providers";
    attributes: {
      name: string;
      memberType: "consortium";
    };
  };
};

type ApiProviderResponse =
  | ApiConsortiumResponse
  | ApiConsortiumOrganizationResponse
  | ApiDirectMemberResponse;
type ApiResourceResponse = ApiProviderResponse | ApiClientResponse;

type Resource = Awaited<ReturnType<typeof fetchResource>>;

type ApiDoisResponse = {
  meta: {
    total: number;
    totalPages: number;
    page: number;
    resourceTypes: Facet[];
    registered: Facet[];
  };
};
