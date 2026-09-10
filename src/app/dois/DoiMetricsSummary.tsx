"use client";

import { ArrowDownToLine, Eye, Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { dmSans } from "@/lib/fonts";
import { asNumber } from "@/util";
import type { DoiMetricState } from "@/types";

type Props = {
  total: number;
  isLoadingRecords: boolean;
  citationCount: DoiMetricState;
  viewCount: DoiMetricState;
  downloadCount: DoiMetricState;
};

function MetricValue(props: { metric: DoiMetricState }) {
  if (props.metric.isLoading) {
    return <Skeleton className="h-[1lh] w-10 rounded-sm align-middle" />;
  }

  return <>{asNumber(props.metric.value || 0)}</>;
}

export default function DoiMetricsSummary(props: Props) {
  return (
    <div className="text-datacite-dark-gray">
      <div className={`${dmSans.className} text-xl font-bold leading-tight text-datacite-dark-gray`}>
        {props.isLoadingRecords ? (
          <Skeleton className="h-[1lh] w-36 align-middle" />
        ) : (
          <p>
            {asNumber(props.total)} results
          </p>
        )}
      </div>
      <div className="mt-1 flex items-center gap-4 text-sm font-bold leading-tight">
        <span className="inline-flex items-center gap-1 align-middle">
          <Quote className="size-3.5" />
          <MetricValue metric={props.citationCount} />
        </span>
        <span className="inline-flex items-center gap-1 align-middle">
          <Eye className="size-3.5" />
          <MetricValue metric={props.viewCount} />
        </span>
        <span className="inline-flex items-center gap-1 align-middle">
          <ArrowDownToLine className="size-3.5" />
          <MetricValue metric={props.downloadCount} />
        </span>
      </div>
    </div>
  );
}