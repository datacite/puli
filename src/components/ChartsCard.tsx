import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface Props {
  title: string;
  description: string | ReactNode;
  columns: ReactNode[];
}

export default function ChartsCard(props: Props) {
  const { title, description, columns } = props;
  const content = columns.map((c, i) => {
    if (i === 0) return c;

    return (
      <>
        <Separator orientation="vertical" />
        {c}
      </>
    );
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-[150px_repeat(auto-fit,0_minmax(0,1fr))] grid-flow-col gap-10">
        {content}
      </CardContent>
    </Card>
  );
}
