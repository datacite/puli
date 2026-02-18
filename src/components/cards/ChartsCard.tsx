import React, { type ComponentProps, type ReactNode } from "react";
import { HighImpactBadge } from "@/components/Badges";
import { H4 } from "@/components/datacite/Headings";
import RadialChart from "@/components/RadialChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface Props extends Omit<ComponentProps<"div">, "title"> {
  title: string | ReactNode;
  description: string | ReactNode;
  present: number | ReactNode;
  isHighImpact?: boolean;
}

export default function ChartsCard({
  title,
  description,
  present,
  isHighImpact = false,
  className,
  children,
  ...cardProps
}: Props) {
  const content = React.Children.toArray(children).map((c, i) => {
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: OK for static content
      <React.Fragment key={i}>
        <Separator className="md:hidden" />
        <Separator orientation="vertical" className="max-md:hidden" />
        {c}
      </React.Fragment>
    );
  });

  return (
    <Card className={cn("w-full", className)} {...cardProps}>
      <CardHeader>
        <CardTitle>
          <H4>
            {title} <HighImpactBadge show={isHighImpact} />
          </H4>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="grid md:grid-cols-[150px_repeat(auto-fit,0_minmax(0,1fr))] justify-center gap-8">
        {typeof present === "number" ? (
          <RadialChart present={present} />
        ) : (
          present
        )}
        {content}
      </CardContent>
    </Card>
  );
}
