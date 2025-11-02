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
