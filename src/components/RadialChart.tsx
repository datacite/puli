"use client";

import {
  Label,
  type LabelProps,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CHART } from "@/constants";
import { asRoundedPercent } from "@/util";

export interface Props {
  property?: string;
  present: number;
}

const BAR = { ...CHART.bar, size: 20 };

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

export default function RadialChart(props: Props) {
  const { property = "property", present } = props;
  const data = [{ property, present, absent: 100 - present }];

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square w-full max-w-[200px]"
    >
      <RadialBarChart
        data={data}
        barSize={BAR.size}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={130}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        {/* <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        /> */}
        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
        >
          <Label content={PresentLabel} />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="present"
          stackId="a"
          cornerRadius={BAR.radius}
          fill="var(--color-present)"
          className="stroke-transparent stroke-2"
          background={{ fill: "var(--color-absent)", radius: BAR.radius }}
        />
        <RadialBar
          dataKey="absent"
          fill="#ffffff00"
          stackId="a"
          cornerRadius={BAR.radius}
          className="stroke-transparent stroke-2"
          // background={{ fill: "#00000000", radius: BAR.radius }}
        />
      </RadialBarChart>
    </ChartContainer>
  );

  function PresentLabel({ viewBox }: LabelProps) {
    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return;
    const { cx, cy = 0 } = viewBox;

    return (
      <text x={cx} y={cy} textAnchor="middle">
        <tspan x={cx} y={cy - 6} className="fill-foreground text-3xl">
          {asRoundedPercent(present)}
        </tspan>
      </text>
    );
  }
}
