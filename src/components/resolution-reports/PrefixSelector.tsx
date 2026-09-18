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
import type { PrefixOption } from "@/types";

type PrefixSelectorProps = {
  selectedOption: PrefixOption;
  options: PrefixOption[];
  onSelect: (option: PrefixOption) => void;
  isLoading?: boolean;
};

export function PrefixSelector({
  selectedOption,
  options,
  onSelect,
  isLoading,
}: PrefixSelectorProps) {
  const isSingleOption = options.length === 1;

  if (isSingleOption) {
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      <Combobox
        items={options}
        value={selectedOption}
        filter={null}
        itemToStringValue={(item) => item.prefix}
        itemToStringLabel={(item) => item.prefix}
        onValueChange={(value) => {
          const nextValue = value as PrefixOption | null;
          if (!nextValue) return;
          onSelect(nextValue);
        }}
        disabled={isLoading}
      >
        <ComboboxTrigger className="flex min-w-[300px] items-center rounded-[60px] border bg-white px-4 text-left shadow-sm">
          <Item size="sm" className="min-w-0 flex-1 px-3 py-2">
            <ItemContent className="gap-0.5">
              <ItemTitle className="text-md">
                Prefix <div className="font-semibold"><ComboboxValue /></div>
              </ItemTitle>
            </ItemContent>
          </Item>
        </ComboboxTrigger>

        <ComboboxContent
          align="start"
          className="w-full min-w-[var(--anchor-width)] max-w-[var(--anchor-width)] shadow-sm"
        >
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.prefix} value={item} className="cursor-pointer px-0 py-0">
                <Item size="sm" className="w-full px-3 py-2">
                  <ItemContent>
                    <ItemTitle className="text-sm font-semibold">{item.prefix}</ItemTitle>
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
