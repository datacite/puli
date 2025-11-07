"use client";

import type { ComponentProps } from "react";
import DOIRegistrationsChart from "@/components/DoiRegistrationsChart";
import ResourceTypesChart from "@/components/ResourceTypesChart";
import { Card, CardContent } from "@/components/ui/card";
import useOverview from "@/data/fetchOverview";
import { useClientId } from "@/hooks";
import { asNumber } from "@/util";

export default function OverviewCard(cardProps: ComponentProps<"div">) {
  const clientId = useClientId();
  const { isPending, isError, data, error } = useOverview(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <Card className={"md:col-span-full w-full p-2"} {...cardProps}>
      <CardContent className="grid md:grid-cols-max-3 grid-rows-[min-content_150px] max-md:gap-8 md:gap-x-25 mx-auto items-center justify-items-center">
        <TotalDois totalDois={data.totalDois} />
        <p>Doi Registrations</p>
        <p>Resource Types</p>
        <DOIRegistrationsChart data={data.doiRegistrationsData} />
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
