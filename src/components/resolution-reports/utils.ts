import type { ResolutionReportSummary, ResolutionTrendPoint } from "@/types";

export function formatPeriodLabel(period: string): string {
  const [year, month] = period.split("-");
  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  if (!Number.isFinite(parsedYear) || !Number.isFinite(parsedMonth)) {
    return period;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(parsedYear, parsedMonth - 1, 1)));
}

export function buildTrendData(reports: ResolutionReportSummary[]): ResolutionTrendPoint[] {
  return [...reports]
    .sort((left, right) => left.attributes.period.localeCompare(right.attributes.period))
    .map((report) => ({
      id: report.id,
      period: report.attributes.period,
      totalAttemptedResolutions:
        report.attributes.summaryMetrics.totalAttemptedResolutions,
      successfulResolutions:
        report.attributes.summaryMetrics.successfulResolutions,
      failedResolutions: report.attributes.summaryMetrics.failedResolutions,
      totalUniqueDois: report.attributes.summaryMetrics.totalUniqueDois,
      uniqueDoiSuccesses: report.attributes.summaryMetrics.uniqueDoiSuccesses,
      uniqueDoiFailures: report.attributes.summaryMetrics.uniqueDoiFailures,
    }));
}
