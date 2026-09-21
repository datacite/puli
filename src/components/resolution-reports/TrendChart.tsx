"use client";

import {
  Area,
  AreaChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Toolbar, ToolbarGroup } from "@/components/ui/toolbar";
import { Spinner } from "@/components/ui/spinner";
import { asNumber } from "@/util";
import { formatPeriodLabel } from "@/components/resolution-reports/utils";
import { RESOLUTION_REPORTS } from "@/constants";
import type { ResolutionTrendPoint, ChartMode } from "@/types";

const CHART_TOOLTIP_ORDER: Record<string, number> = {
  successfulResolutions: 0,
  failedResolutions: 1,
  uniqueDoiSuccesses: 0,
  uniqueDoiFailures: 1,
};

type TooltipContentProps = React.ComponentProps<typeof ChartTooltipContent>;
type TooltipPayload = NonNullable<TooltipContentProps["payload"]>;

type TrendChartProps = {
  data: ResolutionTrendPoint[];
  mode: ChartMode;
  onModeChange: (mode: ChartMode) => void;
  onSelectReport?: (reportId: string) => void;
  isLoading?: boolean;
  isError?: boolean;
};

export function TrendChart({
  data,
  mode,
  onModeChange,
  onSelectReport,
  isLoading,
  isError,
}: TrendChartProps) {
  function sortTooltipPayload(
    payload: TooltipContentProps["payload"],
    displayOrder?: Record<string, number>,
  ) {
    if (!displayOrder || !payload) {
      return payload;
    }

    return [...payload].sort((left, right) => {
      const leftPriority = displayOrder[String(left.dataKey)] ?? Number.MAX_SAFE_INTEGER;
      const rightPriority = displayOrder[String(right.dataKey)] ?? Number.MAX_SAFE_INTEGER;
      return leftPriority - rightPriority;
    }) as TooltipPayload;
  }

  function handleChartClick(state: { activePayload?: Array<{ payload?: ResolutionTrendPoint }> }) {
    const reportId = state.activePayload?.[0]?.payload?.id;
    if (!reportId) return;
    onSelectReport?.(reportId);
  }

  function renderTooltipContent(
    props: Pick<TooltipContentProps, "active" | "label" | "payload">,
    displayOrder?: Record<string, number>,
    hideIndicator?: boolean,
  ) {
    const sortedPayload = sortTooltipPayload(props.payload, displayOrder);

    return (
      <ChartTooltipContent
        active={props.active}
        label={props.label}
        payload={sortedPayload}
        className="min-w-[12rem] gap-2 px-3 py-2 text-sm [&>div:last-child]:gap-2"
        hideIndicator={hideIndicator}
        labelFormatter={(label) => formatPeriodLabel(String(label))}
        labelClassName="text-base"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[320px] items-center justify-center">
        <Spinner className="mx-auto my-auto text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
        Unable to load resolution reports.
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
        No resolution report data is available for this prefix.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Toolbar className="mx-auto w-fit border rounded-[60px] bg-muted p-1 text-datacite-dark-blue">
        <ToolbarGroup className="flex-nowrap items-center gap-1">
          {RESOLUTION_REPORTS.CHART_MODES.map((option) => {
            const isActive = mode === option.value;
            return (
              <Button
                key={option.value}
                type="button"
                size="sm"
                aria-pressed={isActive}
                onClick={() => onModeChange(option.value as ChartMode)}
                className={isActive
                  ? "rounded-full border bg-white font-semibold text-datacite-dark-blue shadow-xs hover:bg-white/90"
                  : "rounded-full border border-transparent bg-transparent font-semibold text-muted-foreground shadow-xs hover:bg-white/70 hover:text-foreground"
                }
              >
                {option.label}
              </Button>
            );
          })}
        </ToolbarGroup>
      </Toolbar>

      <ChartContainer
        config={RESOLUTION_REPORTS.CHART_CONFIG}
        className="h-[320px] w-full [&_*]:cursor-pointer"
      >
        {mode === "total-resolutions" ? (
          <AreaChart
            data={data}
            margin={{ top: 12, right: 12, left: 12, bottom: 0 }}
            accessibilityLayer
            onClick={handleChartClick}
          >
            <defs>
              <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-successfulResolutions)" stopOpacity={0.87}/>
                <stop offset="95%" stopColor="var(--color-successfulResolutions)" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-failedResolutions)" stopOpacity={0.87}/>
                <stop offset="95%" stopColor="var(--color-failedResolutions)" stopOpacity={0.3}/>
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
              tickFormatter={(value) => asNumber(Number(value))}
            />
            <ChartTooltip
              content={(props) => renderTooltipContent(props, CHART_TOOLTIP_ORDER)}
            />
            <Area
              type="monotone"
              dataKey="failedResolutions"
              stackId="resolution-status"
              strokeWidth={0}
              fill="url(#colorFailed)"
              dot={{ r: 4, fill: "var(--color-failedResolutions)" }}
            />
            <Area
              type="monotone"
              dataKey="successfulResolutions"
              stackId="resolution-status"
              strokeWidth={0}
              fill="url(#colorSuccessful)"
              dot={{ r: 4, fill: "var(--color-successfulResolutions)" }}
            />
          </AreaChart>
        ) : (
          <LineChart
            data={data}
            margin={{ top: 12, right: 12, left: 12, bottom: 0 }}
            accessibilityLayer
            onClick={handleChartClick}
          >
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
              tickFormatter={(value) => asNumber(Number(value))}
            />
            <ChartTooltip
              content={(props) => renderTooltipContent(props, CHART_TOOLTIP_ORDER)}
            />
            <Line
              type="monotone"
              dataKey="uniqueDoiSuccesses"
              stroke="var(--color-successfulResolutions)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: "var(--color-successfulResolutions)" }}
            />
            <Line
              type="monotone"
              dataKey="uniqueDoiFailures"
              stroke="var(--color-failedResolutions)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: "var(--color-failedResolutions)" }}
            />
          </LineChart>
        )}
      </ChartContainer>
    </div>
  );
}
