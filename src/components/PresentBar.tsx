"use client";

import {
  Bar,
  BarChart,
  LabelList,
  type LabelProps,
  XAxis,
  YAxis,
} from "recharts";
import { HighImpactBadge } from "@/components/Badges";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { API_URL_DATACITE, CHART, COMMONS_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { asNumber, asRoundedPercent } from "@/util";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@base-ui/react/button";
import { Ban, Check, ExternalLink, MinusSquare, ScanSearch, SquareCheck, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { H3, H4 } from "./datacite/Headings";

export interface Props {
  property: string;
  present: number;
  metadataField?: string;
  withCount?: number;
  withoutCount?: number;
  isHighImpact?: boolean;
  className?: string;
}

const BAR = CHART.bar;

const chartConfig = {
  present: { label: "Present" },
} satisfies ChartConfig;




import React from "react";


export default function PresentBar(props: Props) {
  const {
    property,
    present,
    metadataField,
    withCount,
    withoutCount,
    isHighImpact = false,
  } = props;
  const containerHeight = BAR.size + 10;
  const data = [{ property, present }];
  const params = useParams<{ id?: string | string[] }>();
  const entityId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : undefined;

  const entityScope = entityId
    ? `${entityId.includes(".") ? "client.id" : "provider.id"}:${entityId}`
    : undefined;

  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <div
      className={cn(
        "group w-full text-sm grid grid-cols-[auto_min-content_1fr] h-min items-center gap-x-1 hover:bg-gray-50 rounded-md p-1 cursor-pointer",
        props.className,
      )}
      onClick={() => {
        if (!showDrawer) {
          setShowDrawer(true);
        }
      }}
    >
      <span className="mb-[-4px] truncate">{property}</span>{" "}
      <HighImpactBadge show={isHighImpact} />
      <span className="mb-[-4px] text-right text-muted-foreground">
        {asRoundedPercent(present)}
      </span>
      <div className="col-span-full w-full flex items-center">
        <div className="flex-1">
          <ChartContainer
            config={chartConfig}
            className="w-full"
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
        <Button
          type="button"
          aria-label="Investigate"
          className="ml-2 rounded-full hover:bg-muted transition-colors text-primary flex items-center justify-center w-8 hidden group-hover:flex"
        >
          <ScanSearch size={18} />
        </Button>
      </div>
      <MetadataPropertyModal
        metadataProperty={property}
        metadataField={metadataField}
        entityScope={entityScope}
        withCount={withCount}
        withoutCount={withoutCount}
        open={showDrawer}
        onOpenChange={setShowDrawer}
      />
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


export function MetadataPropertyModal({
  metadataProperty,
  metadataField,
  entityScope,
  withCount,
  withoutCount,
  open,
  onOpenChange,
}: {
  metadataProperty: string;
  metadataField?: string;
  entityScope?: string;
  withCount?: number;
  withoutCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const title = metadataField || metadataProperty;
  const toCamelCaseIfSnake = (value: string) =>
    value.includes("_")
      ? value
          .toLowerCase()
          .replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase())
      : value;

  const withPropertyQuery = [entityScope, `${title}:*`]
    .filter(Boolean)
    .join(" AND ");
  const missingPropertyQuery = [entityScope, `NOT ${title}:*`]
    .filter(Boolean)
    .join(" AND ");

  const apiWithPropertyUrl = `${API_URL_DATACITE}/dois?query=${encodeURIComponent(withPropertyQuery)}`;
  const apiMissingPropertyUrl = `${API_URL_DATACITE}/dois?query=${encodeURIComponent(missingPropertyQuery)}`;
  const commonsWithPropertyUrl = `${COMMONS_URL}/doi.org?query=${encodeURIComponent(withPropertyQuery)}`;
  const commonsMissingPropertyUrl = `${COMMONS_URL}/doi.org?query=${encodeURIComponent(missingPropertyQuery)}`;

  function openInNewWindow(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,44rem)] -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg focus:outline-none">
          <Dialog.Title asChild>
            <H3>
              {title.split(".").map((part, idx, arr) => (
                <React.Fragment key={`${part}-${idx}`}>
                  {toCamelCaseIfSnake(part)}
                  {idx < arr.length - 1 && (
                    <span className="mx-1 text-gray-300">&gt;</span>
                  )}
                </React.Fragment>
              ))}
            </H3>
          </Dialog.Title>

          <div className="relative mt-6 grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-12">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[calc(50%-0.5px)] h-px bg-gray-200 md:left-1/2 md:right-auto md:top-0 md:h-full md:w-px md:-translate-x-1/2"
            />
            <section
              aria-labelledby="with-property-heading"
              className="space-y-2"
            >
              <H4
                id="with-property-heading"
                  className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground/70"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                Records with field
                {typeof withCount === "number" && (
                  <span className="rounded-[40px] text-xs text-datacite-blue-dark bg-datacite-blue-light/20 py-0.5 px-2 border-none">
                    {asNumber(withCount)}
                  </span>
                )}
              </H4>
              <div className="mt-3 flex flex-col items-center gap-1">
                <button
                  type="button"
                  className="text-datacite-blue-light flex items-center gap-1 focus:outline-none focus-visible:underline"
                  onClick={() => openInNewWindow(commonsWithPropertyUrl)}
                >
                  View in Commons <ExternalLink size="1em" />
                </button>
                <button
                  type="button"
                  className="text-datacite-blue-light flex items-center gap-1 focus:outline-none focus-visible:underline"
                  onClick={() => openInNewWindow(apiWithPropertyUrl)}
                >
                  View in REST API <ExternalLink size="1em" />
                </button>
              </div>
            </section>

            <section
              aria-labelledby="missing-property-heading"
              className="space-y-2"
            >
              <H4
                id="missing-property-heading"
                className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground/70"
              >
                <Ban className="h-4 w-4" aria-hidden="true" />
                Records without field
                {typeof withoutCount === "number" && (
                  <span className="rounded-[40px] text-xs text-datacite-blue-dark bg-datacite-blue-light/20 py-0.5 px-2 border-none">
                    {asNumber(withoutCount)}
                  </span>
                )}
              </H4>
              <div className="mt-3 flex flex-col items-center gap-1">
                <button
                  type="button"
                  className="text-datacite-blue-light flex items-center gap-1 focus:outline-none focus-visible:underline"
                  onClick={() => openInNewWindow(commonsMissingPropertyUrl)}
                >
                  View in Commons <ExternalLink size="1em" />
                </button>
                <button
                  type="button"
                  className="text-datacite-blue-light flex items-center gap-1 focus:outline-none focus-visible:underline"
                  onClick={() => openInNewWindow(apiMissingPropertyUrl)}
                >
                  View in REST API <ExternalLink size="1em" />
                </button>
              </div>
            </section>
          </div>

          <Dialog.Close
            aria-label="Close"
            className="absolute top-3 right-3 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <XIcon className="h-4 w-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
