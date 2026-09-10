"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchDoiMetricTotal, fetchDoisRecords } from "@/data/fetch";
import type { DoiMetricFacet, DoiMetricState } from "@/types";

type UseDoiRecordsOptions = {
  query: string;
  page: number;
  pageSize: number;
  sort: string;
};


function useDoiMetric(metric: DoiMetricFacet, query: string, enabled: boolean): DoiMetricState {
  const metricQuery = useQuery({
    queryKey: ["dois-page", "metric", metric, query],
    queryFn: () => fetchDoiMetricTotal(metric, query),
    enabled,
    staleTime: 30 * 1000,
  });

  return {
    value: enabled && metricQuery.data != null ? metricQuery.data : null,
    isLoading: enabled && metricQuery.data == null && metricQuery.isPending,
    isError: metricQuery.isError,
  };
}

export function useDoiRecords({ query, page, pageSize, sort }: UseDoiRecordsOptions) {
  const resolvedQuery = query.trim();
  const hasCommittedQuery = resolvedQuery.length > 0;

  const recordsQuery = useQuery({
    queryKey: ["dois-page", "records", resolvedQuery, page, pageSize, sort],
    queryFn: () =>
      fetchDoisRecords(resolvedQuery, {
        pageSize,
        sort,
        pageNumber: page,
      }),
    enabled: hasCommittedQuery,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  const citationCount = useDoiMetric("citationCount", resolvedQuery, hasCommittedQuery);
  const viewCount = useDoiMetric("viewCount", resolvedQuery, hasCommittedQuery);
  const downloadCount = useDoiMetric("downloadCount", resolvedQuery, hasCommittedQuery);

  const records = hasCommittedQuery ? recordsQuery.data?.data || [] : [];
  const total = hasCommittedQuery ? recordsQuery.data?.meta?.total || 0 : 0;
  const showInitialResultsSkeleton =
    hasCommittedQuery && recordsQuery.data == null && recordsQuery.isPending;
  const isLoadingRecords = hasCommittedQuery && recordsQuery.isFetching;

  return {
    hasCommittedQuery,
    records,
    total,
    isLoadingRecords,
    recordError: recordsQuery.error,
    showInitialResultsSkeleton,
    citationCount,
    viewCount,
    downloadCount,
  };
}