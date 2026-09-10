"use client";

import { Popover } from "@base-ui/react/popover";
import { CircleHelp, SquareArrowOutUpRight } from "lucide-react";
import { useMemo } from "react";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toolbar, ToolbarGroup } from "@/components/ui/toolbar";
import { DoiRecordList } from "@/components/DoiRecordList";
import { DoiRecordListSkeleton } from "@/components/DoiRecordListSkeleton";
import DoiExportMenu from "@/components/DoiExportMenu";
import DoiMetricsSummary from "@/app/dois/DoiMetricsSummary";
import { DOI_SORT_OPTIONS } from "@/app/dois/doiConfig";
import { buildDoiRecordListItem } from "@/lib/resultItems";
import type { DoiMetricState, DoiRecord, SelectOption } from "@/types";

type Props = {
  searchBar?: React.ReactNode;
  sort: string;
  pageSize: number;
  committedQuery: string;
  total: number;
  page: number;
  records: DoiRecord[];
  isLoadingRecords: boolean;
  recordError: unknown;
  showInitialResultsSkeleton: boolean;
  citationCount: DoiMetricState;
  viewCount: DoiMetricState;
  downloadCount: DoiMetricState;
  showAdvancedSearchToggle: boolean;
  advancedSearchEnabled: boolean;
  onAdvancedSearchChange: (checked: boolean) => void;
  onSortChange: (next: SelectOption | null) => void;
  onPageChange: (page: number) => void;
};

export default function DoiResultsPanel(props: Props) {
  const hasCommittedQuery = props.committedQuery.trim().length > 0;
  const items = useMemo(() => props.records.map(buildDoiRecordListItem), [props.records]);

  return (
    <Card className="order-2 min-w-0 py-2 lg:order-1">
      <CardContent className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          {props.searchBar ? <div>{props.searchBar}</div> : null}
          <div className="flex justify-end">
            <Toolbar className="flex-nowrap items-center gap-0 rounded-[60px] px-2 text-datacite-dark-blue">
              <ToolbarGroup className="flex-nowrap items-center gap-1">
                {props.showAdvancedSearchToggle ? (
                  <AdvancedSearchToggle
                    checked={props.advancedSearchEnabled}
                    onCheckedChange={props.onAdvancedSearchChange}
                  />
                ) : null}
                <FacetSingleSelect
                  label="Sort By"
                  options={DOI_SORT_OPTIONS}
                  value={DOI_SORT_OPTIONS.find((option) => option.id === props.sort) || null}
                  loading={false}
                  onChange={props.onSortChange}
                />
                <DoiExportMenu
                  disabled={!hasCommittedQuery}
                  query={props.committedQuery}
                  sort={props.sort}
                  pageSize={props.pageSize}
                  total={props.total}
                />
              </ToolbarGroup>
            </Toolbar>
          </div>
        </div>

        {hasCommittedQuery ? (
          <DoiMetricsSummary
            total={props.total}
            isLoadingRecords={props.isLoadingRecords}
            citationCount={props.citationCount}
            viewCount={props.viewCount}
            downloadCount={props.downloadCount}
          />
        ) : null}

        {props.recordError ? (
          <div className="rounded-none border shadow-sm">
            <div className="m-auto max-w-md py-8 text-center text-gray-500">
              There was an error retrieving DOI records. Check the syntax of your query and try again.
            </div>
          </div>
        ) : hasCommittedQuery ? (
          props.showInitialResultsSkeleton ? (
            <DoiRecordListSkeleton count={props.pageSize} />
          ) : (
            <DoiRecordList
              items={items}
              loading={false}
              singleLineDescription
              total={props.total}
              page={props.page}
              pageSize={props.pageSize}
              onPageChange={props.onPageChange}
            />
          )
        ) : (
          <DoiRecordList
            items={[]}
            loading={false}
            singleLineDescription
            emptyText="Enter a search query."
          />
        )}
      </CardContent>
    </Card>
  );
}

function AdvancedSearchToggle(props: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  function handleTriggerClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    props.onCheckedChange(!props.checked);
  }

  function handleTriggerPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if ((event.target as HTMLElement).closest("[data-slot='checkbox']")) return;
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        openOnHover
        render={<div />}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-datacite-dark-blue transition-colors hover:bg-gray-200"
        onPointerDown={handleTriggerPointerDown}
        onClick={handleTriggerClick}
      >
        <Checkbox
          checked={props.checked}
          onCheckedChange={(checked) => props.onCheckedChange(Boolean(checked))}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        />
        <span className="text-xs font-semibold">Enable advanced search</span>
        <CircleHelp className="size-3.5 cursor-pointer" />
      </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={10} align="start">
            <Popover.Popup className="relative max-w-72 rounded-md bg-black p-3 text-white shadow-sm transition-opacity duration-150 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none">
              <Popover.Arrow className="relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:block before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:bg-black before:content-['']" />
              <p className="text-xs leading-5 text-slate-100">
                Use {" "}
                <a
                  className="font-semibold text-white hover:text-slate-200 ml-0.5 mr-0.5"
                  href="https://support.datacite.org/docs/queries"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  query string syntax
                  <SquareArrowOutUpRight className="size-3 inline-block ml-1" />
                </a>{" "}
                to perform advanced queries and filters.
              </p>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
    </Popover.Root>
  );
}

function FacetSingleSelect(props: {
  label: string;
  options: SelectOption[];
  value: SelectOption | null;
  loading: boolean;
  onChange: (next: SelectOption | null) => void;
}) {
  return (
    <Combobox
      items={props.options}
      value={props.value}
      filter={null}
      onValueChange={(value) => props.onChange((value as SelectOption) || null)}
      itemToStringValue={(item) => item.id}
      itemToStringLabel={(item) => item.title}
      disabled={props.loading}
    >
      <ComboboxTrigger className="flex h-8 items-center gap-1.5 rounded-full border-none bg-transparent px-3.5 text-xs shadow-none hover:bg-gray-200 data-open:bg-gray-200 [&>svg[data-slot=combobox-trigger-icon]]:size-3 [&>svg[data-slot=combobox-trigger-icon]]:text-gray-400">
        <span className="font-normal">{props.label}</span>
        <span className="font-semibold"><ComboboxValue /></span>
      </ComboboxTrigger>
      <ComboboxContent
        align="start"
        className="w-max min-w-[var(--anchor-width)] max-w-[300px]"
      >
        <ComboboxEmpty>No options found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item} className="cursor-pointer">
              {item.title}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}