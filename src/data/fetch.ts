
import { useQuery as useTanstackQuery } from "@tanstack/react-query";
import {
  API_URL_DATACITE,
  ALL_OF_DATACITE_ID,
  ALL_OF_DATACITE_NAME,
  COMPLETENESS_FIELDS,
} from "@/constants";
import { useQuery } from "@/hooks";
import type {
  ApiClient,
  ApiDois,
  ApiEntity,
  ApiProvider,
  DoiSearchResult,
  Consortium,
  ConsortiumOrganization,
  DataCite,
  DirectMember,
  DoiFacetValue,
  DoiMetricFacet,
  DoiRecordsResponse,
  Entity,
  Filters,
  MemberOnly,
  OrcidRecord,
  OrcidSearchResult,
  PaginatedSearchResult,
  Repository,
  RorOrganization,
  RorSearchResult,
} from "@/types";
import {
  buildPlaceholderData,
  createFormat,
  escapeDoiQuery,
  escapeQuery,
  fetchDatacite,
  fetchFields,
  isClient,
} from "@/util";

type DoiRequestOptions = {
  query: string;
  pageSize?: number;
  pageNumber?: number;
  sort?: string;
  disableFacets?: boolean;
  facets?: string;
  includeOtherRegistrationAgencies?: boolean;
  mailto?: string;
};

function buildDoiSearchParams(options: DoiRequestOptions): URLSearchParams {
  const searchParams = new URLSearchParams({
    query: options.query,
    "page[size]": String(options.pageSize ?? 25),
  });

  if (options.pageNumber && options.pageNumber > 0) {
    searchParams.set("page[number]", String(options.pageNumber));
  }
  if (options.sort?.trim()) {
    searchParams.set("sort", options.sort.trim());
  }
  if (typeof options.disableFacets === "boolean") {
    searchParams.set("disable-facets", options.disableFacets ? "true" : "false");
  }
  if (options.facets?.trim()) {
    searchParams.set("facets", options.facets.trim());
  }
  if (options.includeOtherRegistrationAgencies) {
    searchParams.set("include_other_registration_agencies", "true");
  }
  if (options.mailto?.trim()) {
    searchParams.set("mailto", options.mailto.trim());
  }

  return searchParams;
}

function buildDoisApiUrl(options: DoiRequestOptions): string {
  return `${API_URL_DATACITE}/dois?${buildDoiSearchParams(options).toString()}`;
}

export async function searchEntities(
  query: string,
  options?: { advancedSearch?: boolean },
): Promise<{ clients: Entity[]; providers: Entity[] }> {
  if (!query) return { clients: [], providers: [] };

  const searchParams = new URLSearchParams({
    query: options?.advancedSearch ? query : escapeQuery(query),
    sort: "relevance",
    "page[size]": "5",
  }).toString();

  const [clientsData, providersData] = await Promise.all([
    get<ApiClient<true>>(`clients?${searchParams}`, "data"),
    get<ApiProvider<true>>(`providers?${searchParams}`, "data"),
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
): Promise<Entity | null> {
  if (!data) return null;

  const entityBase = {
    id: data.id,
    name: data.attributes.name,
  };

  // Handle repository
  if (data.type === "clients") {
    const parent = fetchParent
      ? await fetchEntity(data.relationships.provider.data.id)
      : null;

    return {
      ...entityBase,
      role: "client",
      type: "repository",
      parent,
      children: [],
    } satisfies Repository;
  }

  // Handle member only
  if (data.attributes.memberType === "member_only") {
    return {
      ...entityBase,
      role: "provider",
      type: "member_only",
      parent: null,
      children: [],
    } satisfies MemberOnly;
  }

  // Handle consortium
  if (data.attributes.memberType === "consortium") {
    const childrenData = populateChildren
      ? await get<ApiProvider<true>>(
        `providers?page[size]=1000&consortium-id=${data.id}`,
        "data",
      )
      : [];

    const children = childrenData.map((child) => ({
      id: child.id,
      name: child.attributes.name,
      type: "consortium_organization" as const,
    }));

    return {
      ...entityBase,
      role: "consortium",
      type: "consortium",
      parent: null,
      children,
    } satisfies Consortium;
  }

  // Handle direct member and consortium organization
  const childrenData = populateChildren
    ? await get<ApiClient<true>>(
      `clients?page[size]=1000&provider-id=${data.id}`,
      "data",
    )
    : [];

  const children = childrenData.map((child) => ({
    id: child.id,
    name: child.attributes.name,
    type: "repository" as const,
  }));

  if (data.attributes.memberType === "direct_member")
    return {
      ...entityBase,
      role: "provider",
      type: "direct_member",
      parent: null,
      children,
    } satisfies DirectMember;

  return {
    ...entityBase,
    role: "provider",
    type: "consortium_organization",
    parent: fetchParent
      ? await fetchEntity(data.relationships.consortium?.data.id || null)
      : null,
    children,
  } satisfies ConsortiumOrganization;
}

const get = async <T extends object>(url: string, p: keyof T) =>
  ((await (await fetchDatacite(url, { cache: "force-cache" })).json()) as T)[p];

// Overview //////////////////////////////////////
export async function fetchEntity(id: string | null): Promise<Entity | null> {
  if (!id) return null;
  if (id === ALL_OF_DATACITE_ID)
    return {
      id: ALL_OF_DATACITE_ID,
      name: ALL_OF_DATACITE_NAME,
      role: "datacite",
      type: "",
      parent: null,
      children: [],
    } satisfies DataCite;

  const data = await get<ApiEntity>(
    `${isClient(id) ? "clients" : "providers"}/${id}`,
    "data",
  );

  return apiDataToEntity(data, true, true);
}

export async function fetchDois(entity: Entity, filters: Filters) {
  const doisSearchParam = new URLSearchParams({
    ...fetchDoisSearchParams(entity, filters),
    facets: ["resourceTypes", "registered"].join(","),
    "disable-facets": "false",
    "page[size]": "0",
  }).toString();

  const doisMeta = await get<ApiDois>(`dois?${doisSearchParam}`, "meta");

  const resourceTypeData =
    doisMeta.resourceTypes?.map((f) => ({
      id: f.id,
      type: f.title,
      count: f.count,
    })) || [];

  const registrationYears = doisMeta.registered || [];
  const currentYear = new Date().getFullYear();
  const minYear = Math.min(
    ...registrationYears.map((ry) => Number(ry.id)).concat(currentYear - 10),
  );

  // Generate the chart data
  // use given data when can, and default missing years' counts to 0
  const registrationsData = Array.from(
    { length: currentYear - minYear + 1 },
    (_, i) => (minYear + i).toString(),
  ).map((year) => ({
    year,
    count: registrationYears.find((ry) => ry.id === year)?.count ?? 0,
  }));

  return {
    total: doisMeta.total,
    resourceTypeData,
    registrationYears,
    registrationsData,
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
    ...(entity.role !== "datacite" && { [`${entity.role}-id`]: entity.id }),
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
  resourceType: { ...p[0], property: "ResourceType" },
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

export async function fetchDoiRecord(doi: string) {
  const url = `${API_URL_DATACITE}/dois/${doi}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch DOI record: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchRorOrganization(id: string): Promise<RorOrganization> {
  const response = await fetch(`https://api.ror.org/v2/organizations/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ROR organization: ${response.statusText}`);
  }

  return (await response.json()) as RorOrganization;
}

export async function fetchOrcidRecord(id: string): Promise<OrcidRecord> {
  const response = await fetch(`https://pub.orcid.org/v3.0/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ORCID record: ${response.statusText}`);
  }

  return (await response.json()) as OrcidRecord;
}

export async function fetchEvents(doi: string) {
  const searchParams = new URLSearchParams({
    "page[size]": "1000",
    query: `(subj_id:"https://doi.org/${doi}" OR obj_id:"https://doi.org/${doi}") AND NOT source_id:datacite-resolution`,
  });
  const url = `${API_URL_DATACITE}/events?${searchParams.toString()}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch DOI events: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchDoisRecords(
  query: string,
  options?: { pageSize?: number; sort?: string; pageNumber?: number },
): Promise<DoiRecordsResponse> {
  const url = buildDoisApiUrl({
    query,
    pageSize: options?.pageSize,
    pageNumber: options?.pageNumber,
    sort: options?.sort,
    includeOtherRegistrationAgencies: true,
  });
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch DOIs records: ${response.statusText}`);
  }

  return response.json() as Promise<DoiRecordsResponse>;
}

export const DOI_CSV_EXPORT_PAGE_SIZE = 1000;

type DoiCsvExportOptions = {
  pageSize?: number;
  pageNumber?: number;
  sort?: string;
};

export function buildDoiExportUrl(
  query: string,
  options?: DoiCsvExportOptions,
) {
  return buildDoisApiUrl({
    query,
    pageSize: options?.pageSize,
    pageNumber: options?.pageNumber,
    sort: options?.sort,
    includeOtherRegistrationAgencies: true,
  });
}

export async function fetchDoiCsvPage(
  query: string,
  options?: DoiCsvExportOptions,
): Promise<string> {
  const url = buildDoiExportUrl(query, options);
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "text/csv" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch DOI CSV export: ${response.statusText}`);
  }

  return response.text();
}

export function mergeCsvDocuments(csvPages: string[]): string {
  if (csvPages.length === 0) return "";

  return csvPages
    .map((page, index) => {
      if (index === 0) return page.trimEnd();

      const newlineIndex = page.indexOf("\n");
      if (newlineIndex === -1) return "";

      return page.slice(newlineIndex + 1).trimEnd();
    })
    .filter(Boolean)
    .join("\n");
}

export async function searchDois(query: string, options?: { advancedSearch?: boolean }): Promise<DoiSearchResult[]> {
  if (!query.trim()) return [];

  const searchParams = new URLSearchParams({
    query: options?.advancedSearch ? query : escapeDoiQuery(query),
    "page[size]": "5",
    include_other_registration_agencies: "true",
    sort: "relevance",
  });

  const response = await fetch(`${API_URL_DATACITE}/dois?${searchParams.toString()}`, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
  });

  if (!response.ok) return [];

  const data = (await response.json()) as {
    data?: Array<{
      id: string;
      attributes: {
        doi: string;
        titles?: Array<{ title: string }>;
        types?: { resourceTypeGeneral?: string };
        publicationYear?: string;
        publisher?: string;
      };
    }>;
  };

  return (data.data || []).map((item) => ({
    id: item.id,
    doi: item.attributes.doi,
    title: item.attributes.titles?.[0]?.title || "Untitled",
    resourceTypeGeneral: item.attributes.types?.resourceTypeGeneral,
    publicationYear: item.attributes.publicationYear,
    publisher: item.attributes.publisher,
  }));
}

type RorSearchApiResponse = {
  items?: RorOrganization[];
  number_of_results?: number;
};

function mapRorOrganizationToSearchResult(item: RorOrganization): RorSearchResult {
  const displayName =
    item.names?.find((name) => name.types?.includes("ror_display"))?.value ||
    item.names?.[0]?.value ||
    "Unknown Organization";

  const nameVariations = (item.names || [])
    .map((name) => name.value)
    .filter(
      (value, index, all) => value && value !== displayName && all.indexOf(value) === index,
    );

  return {
    id: item.id,
    pathId: item.id.replace("https://ror.org/", ""),
    name: displayName,
    nameVariations,
    city: item.locations?.[0]?.geonames_details?.name,
    country: item.locations?.[0]?.geonames_details?.country_name,
    types: item.types,
  };
}

async function fetchRorSearchApiData(query: string, page?: number): Promise<RorSearchApiResponse> {
  const escapedRorQuery = escapeQuery(query);
  const searchParams = new URLSearchParams({ query: escapedRorQuery });
  if (page && page > 0) {
    searchParams.set("page", String(page));
  }

  const response = await fetch(`https://api.ror.org/v2/organizations?${searchParams.toString()}`);
  if (!response.ok) {
    return { items: [], number_of_results: 0 };
  }

  return (await response.json()) as RorSearchApiResponse;
}

export async function searchRor(query: string, _options?: { advancedSearch?: boolean }): Promise<RorSearchResult[]> {
  if (!query.trim()) return [];

  const data = await fetchRorSearchApiData(query);
  return (data.items || []).slice(0, 5).map(mapRorOrganizationToSearchResult);
}

type OrcidExpandedSearchItem = {
  "orcid-id": string;
  "given-names"?: string | null;
  "family-names"?: string | null;
  "credit-name"?: string | null;
  "other-name"?: string[];
  "employer-name"?: string[];
  "institution-name"?: string[];
};

type OrcidExpandedSearchResponse = {
  "expanded-result"?: OrcidExpandedSearchItem[];
  "num-found"?: number;
};

function mapOrcidExpandedSearchItem(item: OrcidExpandedSearchItem): OrcidSearchResult {
  const given = item["given-names"] || "";
  const family = item["family-names"] || "";
  const credit = item["credit-name"] || "";

  return {
    id: item["orcid-id"],
    name: credit || [given, family].filter(Boolean).join(" ") || item["orcid-id"],
    otherNames: (item["other-name"] || []).filter(Boolean),
    employerNames: (item["employer-name"] || item["institution-name"] || []).filter(Boolean),
    institutionNames: (item["institution-name"] || []).filter(Boolean),
  };
}

async function fetchOrcidExpandedSearchData(query: string, rows: number, start: number): Promise<OrcidExpandedSearchResponse> {
  const searchParams = new URLSearchParams({
    q: query,
    rows: String(rows),
    start: String(start),
  });

  const response = await fetch(`https://pub.orcid.org/v3.0/expanded-search?${searchParams.toString()}`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  });

  if (!response.ok) {
    return { "expanded-result": [], "num-found": 0 };
  }

  return (await response.json()) as OrcidExpandedSearchResponse;
}

export async function searchOrcid(query: string, options?: { advancedSearch?: boolean }): Promise<OrcidSearchResult[]> {
  if (!query.trim()) return [];

  const data = await fetchOrcidExpandedSearchData(query, 25, 0);
  return (data["expanded-result"] || [])
    .slice(0, 5)
    .map(mapOrcidExpandedSearchItem);
}

type SearchModeOptions = {
  advancedSearch?: boolean;
};

export async function searchEntitiesPaginated(
  query: string,
  type: "clients" | "providers",
  page: number = 1,
  pageSize: number = 25,
  options?: SearchModeOptions,
): Promise<PaginatedSearchResult<Entity>> {
  if (!query) return { items: [], total: 0 };

  const queryParam = options?.advancedSearch ? query : escapeQuery(query);

  const searchParams = new URLSearchParams({
    query: queryParam,
    sort: "relevance",
    "page[number]": String(page),
    "page[size]": String(pageSize),
  }).toString();

  const endpoint = type === "clients" ? "clients" : "providers";
  const payload = (await (await fetchDatacite(`${endpoint}?${searchParams}`, { cache: "force-cache" })).json()) as {
    data: Array<ApiEntity["data"]>;
    meta?: { total?: number };
  };

  const apiData = payload.data;
  const meta = payload.meta;

  const entities = await Promise.all(apiData.map((d) => apiDataToEntity(d)));

  return {
    items: entities.filter((e) => e !== null),
    total: meta?.total ?? 0,
  };
}

export async function searchRorPaginated(
  query: string,
  page: number = 1,
  _options?: SearchModeOptions,
): Promise<PaginatedSearchResult<RorSearchResult>> {
  if (!query.trim()) return { items: [], total: 0 };

  const data = await fetchRorSearchApiData(query, page);
  const items = (data.items || []).map(mapRorOrganizationToSearchResult);

  return {
    items,
    total: data.number_of_results ?? 0,
  };
}

export async function searchOrcidPaginated(
  query: string,
  page: number = 1,
  options?: SearchModeOptions,
): Promise<PaginatedSearchResult<OrcidSearchResult>> {
  if (!query.trim()) return { items: [], total: 0 };

  const pageSize = 25;
  const start = (page - 1) * pageSize;

  const data = await fetchOrcidExpandedSearchData(query, pageSize, start);
  const items = (data["expanded-result"] || []).map(mapOrcidExpandedSearchItem);

  return {
    items,
    total: data["num-found"] ?? 0,
  };
}

export async function fetchDoisTotal(query: string): Promise<number> {
  const url = buildDoisApiUrl({
    query,
    pageSize: 0,
    includeOtherRegistrationAgencies: true,
  });
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch DOIs total: ${response.statusText}`);
  }

  const data = (await response.json()) as { meta?: { total?: number } };
  return data.meta?.total ?? 0;
}

type DoiFacetApiResponse = {
  meta: {
    [facetName: string]: DoiFacetValue[] | number;
  };
};

type OpenAlexWorkResponse = {
  id?: string;
  cited_by_count?: number;
};

type OpenAireMeasure = {
  "@id"?: string;
  "@score"?: string | number;
};

type OpenAireResultEntity = {
  measure?: OpenAireMeasure | OpenAireMeasure[];
};

type OpenAireResultRecord = {
  metadata?: {
    "oaf:entity"?: {
      "oaf:result"?: OpenAireResultEntity;
    };
  };
};

type OpenAireResponse = {
  response?: {
    header?: {
      total?: {
        $?: string | number;
      };
    };
    results?: {
      result?: OpenAireResultRecord | OpenAireResultRecord[];
    };
  };
};

type OpenCitationsCountResponse = Array<{
  count?: string | number;
}>;

export async function fetchOpenAlexWorkByDoi(doi: string): Promise<{
  id: string;
  citedByCount: number;
} | null> {
  const trimmedDoi = doi.trim();
  if (!trimmedDoi) return null;

  const url = `https://api.openalex.org/works/doi:${encodeURIComponent(trimmedDoi)}`;
  const response = await fetch(url, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAlex work: ${response.statusText}`);
  }

  const data = (await response.json()) as OpenAlexWorkResponse;
  if (!data.id) return null;

  return {
    id: data.id,
    citedByCount: Number.isFinite(data.cited_by_count)
      ? Number(data.cited_by_count)
      : 0,
  };
}

export async function fetchOpenAireWorkByDoi(doi: string): Promise<{
  id: string;
  citedByCount: number;
} | null> {
  const trimmedDoi = doi.trim();
  if (!trimmedDoi) return null;

  const apiUrl = `https://api.openaire.eu/search/researchProducts?doi=${encodeURIComponent(trimmedDoi)}&format=json`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: { accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAIRE work: ${response.statusText}`);
  }

  const data = (await response.json()) as OpenAireResponse;
  const totalRaw = data.response?.header?.total?.$;
  const total = Number(totalRaw);

  if (!Number.isFinite(total) || total <= 0) {
    return null;
  }

  const resultNode = data.response?.results?.result;
  const firstResult = Array.isArray(resultNode) ? resultNode[0] : resultNode;
  const measureNode =
    firstResult?.metadata?.["oaf:entity"]?.["oaf:result"]?.measure;
  const measures = Array.isArray(measureNode)
    ? measureNode
    : measureNode
      ? [measureNode]
      : [];

  const citationMeasure = measures.find(
    (measure) => measure?.["@id"] === "citationCount",
  );
  const citedByCount = Number(citationMeasure?.["@score"]);

  return {
    id: `https://explore.openaire.eu/search/publication?pid=${encodeURIComponent(trimmedDoi)}`,
    citedByCount: Number.isFinite(citedByCount) ? citedByCount : 0,
  };
}

export async function fetchOpenCitationsByDoi(doi: string): Promise<{
  id: string;
  citedByCount: number;
} | null> {
  const trimmedDoi = doi.trim();
  if (!trimmedDoi) return null;

  const apiUrl = `https://api.opencitations.net/index/v2/citation-count/doi:${encodeURIComponent(trimmedDoi)}`;
  const response = await fetch(apiUrl, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenCitations count: ${response.statusText}`);
  }

  const data = (await response.json()) as OpenCitationsCountResponse;
  const first = Array.isArray(data) ? data[0] : undefined;
  if (!first) return null;

  const parsedCount = Number(first.count);
  if (!Number.isFinite(parsedCount) || parsedCount <= 0) {
    return null;
  }

  return {
    id: `https://search.opencitations.net/search?text=${encodeURIComponent(trimmedDoi)}&rule=citeddoi`,
    citedByCount: parsedCount,
  };
}

export async function fetchDoiFacetValues(
  facetName: string,
  query = "",
): Promise<DoiFacetValue[]> {
  const url = buildDoisApiUrl({
    query: query.trim(),
    pageSize: 0,
    disableFacets: false,
    facets: facetName,
    includeOtherRegistrationAgencies: true,
  });
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch DOI facet values: ${response.statusText}`);
  }

  const data = (await response.json()) as DoiFacetApiResponse;
  const values = data.meta?.[facetName];

  return Array.isArray(values) ? values : [];
}

export async function fetchDoiMetricTotal(
  metric: DoiMetricFacet,
  query = "",
): Promise<number> {
  const url = buildDoisApiUrl({
    query: query.trim(),
    pageSize: 0,
    disableFacets: false,
    facets: metric,
  });
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch DOI ${metric} total: ${response.statusText}`);
  }

  const data = (await response.json()) as { meta?: Record<string, unknown> };
  const value = Number(data.meta?.[metric]);
  return Number.isFinite(value) ? value : 0;
}

export async function fetchDoisRecordsForMetadata(query: string) {
  const url = buildDoisApiUrl({
    query,
    pageSize: 25,
  });
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch DOIs records: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchEntityCitations(query: string) {
  const url = buildDoisApiUrl({
    query: `${query} AND citationCount:>0`,
    pageSize: 25,
    disableFacets: false,
    facets: "citations",
    sort: "-citation-count",
  });
  const response = await fetch(url, {
    method: "GET",
    headers: { accept: "application/vnd.api+json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch DOIs records: ${response.statusText}`);
  }

  return response.json();
}