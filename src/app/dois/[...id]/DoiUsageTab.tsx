"use client";

import { useSearchParams } from "next/navigation";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { H4 } from "@/components/datacite/Headings";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { RESOLUTION_REPORTS } from "@/constants";
import {
  useResolutionReportDetails,
  useResolutionReportSummaries,
} from "@/data/resolution-reports";
import { formatPeriodLabel } from "@/components/resolution-reports/utils";
import { asNumber } from "@/util";
import type { ResolutionReport, ResolutionReportSummary } from "@/types";

type Props = {
  doi: string;
  prefix?: string;
};

type UsagePoint = {
  period: string;
  successfulResolutions: number | null;
};

const USAGE_CHART_CONFIG = {
  successfulResolutions: RESOLUTION_REPORTS.CHART_CONFIG.successfulResolutions,
} as const;

function buildUsagePoints(
  reports: ResolutionReportSummary[],
  details: Array<ResolutionReport | undefined>,
  doi: string,
): UsagePoint[] {
  const normalizedDoi = doi.trim();

  return reports.map((report, index) => {
    const resolutionCount = details[index]?.attributes.topSuccessfulDois.find(
      (entry) => entry.doi === normalizedDoi,
    )?.resolutionCount ?? null;

    return {
      period: report.attributes.period,
      successfulResolutions: resolutionCount,
    };
  });
}

function useDoiUsageHistory(doi: string, prefix?: string) {
  const searchParams = useSearchParams();
  const isUsageTabActive = searchParams.get("tab") === "resolution-metrics";
  const enabled = isUsageTabActive && Boolean(prefix);

  const reportsQuery = useResolutionReportSummaries(prefix || "");
  const reports = [...(reportsQuery.data?.data ?? [])].sort((left, right) =>
    left.attributes.period.localeCompare(right.attributes.period),
  );

  const detailQueries = useResolutionReportDetails(
    reports.map((report) => report.id),
    { enabled: enabled && reportsQuery.isSuccess },
  );

  const data = buildUsagePoints(
    reports,
    detailQueries.map((query) => query.data?.data),
    doi,
  );

  return {
    data,
    isEnabled: enabled,
    isLoading:
      enabled && (reportsQuery.isPending || detailQueries.some((query) => query.isPending)),
    isError:
      enabled && (reportsQuery.isError || detailQueries.some((query) => query.isError)),
  };
}

export default function DoiUsageTab({ doi, prefix }: Props) {
  const { data, isEnabled, isLoading, isError } = useDoiUsageHistory(doi, prefix);

  if (!isEnabled) {
    return null;
  }

  if (!prefix) {
    return (
      <Card className="border bg-white px-6 py-6 shadow-sm">
        <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
          No DOI prefix is available for usage metrics.
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border bg-white px-6 py-6 shadow-sm">
        <div className="flex h-[320px] items-center justify-center">
          <Spinner className="mx-auto my-auto text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border bg-white px-6 py-6 shadow-sm">
        <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
          Unable to load usage metrics for this DOI.
        </div>
      </Card>
    );
  }

  if (!data.some((point) => point.successfulResolutions !== null)) {
    return (
      <Card className="border bg-white px-6 py-6 shadow-sm">
        <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
          No monthly resolution data was found for this DOI.
        </div>
      </Card>
    );
  }

  return (
    <Card className="border bg-white py-6 shadow-sm">
      <div className="px-6">
        <CardHeader className="px-6">
          <div className="flex items-center gap-4">
            <CardTitle className="min-w-0">
              <H4>Resolution Trends</H4>
            </CardTitle>
                    </div>

        </CardHeader>
        <ChartContainer config={USAGE_CHART_CONFIG} className="h-[320px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 12, right: 12, left: 12, bottom: 0 }}
            accessibilityLayer
          >
            <defs>
              <linearGradient id="colorSuccessfulResolutions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-successfulResolutions)"
                  stopOpacity={0.87}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-successfulResolutions)"
                  stopOpacity={0.3}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={formatPeriodLabel}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number | string) => asNumber(Number(value))}
            />
            <ChartTooltip
              content={(props) => (
                <ChartTooltipContent
                  active={props.active}
                  label={props.label}
                  payload={props.payload}
                  className="min-w-[12rem] gap-2 px-3 py-2 text-sm [&>div:last-child]:gap-2"
                  labelFormatter={(label) => formatPeriodLabel(String(label))}
                  labelClassName="text-base"
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="successfulResolutions"
              connectNulls
              strokeWidth={0}
              fill="url(#colorSuccessfulResolutions)"
              dot={{ r: 4, fill: "var(--color-successfulResolutions)" }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
}