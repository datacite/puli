import { COMPLETENESS_FIELDS } from "@/constants";
import { useQueryId, useQueryResource } from "@/hooks";
import type { Facet, Filters } from "@/types";
import { createFormat, fetchDatacite, fetchFields, isClient } from "@/util";

// Overview //////////////////////////////////////
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
  return useQueryId("resource", fetchResource);
}

export function useDois() {
  return useQueryResource("overview", fetchDois);
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
    COMPLETENESS_FIELDS.CREATORS.present,
    COMPLETENESS_FIELDS.CREATORS.distribution,
    filters,
    formatCreators,
  );

export function useCreators() {
  return useQueryResource("creators", fetchCreators);
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
    COMPLETENESS_FIELDS.CONTRIBUTORS.present,
    COMPLETENESS_FIELDS.CONTRIBUTORS.distribution,
    filters,
    formatContributors,
  );

export function useContributors() {
  return useQueryResource("contributors", fetchContributors);
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
    COMPLETENESS_FIELDS.RELATED_IDENTIFIERS.present,
    COMPLETENESS_FIELDS.RELATED_IDENTIFIERS.distribution,
    filters,
    formatRelatedIdentifiers,
  );

export function useRelatedIdentifiers() {
  return useQueryResource("relatedIdentifiers", fetchRelatedIdentifiers);
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
    COMPLETENESS_FIELDS.FUNDING_REFERENCES.present,
    COMPLETENESS_FIELDS.FUNDING_REFERENCES.distribution,
    filters,
    formatFundingReferences,
  );

export function useFundingReferences() {
  return useQueryResource("fundingReferences", fetchFundingReferences);
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
    COMPLETENESS_FIELDS.PUBLISHER.present,
    COMPLETENESS_FIELDS.PUBLISHER.distribution,
    filters,
    formatPublisher,
  );

export function usePublisher() {
  return useQueryResource("publisher", fetchPublisher);
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
    COMPLETENESS_FIELDS.RESOURCE_TYPE.present,
    COMPLETENESS_FIELDS.RESOURCE_TYPE.distribution,
    filters,
    formatResourceType,
  );

export function useResourceType() {
  return useQueryResource("resourceType", fetchResourceType);
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
    COMPLETENESS_FIELDS.SUBJECTS.present,
    COMPLETENESS_FIELDS.SUBJECTS.distribution,
    filters,
    formatSubjects,
  );

export function useSubjects() {
  return useQueryResource("subjects", fetchSubjects);
}

// Descriptions
const formatDescriptions = createFormat((p, d) => ({
  descriptions: p[0],
  descriptionType: d[0],
}));

export const fetchDescriptions = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.DESCRIPTIONS.present,
    COMPLETENESS_FIELDS.DESCRIPTIONS.distribution,
    filters,
    formatDescriptions,
  );

export function useDescriptions() {
  return useQueryResource("descriptions", fetchDescriptions);
}

// Titles
const formatTitles = createFormat((p, d) => ({
  titles: p[0],
  titleType: d[0],
}));

export const fetchTitles = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.TITLES.present,
    COMPLETENESS_FIELDS.TITLES.distribution,
    filters,
    formatTitles,
  );

export function useTitles() {
  return useQueryResource("titles", fetchTitles);
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
    COMPLETENESS_FIELDS.RIGHTS.present,
    COMPLETENESS_FIELDS.RIGHTS.distribution,
    filters,
    formatRights,
  );

export function useRights() {
  return useQueryResource("rights", fetchRights);
}

// Dates
const formatDates = createFormat((p, d) => ({
  dates: p[0],
  dateType: d[0],
  dateInformation: p[1],
}));

export const fetchDates = async (resource: Resource, filters: Filters) =>
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.DATES.present,
    COMPLETENESS_FIELDS.DATES.distribution,
    filters,
    formatDates,
  );

export function useDates() {
  return useQueryResource("dates", fetchDates);
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
  await fetchFields(
    resource,
    COMPLETENESS_FIELDS.OTHER.present,
    COMPLETENESS_FIELDS.OTHER.distribution,
    filters,
    formatOther,
  );

export function useOther() {
  return useQueryResource("other", fetchOther);
}
