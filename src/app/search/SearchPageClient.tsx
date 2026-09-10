"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs } from "@base-ui/react/tabs";
import { Building2, Package, Globe, Contact, Shapes } from "lucide-react";
import DoisPageClient from "@/app/dois/DoisPageClient";
import { DoiRecordList } from "@/components/DoiRecordList";
import { DoiRecordListSkeleton } from "@/components/DoiRecordListSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  searchEntitiesPaginated,
  searchRorPaginated,
  searchOrcidPaginated,
} from "@/data/fetch";
import { buildOrcidHeaderLabels, buildRorHeaderLabels } from "@/lib/resultItems";
import type { Entity, OrcidSearchResult, ResultListItem, RorSearchResult } from "@/types";

type TabValue = "dois" | "organizations" | "repositories" | "ror" | "orcid";
type NonDoiTabValue = Exclude<TabValue, "dois">;

type SearchTabResults = {
  items: ResultListItem[];
  total: number;
};

function mapEntityToResultItem(entity: Entity): ResultListItem {
  return {
    id: entity.id,
    title: entity.name,
    href: `/org-repo/${entity.id}`,
    subtitle: entity.id,
    attributes: entity.parent
      ? [{
        type: "parent",
        content: entity.parent.name,
        icon: <Building2 className="size-3" />,
      }]
      : undefined,
  };
}

function mapRorToResultItem(item: RorSearchResult): ResultListItem {
  return {
    id: item.pathId,
    title: item.name,
    href: `/ror.org/${item.pathId}`,
    subtitle: item.id,
    subtitleHref: item.id,
    subtitleExternal: true,
    description: item.nameVariations?.join(" • ") || undefined,
    attributes: buildRorHeaderLabels({
      country: item.country,
      types: item.types,
    }),
  };
}

function mapOrcidToResultItem(item: OrcidSearchResult): ResultListItem {
  return {
    id: item.id,
    title: item.name,
    href: `/orcid.org/${item.id}`,
    subtitle: `https://orcid.org/${item.id}`,
    subtitleHref: `https://orcid.org/${item.id}`,
    subtitleExternal: true,
    description: item.otherNames?.join(" • ") || undefined,
    attributes: buildOrcidHeaderLabels({
      employer: item.employerNames || item.institutionNames,
    }).filter((label) => label.type !== "info"),
  };
}

async function fetchSearchTabResults(
  tab: NonDoiTabValue,
  query: string,
  page: number,
  pageSize: number,
): Promise<SearchTabResults> {
  if (tab === "organizations") {
    const result = await searchEntitiesPaginated(query, "providers", page, pageSize);
    return {
      items: result.items.map(mapEntityToResultItem),
      total: result.total,
    };
  }

  if (tab === "repositories") {
    const result = await searchEntitiesPaginated(query, "clients", page, pageSize);
    return {
      items: result.items.map(mapEntityToResultItem),
      total: result.total,
    };
  }

  if (tab === "ror") {
    const result = await searchRorPaginated(query, page);
    return {
      items: result.items.map(mapRorToResultItem),
      total: result.total,
    };
  }

  const result = await searchOrcidPaginated(query, page);
  return {
    items: result.items.map(mapOrcidToResultItem),
    total: result.total,
  };
}

function getEmptyText(tab: NonDoiTabValue, query: string) {
  if (!query) return "Enter a search query.";
  if (tab === "organizations") return "No organizations found.";
  if (tab === "repositories") return "No repositories found.";
  if (tab === "ror") return "No ROR IDs found.";
  if (tab === "orcid") return "No ORCID iDs found.";
}

interface SearchPageClientProps {
  initialQuery: string;
  initialTab: string;
  initialAdvancedSearch: boolean;
}

export default function SearchPageClient({
  initialQuery,
  initialTab,
  initialAdvancedSearch,
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = (searchParams.get("q") || searchParams.get("query") || initialQuery || "").trim();
  const currentTab = (searchParams.get("tab") as TabValue | null) || (initialTab as TabValue) || "dois";
  const currentAdvancedSearch =
    searchParams.get("advancedSearch") === "true" ||
    initialAdvancedSearch;
  const rawPageParam = Number(searchParams.get("page") || "1");
  const currentPageFromUrl = Number.isFinite(rawPageParam) && rawPageParam > 0 ? rawPageParam : 1;

  const pageSize = 25;
  const activeSearchTab = currentTab === "dois" ? null : currentTab;
  const organizationQuery = useQuery({
    queryKey: ["search-page", "organizations", currentQuery, currentPageFromUrl],
    queryFn: () => fetchSearchTabResults("organizations", currentQuery, currentPageFromUrl, pageSize),
    enabled: activeSearchTab === "organizations" && currentQuery.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
  const repositoryQuery = useQuery({
    queryKey: ["search-page", "repositories", currentQuery, currentPageFromUrl],
    queryFn: () => fetchSearchTabResults("repositories", currentQuery, currentPageFromUrl, pageSize),
    enabled: activeSearchTab === "repositories" && currentQuery.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
  const rorQuery = useQuery({
    queryKey: ["search-page", "ror", currentQuery, currentPageFromUrl],
    queryFn: () => fetchSearchTabResults("ror", currentQuery, currentPageFromUrl, pageSize),
    enabled: activeSearchTab === "ror" && currentQuery.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
  const orcidQuery = useQuery({
    queryKey: ["search-page", "orcid", currentQuery, currentPageFromUrl],
    queryFn: () => fetchSearchTabResults("orcid", currentQuery, currentPageFromUrl, pageSize),
    enabled: activeSearchTab === "orcid" && currentQuery.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  const tabQueries: Record<NonDoiTabValue, typeof organizationQuery> = {
    organizations: organizationQuery,
    repositories: repositoryQuery,
    ror: rorQuery,
    orcid: orcidQuery,
  };

  const activeSearchQuery = activeSearchTab ? tabQueries[activeSearchTab] : null;
  const showInitialResultsSkeleton =
    activeSearchTab !== null &&
    currentQuery.length > 0 &&
    activeSearchQuery?.data == null &&
    Boolean(activeSearchQuery?.isPending);

  function buildSearchParams(nextTab: TabValue, nextPage: number) {
    const next = new URLSearchParams();
    if (currentQuery) {
      next.set("q", currentQuery);
    }
    next.set("tab", nextTab);
    if (currentAdvancedSearch) {
      next.set("advancedSearch", "true");
    }
    if (nextPage > 1) {
      next.set("page", String(nextPage));
    }
    return next;
  }

  function handleListPageChange(tab: Exclude<TabValue, "dois">, nextPage: number) {
    if (nextPage < 1) return;

    const next = buildSearchParams(tab, nextPage);
    router.push(`/search?${next.toString()}`, { scroll: false });
  }

  // Handle tab changes and update URL
  function handleTabChange(value: string) {
    const tabValue = value as TabValue;
    const next = buildSearchParams(tabValue, 1);

    router.push(`/search?${next.toString()}`, { scroll: false });
  }

  const tabDefs = [
    {
      value: "dois" as TabValue,
      label: "DOIs",
      icon: <Shapes className="size-4" />,
    },
    {
      value: "organizations" as TabValue,
      label: "Organizations",
      icon: <Building2 className="size-4" />,
    },
    {
      value: "repositories" as TabValue,
      label: "Repositories",
      icon: <Package className="size-4" />,
    },
    {
      value: "ror" as TabValue,
      label: "ROR Organizational Reports",
      icon: <Globe className="size-4" />,
    },
    {
      value: "orcid" as TabValue,
      label: "ORCID Researcher Reports",
      icon: <Contact className="size-4" />,
    },
  ];

  return (
    <div className="bg-datacite-gray min-h-screen w-full">
      <div className="flex items-start w-full">
      {/* Left Sidebar - Vertical Tabs */}
      <div className="sticky top-4 self-start py-4 max-h-[calc(100vh-1rem)] overflow-y-auto">
        <div className="w-55 pl-4">
          <p className=" pb-6 text-sm font-semibold text-muted-foreground">Search For...</p>
          <Tabs.Root
            value={currentTab}
            onValueChange={handleTabChange}
            orientation="vertical"
          >
            <Tabs.List className="flex flex-col gap-0.5">
              {tabDefs.map((tab) => (
                <div key={tab.value}>
                  <Tabs.Tab
                    value={tab.value}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold transition-colors
                      text-muted-foreground
                      rounded-md
                      hover:bg-gray-200 hover:text-foreground
                      data-[active]:bg-[#00B1E220]
                      data-[active]:text-foreground
                      w-full text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </Tabs.Tab>
                </div>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>
      </div>

      <div className="flex-1 min-w-0 p-4">
        {currentTab === "dois" && (
          <DoisPageClient
            initialQuery={currentQuery}
            searchBarMode="below-results"
            showInlineSearchBar={false}
            basePath="/search"
            defaultSort="relevance"
          />
        )}

        {activeSearchTab ? (
          <SearchResultsPanel
            tab={activeSearchTab}
            query={currentQuery}
            page={currentPageFromUrl}
            pageSize={pageSize}
            items={activeSearchQuery?.data?.items || []}
            total={activeSearchQuery?.data?.total || 0}
            showInitialResultsSkeleton={showInitialResultsSkeleton}
            onPageChange={(nextPage) => handleListPageChange(activeSearchTab, nextPage)}
          />
        ) : null}
      </div>
      </div>
    </div>
  );
}

function SearchResultsPanel(props: {
  tab: NonDoiTabValue;
  query: string;
  page: number;
  pageSize: number;
  items: ResultListItem[];
  total: number;
  showInitialResultsSkeleton: boolean;
  onPageChange: (page: number) => void;
}) {
  return (
    <Card className="min-w-0 py-2">
      <CardContent className="py-4">
        {props.showInitialResultsSkeleton ? (
          <DoiRecordListSkeleton count={props.pageSize} />
        ) : (
          <DoiRecordList
            items={props.items}
            total={props.total}
            page={props.page}
            pageSize={props.pageSize}
            onPageChange={props.onPageChange}
            emptyText={getEmptyText(props.tab, props.query)}
          />
        )}
      </CardContent>
    </Card>
  );
}
