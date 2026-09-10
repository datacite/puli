"use client";

import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  type LabelProps,
  XAxis,
  YAxis,
} from "recharts";
import { HighImpactBadge } from "@/components/Badges";
import MetadataDrilldownDrawer from "@/components/metadata/MetadataDrilldownDrawer";
import { useMetadataEntityScope } from "@/components/metadata/MetadataEntityScopeContext";
import MetadataDrilldownPopover from "@/components/metadata/MetadataDrilldownPopover";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CHART } from "@/constants";
import { cn } from "@/lib/utils";
import {
  asRoundedPercent,
  buildEntityScopeClause,
  buildMetadataDrilldownQuery,
  type MetadataDrilldownKind,
} from "@/util";
import { useParams, usePathname } from "next/navigation";

export interface Props {
  property: string;
  present: number;
  metadataField?: string;
  metadataValue?: string;
  withCount?: number;
  withoutCount?: number;
  isHighImpact?: boolean;
  className?: string;
}

const BAR = CHART.bar;

const chartConfig = {
  present: { label: "Present" },
} satisfies ChartConfig;

export default function PresentBar(props: Props) {
  const {
    property,
    present,
    metadataField,
    metadataValue,
    withCount,
    withoutCount,
    isHighImpact = false,
  } = props;
  const containerHeight = BAR.size + 10;
  const data = [{ property, present }];
  const params = useParams<{ id?: string | string[] }>();
  const pathname = usePathname();
  const metadataEntityScope = useMetadataEntityScope();

  const entityId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : undefined;

  const entityScope = buildEntityScopeClause(
    metadataEntityScope?.entityId ?? entityId,
    metadataEntityScope?.entityType,
  );

  const [drawerQuery, setDrawerQuery] = React.useState("");
  const [drawerKind, setDrawerKind] = React.useState<MetadataDrilldownKind>("with");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function buildQuery(kind: MetadataDrilldownKind) {
    const field = metadataField || property;

    return buildMetadataDrilldownQuery({
      field,
      kind,
      value: metadataValue,
    });
  }

  function handleSelect(kind: MetadataDrilldownKind) {
    setDrawerKind(kind);
    setDrawerQuery(buildQuery(kind));
    setDrawerOpen(true);
  }

  return (
    <>
      <MetadataDrilldownPopover
        withCount={withCount}
        withoutCount={withoutCount}
        onSelect={handleSelect}
        field={metadataField || property}
        value={metadataValue}
      >
        <button
          type="button"
          className={cn(
            "group w-full text-sm grid grid-cols-[minmax(0,1fr)_min-content_min-content] h-min items-center gap-x-1 rounded-md text-left hover:bg-gray-50",
            props.className,
          )}
        >
          <span className="mb-[-4px] min-w-0 truncate">{property}</span>{" "}
          <HighImpactBadge show={isHighImpact} />
          <span className="mb-[-4px] justify-self-end text-right text-muted-foreground">
            {asRoundedPercent(present)}
          </span>
          <div className="col-span-full w-full flex items-center">
            <div className="flex-1">
              <ChartContainer
                config={chartConfig}
                className="w-full"
                style={{ height: `${containerHeight}px`, pointerEvents: "none" }}
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
          </div>
        </button>
      </MetadataDrilldownPopover>
      <MetadataDrilldownDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        field={metadataField || property}
        value={metadataValue}
        kind={drawerKind}
        query={""}
        fixedQuery={[drawerQuery, entityScope].filter(Boolean).join(" AND ")}
        basePath={pathname}
      />
    </>
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
