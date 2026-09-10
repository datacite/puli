"use client";

import { useQuery } from "@tanstack/react-query";
import { Building, Contact, Globe, PackageOpen, Search, Shapes } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { searchDois, searchEntities, searchOrcid, searchRor } from "@/data/fetch";
import type { Entity, ResultListItem } from "@/types";

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function GlobalSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const anchorRef = useComboboxAnchor();
  const [query, setQuery] = useState("");
  const [isInputting, setIsInputting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedItemValue, setHighlightedItemValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (pathname !== "/search") return;
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
    setIsInputting(false);
  }, [pathname, searchParams]);

  const debouncedQuery = useDebouncedValue(query, 300);
  const currentAdvancedSearch =
    pathname === "/search" &&
    (searchParams.get("advancedSearch") === "true" || searchParams.get("advancedSearch") === "1");
  const trimmedQuery = debouncedQuery.trim();
  const searchEnabled = trimmedQuery.length > 0;

  const doisQuery = useQuery({
    queryKey: ["global-search", "dois", trimmedQuery, currentAdvancedSearch],
    queryFn: () => searchDois(trimmedQuery, { advancedSearch: currentAdvancedSearch }),
    enabled: searchEnabled,
    staleTime: 30 * 1000,
  });

  const entitiesQuery = useQuery({
    queryKey: ["global-search", "entities", trimmedQuery],
    queryFn: () => searchEntities(trimmedQuery),
    enabled: searchEnabled,
    staleTime: 30 * 1000,
  });

  const rorQuery = useQuery({
    queryKey: ["global-search", "ror", trimmedQuery],
    queryFn: () => searchRor(trimmedQuery),
    enabled: searchEnabled,
    staleTime: 30 * 1000,
  });

  const orcidQuery = useQuery({
    queryKey: ["global-search", "orcid", trimmedQuery],
    queryFn: () => searchOrcid(trimmedQuery),
    enabled: searchEnabled,
    staleTime: 30 * 1000,
  });

  const isResolvingAllResults =
    searchEnabled &&
    (doisQuery.isFetching ||
      entitiesQuery.isFetching ||
      rorQuery.isFetching ||
      orcidQuery.isFetching);

  const doiResults = useMemo<ResultListItem[]>(
    () =>
      searchEnabled
        ? (doisQuery.data || []).slice(0, 5).map((record) => ({
          id: record.id,
          title: record.title,
          href: `/dois/${record.doi}`,
          subtitle: record.doi,
        }))
        : [],
    [searchEnabled, doisQuery.data],
  );

  const organizationResults = useMemo<ResultListItem[]>(
    () =>
      searchEnabled
        ? ((entitiesQuery.data?.providers || []).slice(0, 3).map((entity: Entity) => ({
          id: entity.id,
          title: entity.name,
          href: `/org-repo/${entity.id}`,
          subtitle: entity.id,
        })))
        : [],
    [searchEnabled, entitiesQuery.data],
  );

  const repositoryResults = useMemo<ResultListItem[]>(
    () =>
      searchEnabled
        ? ((entitiesQuery.data?.clients || []).slice(0, 3).map((entity: Entity) => ({
          id: entity.id,
          title: entity.name,
          href: `/org-repo/${entity.id}`,
          subtitle: entity.id,
        })))
        : [],
    [searchEnabled, entitiesQuery.data],
  );

  const rorResults = useMemo<ResultListItem[]>(
    () =>
      searchEnabled
        ? (rorQuery.data || []).slice(0, 3).map((item) => ({
          id: item.pathId,
          title: item.name,
          href: `/ror.org/${item.pathId}`,
          subtitle: item.id,
          secondaryLine: [
            (item.nameVariations || []).join(" • "),
            item.city,
            item.country,
            (item.types || []).join(", "),
          ]
            .filter(Boolean)
            .join(" • "),
        }))
        : [],
    [searchEnabled, rorQuery.data],
  );

  const orcidResults = useMemo<ResultListItem[]>(
    () =>
      searchEnabled
        ? (orcidQuery.data || []).slice(0, 3).map((item) => ({
          id: item.id,
          title: item.name,
          href: `/orcid.org/${item.id}`,
          subtitle: item.id,
          secondaryLine: [
            (item.otherNames || []).join(" ; "),
            (item.employerNames || item.institutionNames || []).join(" • "),
          ]
            .filter(Boolean)
            .join(" • "),
        }))
        : [],
    [searchEnabled, orcidQuery.data],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/") return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTypingTarget =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;

      if (isTypingTarget) return;

      e.preventDefault();
      inputRef.current?.focus();
      setIsInputting(true);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const sections = useMemo(
    () => [
      {
        key: "dois",
        tabValue: "dois",
        label: "DOIs",
        icon: <Shapes className="size-3.5" />,
        loading: isResolvingAllResults,
        items: doiResults,
      },
      {
        key: "memberOrgs",
        tabValue: "organizations",
        label: "DataCite Member Organizations",
        icon: <Building className="size-3.5" />,
        loading: isResolvingAllResults,
        items: organizationResults,
      },
      {
        key: "memberRepos",
        tabValue: "repositories",
        label: "DataCite Member Repositories",
        icon: <PackageOpen className="size-3.5" />,
        loading: isResolvingAllResults,
        items: repositoryResults,
      },
      {
        key: "ror",
        tabValue: "ror",
        label: "ROR Organizational Reports",
        icon: <Globe className="size-3.5" />,
        loading: isResolvingAllResults,
        items: rorResults,
      },
      {
        key: "orcid",
        tabValue: "orcid",
        label: "ORCID Researcher Reports",
        icon: <Contact className="size-3.5" />,
        loading: isResolvingAllResults,
        items: orcidResults,
      },
    ],
    [
      isResolvingAllResults,
      doiResults,
      organizationResults,
      repositoryResults,
      rorResults,
      orcidResults,
    ],
  );

  const optionHrefByValue = useMemo(() => {
    const entries: [string, string][] = [];
    for (const section of sections) {
      for (const item of section.items) {
        entries.push([`${section.key}:${item.id}`, item.href]);
      }
    }

    return Object.fromEntries(entries);
  }, [sections]);

  const isSearchActive = Boolean(isInputting && query.trim());

  function handleSearchInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const highlightedHref = highlightedItemValue ? optionHrefByValue[highlightedItemValue] : null;
    if (highlightedHref) {
      e.preventDefault();
      router.push(highlightedHref);
      setIsInputting(false);
      return;
    }

    e.preventDefault();
    const next = new URLSearchParams();
    next.set("q", query.trim());

    if (pathname === "/search") {
      const activeTab = searchParams.get("tab");
      if (activeTab) next.set("tab", activeTab);
      if (currentAdvancedSearch) next.set("advancedSearch", "true");
    }

    router.push(`/search?${next.toString()}`);
    setIsInputting(false);
  }

  function handleSeeAllClick(tabValue: string) {
    const next = new URLSearchParams();
    next.set("q", query);
    next.set("tab", tabValue);
    if (currentAdvancedSearch) next.set("advancedSearch", "true");
    router.push(`/search?${next.toString()}`);
    setIsInputting(false);
  }

  return (
    <div className="relative w-full max-w-2xl">
      {isSearchActive ? (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 bg-slate-900/20" />
      ) : null}
      <div className="relative z-50">
        <Combobox
          open={isSearchActive}
          onItemHighlighted={(value) => setHighlightedItemValue((value as string | undefined) ?? null)}
          onOpenChange={(newOpen) => {
            if (!newOpen) {
              setIsInputting(false);
              setHighlightedItemValue(null);
            }
          }}
        >
          <div ref={anchorRef} className="w-full">
            <ComboboxInput
              ref={inputRef}
              placeholder="Search for DOIs, Organizations, Repositories, ROR IDs, or ORCID iDs…"
              value={query}
              onFocus={() => {
                setIsFocused(true);
                setIsInputting(true);
              }}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setIsInputting(true);
                setQuery(e.target.value);
              }}
              onKeyDown={handleSearchInputKeyDown}
              showTrigger={false}
              className="h-10 w-full rounded-[60px] bg-white p-1.5 shadow-none"
            >
              <InputGroupAddon align="inline-start" className="pl-3 pr-1">
                <Search className="size-5" aria-hidden="true" />
              </InputGroupAddon>
              <div
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-3 flex items-center",
                  isFocused ? "text-datacite-blue-dark" : "text-muted-foreground",
                )}
              >
                <span className="inline-flex items-center gap-1.5 rounded-[60px] bg-gray-50 px-2 py-0.5 border text-xs font-medium leading-none">
                  <span>Press</span>
                  <span className="inline-flex items-center rounded-sm border bg-white px-1.5 py-0.5 text-[10px] font-semibold leading-none text-foreground">
                    {isFocused ? "Enter" : "/"}
                  </span>
                  <span>{isFocused ? "for more results" : "to search"}</span>
                </span>
              </div>
            </ComboboxInput>
          </div>

          {isSearchActive && (
            <ComboboxContent
              anchor={anchorRef}
              align="start"
              className="max-h-[calc(var(--available-height)-0.5rem)]"
            >
              <ComboboxList className="max-h-[calc(var(--available-height)-0.5rem)] overflow-y-auto">
                {sections.map((section, index) => (
                  <div key={section.key} className={index > 0 ? "border-t border-gray-200" : undefined}>
                    <ComboboxGroup className="py-2">
                      <ComboboxLabel className="px-4 text-xs font-semibold text-muted-foreground/80">
                        <div className="flex items-center justify-between gap-3">
                          <span>{section.label}</span>
                          {!section.loading && section.items.length === 0 ? (
                            <span className="text-[11px] font-normal text-muted-foreground">No results</span>
                          ) : !section.loading && section.items.length > 0 ? (
                            <button
                              onClick={() => handleSeeAllClick(section.tabValue)}
                              className="flex items-center gap-1 text-[11px] font-semibold text-datacite-blue-dark hover:text-datacite-blue-light transition-colors"
                            >
                              See all
                            </button>
                          ) : null}
                        </div>
                      </ComboboxLabel>
                      <div className="px-2 pb-1.5">
                        {section.loading ? (
                          <div className="flex items-center gap-2 px-2 py-4 text-sm text-muted-foreground">
                            <Spinner className="size-4" />
                          </div>
                        ) : section.items.length > 0 ? (
                            <div className="space-y-0.5">
                            {section.items.map((item) => (
                                <ComboboxItem
                                key={item.id}
                                  value={`${section.key}:${item.id}`}
                                  render={<a href={item.href} />}
                                  className="block cursor-pointer rounded-sm py-1.5 px-2 pr-2 text-sm outline-hidden overflow-hidden [&_[data-slot=combobox-item-indicator]]:hidden"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="shrink-0 pt-1 text-datacite-blue-dark">{section.icon}</span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline gap-3">
                                      <div className="min-w-0 flex-1 truncate font-semibold text-foreground">{item.title}</div>
                                      {item.subtitle && (
                                        <div className="shrink-0 text-right text-xs text-muted-foreground line-clamp-1 truncate">
                                          {item.subtitle}
                                        </div>
                                      )}
                                    </div>
                                    {item.secondaryLine ? (
                                      <div className="pt-0.5 text-xs text-muted-foreground line-clamp-1 truncate">
                                        {item.secondaryLine}
                                      </div>
                                    ) : null}
                                    {item.badge && <div className="mt-1">{item.badge}</div>}
                                  </div>
                                </div>
                              </ComboboxItem>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </ComboboxGroup>
                  </div>
                ))}
              </ComboboxList>
            </ComboboxContent>
          )}
        </Combobox>
      </div>
    </div>
  );
}