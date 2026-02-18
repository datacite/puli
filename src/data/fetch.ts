import { COMPLETENESS_FIELDS } from "@/constants";
import { useQueryEntity, useQueryId } from "@/hooks";
import type { ApiDois, ApiEntity, Entity, Filters } from "@/types";
import {
  buildInitialData,
  createFormat,
  fetchDatacite,
  fetchFields,
  isClient,
} from "@/util";

// Overview //////////////////////////////////////

export async function fetchEntity(id: string | null): Promise<Entity | null> {
  if (!id) return null;

  const data = await getData<ApiEntity>(
    `${isClient(id) ? "clients" : "providers"}/${id}`,
  );
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
    children:
      data.type !== "clients"
        ? (
          await getData<ApiEntity<true>>(
            `${data.attributes.memberType === "consortium" ? "providers" : "clients"}?page[size]=1000&${data.attributes.memberType === "consortium" ? "consortium" : "provider"}-id=${data.id}`,
          )
        ).map((c) => ({
          id: c.id,
          name: c.attributes.name,
          subtype:
            c.type === "clients"
              ? ("repository" as const)
              : c.attributes.memberType,
        }))
        : [],
    parent: await fetchEntity(
      data.type === "clients"
        ? data.relationships.provider.data.id
        : data.relationships.consortium?.data.id || null,
    ),
  };
  console.info(entity);
  return entity;
}

const getData = async <T extends { data: unknown }>(url: string) =>
  ((await (await fetchDatacite(url)).json()) as T).data as T["data"];

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
    registrationsData: registrationYears.reverse().map((f) => ({
      year: f.id,
      count: f.count,
    })),
  };
}

export function useEntity() {
  return useQueryId("entity", fetchEntity);
}

const LAST_10_YEARS = Array.from({ length: 10 }, (_, i) =>
  (new Date().getFullYear() - (9 - i)).toString(),
);

export function useDois() {
  return useQueryEntity("overview", fetchDois, {
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
  nameIdentifier: p[5],
  nameIdentifierScheme: d[0],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[1],
}));

export const fetchCreators = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.CREATORS,
    filters,
    formatCreators,
  );

export function useCreators() {
  return useQueryEntity(
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

export const fetchContributors = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.CONTRIBUTORS,
    filters,
    formatContributors,
  );

export function useContributors() {
  return useQueryEntity(
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
  entity: Entity,
  filters: Filters,
) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.RELATED_IDENTIFIERS,
    filters,
    formatRelatedIdentifiers,
  );

export function useRelatedIdentifiers() {
  return useQueryEntity(
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
  entity: Entity,
  filters: Filters,
) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.FUNDING_REFERENCES,
    filters,
    formatFundingReferences,
  );

export function useFundingReferences() {
  return useQueryEntity(
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

export const fetchPublisher = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.PUBLISHER,
    filters,
    formatPublisher,
  );

export function usePublisher() {
  return useQueryEntity(
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

export const fetchResourceType = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.RESOURCE_TYPE,
    filters,
    formatResourceType,
  );

export function useResourceType() {
  return useQueryEntity(
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

export const fetchSubjects = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.SUBJECTS,
    filters,
    formatSubjects,
  );

export function useSubjects() {
  return useQueryEntity(
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

export const fetchDescriptions = async (entity: Entity, filters: Filters) =>
  await fetchFields(
    entity,
    COMPLETENESS_FIELDS.DESCRIPTIONS,
    filters,
    formatDescriptions,
  );

export function useDescriptions() {
  return useQueryEntity(
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

export const fetchTitles = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.TITLES, filters, formatTitles);

export function useTitles() {
  return useQueryEntity(
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

export const fetchRights = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.RIGHTS, filters, formatRights);

export function useRights() {
  return useQueryEntity(
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

export const fetchDates = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.DATES, filters, formatDates);

export function useDates() {
  return useQueryEntity(
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

export const fetchOther = async (entity: Entity, filters: Filters) =>
  await fetchFields(entity, COMPLETENESS_FIELDS.OTHER, filters, formatOther);

export function useOther() {
  return useQueryEntity(
    "other",
    fetchOther,
    buildInitialData(formatOther, COMPLETENESS_FIELDS.OTHER),
  );
}
