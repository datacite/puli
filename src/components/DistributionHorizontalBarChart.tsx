"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const BAR_RADIUS = 5;

export const description = "A bar chart with a custom label";

const chartData = [
  { category: "ORCID", present: 70 },
  { category: "ROR", present: 60 },
  { category: "ISNI", present: 98 },
].map((item) => ({ ...item, absent: 100 - item.present }));

const chartConfig = {
  present: {
    label: "Present",
    color: "var(--color-primary-light-blue)",
  },
  absent: {
    label: "Absent",
    color: "var(--color-primary-dark-blue)",
  },
} satisfies ChartConfig;

export default function HorizontalBarChart() {
  const barSize = 20;
  const barGap = 20;
  const containerHeight = chartData.length * (barSize + barGap) + 40;

  return (
    <ChartContainer
      config={chartConfig}
      className="min-w-full"
      style={{ height: `${containerHeight}px` }}
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 50,
        }}
        barSize={barSize}
        barCategoryGap={barGap}
        barGap={barGap}
      >
        <YAxis
          dataKey="category"
          type="category"
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="present"
          type="category"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tickFormatter={asPercent}
          yAxisId="percent"
        />
        <XAxis dataKey="present" type="number" hide />
        <Bar
          dataKey="present"
          fill="var(--color-present)"
          background={{ fill: "var(--color-absent)", radius: BAR_RADIUS }}
          radius={BAR_RADIUS}
          stackId={1}
        />
        <Bar dataKey="absent" fill="#ffffff00" stackId={1} yAxisId="percent" />
      </BarChart>
    </ChartContainer>
  );
}

function asPercent(value: number) {
  return `${value}%`;
}
