"use client";

import { Tabs } from "@base-ui/react/tabs";
import { useQueries } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import GenericHeader from "@/components/GenericHeader";
import { Badge } from "@/components/ui/badge";
import type { HeaderInfo } from "@/types";

export type GenericTabItem = {
  value: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  badgeValue?: string | number | null;
  getBadgeValue?: () => Promise<string | number | null>;
  groupLabel?: string;
};

type Props = {
  headerInfo: HeaderInfo;
  tabs: GenericTabItem[];
  basePath: string;
  navParam?: string;
  horizontalMaxItems?: number;
};

const compactBadgeFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

function formatCompactBadgeValue(value: string | number | null | undefined) {
  if (value == null) return null;

  const raw = String(value).trim();
  if (!raw) return null;

  const numeric = typeof value === "number" ? value : Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) {
    return raw;
  }

  if (Math.abs(numeric) < 1000) {
    return raw;
  }

  return compactBadgeFormatter.format(numeric).toLowerCase();
}

export default function GenericTabbedPage({
  headerInfo,
  tabs,
  basePath,
  navParam = "tab",
  horizontalMaxItems = 2,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get(navParam);
  const activeTab = tabs.find((tab) => tab.value === tabFromUrl) ?? tabs[0];
  const useHorizontalLayout = tabs.length <= horizontalMaxItems;

  const dynamicTabs = useMemo(
    () => tabs.filter((tab) => tab.getBadgeValue),
    [tabs],
  );

  const badgeQueries = useQueries({
    queries: dynamicTabs.map((tab) => ({
      queryKey: ["generic-tab-badge", basePath, tab.value],
      queryFn: async () => {
        try {
          const value = await tab.getBadgeValue?.();
          return value ?? null;
        } catch {
          return null;
        }
      },
      staleTime: 5 * 60 * 1000,
    })),
  });

  const resolvedBadgeValues = useMemo(
    () =>
      Object.fromEntries(
        dynamicTabs.map((tab, index) => [
          tab.value,
          badgeQueries[index]?.data ?? null,
        ]),
      ) as Record<string, string | number | null>,
    [dynamicTabs, badgeQueries],
  );

  function handleTabChange(value: string) {
    const next = new URLSearchParams(searchParams.toString());
    const keysToDelete = Array.from(next.keys()).filter((key) => key !== navParam);
    keysToDelete.forEach((key) => {
      next.delete(key);
    });
    next.set(navParam, value);
    router.push(`${basePath}?${next.toString()}`, { scroll: false });
  }

  function groupTabsByLabel(items: GenericTabItem[]): Array<{ groupLabel?: string; tabs: GenericTabItem[] }> {
    const groups: Array<{ groupLabel?: string; tabs: GenericTabItem[] }> = [];
    let currentGroup: { groupLabel?: string; tabs: GenericTabItem[] } | null = null;

    for (const tab of items) {
      const groupLabel = tab.groupLabel;
      if (!currentGroup || groupLabel !== currentGroup.groupLabel) {
        currentGroup = { groupLabel, tabs: [] };
        groups.push(currentGroup);
      }
      if (currentGroup) {
        currentGroup.tabs.push(tab);
      }
    }

    return groups;
  }

  function renderNavTab(tab: GenericTabItem) {
    const badgeValue = tab.getBadgeValue
      ? resolvedBadgeValues[tab.value]
      : (tab.badgeValue ?? null);
    const displayBadgeValue = formatCompactBadgeValue(badgeValue);

    return (
      <Tabs.Tab
        key={tab.value}
        value={tab.value}
        className={`flex items-center px-4 box-sizing gap-2.5 py-1.5 text-sm text-left font-semibold transition-colors
          text-muted-foreground
          rounded-md
          hover:bg-gray-200 hover:text-foreground
          data-[active]:bg-[#00B1E220]
          data-[active]:text-foreground
          min-w-0
          cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            useHorizontalLayout ? 
                "max-w-full data-[active]:border-b-2 data-[active]:border-b-datacite-blue-light" : 
                "w-full "
          }`}
      >
        <span className="flex min-w-0 items-center gap-2.5 overflow-hidden">
          {tab.icon}
          <span className="min-w-0 ">{tab.label}</span>
        </span>
        {displayBadgeValue != null ? (
          <Badge className="pointer-events-none ml-auto shrink-0 h-5 px-1.5 text-xs font-bold leading-none bg-gray-200 text-gray-700">
            {displayBadgeValue}
          </Badge>
        ) : null}
      </Tabs.Tab>
    );
  }

  return (
    <>
      <div className="">
        <div className="">
          <GenericHeader headerInfo={headerInfo} />
        </div>
      </div>

      {useHorizontalLayout ? (
        <Tabs.Root
          value={activeTab.value}
          onValueChange={handleTabChange}
          orientation="horizontal"
          className="flex flex-col"
        >
          <div className="relative bg-white border-b">
            <div className="mx-auto px-4">
              <div className="bg-card text-card-foreground py-3 overflow-x-auto">
                <div className="flex flex-nowrap items-start min-w-max">
                  {groupTabsByLabel(tabs).map((group) => (
                    <div key={group.groupLabel || "ungrouped"} className="flex flex-col items-start">
                      {group.groupLabel && (
                        <div className="text-xs font-semibold text-gray-500 px-4 py-1 uppercase">
                          {group.groupLabel}
                        </div>
                      )}
                      <Tabs.List className="flex flex-nowrap gap-2">
                        {group.tabs.map((tab) => renderNavTab(tab))}
                      </Tabs.List>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 mx-auto w-full">
            {tabs.map((tab) => (
              <Tabs.Panel key={tab.value} value={tab.value} className="outline-none">
                {tab.content}
              </Tabs.Panel>
            ))}
          </div>
        </Tabs.Root>
      ) : (
        <div className="flex items-start bg-datacite-gray">
          <div className="sticky top-0 py-4">
            <div className="w-55 pl-4">
              <Tabs.Root
                value={activeTab.value}
                onValueChange={handleTabChange}
                orientation="vertical"
              >
                <div className="flex flex-col gap-4">
                  {groupTabsByLabel(tabs).map((group) => (
                    <div key={group.groupLabel || "ungrouped"} className="flex flex-col">
                      {group.groupLabel && (
                        <div className="text-xs font-semibold px-1 py-2 uppercase text-muted-foreground/70 tracking-wide">
                          {group.groupLabel}
                        </div>
                      )}
                      <Tabs.List className="flex flex-col gap-0.5">
                        {group.tabs.map((tab) => renderNavTab(tab))}
                      </Tabs.List>
                    </div>
                  ))}
                </div>
              </Tabs.Root>
            </div>
          </div>

          <Tabs.Root
            value={activeTab.value}
            onValueChange={handleTabChange}
            orientation="vertical"
            className="flex-1 min-w-0"
          >
            <div className="mx-auto w-full px-4 bg-datacite-gray">
              {tabs.map((tab) => (
                <Tabs.Panel key={tab.value} value={tab.value} className="outline-none">
                  {tab.content}
                </Tabs.Panel>
              ))}
            </div>
          </Tabs.Root>
        </div>
      )}
    </>
  );
}
