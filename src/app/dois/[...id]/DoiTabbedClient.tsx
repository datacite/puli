"use client";

import {
  Eye,
  GitCompare,
  Puzzle,
  Quote,
  Shapes,
  BookCheck,
  Building2,
  MousePointerClick,
} from "lucide-react";
import { H3 } from "@/components/datacite/Headings";
import { Card } from "@/components/ui/card";
import { Suspense, useMemo } from "react";
import DoisPageClient from "@/app/dois/DoisPageClient";
import GenericTabbedPage, { type GenericTabItem } from "@/components/GenericTabbedPage";
import {
  fetchDoisTotal,
} from "@/data/fetch";
import { asNumber } from "@/util";
import type { DoiHeaderData, HeaderInfo } from "@/types";
import IndexedInList from "./IndexedInList";
import DoiUsageTab from "./DoiUsageTab";

type Props = {
  id: string;
  headerData: DoiHeaderData;
};

function quoteForQuery(value: string): string {
  return `\"${value.replace(/\"/g, "\\\\\"")}\"`;
}

export default function DoiTabbedClient({ id, headerData }: Props) {
  const headerInfo: HeaderInfo = {
    title: headerData.title,
    id: headerData.id,
    labels: [
      {
        type: "type",
        content: headerData.resourceTypeGeneral,
        icon: <Shapes className="size-3" />,
      },
      {
        type: "year",
        content: headerData.publicationYear,
        icon: <BookCheck className="size-3" />,
      },
      {
        type: "publisher",
        content: headerData.publisher,
        icon: <Building2 className="size-3" />,
      },
      {
        type: "version",
        content: headerData.version,
        icon: <GitCompare className="size-3" />,
      },
      {
        type: "citations",
        content: headerData.citationCount,
        icon: <Quote className="size-3" />,
      },
    ],
  };

  const otherVersionsQuery =
    `version_ids:(${quoteForQuery(id)}) OR version_of_ids:(${quoteForQuery(id)})` +
    (headerData.versionOfRelationshipIds.length > 0
      ? ` OR version_of_ids:(${headerData.versionOfRelationshipIds
        .map((value) => quoteForQuery(value))
        .join(" OR ")})`
      : "");

  const tabs = useMemo(
    (): GenericTabItem[] => [
      {
        value: "Overview",
        label: "Overview",
        icon: <Shapes className="size-4 shrink-0" />,
        content: (
          <Suspense>
            <div className="outline-none grid gap-4 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] items-start">
              <Card className="p-4 h-[100vh] text-sm">Metadata overview could go here</Card>
              <div className="flex gap-4 flex-col">
                <Card className="p-4 gap-0 text-sm">
                  <H3 className="mb-2 text-sm">Indexed In</H3>
                  <IndexedInList doi={id} />
                </Card>
                <Card className="p-4">
                  <H3 className="mb-2 text-sm">Citation String Generator</H3>
                </Card>
              </div>
            </div>
          </Suspense>
        ),
      },
      {
        value: "cite-by",
        label: "Cited By",
        groupLabel: "Impact",
        icon: <Quote className="size-4 shrink-0" />,
        getBadgeValue: async () => asNumber(await fetchDoisTotal(`reference_ids:(${id})`)),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`reference_ids:(${quoteForQuery(id)})`}
              basePath={`/dois/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "resolution-metrics",
        label: "Resolution Metrics",
        groupLabel: "Impact",
        icon: <MousePointerClick className="size-4 shrink-0" />,
        content: (
          <Suspense>
            <DoiUsageTab doi={id} prefix={headerData.prefix} />
          </Suspense>
        ),
      },
      {
        value: "views-downloads",
        label: "Views & Downloads",
        groupLabel: "Impact",
        icon: <Eye className="size-4 shrink-0" />,
        content: <Suspense></Suspense>,
      },
      {
        value: "references",
        label: "References",
        icon: <Quote className="size-4 shrink-0" />,
        groupLabel: "Connections",
        getBadgeValue: async () => asNumber(await fetchDoisTotal(`citation_ids:(${id})`)),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`citation_ids:(${quoteForQuery(id)})`}
              basePath={`/dois/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "other-versions",
        label: "Other Versions",
        icon: <GitCompare className="size-4 shrink-0" />,
        groupLabel: "Connections",
        getBadgeValue: async () => asNumber(await fetchDoisTotal(otherVersionsQuery)),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={otherVersionsQuery}
              basePath={`/dois/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "part-of",
        label: "Part Of",
        icon: <Puzzle className="size-4 shrink-0" />,
        groupLabel: "Connections",
        getBadgeValue: async () => asNumber(await fetchDoisTotal(`part_ids:(${id})`)),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`part_ids:(${quoteForQuery(id)})`}
              basePath={`/dois/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "parts",
        label: "Parts",
        icon: <Puzzle className="size-4 shrink-0" />,
        groupLabel: "Connections",
        getBadgeValue: async () => asNumber(await fetchDoisTotal(`part_of_ids:(${id})`)),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`part_of_ids:(${quoteForQuery(id)})`}
              basePath={`/dois/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
    ],
    [headerData.prefix, id, otherVersionsQuery],
  );

  return (
    <GenericTabbedPage
      headerInfo={headerInfo}
      tabs={tabs}
      basePath={`/dois/${id}`}
      navParam="tab"
      horizontalMaxItems={5}
    />
  );
}
