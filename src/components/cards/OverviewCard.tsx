"use client";

import type { ComponentProps } from "react";
import DOIRegistrationsChart from "@/components/DoiRegistrationsChart";
import ResourceTypesChart from "@/components/ResourceTypesChart";
import { OverviewCardSkeleton } from "@/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useDois } from "@/data/fetchOverview";
import { asNumber } from "@/util";

export default function OverviewCard(cardProps: ComponentProps<"div">) {
  const { isPending, isError, data, error } = useDois();

  if (isPending) return <OverviewCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <Card className={"md:col-span-full w-full p-2"} {...cardProps}>
      <CardContent className="grid md:grid-cols-max-3 grid-rows-[min-content_150px] max-md:gap-8 md:gap-x-25 mx-auto items-center justify-items-center">
        <TotalDois totalDois={data.total} />
        <p>DOI Registrations by Year</p>
        <p>Resource Types</p>
        <DOIRegistrationsChart data={data.registrationsData} />
        <ResourceTypesChart data={data.resourceTypeData} />
      </CardContent>
    </Card>
  );
}

function TotalDois({ totalDois }: { totalDois: number }) {
  return (
    <p className="flex flex-col items-center row-span-full gap-2">
      <span className="text-5xl">{asNumber(totalDois)}</span>
      <span>Total DOIs</span>
    </p>
  );
}
