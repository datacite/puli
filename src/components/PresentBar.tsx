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
import { asPercent } from "@/util";

export interface Props {
  property: string;
  present: number;
  isHighImpact?: boolean;
}

const BAR = CHART.bar;

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

export default function PresentBar(props: Props) {
  const { property, present, isHighImpact = false } = props;
  const containerHeight = BAR.size + 10;

  const data = [{ property, present }];

  return (
    <div className="w-full flex flex-col h-min">
      <span className="text-xs mb-[-4px]">
        {property}
        <HighImpactBadge show={isHighImpact} />
      </span>
      <ChartContainer
        config={chartConfig}
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
            tickFormatter={asPercent}
            tick={{ textAnchor: "end", dx: 30 }}
          />
          <XAxis dataKey="present" type="number" domain={[0, 100]} hide />
          <Bar
            dataKey="present"
            fill="var(--color-present)"
            background={{ fill: "var(--color-absent)", radius: BAR.radius }}
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
