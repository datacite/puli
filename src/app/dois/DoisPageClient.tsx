"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DoiFacetsPanel from "@/app/dois/DoiFacetsPanel";
import DoiResultsPanel from "@/app/dois/DoiResultsPanel";
import DoiSearchBar from "@/app/dois/DoiSearchBar";
import {
  DOI_DEFAULT_PAGE_SIZE,
  DOI_DEFAULT_SORT,
  DOI_FACET_CONFIGS,
  DOI_FACET_URL_PARAMS,
  DOI_PAGE_PARAM,
  DOI_PAGE_SIZE_PARAM,
  DOI_SORT_PARAM,
} from "@/app/dois/doiConfig";
import { useDoiFacetValues } from "@/app/dois/useDoiFacetValues";
import { useDoiRecords } from "@/app/dois/useDoiRecords";
import { SEARCH_PARAMETERS } from "@/constants";
import {
  buildCombinedDoiQuery,
  buildDoiFacetClause,
  formatMissingFacetTitle,
  getDoiFacetStoredValues,
  normalizeDoiBaseQuery,
  parseCommaSeparatedParam,
  withFixedDoiQuery,
} from "@/util";
import type { DoiFacetValue, SelectOption } from "@/types";

interface Props {
  initialQuery: string;
  fixedQuery?: string;
  basePath?: string;
  searchBarMode?: "top" | "below-results";
  showInlineSearchBar?: boolean;
  defaultSort?: string;
}

const DOI_ESCAPABLE_QUERY_PATTERN = /[+\-=&|><!(){}\[\]^"~*?:\\.]/;

function getFacetParamValue(facetKey: string) {
  return DOI_FACET_URL_PARAMS[facetKey] || facetKey;
}

function normalizeFacetLabel(value: string) {
  return value.trim();
}

function areFacetSelectionsEqual(left: DoiFacetValue[], right: DoiFacetValue[]) {
  if (left.length !== right.length) return false;

  return left.every((leftItem, index) => {
    const rightItem = right[index];
    return (
      leftItem.id === rightItem.id &&
      leftItem.title === rightItem.title &&
      leftItem.count === rightItem.count
    );
  });
}

export default function DoisPageClient({
  initialQuery,
  fixedQuery,
  basePath = "/dois",
  searchBarMode = "top",
  showInlineSearchBar = true,
  defaultSort = DOI_DEFAULT_SORT,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedFacetValues, setSelectedFacetValues] = useState<
    Record<string, DoiFacetValue[]>
  >({});
  const [accordionOpenKeys, setAccordionOpenKeys] = useState<string[]>([]);
  const [interactingFacetKey, setInteractingFacetKey] = useState<string | null>(null);
  const [committedQuery, setCommittedQuery] = useState(initialQuery);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DOI_DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState<string>(DOI_DEFAULT_SORT);
  const [isAdvancedSearchEnabled, setIsAdvancedSearchEnabled] = useState(false);
  const hasEscapableQueryCharacters = useMemo(
    () => DOI_ESCAPABLE_QUERY_PATTERN.test(query),
    [query],
  );
  const effectiveAdvancedSearch = hasEscapableQueryCharacters && isAdvancedSearchEnabled;

  const activeFacetClauses = useMemo(
    () =>
      DOI_FACET_CONFIGS.map((config) =>
        buildDoiFacetClause(
          config.queryField,
          selectedFacetValues[config.key] || [],
          config.valueField,
          config.valueFormat,
          config.valuePrefix,
        ),
      ).filter(Boolean),
    [selectedFacetValues],
  );

  function buildAccordionFacetQuery(
    facetKey: string,
    nextSelectedFacetValues = selectedFacetValues,
  ) {
    const facetClauses = DOI_FACET_CONFIGS.filter((config) => config.key !== facetKey)
      .map((config) =>
        buildDoiFacetClause(
          config.queryField,
          nextSelectedFacetValues[config.key] || [],
          config.valueField,
          config.valueFormat,
          config.valuePrefix,
        ),
      )
      .filter(Boolean);

    return withFixedDoiQuery(
      fixedQuery,
      buildCombinedDoiQuery(normalizeDoiBaseQuery(query, effectiveAdvancedSearch), facetClauses),
    );
  }

  const facetQueryRequests = useMemo(() => {
    const requests = [
      {
        id: "chart:published",
        facetKey: "published",
        query: committedQuery,
      },
      {
        id: "chart:resourceTypes",
        facetKey: "resourceTypes",
        query: committedQuery,
      },
      ...accordionOpenKeys.map((facetKey) => ({
        id: `accordion:${facetKey}`,
        facetKey,
        query: buildAccordionFacetQuery(facetKey),
      })),
    ];

    const deduped = new Map<string, { id: string; facetKey: string; query: string }>();
    requests.forEach((request) => {
      if (!deduped.has(request.id)) {
        deduped.set(request.id, request);
      }
    });

    return Array.from(deduped.values());
  }, [accordionOpenKeys, committedQuery, selectedFacetValues, query, effectiveAdvancedSearch, fixedQuery]);

  const facetQueryState = useDoiFacetValues(facetQueryRequests);

  const chartPublicationFacetValues = facetQueryState.valuesById["chart:published"] || [];
  const chartResourceTypeFacetValues = facetQueryState.valuesById["chart:resourceTypes"] || [];

  const accordionFacetValues = useMemo(
    () =>
      Object.fromEntries(
        accordionOpenKeys.map((facetKey) => [
          facetKey,
          facetQueryState.valuesById[`accordion:${facetKey}`] || [],
        ]),
      ) as Record<string, DoiFacetValue[]>,
    [accordionOpenKeys, facetQueryState.valuesById],
  );

  const accordionFacetLoading = useMemo(
    () =>
      Object.fromEntries(
        accordionOpenKeys.map((facetKey) => [
          facetKey,
          Boolean(
            !facetQueryState.isFetchedById[`accordion:${facetKey}`] &&
              facetQueryState.isPendingById[`accordion:${facetKey}`],
          ),
        ]),
      ) as Record<string, boolean>,
    [accordionOpenKeys, facetQueryState.isFetchedById, facetQueryState.isPendingById],
  );

  const facetsLoading =
    (!facetQueryState.isFetchedById["chart:published"] &&
      Boolean(facetQueryState.isPendingById["chart:published"])) ||
    (!facetQueryState.isFetchedById["chart:resourceTypes"] &&
      Boolean(facetQueryState.isPendingById["chart:resourceTypes"]));

  const publicationYearData = useMemo(() => {
    const source =
      chartPublicationFacetValues.length > 0
        ? chartPublicationFacetValues
        : (accordionFacetValues.published || []);

    return source
      .map((item) => {
        const raw = (item.id || item.title || "").trim();
        const year = Number(raw);
        if (!/^\d{4}$/.test(raw) || !Number.isFinite(year)) return null;

        return {
          year: raw,
          count: item.count,
        };
      })
      .filter((item): item is { year: string; count: number } => item !== null)
      .sort((left, right) => Number(left.year) - Number(right.year));
  }, [chartPublicationFacetValues, accordionFacetValues]);

  const resourceTypeFacetData = useMemo(() => {
    const source =
      chartResourceTypeFacetValues.length > 0
        ? chartResourceTypeFacetValues
        : (accordionFacetValues.resourceTypes || []);

    return source
      .map((item) => ({
        type: (item.title || item.id || "Unknown").trim() || "Unknown",
        count: item.count,
      }))
      .filter((item) => item.count > 0)
      .sort((left, right) => right.count - left.count);
  }, [chartResourceTypeFacetValues, accordionFacetValues]);

  const selectedPublicationYears = useMemo(() => {
    const selected = selectedFacetValues.published || [];

    return new Set(
      selected
        .map((value) => normalizeFacetLabel(value.id || value.title || ""))
        .filter(Boolean),
    );
  }, [selectedFacetValues]);

  const selectedResourceTypes = useMemo(() => {
    const selected = selectedFacetValues.resourceTypes || [];

    return new Set(
      selected
        .map((value) => normalizeFacetLabel(value.title || value.id || "Unknown") || "Unknown")
        .filter(Boolean),
    );
  }, [selectedFacetValues]);

  const finalQuery = useMemo(
    () =>
      withFixedDoiQuery(
        fixedQuery,
        buildCombinedDoiQuery(
          normalizeDoiBaseQuery(query, effectiveAdvancedSearch),
          activeFacetClauses,
        ),
      ),
    [query, activeFacetClauses, fixedQuery, effectiveAdvancedSearch],
  );

  const {
    records,
    total,
    isLoadingRecords,
    recordError,
    showInitialResultsSkeleton,
    citationCount,
    viewCount,
    downloadCount,
  } = useDoiRecords({
    query: committedQuery,
    page,
    pageSize,
    sort,
  });

  function pushUrl(
    nextBaseQuery: string,
    nextPage = page,
    nextPageSize = pageSize,
    nextSort = sort,
    nextSelectedFacetValues = selectedFacetValues,
    nextAdvancedSearch = isAdvancedSearchEnabled,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextBaseQuery.trim()) params.set(SEARCH_PARAMETERS.QUERY, nextBaseQuery.trim());
    else params.delete(SEARCH_PARAMETERS.QUERY);

    DOI_FACET_CONFIGS.forEach((config) => {
      const storedValues = getDoiFacetStoredValues(
        nextSelectedFacetValues,
        config.key,
        config.valueField,
      );
      const paramName = getFacetParamValue(config.key);

      if (storedValues.length > 0) {
        params.set(paramName, storedValues.join(","));
      } else {
        params.delete(paramName);
      }
    });

    if (nextPageSize !== DOI_DEFAULT_PAGE_SIZE) {
      params.set(DOI_PAGE_SIZE_PARAM, String(nextPageSize));
    } else {
      params.delete(DOI_PAGE_SIZE_PARAM);
    }

    if (nextPage > 1) {
      params.set(DOI_PAGE_PARAM, String(nextPage));
    } else {
      params.delete(DOI_PAGE_PARAM);
    }

    if (nextSort.trim()) {
      params.set(DOI_SORT_PARAM, nextSort);
    } else {
      params.delete(DOI_SORT_PARAM);
    }

    const nextHasEscapableQueryCharacters = DOI_ESCAPABLE_QUERY_PATTERN.test(nextBaseQuery);
    if (nextAdvancedSearch && nextHasEscapableQueryCharacters) {
      params.set("advancedSearch", "true");
    } else {
      params.delete("advancedSearch");
    }

    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath, { scroll: false });
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const queryFromUrl = (
      params.get(SEARCH_PARAMETERS.QUERY) ||
      params.get("q") ||
      initialQuery ||
      ""
    ).trim();
    const advancedSearchFromUrl = params.get("advancedSearch") === "true";
    const selectedFacetTitlesFromUrl = Object.fromEntries(
      DOI_FACET_CONFIGS.map((config) => [
        config.key,
        parseCommaSeparatedParam(params.get(getFacetParamValue(config.key))),
      ]),
    ) as Record<string, string[]>;
    const pageFromUrl = Number(params.get(DOI_PAGE_PARAM) || 1);
    const pageSizeFromUrl = Number(
      params.get(DOI_PAGE_SIZE_PARAM) || DOI_DEFAULT_PAGE_SIZE,
    );
    const sortFromUrl = params.get(DOI_SORT_PARAM) || defaultSort || DOI_DEFAULT_SORT;

    setPage(Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1);
    setPageSize(
      Number.isFinite(pageSizeFromUrl) ? pageSizeFromUrl : DOI_DEFAULT_PAGE_SIZE,
    );
    setSort(sortFromUrl);

    const nextSelectedFacetValues = Object.fromEntries(
      DOI_FACET_CONFIGS.map((config) => {
        const storedValues = selectedFacetTitlesFromUrl[config.key] || [];

        const selectedForFacet = storedValues.map((storedValue) => ({
          id: storedValue,
          title: storedValue,
          count: 0,
        }));

        return [config.key, selectedForFacet];
      }),
    ) as Record<string, DoiFacetValue[]>;

    const baseEffectiveQuery = buildCombinedDoiQuery(
      normalizeDoiBaseQuery(queryFromUrl, advancedSearchFromUrl),
      DOI_FACET_CONFIGS.map((config) =>
        buildDoiFacetClause(
          config.queryField,
          nextSelectedFacetValues[config.key] || [],
          config.valueField,
          config.valueFormat,
          config.valuePrefix,
        ),
      ).filter(Boolean),
    );

    setQuery(queryFromUrl);
    setIsAdvancedSearchEnabled(advancedSearchFromUrl);
    setSelectedFacetValues(nextSelectedFacetValues);
    setCommittedQuery(withFixedDoiQuery(fixedQuery, baseEffectiveQuery));
  }, [defaultSort, fixedQuery, initialQuery, searchParams]);

  useEffect(() => {
    setSelectedFacetValues((previous) => {
      let hasChanges = false;
      const next: Record<string, DoiFacetValue[]> = { ...previous };

      DOI_FACET_CONFIGS.forEach((config) => {
        const selected = previous[config.key] || [];
        if (selected.length === 0) return;

        const valueKey = (item: DoiFacetValue) =>
          config.valueField === "title" ? item.title : item.id;

        const source = config.key === "published"
          ? chartPublicationFacetValues
          : config.key === "resourceTypes"
            ? chartResourceTypeFacetValues
            : (accordionFacetValues[config.key] || []);

        const hydrated = selected.map((item) => {
          const fromApi = source.find((sourceItem) => valueKey(sourceItem) === valueKey(item));
          if (fromApi) return fromApi;

          if (config.valueField === "id") {
            const formattedTitle = formatMissingFacetTitle(item.id);
            if (item.title !== formattedTitle) {
              return {
                ...item,
                title: formattedTitle,
              };
            }
          }

          return item;
        });

        if (!areFacetSelectionsEqual(selected, hydrated)) {
          hasChanges = true;
          next[config.key] = hydrated;
        }
      });

      return hasChanges ? next : previous;
    });
  }, [chartPublicationFacetValues, chartResourceTypeFacetValues, accordionFacetValues]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setScrollLeft(event.target.scrollLeft);
  }

  function handleInputScroll(event: React.UIEvent<HTMLInputElement>) {
    setScrollLeft(event.currentTarget.scrollLeft);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();
    setPage(1);
    setCommittedQuery(finalQuery);
    pushUrl(query, 1, pageSize, sort);
  }

  function commitFacetSelectionWithValues(nextSelectedFacetValues: Record<string, DoiFacetValue[]>) {
    const nextFacetClauses = DOI_FACET_CONFIGS.map((config) =>
      buildDoiFacetClause(
        config.queryField,
        nextSelectedFacetValues[config.key] || [],
        config.valueField,
        config.valueFormat,
        config.valuePrefix,
      ),
    ).filter(Boolean);
    const nextQuery = withFixedDoiQuery(
      fixedQuery,
      buildCombinedDoiQuery(
        normalizeDoiBaseQuery(query, effectiveAdvancedSearch),
        nextFacetClauses,
      ),
    );

    setPage(1);
    setCommittedQuery(nextQuery);
    pushUrl(query, 1, pageSize, sort, nextSelectedFacetValues);
  }

  function handleAccordionFacetToggle(facetKey: string, item: DoiFacetValue, checked: boolean) {
    const config = DOI_FACET_CONFIGS.find((entry) => entry.key === facetKey);
    const compareValue = (value: DoiFacetValue) =>
      config?.valueField === "title" ? value.title : value.id;
    const current = selectedFacetValues[facetKey] || [];
    const itemValue = compareValue(item);
    const exists = current.some((value) => compareValue(value) === itemValue);
    const nextValues = checked
      ? exists
        ? current
        : [...current, item]
      : current.filter((value) => compareValue(value) !== itemValue);
    const merged = { ...selectedFacetValues, [facetKey]: nextValues };

    setSelectedFacetValues(merged);
    setInteractingFacetKey(facetKey);
    commitFacetSelectionWithValues(merged);
  }

  function commitChartFacetSelection(facetKey: string, nextFacetValues: DoiFacetValue[]) {
    const merged = { ...selectedFacetValues, [facetKey]: nextFacetValues };

    setSelectedFacetValues(merged);
    setInteractingFacetKey(facetKey);
    commitFacetSelectionWithValues(merged);
  }

  function buildChartFacetValue(facetKey: "resourceTypes" | "published", clickedValue: string) {
    const normalizedClickedValue = normalizeFacetLabel(clickedValue);
    const source = [
      ...(facetKey === "published" ? chartPublicationFacetValues : chartResourceTypeFacetValues),
      ...(accordionFacetValues[facetKey] || []),
      ...(selectedFacetValues[facetKey] || []),
    ];

    const fromSource = source.find((item) => {
      if (facetKey === "resourceTypes") {
        return normalizeFacetLabel(item.title || item.id || "Unknown") === normalizedClickedValue;
      }

      return normalizeFacetLabel(item.id || item.title || "") === normalizedClickedValue;
    });

    if (fromSource) return fromSource;

    return {
      id: normalizedClickedValue,
      title: normalizedClickedValue,
      count: 0,
    } satisfies DoiFacetValue;
  }

  function handleResourceTypeChartClick(resourceType: string) {
    const nextValue = buildChartFacetValue("resourceTypes", resourceType);
    commitChartFacetSelection("resourceTypes", [nextValue]);
  }

  function handlePublicationYearChartClick(year: string) {
    const nextValue = buildChartFacetValue("published", year);
    commitChartFacetSelection("published", [nextValue]);
  }

  function handleSortChange(value: SelectOption | null) {
    const nextSort = value?.id || "";
    setPage(1);
    setSort(nextSort);
    pushUrl(query, 1, pageSize, nextSort);
  }

  function handleAdvancedSearchToggle(checked: boolean) {
    setIsAdvancedSearchEnabled(checked);
    setPage(1);

    const nextQuery = withFixedDoiQuery(
      fixedQuery,
      buildCombinedDoiQuery(
        normalizeDoiBaseQuery(query, hasEscapableQueryCharacters && checked),
        activeFacetClauses,
      ),
    );

    setCommittedQuery(nextQuery);
    pushUrl(query, 1, pageSize, sort, selectedFacetValues, checked);
  }

  function handlePageChange(nextPage: number) {
    if (nextPage === page || nextPage < 1) return;
    setPage(nextPage);
    pushUrl(query, nextPage, pageSize, sort);
  }

  useEffect(() => {
    setInteractingFacetKey(null);
  }, [committedQuery]);

  const showTopSearchBar = searchBarMode === "top";

  return (
    <div className="flex min-w-0 flex-col">
      <div className="flex min-w-0 flex-col gap-4">
        {showTopSearchBar ? (
          <DoiSearchBar
            query={query}
            scrollLeft={scrollLeft}
            onInputChange={handleInputChange}
            onInputScroll={handleInputScroll}
            onInputKeyDown={handleKeyDown}
          />
        ) : null}

        <div className="flex min-w-0 flex-col">
          <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
            <DoiResultsPanel
              searchBar={!showTopSearchBar && showInlineSearchBar ? (
                <DoiSearchBar
                  query={query}
                  scrollLeft={scrollLeft}
                  onInputChange={handleInputChange}
                  onInputScroll={handleInputScroll}
                  onInputKeyDown={handleKeyDown}
                />
              ) : undefined}
              showAdvancedSearchToggle={hasEscapableQueryCharacters}
              advancedSearchEnabled={effectiveAdvancedSearch}
              onAdvancedSearchChange={handleAdvancedSearchToggle}
              sort={sort}
              pageSize={pageSize}
              committedQuery={committedQuery}
              total={total}
              page={page}
              records={records}
              isLoadingRecords={isLoadingRecords}
              recordError={recordError}
              showInitialResultsSkeleton={showInitialResultsSkeleton}
              citationCount={citationCount}
              viewCount={viewCount}
              downloadCount={downloadCount}
              onSortChange={handleSortChange}
              onPageChange={handlePageChange}
            />
            <DoiFacetsPanel
              accordionOpenKeys={accordionOpenKeys}
              selectedFacetValues={selectedFacetValues}
              accordionFacetValues={accordionFacetValues}
              accordionFacetLoading={accordionFacetLoading}
              interactingFacetKey={interactingFacetKey}
              facetsLoading={facetsLoading}
              publicationYearData={publicationYearData}
              resourceTypeFacetData={resourceTypeFacetData}
              selectedPublicationYears={selectedPublicationYears}
              selectedResourceTypes={selectedResourceTypes}
              onOpenChange={(openKeys) => {
                setAccordionOpenKeys(openKeys);
              }}
              onFacetToggle={handleAccordionFacetToggle}
              onPublicationYearClick={handlePublicationYearChartClick}
              onResourceTypeClick={handleResourceTypeChartClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
