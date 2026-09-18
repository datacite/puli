"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScrollableTable from "@/components/ScrollableTable";
import { Spinner } from "@/components/ui/spinner";
import { H4 } from "@/components/datacite/Headings";
import { PrefixSelector } from "@/components/resolution-reports/PrefixSelector";
import { TrendChart } from "@/components/resolution-reports/TrendChart";
import { SummaryStatsBox } from "@/components/resolution-reports/SummaryStatsBox";
import { ReportSelector } from "@/components/resolution-reports/ReportSelector";
import {
  useResolutionReportDetail,
  useResolutionReportSummaries,
} from "@/data/resolution-reports";
import { RESOLUTION_REPORTS } from "@/constants";
import { buildTrendData } from "@/components/resolution-reports/utils";
import type { ChartMode, PrefixOption, ReportOption } from "@/types";

const PREFIX_PARAM = RESOLUTION_REPORTS.PREFIX_PARAM;
const REPORT_PARAM = RESOLUTION_REPORTS.REPORT_PARAM;

function buildPrefixUrl(
  pathname: string,
  searchParams: URLSearchParams,
  prefix: string,
): string {
  const nextParams = new URLSearchParams(searchParams.toString());
  nextParams.set(PREFIX_PARAM, prefix);
  return `${pathname}?${nextParams.toString()}`;
}

function buildReportUrl(
  pathname: string,
  searchParams: URLSearchParams,
  reportId: string,
): string {
  const nextParams = new URLSearchParams(searchParams.toString());
  nextParams.set(REPORT_PARAM, reportId);
  return `${pathname}?${nextParams.toString()}`;
}

export default function ResolutionReports() {
  const [chartMode, setChartMode] = useState<ChartMode>("total-resolutions");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPrefix = searchParams.get(PREFIX_PARAM);
  const selectedReportId = searchParams.get(REPORT_PARAM);
  const prefixCount = searchParams.get("prefix-count");

  const filteredPrefixOptions = useMemo(() => {
    const maxPrefixOptions = 2;
    const parsedCount = prefixCount ? Number.parseInt(prefixCount, 10) : Number.NaN;
    const count = Number.isFinite(parsedCount)
      ? Math.min(Math.max(parsedCount, 1), maxPrefixOptions)
      : RESOLUTION_REPORTS.PREFIX_OPTIONS.length;

    return RESOLUTION_REPORTS.PREFIX_OPTIONS.slice(0, count);
  }, [prefixCount]);

  const selectedOption = useMemo(
    () => (
      filteredPrefixOptions.find((option) => option.prefix === selectedPrefix) ??
      filteredPrefixOptions[0]
    ),
    [filteredPrefixOptions, selectedPrefix],
  );

  // Fetch summaries
  const { data, isLoading, isError } = useResolutionReportSummaries(selectedOption.prefix);

  // Derive report options and selected report
  const reportOptions = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return [...data.data]
      .sort((left, right) => right.attributes.period.localeCompare(left.attributes.period))
      .map((report) => ({
        id: report.id,
        period: report.attributes.period,
      }));
  }, [data?.data]);

  const selectedReport = useMemo(() => {
    if (reportOptions.length === 0) {
      return null;
    }

    return reportOptions.find((report) => report.id === selectedReportId) ?? reportOptions[0];
  }, [reportOptions, selectedReportId]);

  const {
    data: reportDetailResponse,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useResolutionReportDetail(selectedReport?.id ?? "", {
    enabled: !!selectedReport,
  });

  const fullReportDetail = reportDetailResponse?.data ?? null;

  // Sync URL when prefix changes
  useEffect(() => {
    if (selectedPrefix === selectedOption.prefix) return;
    router.replace(
      buildPrefixUrl(pathname, new URLSearchParams(searchParams.toString()), selectedOption.prefix),
      { scroll: false },
    );
  }, [selectedOption.prefix, selectedPrefix, pathname, searchParams, router]);

  // Sync URL when report changes
  useEffect(() => {
    if (!selectedReport) return;
    if (selectedReportId === selectedReport.id) return;

    router.replace(
      buildReportUrl(
        pathname,
        new URLSearchParams(searchParams.toString()),
        selectedReport.id,
      ),
      { scroll: false },
    );
  }, [selectedReport, selectedReportId, pathname, searchParams, router]);

  const chartData = useMemo(() => buildTrendData(data?.data ?? []), [data?.data]);

  const successfulDoiRows = fullReportDetail?.attributes.topSuccessfulDois.map((doi) => ({
    rowId: doi.doi,
    doi: (
      <Link
        href={`/dois/${doi.doi}`}
        className="inline-flex items-center gap-1 font-bold text-datacite-blue-dark transition-colors hover:text-datacite-blue-light"
      >
        {doi.doi}
        <ArrowRight className="size-3.5" />
      </Link>
    ),
    resolutionCount: doi.resolutionCount,
  })) ?? [];

  const successfulDoiExportRows = fullReportDetail?.attributes.topSuccessfulDois.map((doi) => ({
    doi: doi.doi,
    resolutionCount: doi.resolutionCount,
  })) ?? [];

  const failedDoiRows = fullReportDetail?.attributes.failedDois.map((doi) => ({
    doi: doi.doi,
    resolutionCount: doi.resolutionCount,
    topReferrers: doi.top5FailedReferrers?.join(", ") || "—",
  })) ?? [];

  const failedDoiExportRows = fullReportDetail?.attributes.failedDois.map((doi) => ({
    doi: doi.doi,
    resolutionCount: doi.resolutionCount,
    topReferrers: doi.top5FailedReferrers?.join(", ") || "—",
  })) ?? [];

  const csvMonth = fullReportDetail?.attributes.period || "report";

  const handlePrefixSelect = (prefix: PrefixOption) => {
    router.replace(
      buildPrefixUrl(pathname, new URLSearchParams(searchParams.toString()), prefix.prefix),
      { scroll: false },
    );
  };

  const handleReportSelect = (report: ReportOption) => {
    router.replace(
      buildReportUrl(pathname, new URLSearchParams(searchParams.toString()), report.id),
      { scroll: false },
    );
  };

  const handleChartReportSelect = (reportId: string) => {
    router.replace(
      buildReportUrl(pathname, new URLSearchParams(searchParams.toString()), reportId),
      { scroll: false },
    );
  };

  return (
    <div className="space-y-4">
      {/* Prefix Selector */}
      {filteredPrefixOptions.length > 1 ? (
        <PrefixSelector
          selectedOption={selectedOption}
          options={filteredPrefixOptions}
          onSelect={handlePrefixSelect}
          isLoading={isLoading}
        />
      ) : null}

      <Card className="border bg-white shadow-sm flex flex-col gap-8 py-6">
        <CardHeader className="px-6">
          <div className="flex flex-col gap-3">
            <CardTitle className="min-w-0">
              <H4>Resolutions Trends</H4>
            </CardTitle>
            <TrendChart
              data={chartData}
              mode={chartMode}
              onModeChange={setChartMode}
              onSelectReport={handleChartReportSelect}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </CardHeader>
      </Card>

      <Card className="border bg-white shadow-sm flex flex-col gap-8 py-6">
        <CardHeader className="px-6">
          <div className="flex items-center gap-4">
            <CardTitle className="min-w-0">
              <H4>Resolution Reports By Month</H4>
            </CardTitle>
            <ReportSelector
              selectedReport={selectedReport}
              options={reportOptions}
              onSelect={handleReportSelect}
              isLoading={isLoading}
            />
          </div>
        </CardHeader>

        <CardContent className="px-6">
          {isLoading || isDetailLoading ? (
            <div className="flex h-16 items-center justify-center">
              <Spinner className="mx-auto my-auto text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="flex h-16 items-center justify-center text-sm text-muted-foreground">
              Unable to load available reports.
            </div>
          ) : reportOptions.length === 0 || !selectedReport ? (
            <div className="flex h-16 items-center justify-center text-sm text-muted-foreground">
              No reports are available for this prefix.
            </div>
          ) : isDetailError ? (
            <div className="flex h-16 items-center justify-center text-sm text-muted-foreground">
              Unable to load the selected report.
            </div>
          ) : selectedReport && fullReportDetail ? (
            <div className="space-y-8">
              {/* Summary Stats */}
              <div className="grid gap-4 md:grid-cols-2">
                <SummaryStatsBox
                  title="Total DOI Resolutions"
                  mainValue={fullReportDetail.attributes.summaryMetrics.totalAttemptedResolutions}
                  stats={[
                    {
                      label: "Successful Resolutions",
                      value: fullReportDetail.attributes.summaryMetrics.successfulResolutions,
                    },
                    {
                      label: "Failed Resolutions",
                      value: fullReportDetail.attributes.summaryMetrics.failedResolutions,
                    },
                  ]}
                />
                <SummaryStatsBox
                  title="Unique DOIs Resolved"
                  mainValue={fullReportDetail.attributes.summaryMetrics.totalUniqueDois}
                  stats={[
                    {
                      label: "Unique DOIs Successfully Resolved",
                      value: fullReportDetail.attributes.summaryMetrics.uniqueDoiSuccesses,
                    },
                    {
                      label: "Unique DOIs Failed to Resolve",
                      value: fullReportDetail.attributes.summaryMetrics.uniqueDoiFailures,
                    },
                  ]}
                />
              </div>

              <ScrollableTable
                title="Top Successfully Resolved DOIs"
                columns={[
                  { header: "DOI", accessor: "doi" },
                  { header: "Resolutions", accessor: "resolutionCount", className: "text-right" },
                ]}
                data={successfulDoiRows}
                rowKey="rowId"
                csvFilename={`successful-dois-${csvMonth}.csv`}
                csvRows={successfulDoiExportRows}
                maxHeight="h-100"
              />

              <ScrollableTable
                title="Failed DOI Resolutions"
                columns={[
                  { header: "DOI", accessor: "doi" },
                  { header: "Resolutions", accessor: "resolutionCount", className: "text-right" },
                  { header: "Top Referrers", accessor: "topReferrers" },
                ]}
                data={failedDoiRows}
                rowKey="doi"
                csvFilename={`failed-doi-resolutions-${csvMonth}.csv`}
                csvRows={failedDoiExportRows}
                maxHeight="h-100"
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}