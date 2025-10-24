import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import RadialChart from "./RadialChart";
import PresentChart from "@/components/PresentHorizontalBarChart";
import DistributionChart from "@/components/DistributionHorizontalBarChart";

export default function ChartsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Creators</CardTitle>
        <CardDescription>
          The Creators property supports citation and connects resources to
          people and organizations. Add nameIdentifiers with ORCIDs and RORs and
          affiliationIdentifiers with RORs for the highest impact.{" "}
          <a>Learn more</a>
        </CardDescription>
        <CardAction></CardAction>
      </CardHeader>

      <CardContent className="grid grid-cols-[150px_min-content_minmax(0,1fr)_min-content_minmax(0,1fr)] grid-flow-col gap-10">
        <RadialChart />
        <Separator orientation="vertical" />
        <PresentChart />
        <Separator orientation="vertical" />
        <DistributionChart />
      </CardContent>
    </Card>
  );
}
