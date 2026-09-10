"use client";

import { useQuery } from "@tanstack/react-query";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { Quote, SquareArrowOutUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchOpenAireWorkByDoi,
  fetchOpenAlexWorkByDoi,
  fetchOpenCitationsByDoi,
} from "@/data/fetch";
import { asNumber } from "@/util";

type IndexedSourceItem = {
  key: string;
  label: string;
  href: string;
  metric?: number;
};

const INDEXED_ROW_HEIGHT_CLASS = "h-[3.25rem]";

function IndexedInLoadingRow() {
  return (
    <div className={`flex ${INDEXED_ROW_HEIGHT_CLASS} flex-col justify-center py-2`}>
      <Skeleton className="h-4 w-28 rounded-sm" />
      <Skeleton className="mt-1 h-3 w-12 rounded-sm" />
    </div>
  );
}

function IndexedSourceRow(props: { item: IndexedSourceItem }) {
  return (
    <a
      href={props.item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex ${INDEXED_ROW_HEIGHT_CLASS} flex-col justify-center py-2 text-muted-foreground transition-colors hover:text-datacite-blue-light`}
    >
      <span className="inline-flex h-5 items-center text-sm font-semibold leading-none">
        {props.item.label}
        <SquareArrowOutUpRight className="ml-1 inline-block size-3" />
      </span>
      {typeof props.item.metric === "number" ? (
        <span className="inline-flex h-4 items-center gap-1 align-middle text-xs font-semibold leading-none">
          <Quote className="size-3" />
          {asNumber(props.item.metric)}
        </span>
      ) : (
        <span className="inline-flex h-4 items-center text-xs leading-none opacity-0">.</span>
      )}
    </a>
  );
}

function buildRows(items: IndexedSourceItem[], loadingByKey: Record<string, boolean>) {
  const order = ["openalex", "openaire", "opencitations"] as const;

  return order.flatMap((key) => {
    if (loadingByKey[key]) {
      return [{ key: `${key}-loading`, node: <IndexedInLoadingRow /> }];
    }

    const item = items.find((entry) => entry.key === key);
    if (!item) return [];

    return [{ key: item.key, node: <IndexedSourceRow item={item} /> }];
  });
}

export default function IndexedInList(props: { doi: string }) {
  const trimmedDoi = props.doi.trim();

  const openAlexWork = useQuery({
    queryKey: ["openalex", "work-by-doi", trimmedDoi],
    queryFn: () => fetchOpenAlexWorkByDoi(trimmedDoi),
    enabled: trimmedDoi.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const openAireWork = useQuery({
    queryKey: ["openaire", "work-by-doi", trimmedDoi],
    queryFn: () => fetchOpenAireWorkByDoi(trimmedDoi),
    enabled: trimmedDoi.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const openCitationsWork = useQuery({
    queryKey: ["opencitations", "work-by-doi", trimmedDoi],
    queryFn: () => fetchOpenCitationsByDoi(trimmedDoi),
    enabled: trimmedDoi.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const items: IndexedSourceItem[] = [];
  if (openAlexWork.data?.id) {
    items.push({
      key: "openalex",
      label: "OpenAlex",
      href: openAlexWork.data.id,
      metric: openAlexWork.data.citedByCount,
    });
  }

  if (openAireWork.data && trimmedDoi) {
    items.push({
      key: "openaire",
      label: "OpenAire",
      href: `https://explore.openaire.eu/search/publication?pid=${encodeURIComponent(trimmedDoi)}`,
      metric: openAireWork.data.citedByCount,
    });
  }

  if (openCitationsWork.data?.id) {
    items.push({
      key: "opencitations",
      label: "OpenCitations",
      href: openCitationsWork.data.id,
      metric: openCitationsWork.data.citedByCount,
    });
  }

  const loadingByKey = {
    openalex: trimmedDoi.length > 0 && openAlexWork.isPending && !openAlexWork.data,
    openaire: trimmedDoi.length > 0 && openAireWork.isPending && !openAireWork.data,
    opencitations:
      trimmedDoi.length > 0 && openCitationsWork.isPending && !openCitationsWork.data,
  } as const;

  const rows = buildRows(items, loadingByKey);
  if (rows.length === 0) {
    return <p className="text-xs text-muted-foreground">No external resources were found.</p>;
  }

  return (
    <ul className="flex flex-col">
      {rows.map((row, index) => (
        <li key={row.key}>
          {row.node}
          {index < rows.length - 1 ? (
            <BaseSeparator orientation="horizontal" className="h-px w-full bg-gray-200" />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
