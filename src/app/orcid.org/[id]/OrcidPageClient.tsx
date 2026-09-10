"use client";

import { Building, Contact, HandCoins } from "lucide-react";
import { Suspense, useMemo } from "react";
import DoisPageClient from "@/app/dois/DoisPageClient";
import GenericTabbedPage, { type GenericTabItem } from "@/components/GenericTabbedPage";
import { fetchDoisTotal } from "@/data/fetch";
import { buildOrcidHeaderLabels } from "@/lib/resultItems";
import { asNumber } from "@/util";
import type { HeaderInfo, OrcidHeaderData } from "@/types";

type Props = {
  id: string;
  headerData: OrcidHeaderData;
};

export default function OrcidPageClient({ id, headerData }: Props) {
  const headerInfo: HeaderInfo = {
    title: headerData.title,
    id: headerData.id,
    labels: buildOrcidHeaderLabels({
      employer: headerData.employer,
    }),
  };

  const tabs = useMemo(
    (): GenericTabItem[] => [
      {
        value: "all",
        label: "All Works",
        groupLabel: "Reports",
        icon: <Contact className="size-4 shrink-0" />,
        getBadgeValue: async () =>
          asNumber(
            await fetchDoisTotal(
              `creators_and_contributors.nameIdentifiers.nameIdentifier:(${id} OR \"https://orcid.org/${id}\")`,
            ),
          ),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`creators_and_contributors.nameIdentifiers.nameIdentifier:(${id} OR \"https://orcid.org/${id}\")`}
              basePath={`/orcid.org/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "created-by",
        label: "Works as Creator",
        groupLabel: "Reports",
        icon: <HandCoins className="size-4 shrink-0" />,
        getBadgeValue: async () =>
          asNumber(
            await fetchDoisTotal(
              `creators.nameIdentifiers.nameIdentifier:(${id} OR \"https://orcid.org/${id}\")`,
            ),
          ),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`creators.nameIdentifiers.nameIdentifier:(${id} OR \"https://orcid.org/${id}\")`}
              basePath={`/orcid.org/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "contributed-by",
        label: "Works as Contributor",
        groupLabel: "Reports",
        icon: <Building className="size-4 shrink-0" />,
        getBadgeValue: async () =>
          asNumber(
            await fetchDoisTotal(
              `contributors.nameIdentifiers.nameIdentifier:(${id} OR \"https://orcid.org/${id}\")`,
            ),
          ),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`contributors.nameIdentifiers.nameIdentifier:(${id} OR \"https://orcid.org/${id}\")`}
              basePath={`/orcid.org/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
    ],
    [id],
  );

  return (
    <GenericTabbedPage
      headerInfo={headerInfo}
      tabs={tabs}
      basePath={`/orcid.org/${id}`}
      navParam="tab"
      horizontalMaxItems={2}
    />
  );
}
