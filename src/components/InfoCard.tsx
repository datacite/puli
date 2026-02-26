import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { H4 } from "@/components/datacite/Headings";

type InfoCardProps = {
  icon: LucideIcon;
  title: React.ReactNode;
  body: React.ReactNode;
};

export default function InfoCard(props: InfoCardProps) {
  const Icon = props.icon;

  return (
    <Card
      className="h-full border-0 p-0"
    >
      <CardContent className="p-[3rem] flex flex-col gap-6">
        <Icon className="size-10 text-datacite-blue-light" aria-hidden="true" />
        <H4>
          {props.title}
        </H4>
        <CardDescription>
          {props.body}
        </CardDescription>
      </CardContent>
    </Card>
  );
}