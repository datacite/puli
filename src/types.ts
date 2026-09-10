import type { Props as DistributionProps } from "@/components/DistributionChart";
import type { Props as PresentProps } from "@/components/PresentBar";

type EntityBase = {
  id: string;
  name: string;
};

export type ChildEntity<T extends string> = EntityBase & {
  type: T;
};

export type Repository = EntityBase & {
  role: "client";
  type: "repository";
  parent: Entity | null;
  children: [];
};
export type DirectMember = EntityBase & {
  role: "provider";
  type: "direct_member";
  parent: null;
  children: ChildEntity<"repository">[];
};
export type ConsortiumOrganization = EntityBase & {
  role: "provider";
  type: "consortium_organization";
  parent: Entity | null;
  children: ChildEntity<"repository">[];
};
export type Consortium = EntityBase & {
  role: "consortium";
  type: "consortium";
  parent: null;
  children: ChildEntity<"consortium_organization">[];
};
export type MemberOnly = EntityBase & {
  role: "provider";
  type: "member_only";
  parent: null;
  children: [];
};
export type DataCite = EntityBase & {
  role: "datacite";
  type: "";
  parent: null;
  children: [];
};

export type HeaderInfo = {
  title: string;
  id: string;
  labels: HeaderLabels[];
};

export type HeaderLabels = {
  type: string;
  content: string;
  icon: React.ReactNode;
};

export type ResultListItem = {
  id: string;
  title: string;
  href: string;
  subtitle?: string;
  subtitleHref?: string;
  subtitleExternal?: boolean;
  secondaryLine?: string;
  description?: string;
  attributes?: HeaderLabels[];
  badge?: React.ReactNode;
};

export type Entity =
  | Repository
  | DirectMember
  | ConsortiumOrganization
  | Consortium
  | MemberOnly
  | DataCite;

// Api
export type Relationship<
  Title extends string,
  IsOptional extends boolean = false,
  IsArray extends boolean = false,
> = {
  title: Title;
  isArray: IsArray;
  isOptional: IsOptional;
};

export type Relationships<
  T extends readonly Relationship<string, boolean, boolean>[],
> = {
  // required relationships
  [D in T[number]as D["isOptional"] extends false
  ? D["title"]
  : never]: D["isArray"] extends true
  ? { data: { id: string; type: string }[] }
  : { data: { id: string; type: string } };
} & {
    // optional relationships
    [D in T[number]as D["isOptional"] extends true
    ? D["title"]
    : never]?: D["isArray"] extends true
    ? { data: { id: string; type: string }[] }
    : { data: { id: string; type: string } };
  };

export type ApiData<
  T extends string,
  A extends object,
  R extends readonly Relationship<string, boolean, boolean>[],
> = {
  id: string;
  type: T;
  attributes: { name: string } & A;
  relationships: Relationships<R>;
};

export type ApiResponse<
  T extends "clients" | "providers",
  A extends object,
  R extends readonly Relationship<string, boolean, boolean>[],
  IsArray extends boolean = false,
> = {
  data: IsArray extends true
  ? ApiData<T, A, R>[]
  : ApiData<T, A, R> | undefined;
};

export type ApiClient<IsArray extends boolean = false> = ApiResponse<
  "clients",
  { clientType: "repository" },
  [Relationship<"provider">, Relationship<"consortium", true>],
  IsArray
>;

export type ApiProvider<IsArray extends boolean = false> = ApiResponse<
  "providers",
  {
    memberType:
    | "direct_member"
    | "consortium_organization"
    | "consortium"
    | "member_only";
  },
  [
    Relationship<"consortium", true>,
    Relationship<"clients", false, true>,
    Relationship<"consortiumOrganizations", true, true>,
  ],
  IsArray
>;

export type ApiEntity<IsArray extends boolean = false> =
  | ApiClient<IsArray>
  | ApiProvider<IsArray>;

export type ApiDois = {
  meta: {
    total: number;
    totalPages: number;
    page: number;
    resourceTypes: Facet[];
    registered: Facet[];
  };
};

// Other
export type Facet = {
  id: string;
  title: string;
  count: number;
};

export type DoiRecord = {
  id: string;
  attributes: {
    titles: { title: string }[];
    doi: string;
    descriptions?: { description: string }[];
    types: { resourceTypeGeneral?: string };
    version: string;
    citationCount?: number;
    viewCount?: number;
    downloadCount?: number;
    publicationYear?: string | number;
    publisher?: string;
    agency?: string;
  };
  relationships?: {
    client?: {
      data?: {
        id: string;
      };
    };
    versionOf?: {
      data?: Array<{
        id: string;
      }>;
    };
  };
};

export type DoiRecordsResponse = {
  data?: DoiRecord[];
  meta?: {
    total?: number;
  };
};

export type DoiFacetValue = {
  id: string;
  title: string;
  count: number;
};

export type DoiFacetValueField = "id" | "title";

export type DoiFacetValueFormat = "raw" | "year-range";

export type DoiFacetConfig = {
  key: string;
  label: string;
  queryField: string;
  valueField?: DoiFacetValueField;
  valueFormat?: DoiFacetValueFormat;
  valuePrefix?: string;
  icon?: React.ReactNode;
};

export type SelectOption = {
  id: string;
  title: string;
};

export type DoiMetricFacet = "viewCount" | "downloadCount" | "citationCount";

export type DoiMetricState = {
  value: number | null;
  isLoading: boolean;
  isError?: boolean;
};

type HeaderIdentity = {
  title: string;
  id: string;
};

export type DoiHeaderData = HeaderIdentity & {
  resourceTypeGeneral: string;
  publicationYear: string;
  publisher: string;
  version: string;
  citationCount: string;
  versionOfRelationshipIds: string[];
};

export type RorHeaderData = HeaderIdentity & {
  country: string;
  types: string;
};

export type OrcidHeaderData = HeaderIdentity & {
  otherNames: string;
  employer: string;
};

export type DoiSearchResult = {
  id: string;
  doi: string;
  title: string;
  resourceTypeGeneral?: string;
  publicationYear?: string;
  publisher?: string;
};

export type RorOrganization = {
  id: string;
  names?: Array<{
    value: string;
    types?: string[];
  }>;
  locations?: Array<{
    geonames_details?: {
      name?: string;
      country_name?: string;
    };
  }>;
  types?: string[];
};

export type RorSearchResult = {
  id: string;
  pathId: string;
  name: string;
  nameVariations?: string[];
  city?: string;
  country?: string;
  types?: string[];
};

export type OrcidRecord = {
  "orcid-identifier"?: {
    uri?: string;
  };
  "activities-summary"?: {
    employments?: {
      "affiliation-group"?: Array<{
        summaries?: Array<{
          "employment-summary"?: {
            organization?: {
              name?: string;
            };
          };
        }>;
      }>;
    };
  };
  person?: {
    name?: {
      "given-names"?: {
        value?: string;
      };
      "family-name"?: {
        value?: string;
      };
    };
    "other-names"?: {
      "other-name"?: Array<{
        value?: string;
      }>;
    };
  };
};

export type OrcidSearchResult = {
  id: string;
  name: string;
  otherNames?: string[];
  employerNames?: string[];
  institutionNames?: string[];
};

export type PaginatedSearchResult<T> = {
  items: T[];
  total: number;
};

export type Present = {
  field: string;
  percent: number;
  count: number;
  absent_count: number;
};

export type Distribution = {
  field: string;
  values: {
    value: string;
    count: number;
    percent: number;
  }[];
};

export type Filters = {
  query: string | null;
  resourceType: string | null;
  registered: string | null;
  openSearchQuery: string | null;
};
export type Format<R> = (
  present: PresentProps[],
  distribution: DistributionProps[],
) => R;
