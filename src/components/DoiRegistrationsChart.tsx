"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CHART } from "@/constants";

export type DoiRegistration = {
  year: number | string;
  count: number;
};

interface Props {
  data: DoiRegistration[];
}

const BAR = { ...CHART.bar };

const chartConfig = {
  count: { label: "Count" },
} satisfies ChartConfig;

export default function DoiRegistrationsChart(props: Props) {
  const { data } = props;

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <BarChart data={data} margin={{ top: 20 }} accessibilityLayer>
        <XAxis dataKey="year" type="category" tickLine={false} />
        <YAxis dataKey="count" type="number" hide />
        <Bar
          dataKey="count"
          fill={BAR.color}
          radius={[BAR.radius, BAR.radius, 0, 0]}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </BarChart>
    </ChartContainer>
  );
}
