"use client";

import {
  Bar,
  BarChart,
  LabelList,
  type LabelProps,
  XAxis,
  YAxis,
} from "recharts";
import HighImpactBadge from "@/components/HighImpactBadge";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CHART } from "@/constants";
import { asRoundedPercent } from "@/util";

export interface Props {
  property: string;
  present: number;
  isHighImpact?: boolean;
}

const BAR = CHART.bar;

const chartConfig = {
  present: { label: "Present" },
} satisfies ChartConfig;

export default function PresentBar(props: Props) {
  const { property, present, isHighImpact = false } = props;
  const containerHeight = BAR.size + 10;

  const data = [{ property, present }];

  return (
    <div className="w-full text-xs grid grid-cols-[max-content_1fr_max-content] h-min items-center">
      <span className="mb-[-4px]">{property}</span>
      <HighImpactBadge show={isHighImpact} />
      <span className="mb-[-4px] col-start-3 text-muted-foreground">
        {asRoundedPercent(present)}
      </span>
      <ChartContainer
        config={chartConfig}
        className="col-span-full w-full"
        style={{ height: `${containerHeight}px` }}
      >
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barSize={BAR.size}
        >
          <YAxis
            dataKey="present"
            type="category"
            orientation="right"
            axisLine={false}
            tickLine={false}
            includeHidden
            interval={0}
            tickFormatter={(value) => asRoundedPercent(value)}
            tick={{ textAnchor: "end", dx: 30 }}
            hide
          />
          <XAxis dataKey="present" type="number" domain={[0, 100]} hide />
          <Bar
            dataKey="present"
            fill={BAR.color}
            background={{
              fill: BAR.background,
              radius: BAR.radius,
            }}
            radius={BAR.radius}
          >
            <LabelList dataKey="category" content={CategoryLabel} />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
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
