import React, { ComponentProps, type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HighImpactBadge from "@/components/HighImpactBadge";
import RadialChart from "@/components/RadialChart";
import { cn } from "@/lib/utils";

export interface Props extends ComponentProps<"div"> {
  title: string;
  description: string | ReactNode;
  present: number;
  columns?: ReactNode[];
  isHighImpact?: boolean;
}

export default function ChartsCard({
  title,
  description,
  present,
  columns = [],
  isHighImpact = false,
  className,
  ...cardProps
}: Props) {
  const content = columns.map((c, i) => {
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
          {title}
          <HighImpactBadge show={isHighImpact} />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="grid md:grid-cols-[150px_repeat(auto-fit,0_minmax(0,1fr))] gap-8">
        <RadialChart present={present} />
        {content}
      </CardContent>
    </Card>
  );
}
