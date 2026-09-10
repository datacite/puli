"use client";

import DoiRegistrationsChart from "@/components/DoiRegistrationsChart";
import ResourceTypesChart from "@/components/ResourceTypesChart";
import { H3 } from "@/components/datacite/Headings";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { DOI_FACET_CONFIGS } from "@/app/dois/doiConfig";
import { asNumber } from "@/util";
import type { DoiFacetConfig, DoiFacetValue } from "@/types";

type Props = {
  accordionOpenKeys: string[];
  selectedFacetValues: Record<string, DoiFacetValue[]>;
  accordionFacetValues: Record<string, DoiFacetValue[]>;
  accordionFacetLoading: Record<string, boolean>;
  interactingFacetKey: string | null;
  facetsLoading: boolean;
  publicationYearData: Array<{ year: string; count: number }>;
  resourceTypeFacetData: Array<{ type: string; count: number }>;
  selectedPublicationYears: Set<string>;
  selectedResourceTypes: Set<string>;
  onOpenChange: (openKeys: string[]) => void;
  onFacetToggle: (facetKey: string, item: DoiFacetValue, checked: boolean) => void;
  onPublicationYearClick: (year: string) => void;
  onResourceTypeClick: (resourceType: string) => void;
};

function getCompareValue(config: DoiFacetConfig, value: DoiFacetValue) {
  return config.valueField === "title" ? value.title : value.id;
}

export default function DoiFacetsPanel(props: Props) {
  return (
    <aside className="order-1 h-fit gap-4 lg:order-2">
      <Accordion
        className="border bg-card px-4 py-2 shadow-sm"
        value={props.accordionOpenKeys}
        onValueChange={(next) => {
          const openKeys = Array.isArray(next) ? next : [next].filter(Boolean);
          props.onOpenChange(openKeys as string[]);
        }}
        multiple
      >
        {DOI_FACET_CONFIGS.map((config) => {
          const selected = props.selectedFacetValues[config.key] || [];
          const options = props.accordionFacetValues[config.key] || [];
          const apiOptionIds = new Set(options.map((item) => getCompareValue(config, item)));
          const missingSelected = selected.filter(
            (item) => !apiOptionIds.has(getCompareValue(config, item)),
          );
          const displayOptions = [...options, ...missingSelected];
          const isLoading = !!props.accordionFacetLoading[config.key];
          const hasSelection = selected.length > 0;
          const isInteracting = props.interactingFacetKey === config.key;

          return (
            <AccordionItem key={config.key} value={config.key}>
              <AccordionHeader>
                <AccordionTrigger className="w-full py-2">
                  <span className="flex w-full items-center gap-2">
                    {config.icon ? <span className="text-gray-600">{config.icon}</span> : null}
                    <span className="font-semibold">{config.label}</span>
                    {isLoading ? <Spinner className="size-3.5 stroke-datacite-blue-dark" /> : null}
                    {hasSelection ? (
                      <Badge className="pointer-events-none ml-auto h-5 shrink-0 bg-gray-200 px-1.5 text-xs font-bold leading-none text-gray-700">
                        {asNumber(selected.length)}
                      </Badge>
                    ) : null}
                  </span>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>
                <div className="max-h-[280px] space-y-0.5 overflow-y-auto pb-1">
                  {!isLoading && displayOptions.length === 0 ? (
                    <p className="py-1 text-xs text-muted-foreground">No options found.</p>
                  ) : null}
                  {displayOptions.map((item) => {
                    const checked = selected.some(
                      (value) => getCompareValue(config, value) === getCompareValue(config, item),
                    );
                    const hasApiCount = apiOptionIds.has(getCompareValue(config, item));
                    const dimmed = isInteracting && hasSelection && !checked;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={`grid w-full grid-cols-[16px_minmax(0,1fr)_max-content] items-center gap-2 rounded-sm px-1 py-1 text-left text-sm transition-opacity hover:bg-gray-50 ${
                          isLoading
                            ? "pointer-events-none opacity-40"
                            : dimmed
                              ? "opacity-60"
                              : "opacity-100"
                        }`}
                        onClick={() => {
                          props.onFacetToggle(config.key, item, !checked);
                        }}
                      >
                        <Checkbox checked={checked} className="pointer-events-none" />
                        <span className="truncate">{item.title}</span>
                        <span className="tabular-nums text-xs text-muted-foreground">
                          {hasApiCount ? asNumber(item.count) : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="mt-4 space-y-3">
        <Card className="py-3">
          <CardContent className="px-3">
            <H3 className="mb-2 text-sm font-semibold text-datacite-dark-gray">Resource Types</H3>
            {props.facetsLoading ? (
              <div className="flex h-[220px] items-center justify-center">
                <Spinner className="size-5 stroke-datacite-blue-dark" />
              </div>
            ) : props.resourceTypeFacetData.length > 0 ? (
              <ResourceTypesChart
                data={props.resourceTypeFacetData}
                compact
                selectedTypes={props.selectedResourceTypes}
                onTypeClick={props.onResourceTypeClick}
              />
            ) : (
              <p className="text-xs text-muted-foreground">No data available.</p>
            )}
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent className="px-3">
            <H3 className="mb-2 text-sm font-semibold text-datacite-dark-gray">Publication Year</H3>
            {props.facetsLoading ? (
              <div className="flex h-[160px] items-center justify-center">
                <Spinner className="size-5 stroke-datacite-blue-dark" />
              </div>
            ) : props.publicationYearData.length > 0 ? (
              <div className="overflow-hidden">
                <DoiRegistrationsChart
                  data={props.publicationYearData}
                  compact
                  selectedYears={props.selectedPublicationYears}
                  onYearClick={props.onPublicationYearClick}
                />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No data available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}