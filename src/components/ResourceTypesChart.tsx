"use client";

import { type LegendProps, Cell, Pie, PieChart } from "recharts";
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
  compact?: boolean;
  selectedTypes?: Set<string>;
  onTypeClick?: (type: string) => void;
}

const BAR = { ...CHART.bar, size: 20 };

const chartConfig = {
  count: { label: "Count" },
} satisfies ChartConfig;

export default function ResourceTypesChart(props: Props) {
  const { compact = false, selectedTypes, onTypeClick } = props;
  const hasSelection = (selectedTypes?.size || 0) > 0;
  const data = props.data.map((d) => ({
    fill:
      PALETTE_RESOURCE_TYPE[d.type as keyof typeof PALETTE_RESOURCE_TYPE] ||
      PALETTE_RESOURCE_TYPE.Unknown,
    ...d,
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className={compact ? "h-[220px] w-full aspect-auto overflow-hidden" : "h-full"}
    >
      <PieChart
        margin={
          compact
            ? { top: 0, right: 0, left: 0, bottom: 30 }
            : { top: -10, right: -10, left: -10, bottom: -10 }
        }
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend
          layout={compact ? "horizontal" : "vertical"}
          align={compact ? "center" : "right"}
          verticalAlign={compact ? "bottom" : "middle"}
          content={
            <ChartLegendContent
              limit={compact ? 4 : 5}
              compact={compact}
              selectedTypes={selectedTypes}
              onTypeClick={onTypeClick}
            />
          }
        />
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          innerRadius={compact ? "52%" : "55%"}
          outerRadius={compact ? "76%" : undefined}
          paddingAngle={0}
          cornerRadius={BAR.radius}
        >
          {data.map((entry) => {
            const isSelected = selectedTypes?.has(entry.type);

            return (
              <Cell
                key={entry.type}
                fill={entry.fill}
                fillOpacity={hasSelection ? (isSelected ? 1 : 0.3) : 1}
                style={onTypeClick ? { cursor: "pointer" } : undefined}
                onClick={() => {
                  onTypeClick?.(entry.type);
                }}
              />
            );
          })}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

function ChartLegendContent(
  props: LegendProps & {
    limit?: number;
    compact?: boolean;
    selectedTypes?: Set<string>;
    onTypeClick?: (type: string) => void;
  },
) {
  if (!props.payload?.length) return null;

  const hasSelection = (props.selectedTypes?.size || 0) > 0;

  return (
    <ul
      className={
        props.compact
          ? "grid w-full max-w-full grid-cols-2 gap-x-2 gap-y-1 px-1"
          : "grid grid-cols-[min-content_max-content] items-baseline gap-1.5"
      }
    >
      {props.payload
        .filter((item) => item.type !== "none")
        .slice(0, props.limit)
        .map((item) => {
          const typeLabel = String(item.value || "");
          const isSelected = props.selectedTypes?.has(typeLabel);

          return (
            <li
              key={typeLabel}
              className={
                props.compact
                  ? `flex min-w-0 items-center gap-1 text-xs ${hasSelection && !isSelected ? "opacity-50" : "opacity-100"}`
                  : "contents"
              }
            >
              <div
                className="h-2 w-2"
                style={{ backgroundColor: item.color }}
              />
              {props.compact ? (
                <button
                  type="button"
                  className="min-w-0 truncate text-left"
                  onClick={() => {
                    props.onTypeClick?.(typeLabel);
                  }}
                  style={props.onTypeClick ? { cursor: "pointer" } : undefined}
                >
                  {typeLabel}
                </button>
              ) : (
                <button
                  type="button"
                  className={`${hasSelection && !isSelected ? "opacity-50" : "opacity-100"}`}
                  onClick={() => {
                    props.onTypeClick?.(typeLabel);
                  }}
                  style={props.onTypeClick ? { cursor: "pointer" } : undefined}
                >
                  {typeLabel}
                </button>
              )}
            </li>
          );
        })}
    </ul>
  );
}
