"use client";

import { type LegendProps, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
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
    <ChartContainer config={chartConfig} className="h-full">
      <PieChart margin={{ top: -10, right: -10, left: -10, bottom: -10 }}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          content={<ChartLegendContent limit={5} />}
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

function ChartLegendContent(props: LegendProps & { limit?: number }) {
  if (!props.payload?.length) return null;

  return (
    <ul className="grid grid-cols-[min-content_max-content] items-baseline gap-1.5">
      {props.payload
        .filter((item) => item.type !== "none")
        .slice(0, props.limit)
        .map((item) => {
          return (
            <li key={item.value} className="contents">
              <div
                className="h-2 w-2"
                style={{ backgroundColor: item.color }}
              />
              {item.value}
            </li>
          );
        })}
    </ul>
  );
}
