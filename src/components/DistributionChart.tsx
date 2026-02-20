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
  data: { value: string; present: number }[];
}

export default function DistributionChart(props: Props) {
  const { property, data } = props;

  const [displayAll, setDisplayAll] = useState(false);
  const toggleDisplayAll = () => setDisplayAll(!displayAll);

  if (data.length === 0) return null;

  const displayedData = displayAll ? data : data.slice(0, 3);

  return (
    <div
      className={cn(
        "w-full grid grid-cols-[auto_min-content] items-center h-min gap-2",
        props.className,
      )}
    >
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
      {displayedData.map((p) => (
        <PresentBar
          key={p.value}
          property={p.value}
          present={p.present}
          className="col-span-full"
        />
      ))}
      {data.length > 3 && (
        <Button
          onClick={toggleDisplayAll}
          variant="ghost"
          className="col-span-full"
        >
          {displayAll ? "Show less ↑" : "Show more ↓"}
        </Button>
      )}
    </div>
  );
}
