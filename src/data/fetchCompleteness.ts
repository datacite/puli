import { COMPLETENESS_FIELDS } from "@/constants";
import { useCreateQuery } from "@/hooks";
import type { Filters } from "@/types";
import { createFormat, fetchFields } from "@/util";

// Creators
const formatCreators = createFormat((p, d) => ({
  creators: p[0],
  properties: p.slice(1, 5),
  nameIdentifier: p[5],
  nameIdentifierScheme: d[0],
  affiliation: p.slice(-2),
  affiliationIdentifierScheme: d[1],
}));

export const fetchCreators = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.CREATORS.present,
    COMPLETENESS_FIELDS.CREATORS.distribution,
    filters,
    formatCreators,
  );

export function useCreators() {
  return useCreateQuery("creators", fetchCreators);
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

export const fetchContributors = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.CONTRIBUTORS.present,
    COMPLETENESS_FIELDS.CONTRIBUTORS.distribution,
    filters,
    formatContributors,
  );

export function useContributors() {
  return useCreateQuery("contributors", fetchContributors);
}

// Related Identifiers
const formatRelatedIdentifiers = createFormat((p, d) => ({
  relatedIdentifiers: p[0],
  relationType: d[0],
  relatedIdentifierType: d[1],
  resourceTypeGeneral: d[2],
}));

export const fetchRelatedIdentifiers = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.RELATED_IDENTIFIERS.present,
    COMPLETENESS_FIELDS.RELATED_IDENTIFIERS.distribution,
    filters,
    formatRelatedIdentifiers,
  );

export function useRelatedIdentifiers() {
  return useCreateQuery("relatedIdentifiers", fetchRelatedIdentifiers);
}

// Funding References
const formatFundingReferences = createFormat((p, d) => ({
  fundingReferences: p[0],
  funderProperties: p.slice(1, 3),
  funderIdentifierType: d[0],
  awardProperties: p.slice(-3),
}));

export const fetchFundingReferences = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.FUNDING_REFERENCES.present,
    COMPLETENESS_FIELDS.FUNDING_REFERENCES.distribution,
    filters,
    formatFundingReferences,
  );

export function useFundingReferences() {
  return useCreateQuery("fundingReferences", fetchFundingReferences);
}

// Publisher
const formatPublisher = createFormat((p, d) => ({
  publisher: p[0],
  publisherIdentifier: p[1],
  publisherIdentifierScheme: d[0],
}));

export const fetchPublisher = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.PUBLISHER.present,
    COMPLETENESS_FIELDS.PUBLISHER.distribution,
    filters,
    formatPublisher,
  );

export function usePublisher() {
  return useCreateQuery("publisher", fetchPublisher);
}

// Resource Type
const formatResourceType = createFormat((p, d) => ({
  resourceType: p[0],
  properties: p.slice(1),
  resourceTypeGeneral: d[0],
}));

export const fetchResourceType = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.RESOURCE_TYPE.present,
    COMPLETENESS_FIELDS.RESOURCE_TYPE.distribution,
    filters,
    formatResourceType,
  );

export function useResourceType() {
  return useCreateQuery("resourceType", fetchResourceType);
}

// Subjects
const formatSubjects = createFormat((p, d) => ({
  subjects: p[0],
  subjectScheme: p[1],
  subjectsSchemeDistribution: d[0],
  valueURI: p[2],
}));

export const fetchSubjects = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.SUBJECTS.present,
    COMPLETENESS_FIELDS.SUBJECTS.distribution,
    filters,
    formatSubjects,
  );

export function useSubjects() {
  return useCreateQuery("subjects", fetchSubjects);
}

// Descriptions
const formatDescriptions = createFormat((p, d) => ({
  descriptions: p[0],
  descriptionType: d[0],
}));

export const fetchDescriptions = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.DESCRIPTIONS.present,
    COMPLETENESS_FIELDS.DESCRIPTIONS.distribution,
    filters,
    formatDescriptions,
  );

export function useDescriptions() {
  return useCreateQuery("descriptions", fetchDescriptions);
}

// Titles
const formatTitles = createFormat((p, d) => ({
  titles: p[0],
  titleType: d[0],
}));

export const fetchTitles = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.TITLES.present,
    COMPLETENESS_FIELDS.TITLES.distribution,
    filters,
    formatTitles,
  );

export function useTitles() {
  return useCreateQuery("titles", fetchTitles);
}

// Rights
const formatRights = createFormat((p, d) => ({
  rights: p[0],
  properties: p.slice(1),
  rightsIdentifier: d[0],
}));

export const fetchRights = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.RIGHTS.present,
    COMPLETENESS_FIELDS.RIGHTS.distribution,
    filters,
    formatRights,
  );

export function useRights() {
  return useCreateQuery("rights", fetchRights);
}

// Dates
const formatDates = createFormat((p, d) => ({
  dates: p[0],
  dateType: d[0],
  dateInformation: p[1],
}));

export const fetchDates = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.DATES.present,
    COMPLETENESS_FIELDS.DATES.distribution,
    filters,
    formatDates,
  );

export function useDates() {
  return useCreateQuery("dates", fetchDates);
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

export const fetchOther = async (id: string, filters: Filters) =>
  await fetchFields(
    id,
    COMPLETENESS_FIELDS.OTHER.present,
    COMPLETENESS_FIELDS.OTHER.distribution,
    filters,
    formatOther,
  );

export function useOther() {
  return useCreateQuery("other", fetchOther);
}
