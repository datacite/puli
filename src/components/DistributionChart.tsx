"use client";

import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CHART } from "@/constants";
import { asPercent } from "@/util";

interface Props {
  property: string;
  data: { value: string; present: number }[];
}

const BAR = { ...CHART.bar, gap: 4 };

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

export default function DistributionChart(props: Props) {
  const { property, data } = props;

  const [displayAll, setDisplayAll] = useState(false);
  const toggleDisplayAll = () => setDisplayAll(!displayAll);

  const displayedData = displayAll ? data : data.slice(0, 3);
  const containerHeight = displayedData.length * (BAR.size + BAR.gap) + 40;

  return (
    <div className="w-full flex flex-col h-min">
      <span className="text-sm mb-[-4px]">Values of {property}</span>
      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{ height: `${containerHeight}px` }}
      >
        <BarChart
          accessibilityLayer
          data={displayedData}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barSize={BAR.size}
          barCategoryGap={BAR.gap}
          barGap={BAR.gap}
        >
          <YAxis
            dataKey="value"
            type="category"
            axisLine={false}
            tickLine={false}
            yAxisId={0}
            tick={{ textAnchor: "start", dx: -52 }}
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
          <XAxis dataKey="present" type="number" domain={[0, 100]} hide />
          <Bar
            dataKey="present"
            fill="var(--color-present)"
            background={{ fill: "var(--color-absent)", radius: BAR.radius }}
            radius={BAR.radius}
          />
        </BarChart>
      </ChartContainer>
      {data.length > 3 && (
        <Button onClick={toggleDisplayAll} variant="ghost">
          {displayAll ? "Show less ↑" : "Show more ↓"}
        </Button>
      )}
    </div>
  );
}
