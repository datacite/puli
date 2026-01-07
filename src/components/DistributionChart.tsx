"use client";

import { useState } from "react";
import PresentBar from "@/components/PresentBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  property: string;
  data: { value: string; present: number }[];
}

export default function DistributionChart(props: Props) {
  const { property, data } = props;

  const [displayAll, setDisplayAll] = useState(false);
  const toggleDisplayAll = () => setDisplayAll(!displayAll);

  const displayedData = displayAll ? data : data.slice(0, 3);

  return (
    <div className={cn("w-full flex flex-col h-min gap-2", props.className)}>
      <span className="text-sm font-semibold mb-[-4px]">
        Values of {property}
      </span>
      {displayedData.map((p) => (
        <PresentBar key={p.value} property={p.value} present={p.present} />
      ))}
      {data.length > 3 && (
        <Button onClick={toggleDisplayAll} variant="ghost">
          {displayAll ? "Show less ↑" : "Show more ↓"}
        </Button>
      )}
    </div>
  );
}
