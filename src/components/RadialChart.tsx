"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const BAR_RADIUS = 5;

const chartData = [{ category: "creators", present: 70 }].map((item) => ({
  ...item,
  absent: 100 - item.present,
}));

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

export default function RadialChart() {
  const present = chartData[0].present;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        barSize={20}
        startAngle={180}
        endAngle={0}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {asPercent(present)}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="present"
          stackId="a"
          cornerRadius={BAR_RADIUS}
          fill="var(--color-present)"
          className="stroke-transparent stroke-2"
          background={{ fill: "var(--color-absent)", radius: BAR_RADIUS }}
        />
        <RadialBar
          dataKey="absent"
          fill="#ffffff00"
          stackId="a"
          cornerRadius={BAR_RADIUS}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}

function asPercent(value: number) {
  return `${value}%`;
}
