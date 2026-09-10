"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import PresentBar from "@/components/PresentBar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  property: string;
  metadataField?: string;
  data: { value: string; present: number }[];
}

export default function DistributionChart(props: Props) {
  const { property, metadataField, data } = props;

  const [displayAll, setDisplayAll] = useState(false);
  const toggleDisplayAll = () => setDisplayAll(!displayAll);

  if (data.length === 0) return null;

  const displayedData = displayAll ? data : data.slice(0, 3);

  return (
    <div className={cn("w-full flex flex-col gap-2", props.className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Values of {property} </span>
        <Tooltip>
          <TooltipTrigger>
            <Info size={"1em"} className="text-sm stroke-2 opacity-60" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Top 10 {property} values, showing the percentage of populated
              records containing each value
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-col">
        {displayedData.map((p) => (
          <PresentBar
            key={p.value}
            property={p.value}
            metadataField={metadataField || property}
            metadataValue={p.value}
            present={p.present}
          />
        ))}
      </div>
      {data.length > 3 && (
        <Button onClick={toggleDisplayAll} variant="ghost">
          {displayAll ? "Show less ↑" : "Show more ↓"}
        </Button>
      )}
    </div>
  );
}
