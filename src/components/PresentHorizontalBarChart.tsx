"use client";

import {
  Bar,
  BarChart,
  LabelList,
  type LabelProps,
  XAxis,
  YAxis,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const BAR_RADIUS = 5;

export const description = "A bar chart with a custom label";

const chartData = [
  { category: "creatorName", present: 70 },
  { category: "givenName", present: 60 },
  { category: "familyName", present: 98 },
  { category: "nameType", present: 100 },
  { category: "nameIdentifier", present: 30 },
  { category: "affiliation", present: 20 },
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
  const barGap = 30;
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
          tick={false}
          axisLine={false}
          width={0}
          yAxisId={0}
        />
        <YAxis
          dataKey="present"
          type="category"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tickFormatter={asPercent}
          yAxisId={1}
        />
        <XAxis dataKey="present" type="number" hide />
        <Bar
          dataKey="present"
          fill="var(--color-present)"
          background={{ fill: "var(--color-absent)", radius: BAR_RADIUS }}
          radius={BAR_RADIUS}
          stackId={1}
        >
          <LabelList dataKey="category" content={CategoryLabel} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

function CategoryLabel(props: LabelProps) {
  const { x, y, value } = props;
  return (
    <text x={x} y={Number(y) - 6} fontSize={12} textAnchor="start">
      {value}
    </text>
  );
}

function asPercent(value: number) {
  return `${value}%`;
}
