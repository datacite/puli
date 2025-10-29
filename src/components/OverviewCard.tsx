import type { ComponentProps } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import DOIRegistrationsChart, {
  type DoiRegistration,
} from "@/components/DoiRegistrationsChart";
import { asNumber } from "@/util";
import ResourceTypesChart, {
  type ResourceTypeData,
} from "@/components/ResourceTypesChart";

export interface Props extends ComponentProps<"div"> {
  totalDois: number;
  doiRegistrationsData: DoiRegistration[];
  resourceTypeData: ResourceTypeData[];
}

export default function OverviewCard({
  totalDois,
  doiRegistrationsData,
  resourceTypeData,
  className,
  ...cardProps
}: Props) {
  return (
    <Card className={cn("w-full p-2", className)} {...cardProps}>
      <CardContent className="grid grid-cols-min-3 grid-rows-[min-content_150px] gap-x-25 mx-auto items-center justify-items-center">
        <TotalDois totalDois={totalDois} />
        <p>Doi Registrations</p>
        <p>Resource Types</p>
        <DOIRegistrationsChart data={doiRegistrationsData} />
        <ResourceTypesChart data={resourceTypeData} />
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
