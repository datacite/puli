import type { Props as DistributionProps } from "@/components/DistributionChart";
import type { Props as PresentProps } from "@/components/PresentBar";
import type { fetchResource } from "./data/fetch";

export type Resource = Awaited<ReturnType<typeof fetchResource>>;

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

export type ApiResponse = {
  present: Present[];
  distribution: Distribution[];
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
