"use client";

import { useState } from "react";
import {
  Label,
  type LabelProps,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import MetadataDrilldownDrawer from "@/components/metadata/MetadataDrilldownDrawer";
import { useMetadataEntityScope } from "@/components/metadata/MetadataEntityScopeContext";
import MetadataDrilldownPopover from "@/components/metadata/MetadataDrilldownPopover";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CHART } from "@/constants";
import {
  asRoundedPercent,
  buildEntityScopeClause,
  buildMetadataDrilldownQuery,
  type MetadataDrilldownKind,
} from "@/util";
import { useParams, usePathname } from "next/navigation";

export interface Props {
  property?: string;
  metadataField?: string;
  present: number;
}

const BAR = { ...CHART.bar, size: 20 };

const chartConfig = {
  present: { label: "Present" },
  absent: { label: "Absent" },
} satisfies ChartConfig;

export default function RadialChart(props: Props) {
  const { property, metadataField, present } = props;
  const field = metadataField || property || "";
  const data = [{ property: field, present, absent: 100 - present }];
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

  const [drawerQuery, setDrawerQuery] = useState("");
  const [drawerKind, setDrawerKind] = useState<MetadataDrilldownKind>("with");
  const [drawerOpen, setDrawerOpen] = useState(false);

  function buildQuery(kind: MetadataDrilldownKind) {
    return buildMetadataDrilldownQuery({ field, kind });
  }

  function handleSelect(kind: MetadataDrilldownKind) {
    setDrawerKind(kind);
    setDrawerQuery(buildQuery(kind));
    setDrawerOpen(true);
  }

  return (
    <>
      <MetadataDrilldownPopover
        onSelect={handleSelect}
        field={field}
      >
        <button type="button" className="flex items-center justify-center w-full rounded-md text-left hover:bg-gray-50">
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
                fill={BAR.color}
                className="stroke-transparent stroke-2"
                background={{
                  fill: BAR.background,
                  radius: BAR.radius,
                }}
              />
              <RadialBar
                dataKey="absent"
                fill={BAR.background}
                stackId="a"
                cornerRadius={BAR.radius}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </button>
      </MetadataDrilldownPopover>
      <MetadataDrilldownDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        field={field}
        kind={drawerKind}
        query={""}
        fixedQuery={[drawerQuery, entityScope].filter(Boolean).join(" AND ")}
        basePath={pathname}
      />
    </>
  );

  function PresentLabel({ viewBox }: LabelProps) {
    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return;
    const { cx, cy = 0 } = viewBox;

    return (
      <text x={cx} y={cy} textAnchor="middle">
        <tspan x={cx} y={cy - 6} className="fill-foreground text-2xl">
          {asRoundedPercent(present)}
        </tspan>
      </text>
    );
  }
}
