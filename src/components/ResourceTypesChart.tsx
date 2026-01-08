"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CHART, PALETTE_RESOURCE_TYPE } from "@/constants";

export type ResourceTypeData = {
  type: string;
  count: number;
};

interface Props {
  data: ResourceTypeData[];
}

const BAR = { ...CHART.bar, size: 20 };

const chartConfig = {
  count: { label: "Count" },
} satisfies ChartConfig;

export default function ResourceTypesChart(props: Props) {
  const data = props.data.map((d) => ({
    fill:
      PALETTE_RESOURCE_TYPE[d.type as keyof typeof PALETTE_RESOURCE_TYPE] ||
      PALETTE_RESOURCE_TYPE.Unknown,
    ...d,
  }));

  return (
    <ChartContainer config={chartConfig} className="aspect-square h-full">
      <PieChart margin={{ top: -10, right: -10, left: -10, bottom: -10 }}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          innerRadius="55%"
          paddingAngle={4}
          cornerRadius={BAR.radius}
        />
      </PieChart>
    </ChartContainer>
  );
}
