"use client";

import { Eye, Quote, Shapes, Tag, Settings, KeyRound, Blocks, ChartBarBig, MousePointerClick } from "lucide-react";
import { Suspense, useMemo } from "react";
import * as Cards from "@/components/cards/Cards";
import OverviewCard from "@/components/cards/OverviewCard";
import { SectionHeader } from "@/components/datacite/Headings";
import GenericTabbedPage, { type GenericTabItem } from "@/components/GenericTabbedPage";
import { MetadataEntityScopeProvider } from "@/components/metadata/MetadataEntityScopeContext";
import ActionButtons from "@/components/ActionButtons";
import DoisPageClient from "@/app/dois/DoisPageClient";
import { fetchDoisTotal } from "@/data/fetch";
import { asNumber } from "@/util";
import type { Entity } from "@/types";
import ResolutionReports from "./ResolutionReports";

type Props = {
  id: string;
  dashboardEntity: Entity;
  entityQuery: string;
  entityLabel: string;
};

export default function OrgRepoPageClient({
  id,
  dashboardEntity,
  entityQuery,
  entityLabel,
}: Props) {
  const tabs = useMemo(
    (): GenericTabItem[] => [
      {
        label: "DOIs",
        value: "dois",
        icon: <Shapes className="size-4 shrink-0" />,
        content: (
          <Suspense>
            <DoisPageClient
              fixedQuery={entityQuery}
              initialQuery=""
              searchBarMode="below-results"
              basePath={`/org-repo/${id}`}
            />
          </Suspense>
        ),
        getBadgeValue: async () => asNumber(await fetchDoisTotal(entityQuery)),
      },
      {
        label: "Metadata Dashboard",
        value: "metadata-dashboard",
        groupLabel: "Metadata Quality",
        icon: <ChartBarBig className="size-4 shrink-0" />,
        content: (
          <Suspense>
            <ActionButtons entity={dashboardEntity} />
            <main className="mt-6 grid gap-4 md:grid-cols-4">
              <OverviewCard entity={dashboardEntity} />

              <SectionHeader>
                Connections to People, Organizations, and Related Resources
              </SectionHeader>
              <Cards.Creators entity={dashboardEntity} />
              <Cards.Contributors entity={dashboardEntity} />
              <Cards.RelatedIdentifiers entity={dashboardEntity} />
              <Cards.FundingReferences entity={dashboardEntity} />
              <Cards.Publisher entity={dashboardEntity} />

              <SectionHeader>Descriptive Metadata</SectionHeader>
              <Cards.ResourceType entity={dashboardEntity} />
              <Cards.Subjects entity={dashboardEntity} />
              <Cards.Descriptions entity={dashboardEntity} />
              <Cards.Titles entity={dashboardEntity} />
              <Cards.Rights entity={dashboardEntity} />
              <Cards.Dates entity={dashboardEntity} />
              <Cards.PublicationYear entity={dashboardEntity} />
              <Cards.AlternateIdentifiers entity={dashboardEntity} />
              <Cards.Language entity={dashboardEntity} />
              <Cards.Sizes entity={dashboardEntity} />
              <Cards.Formats entity={dashboardEntity} />
              <Cards.Version entity={dashboardEntity} />
              <Cards.GeoLocation entity={dashboardEntity} />
              <Cards.RelatedItem entity={dashboardEntity} />
            </main>
          </Suspense>
        ),
      },
      {
        label: "Enrichments",
        value: "enrichments",
        groupLabel: "Metadata Quality",
        icon: <Blocks className="size-4 shrink-0" />,
        content: <Suspense></Suspense>,
      },
      {
        label: "Cited Works",
        value: "cited-works",
        groupLabel: "Impact",
        icon: <Quote className="size-4 shrink-0" />,
        content: (
          <Suspense>
            <DoisPageClient
              fixedQuery={`${entityQuery} AND citationCount:>0`}
              initialQuery=""
              searchBarMode="below-results"
              defaultSort="-citation-count"
              basePath={`/org-repo/${id}`}
            />
          </Suspense>
        ),
        getBadgeValue: async () => asNumber(await fetchDoisTotal(`${entityQuery} AND citationCount:>0`)),
      },
      {
        label: "Resolution Metrics",
        value: "resolution-metrics",
        groupLabel: "Impact",
        icon: <MousePointerClick className="size-4 shrink-0" />,
        content: (
          <Suspense>
            <ResolutionReports />
          </Suspense>
        ),
      },
      {
        label: "Views & Downloads",
        value: "views-downloads",
        groupLabel: "Impact",
        icon: <Eye className="size-4 shrink-0" />,
        content: <Suspense></Suspense>,
      },
      {
        label: `${entityLabel} Info`,
        value: "repository-info",
        groupLabel: "Settings",
        icon: <Settings className="size-4 shrink-0" />,
        content: <Suspense></Suspense>,
      },
      {
        label: "Prefixes",
        value: "prefixes",
        groupLabel: "Settings",
        icon: <Tag className="size-4 shrink-0" />,
        content: <Suspense></Suspense>,
      },
      {
        label: "API Keys",
        value: "api-keys",
        groupLabel: "Settings",
        icon: <KeyRound className="size-4 shrink-0" />,
        content: <Suspense></Suspense>,
      },
    ],
    [dashboardEntity, entityLabel, entityQuery, id],
  );

  return (
    <MetadataEntityScopeProvider
      value={{
        entityId: dashboardEntity.id,
        entityType: dashboardEntity.type,
      }}
    >
      <GenericTabbedPage
        headerInfo={{
          title: dashboardEntity.name,
          id: dashboardEntity.id,
          labels: [],
        }}
        tabs={tabs}
        basePath={`/org-repo/${id}`}
        horizontalMaxItems={0}
      />
    </MetadataEntityScopeProvider>
  );
}