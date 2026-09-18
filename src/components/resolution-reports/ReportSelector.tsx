"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { formatPeriodLabel } from "@/components/resolution-reports/utils";
import type { ReportOption } from "@/types";

type ReportSelectorProps = {
  selectedReport: ReportOption | null;
  options: ReportOption[];
  onSelect: (option: ReportOption) => void;
  isLoading?: boolean;
};

export function ReportSelector({
  selectedReport,
  options,
  onSelect,
  isLoading,
}: ReportSelectorProps) {
  if (options.length === 0 || !selectedReport) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Combobox
        items={options}
        value={selectedReport}
        filter={null}
        itemToStringValue={(item) => item.id}
        itemToStringLabel={(item) => formatPeriodLabel(item.period)}
        onValueChange={(value) => {
          const nextValue = value as ReportOption | null;
          if (!nextValue) return;
          onSelect(nextValue);
        }}
        disabled={isLoading}
      >
        <ComboboxTrigger className="flex w-fit min-w-56 shrink-0 items-center rounded-[60px] border bg-muted text-left shadow-sm px-4">
          <Item size="sm" className="min-w-0 flex-1 px-3 py-2">
            <ItemContent className="gap-0.5">
              <ItemTitle className="text-sm">
                <div>Month</div><span className="font-semibold"><ComboboxValue /></span>
              </ItemTitle>
            </ItemContent>
          </Item>
        </ComboboxTrigger>

        <ComboboxContent className="w-full min-w-[var(--anchor-width)] max-w-[var(--anchor-width)] shadow-sm">
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item} className="cursor-pointer px-0 py-0">
                <Item size="sm" className="w-full px-3 py-2">
                  <ItemContent className="gap-0.5">
                    <ItemTitle className="text-sm font-semibold">
                      {formatPeriodLabel(item.period)}
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
