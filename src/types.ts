import type { Props as DistributionProps } from "@/components/DistributionChart";
import type { Props as PresentProps } from "@/components/PresentBar";
import type { fetchResource } from "./data/fetch";

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
  { memberType: "direct_member" | "consortium_organization" | "consortium" },
  [
    Relationship<"consortium", true>,
    Relationship<"clients", false, true>,
    Relationship<"consortiumOrganizations", true, true>,
  ],
  IsArray
>;

export type ApiResource<IsArray extends boolean = false> =
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
export type Resource = {
  id: string;
  type: "client" | "provider" | "consortium";
  subtype:
  | "client"
  | "direct_member"
  | "consortium_organization"
  | "consortium";
  name: string;
  children: {
    id: string;
    name: string;
    type: "client" | "direct_member" | "consortium_organization" | "consortium";
  }[];
  parent: Resource | null;
};

export type Facet = {
  id: string;
  title: string;
  count: number;
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
