"use client";

import { useQuery } from "@tanstack/react-query";
import { Quote, SquareArrowOutUpRight } from "lucide-react";
import { fetchOpenAlexWorkByDoi } from "@/data/fetch";
import { asNumber } from "@/util";

type Props = {
  doi: string;
};

export default function OpenAlexLink({ doi }: Props) {
  const openAlexWork = useQuery({
    queryKey: ["openalex", "work-by-doi", doi],
    queryFn: () => fetchOpenAlexWorkByDoi(doi),
    enabled: doi.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });

  if (!openAlexWork.data?.id) return null;

  return (
    <div className="flex flex-col gap-1">
      <a
        href={openAlexWork.data.id}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center font-semibold text-sm text-muted-foreground hover:text-datacite-blue-light transition-colors"
      >
        OpenAlex
        <SquareArrowOutUpRight className="size-3 inline-block ml-1" />
      </a>
      <span className="inline-flex items-center gap-1 align-middle text-xs font-semibold text-muted-foreground">
        <Quote className="size-3" />
        {asNumber(openAlexWork.data.citedByCount)}
      </span>
    </div>
  );
}
