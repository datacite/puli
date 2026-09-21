import { useQueries, useQuery as useTanstackQuery } from "@tanstack/react-query";
import type { ResolutionReportCollectionDocument, ResolutionReport } from "@/types";

type ResolutionReportQueryOptions = {
  enabled?: boolean;
};

function buildResolutionReportDetailQuery(
  id: string,
  options?: ResolutionReportQueryOptions,
) {
  return {
    queryKey: ["resolution-report-detail", id],
    queryFn: () => fetchResolutionReportDetail(id),
    enabled: options?.enabled ?? !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  };
}

export async function fetchResolutionReportSummaries(prefix: string) {
  const response = await fetch(
    `/api/resolution-reports?${new URLSearchParams({ prefix }).toString()}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch resolution reports.");
  }

  return response.json() as Promise<ResolutionReportCollectionDocument>;
}

export async function fetchResolutionReportDetail(id: string) {
  const response = await fetch(
    `/api/resolution-reports/${id}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch resolution report detail.");
  }

  return response.json() as Promise<{ data: ResolutionReport }>;
}

export function useResolutionReportSummaries(prefix: string) {
  return useTanstackQuery({
    queryKey: ["resolution-reports", prefix],
    queryFn: () => fetchResolutionReportSummaries(prefix),
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useResolutionReportDetail(
  id: string,
  options?: ResolutionReportQueryOptions,
) {
  return useTanstackQuery(buildResolutionReportDetailQuery(id, options));
}

export function useResolutionReportDetails(
  ids: string[],
  options?: ResolutionReportQueryOptions,
) {
  return useQueries({
    queries: ids.map((id) => buildResolutionReportDetailQuery(id, options)),
  });
}
