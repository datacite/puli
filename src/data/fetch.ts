import { COMPLETENESS_FIELDS } from "@/constants";
import { useId, useQueryId, useQueryResource } from "@/hooks";
import type { Facet, Filters, Resource } from "@/types";
import {
  buildInitialData,
  createFormat,
  fetchDatacite,
  fetchFields,
  isClient,
} from "@/util";

// Overview //////////////////////////////////////

const NAME_ALL = "All of DataCite" as const;

export async function fetchResource(id: string | undefined) {
  if (!id)
    return { id: "", type: undefined, name: NAME_ALL, ancestors: [] } as const;

  // Fetch Resource
  const resourceData = (
    (await (
      await fetchDatacite(`${isClient(id) ? "clients" : "providers"}/${id}`, {
        cache: "force-cache",
      })
    ).json()) as ApiResourceResponse
  ).data;

  if (!resourceData)
    return { id, type: undefined, name: id, ancestors: [] } as const;

  // Fetch Ancestors
  const parentId =
    resourceData.type === "clients"
      ? resourceData.relationships.provider.data.id
      : resourceData.relationships.consortium?.data.id;

  const grandparentId =
    resourceData.type === "clients"
      ? resourceData.relationships.consortium?.data.id
      : null;

  const [parent, grandparent] = await Promise.all(
    [parentId, grandparentId].map(async (id) => {
      if (!id) return null;

      const provider = (await (
        await fetchDatacite(`providers/${id}`)
      ).json()) as ApiProviderResponse;

      if (!provider.data) return null;
      return {
        id: provider.data.id,
        type:
          provider.data.attributes.memberType === "consortium"
            ? "consortium"
            : "organization",
        name: provider.data.attributes.name,
      };
    }),
  );

  return {
    id,
    type:
      resourceData.type === "clients"
        ? ("client" as const)
        : resourceData.attributes.memberType === "consortium"
          ? ("consortium" as const)
          : ("provider" as const),
    name: resourceData.attributes.name,
    ancestors: [parent, grandparent].filter((a) => !!a),
  } as const;
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
  const id = useId();
  return useQueryId("resource", fetchResource, {
    id,
    type: undefined,
    name: id || NAME_ALL,
    ancestors: [],
  });
}

const LAST_10_YEARS = Array.from({ length: 10 }, (_, i) =>
  (new Date().getFullYear() - (9 - i)).toString(),
);

export function useDois() {
  return useQueryResource("overview", fetchDois, {
    total: 0,
    registrationYears: LAST_10_YEARS.map((id) => ({ id, title: id, count: 0 })),
    registrationsData: LAST_10_YEARS.map((year) => ({ year, count: 0 })),
    resourceTypeData: [],
  });
}

export const fetchDoisSearchParams = (resource: Resource, filters: Filters) =>
  ({
    ...(resource.type && { [`${resource.type}-id`]: resource.id }),
    query: filters.query || "",
    registered: filters.registered || "",
    "resource-type-id": filters.resourceType || "",
    state: "findable",
  }) as const;

type Relationship<
  Title extends string,
  IsOptional extends boolean = false,
  IsArray extends boolean = false,
> = {
  title: Title;
  isArray: IsArray;
  isOptional: IsOptional;
};

type Relationships<
  T extends readonly Relationship<string, boolean, boolean>[],
> = {
  // required relationships
  [D in T[number]as D["isOptional"] extends false
  ? D["title"]
  : never]: D["isArray"] extends true
  ? ApiRelationshipResponse[]
  : ApiRelationshipResponse;
} & {
    // optional relationships
    [D in T[number]as D["isOptional"] extends true
    ? D["title"]
    : never]?: D["isArray"] extends true
    ? ApiRelationshipResponse[]
    : ApiRelationshipResponse;
  };

type ApiRelationshipResponse = { data: { id: string; type: string } };

type ApiResponse<
  T extends "clients" | "providers",
  A extends object,
  R extends readonly Relationship<string, boolean, boolean>[],
> = {
  data:
  | {
    id: string;
    type: T;
    attributes: { name: string } & A;
    relationships: Relationships<R>;
  }
  | undefined;
};

type ApiClientResponse = ApiResponse<
  "clients",
  { clientType: "repository" },
  [Relationship<"provider">, Relationship<"consortium", true>]
>;

type ApiProviderResponse = ApiResponse<
  "providers",
  { memberType: "direct_member" | "consortium_organization" | "consortium" },
  [Relationship<"consortium", true>]
>;

type ApiResourceResponse = ApiProviderResponse | ApiClientResponse;

type ApiDoisResponse = {
  meta: {
    total: number;
    totalPages: number;
    page: number;
    resourceTypes: Facet[];
    registered: Facet[];
  };
};

// Completeness //////////////////////////////////

// Creators
const formatCreators = createFormat((p, d) => ({
  creators: p[0],
  properties: p.slice(1, 5),
  nameIdentifier: p[5],
  nameIdentifierScheme: d[0],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[1],
}));

export const fetchCreators = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.CREATORS,
    filters,
    formatCreators,
  );

export function useCreators() {
  return useQueryResource(
    "creators",
    fetchCreators,
    buildInitialData(formatCreators, COMPLETENESS_FIELDS.CREATORS),
  );
}

// Contributors
const formatContributors = createFormat((p, d) => ({
  contributors: p[0],
  properties: p.slice(1, 5),
  contributorType: d[0],
  nameIdentifier: p[5],
  nameIdentifierScheme: d[1],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[2],
}));

export const fetchContributors = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.CONTRIBUTORS,
    filters,
    formatContributors,
  );

export function useContributors() {
  return useQueryResource(
    "contributors",
    fetchContributors,
    buildInitialData(formatContributors, COMPLETENESS_FIELDS.CONTRIBUTORS),
  );
}

// Related Identifiers
const formatRelatedIdentifiers = createFormat((p, d) => ({
  relatedIdentifiers: p[0],
  relationType: d[0],
  relatedIdentifierType: d[1],
  resourceTypeGeneral: d[2],
}));

export const fetchRelatedIdentifiers = async (
  resource: Resource,
  filters: Filters,
) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.RELATED_IDENTIFIERS,
    filters,
    formatRelatedIdentifiers,
  );

export function useRelatedIdentifiers() {
  return useQueryResource(
    "relatedIdentifiers",
    fetchRelatedIdentifiers,
    buildInitialData(
      formatRelatedIdentifiers,
      COMPLETENESS_FIELDS.RELATED_IDENTIFIERS,
    ),
  );
}

// Funding References
const formatFundingReferences = createFormat((p, d) => ({
  fundingReferences: p[0],
  funderProperties: p.slice(1, 3),
  funderIdentifierType: d[0],
  awardProperties: p.slice(-3),
}));

export const fetchFundingReferences = async (
  resource: Resource,
  filters: Filters,
) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.FUNDING_REFERENCES,
    filters,
    formatFundingReferences,
  );

export function useFundingReferences() {
  return useQueryResource(
    "fundingReferences",
    fetchFundingReferences,
    buildInitialData(
      formatFundingReferences,
      COMPLETENESS_FIELDS.FUNDING_REFERENCES,
    ),
  );
}

// Publisher
const formatPublisher = createFormat((p, d) => ({
  publisher: p[0],
  publisherIdentifier: p[1],
  publisherIdentifierScheme: d[0],
}));

export const fetchPublisher = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.PUBLISHER,
    filters,
    formatPublisher,
  );

export function usePublisher() {
  return useQueryResource(
    "publisher",
    fetchPublisher,
    buildInitialData(formatPublisher, COMPLETENESS_FIELDS.PUBLISHER),
  );
}

// Resource Type
const formatResourceType = createFormat((p, d) => ({
  resourceType: p[0],
  properties: p.slice(1),
  resourceTypeGeneral: d[0],
}));

export const fetchResourceType = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.RESOURCE_TYPE,
    filters,
    formatResourceType,
  );

export function useResourceType() {
  return useQueryResource(
    "resourceType",
    fetchResourceType,
    buildInitialData(formatResourceType, COMPLETENESS_FIELDS.RESOURCE_TYPE),
  );
}

// Subjects
const formatSubjects = createFormat((p, d) => ({
  subjects: p[0],
  subjectScheme: p[1],
  subjectsSchemeDistribution: d[0],
  valueURI: p[2],
}));

export const fetchSubjects = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.SUBJECTS,
    filters,
    formatSubjects,
  );

export function useSubjects() {
  return useQueryResource(
    "subjects",
    fetchSubjects,
    buildInitialData(formatSubjects, COMPLETENESS_FIELDS.SUBJECTS),
  );
}

// Descriptions
const formatDescriptions = createFormat((p, d) => ({
  descriptions: p[0],
  descriptionType: d[0],
}));

export const fetchDescriptions = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.DESCRIPTIONS,
    filters,
    formatDescriptions,
  );

export function useDescriptions() {
  return useQueryResource(
    "descriptions",
    fetchDescriptions,
    buildInitialData(formatDescriptions, COMPLETENESS_FIELDS.DESCRIPTIONS),
  );
}

// Titles
const formatTitles = createFormat((p, d) => ({
  titles: p[0],
  titleType: d[0],
}));

export const fetchTitles = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.TITLES,
    filters,
    formatTitles,
  );

export function useTitles() {
  return useQueryResource(
    "titles",
    fetchTitles,
    buildInitialData(formatTitles, COMPLETENESS_FIELDS.TITLES),
  );
}

// Rights
const formatRights = createFormat((p, d) => ({
  rights: p[0],
  properties: p.slice(1),
  rightsIdentifier: d[0],
}));

export const fetchRights = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.RIGHTS,
    filters,
    formatRights,
  );

export function useRights() {
  return useQueryResource(
    "rights",
    fetchRights,
    buildInitialData(formatRights, COMPLETENESS_FIELDS.RIGHTS),
  );
}

// Dates
const formatDates = createFormat((p, d) => ({
  dates: p[0],
  dateType: d[0],
  dateInformation: p[1],
}));

export const fetchDates = async (resource: Resource, filters: Filters) =>
  await fetchFields(resource, COMPLETENESS_FIELDS.DATES, filters, formatDates);

export function useDates() {
  return useQueryResource(
    "dates",
    fetchDates,
    buildInitialData(formatDates, COMPLETENESS_FIELDS.DATES),
  );
}

// Other
const formatOther = createFormat((p) => ({
  publicationYear: p[0],
  alternateIdentifiers: p[1],
  language: p[2],
  sizes: p[3],
  formats: p[4],
  version: p[5],
  geoLocation: p[6],
  relatedItem: p[7],
}));

export const fetchOther = async (resource: Resource, filters: Filters) =>
  await fetchFields(resource, COMPLETENESS_FIELDS.OTHER, filters, formatOther);

export function useOther() {
  return useQueryResource(
    "other",
    fetchOther,
    buildInitialData(formatOther, COMPLETENESS_FIELDS.OTHER),
  );
}
