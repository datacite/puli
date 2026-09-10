"use client";

import { Building2, Building, Contact, HandCoins } from "lucide-react";
import { Suspense, useMemo } from "react";
import DoisPageClient from "@/app/dois/DoisPageClient";
import GenericTabbedPage, { type GenericTabItem } from "@/components/GenericTabbedPage";
import { fetchDoisTotal } from "@/data/fetch";
import { buildRorHeaderLabels } from "@/lib/resultItems";
import { asNumber } from "@/util";
import type { HeaderInfo, RorHeaderData } from "@/types";

type Props = {
  id: string;
  headerData: RorHeaderData;
};

export default function RorPageClient({ id, headerData }: Props) {
  const headerInfo: HeaderInfo = {
    title: headerData.title,
    id: headerData.id,
    labels: buildRorHeaderLabels({
      country: headerData.country,
      types: headerData.types,
    }),
  };

  const tabs = useMemo(
    (): GenericTabItem[] => [
      {
        value: "all",
        label: "All Works",
        groupLabel: "Reports",
        icon: <Building2 className="size-4 shrink-0" />,
        getBadgeValue: async () =>
          asNumber(
            await fetchDoisTotal(
              `(organization_id:ror.org/${id} OR provider.ror_id:\"https://ror.org/${id}\" OR affiliation_id:ror.org/${id} OR related_dmp_organization_id:ror.org/${id} OR funder_rors:\"https://ror.org/${id}\" OR funder_parent_rors:\"https://ror.org/${id}\")`,
            ),
          ),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`(organization_id:ror.org/${id} OR provider.ror_id:\"https://ror.org/${id}\" OR affiliation_id:ror.org/${id} OR related_dmp_organization_id:ror.org/${id} OR funder_rors:\"https://ror.org/${id}\" OR funder_parent_rors:\"https://ror.org/${id}\")`}
              basePath={`/ror.org/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "funded-by",
        label: "Funded Works",
        groupLabel: "Reports",
        icon: <HandCoins className="size-4 shrink-0" />,
        getBadgeValue: async () =>
          asNumber(
            await fetchDoisTotal(
              `(funder_rors:\"https://ror.org/${id}\" OR funder_parent_rors:\"https://ror.org/${id}\")`,
            ),
          ),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`(funder_rors:\"https://ror.org/${id}\" OR funder_parent_rors:\"https://ror.org/${id}\")`}
              basePath={`/ror.org/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "created-by",
        label: "Works as Creator",
        groupLabel: "Reports",
        icon: <Building className="size-4 shrink-0" />,
        getBadgeValue: async () =>
          asNumber(
            await fetchDoisTotal(
              `(organization_id:ror.org/${id} OR provider.ror_id:\"https://ror.org/${id}\")`,
            ),
          ),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`(organization_id:ror.org/${id} OR provider.ror_id:\"https://ror.org/${id}\")`}
              basePath={`/ror.org/${id}`}
              searchBarMode="below-results"
            />
          </Suspense>
        ),
      },
      {
        value: "by-affiliated-researchers",
        label: "Works by Affiliated Researchers",
        groupLabel: "Reports",
        icon: <Contact className="size-4 shrink-0" />,
        getBadgeValue: async () =>
          asNumber(await fetchDoisTotal(`(affiliation_id:ror.org/${id})`)),
        content: (
          <Suspense>
            <DoisPageClient
              initialQuery=""
              fixedQuery={`(affiliation_id:ror.org/${id})`}
              basePath={`/ror.org/${id}`}
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
      basePath={`/ror.org/${id}`}
      navParam="tab"
      horizontalMaxItems={2}
    />
  );
}
