import { useQuery as useTanstackQuery } from "@tanstack/react-query";
import { COMPLETENESS_FIELDS } from "@/constants";
import { useQuery } from "@/hooks";
import type {
  ApiClient,
  ApiDois,
  ApiEntity,
  ApiProvider,
  Entity,
  Filters,
} from "@/types";
import {
  buildPlaceholderData,
  createFormat,
  fetchDatacite,
  fetchFields,
  isClient,
} from "@/util";

// Global Search /////////////////////////////////

export async function searchEntities(
  query: string,
): Promise<{ clients: Entity[]; providers: Entity[] }> {
  if (!query) return { clients: [], providers: [] };

  const searchParams = new URLSearchParams({
    query,
    sort: "relevance",
    "page[size]": "1000",
  }).toString();

  const [clientsData, providersData] = await Promise.all([
    getData<ApiClient<true>>(`clients?${searchParams}`),
    getData<ApiProvider<true>>(`providers?${searchParams}`),
  ]);

  const [clients, providers] = await Promise.all([
    Promise.all(clientsData.map((c) => apiDataToEntity(c))),
    Promise.all(providersData.map((p) => apiDataToEntity(p))),
  ]);

  return {
    clients: clients.filter((c) => c !== null),
    providers: providers.filter((p) => p !== null),
  };
}

export function useSearchEntities(query: string | undefined) {
  return useTanstackQuery({
    queryKey: ["search entities", query],
    queryFn: () => searchEntities(query || ""),
  });
}

async function apiDataToEntity(
  data: ApiEntity["data"],
  populateChildren = false,
  fetchParent = false,
) {
  if (!data) return null;

  const entity = {
    id: data.id,
    type:
      data.type === "clients"
        ? ("client" as const)
        : data.attributes.memberType === "consortium"
          ? ("consortium" as const)
          : ("provider" as const),
    subtype:
      data.type === "clients"
        ? ("repository" as const)
        : data.attributes.memberType,
    name: data.attributes.name,
    children: [],
    parent: null,
  } as Entity;

  if (populateChildren && data.type !== "clients") {
    const childrenData = await getData<ApiEntity<true>>(
      `${data.attributes.memberType === "consortium" ? "providers" : "clients"}?page[size]=1000&${data.attributes.memberType === "consortium" ? "consortium" : "provider"}-id=${data.id}`,
    );

    entity.children = childrenData.map((child) => ({
      id: child.id,
      name: child.attributes.name,
      subtype:
        child.type === "clients"
          ? ("repository" as const)
          : child.attributes.memberType,
    }));
  }

  if (fetchParent)
    entity.parent = await fetchEntity(
      data.type === "clients"
        ? data.relationships.provider.data.id
        : data.relationships.consortium?.data.id || null,
    );

  return entity;
}

const getData = async <T extends { data: unknown }>(url: string) =>
  ((await (await fetchDatacite(url, { cache: "force-cache" })).json()) as T)
    .data as T["data"];

// Overview //////////////////////////////////////

export async function fetchEntity(id: string | null): Promise<Entity | null> {
  if (!id) return null;

  const data = await getData<ApiEntity>(
    `${isClient(id) ? "clients" : "providers"}/${id}`,
  );

  return apiDataToEntity(data, true, true);
}

export async function fetchDois(entity: Entity, filters: Filters) {
  const doisSearchParam = new URLSearchParams({
    ...fetchDoisSearchParams(entity, filters),
    facets: ["resourceTypes", "registered"].join(","),
    "page[size]": "0",
  }).toString();

  const doisMeta = (
    (await (await fetchDatacite(`dois?${doisSearchParam}`)).json()) as ApiDois
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
    registrationsData: [...registrationYears].reverse().map((f) => ({
      year: f.id,
      count: f.count,
    })),
  };
}

const LAST_10_YEARS = Array.from({ length: 10 }, (_, i) =>
  (new Date().getFullYear() - (9 - i)).toString(),
);

export function useDois(entity: Entity) {
  return useQuery(entity, "overview", fetchDois, {
    total: 0,
    registrationYears: LAST_10_YEARS.map((id) => ({ id, title: id, count: 0 })),
    registrationsData: LAST_10_YEARS.map((year) => ({ year, count: 0 })),
    resourceTypeData: [],
  });
}

export const fetchDoisSearchParams = (entity: Entity, filters: Filters) =>
  ({
    [`${entity.type}-id`]: entity.id,
    query: filters.query || "",
    registered: filters.registered || "",
    "resource-type-id": filters.resourceType || "",
    state: "findable",
  }) as const;

// Completeness //////////////////////////////////

// Creators
const formatCreators = createFormat((p, d) => ({
  creators: p[0],
  properties: p.slice(1, 5),
  nameIdentifier: p.slice(5, 7),
  nameIdentifierScheme: d[0],
  affiliation: p.slice(-3),
  affiliationIdentifierScheme: d[1],
}));

export const fetchCreators = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.CREATORS,
    filters,
    formatCreators,
  );

export function useCreators(entity: Entity) {
  return useQuery(
    entity,
    "creators",
    fetchCreators,
    buildPlaceholderData(formatCreators, COMPLETENESS_FIELDS.CREATORS),
  );
}

// Contributors
const formatContributors = createFormat((p, d) => ({
  contributors: p[0],
  properties: p.slice(1, 6),
  contributorType: d[0],
  nameIdentifier: p.slice(6, 8),
  nameIdentifierScheme: d[1],
  affiliation: p.slice(-3),
  affiliationIdentifierScheme: d[2],
}));

export const fetchContributors = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.CONTRIBUTORS,
    filters,
    formatContributors,
  );

export function useContributors(entity: Entity) {
  return useQuery(
    entity,
    "contributors",
    fetchContributors,
    buildPlaceholderData(formatContributors, COMPLETENESS_FIELDS.CONTRIBUTORS),
  );
}

// Related Identifiers
const formatRelatedIdentifiers = createFormat((p, d) => ({
  relatedIdentifiers: p[0],
  relationType: p[1],
  relationTypeDistribution: d[0],
  relatedIdentifierType: p[2],
  relatedIdentifierTypeDistribution: d[1],
  resourceTypeGeneral: p[3],
  resourceTypeGeneralDistribution: d[2],
}));

export const fetchRelatedIdentifiers = async (
  entity: Entity,
  filters: Filters,
) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.RELATED_IDENTIFIERS,
    filters,
    formatRelatedIdentifiers,
  );

export function useRelatedIdentifiers(entity: Entity) {
  return useQuery(
    entity,
    "relatedIdentifiers",
    fetchRelatedIdentifiers,
    buildPlaceholderData(
      formatRelatedIdentifiers,
      COMPLETENESS_FIELDS.RELATED_IDENTIFIERS,
    ),
  );
}

// Funding References
const formatFundingReferences = createFormat((p, d) => ({
  fundingReferences: p[0],
  funderProperties: p.slice(1, 4),
  funderIdentifierType: d[0],
  awardProperties: p.slice(-3),
}));

export const fetchFundingReferences = async (
  entity: Entity,
  filters: Filters,
) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.FUNDING_REFERENCES,
    filters,
    formatFundingReferences,
  );

export function useFundingReferences(entity: Entity) {
  return useQuery(
    entity,
    "fundingReferences",
    fetchFundingReferences,
    buildPlaceholderData(
      formatFundingReferences,
      COMPLETENESS_FIELDS.FUNDING_REFERENCES,
    ),
  );
}

// Publisher
const formatPublisher = createFormat((p, d) => ({
  publisher: p[0],
  publisherIdentifier: p.slice(1, 3),
  publisherIdentifierScheme: d[0],
}));

export const fetchPublisher = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.PUBLISHER,
    filters,
    formatPublisher,
  );

export function usePublisher(entity: Entity) {
  return useQuery(
    entity,
    "publisher",
    fetchPublisher,
    buildPlaceholderData(formatPublisher, COMPLETENESS_FIELDS.PUBLISHER),
  );
}

// Resource Type
const formatResourceType = createFormat((p, d) => ({
  resourceType: p[0],
  properties: p.slice(1),
  resourceTypeGeneral: d[0],
}));

export const fetchResourceType = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.RESOURCE_TYPE,
    filters,
    formatResourceType,
  );

export function useResourceType(entity: Entity) {
  return useQuery(
    entity,
    "resourceType",
    fetchResourceType,
    buildPlaceholderData(formatResourceType, COMPLETENESS_FIELDS.RESOURCE_TYPE),
  );
}

// Subjects
const formatSubjects = createFormat((p, d) => ({
  subjects: p[0],
  subjectScheme: p[1],
  subjectsSchemeDistribution: d[0],
  valueURI: p[2],
}));

export const fetchSubjects = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.SUBJECTS,
    filters,
    formatSubjects,
  );

export function useSubjects(entity: Entity) {
  return useQuery(
    entity,
    "subjects",
    fetchSubjects,
    buildPlaceholderData(formatSubjects, COMPLETENESS_FIELDS.SUBJECTS),
  );
}

// Descriptions
const formatDescriptions = createFormat((p, d) => ({
  descriptions: p[0],
  descriptionsProperties: p.slice(1, 2),
  descriptionType: d[0],
}));

export const fetchDescriptions = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.DESCRIPTIONS,
    filters,
    formatDescriptions,
  );

export function useDescriptions(entity: Entity) {
  return useQuery(
    entity,
    "descriptions",
    fetchDescriptions,
    buildPlaceholderData(formatDescriptions, COMPLETENESS_FIELDS.DESCRIPTIONS),
  );
}

// Titles
const formatTitles = createFormat((p, d) => ({
  titles: p[0],
  titleProperties: p.slice(1, 2),
  titleType: d[0],
}));

export const fetchTitles = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.TITLES, filters, formatTitles);

export function useTitles(entity: Entity) {
  return useQuery(
    entity,
    "titles",
    fetchTitles,
    buildPlaceholderData(formatTitles, COMPLETENESS_FIELDS.TITLES),
  );
}

// Rights
const formatRights = createFormat((p, d) => ({
  rights: p[0],
  properties: p.slice(1),
  rightsIdentifier: d[0],
}));

export const fetchRights = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.RIGHTS, filters, formatRights);

export function useRights(entity: Entity) {
  return useQuery(
    entity,
    "rights",
    fetchRights,
    buildPlaceholderData(formatRights, COMPLETENESS_FIELDS.RIGHTS),
  );
}

// Dates
const formatDates = createFormat((p, d) => ({
  dates: p[0],
  dateProperties: p.slice(1),
  dateType: d[0],
}));

export const fetchDates = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.DATES, filters, formatDates);

export function useDates(entity: Entity) {
  return useQuery(
    entity,
    "dates",
    fetchDates,
    buildPlaceholderData(formatDates, COMPLETENESS_FIELDS.DATES),
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

export const fetchOther = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.OTHER, filters, formatOther);

export function useOther(entity: Entity) {
  return useQuery(
    entity,
    "other",
    fetchOther,
    buildPlaceholderData(formatOther, COMPLETENESS_FIELDS.OTHER),
  );
}
