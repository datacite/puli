"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CHART } from "@/constants";

const BAR = { ...CHART.bar, gap: 0 };

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
  const containerHeight = chartData.length * (BAR.size + BAR.gap) + 40;

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full"
      style={{ height: `${containerHeight}px` }}
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        barSize={BAR.size}
        barCategoryGap={BAR.gap}
        barGap={BAR.gap}
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
          background={{ fill: "var(--color-absent)", radius: BAR.radius }}
          radius={BAR.radius}
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
