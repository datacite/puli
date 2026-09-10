"use client";

import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CHART } from "@/constants";
import { asNumber } from "@/util";

export type DoiRegistration = {
  year: number | string;
  count: number;
};

interface Props {
  data: DoiRegistration[];
  compact?: boolean;
  selectedYears?: Set<string>;
  onYearClick?: (year: string) => void;
}

const BAR = { ...CHART.bar };

const chartConfig = {
  count: { label: "DOIs" },
} satisfies ChartConfig;

export default function DoiRegistrationsChart(props: Props) {
  const { data, compact = false, selectedYears, onYearClick } = props;
  const hasSelection = (selectedYears?.size || 0) > 0;

  return (
    <ChartContainer
      config={chartConfig}
      className={compact ? "h-[160px] w-full overflow-hidden" : "h-full"}
    >
      <BarChart
        data={data}
        margin={compact ? { top: 6, right: 0, left: 0, bottom: 0 } : { top: 20 }}
        accessibilityLayer
      >
        <XAxis
          dataKey="year"
          type="category"
          tickLine={false}
          tick={compact ? { fontSize: 10 } : undefined}
          minTickGap={compact ? 24 : 8}
          interval={compact ? "preserveStartEnd" : 0}
          tickMargin={compact ? 6 : 0}
        />
        <YAxis dataKey="count" type="number" hide />
        <Bar
          dataKey="count"
          fill={BAR.color}
          radius={compact ? [3, 3, 0, 0] : [BAR.radius, BAR.radius, 0, 0]}
        >
          {data.map((entry) => {
            const year = String(entry.year);
            const isSelected = selectedYears?.has(year);

            return (
              <Cell
                key={year}
                fill={BAR.color}
                fillOpacity={hasSelection ? (isSelected ? 1 : 0.3) : 1}
                style={onYearClick ? { cursor: "pointer" } : undefined}
                onClick={() => {
                  onYearClick?.(year);
                }}
              />
            );
          })}
        </Bar>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideIndicator
              formatter={(v) => (
                <span className="font-semibold">{asNumber(v as number)}</span>
              )}
            />
          }
        />
      </BarChart>
    </ChartContainer>
  );
}
