import type { Props as PresentProps } from "@/components/PresentBar";
import type { Props as DistributionProps } from "@/components/DistributionChart";

export type Facet = {
  id: string
  title: string
  count: number
}

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

export type Format<R> = (present: PresentProps[], distribution: DistributionProps[]) => R;
