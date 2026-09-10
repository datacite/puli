"use client";

import { useQuery } from "@tanstack/react-query";
import { Quote, SquareArrowOutUpRight } from "lucide-react";
import { fetchOpenAireWorkByDoi } from "@/data/fetch";
import { asNumber } from "@/util";

type Props = {
  doi: string;
};

export default function OpenAireLink({ doi }: Props) {
  const trimmedDoi = doi.trim();
  const openAireUrl = `https://explore.openaire.eu/search/publication?pid=${encodeURIComponent(trimmedDoi)}`;

  const openAireWork = useQuery({
    queryKey: ["openaire", "work-by-doi", doi],
    queryFn: () => fetchOpenAireWorkByDoi(doi),
    enabled: trimmedDoi.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  if (!trimmedDoi) return null;

  return (
    <div className="flex flex-col gap-1">
      <a
        href={openAireUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center font-semibold text-sm text-muted-foreground hover:text-datacite-blue-light transition-colors"
      >
        OpenAire
        <SquareArrowOutUpRight className="size-3 inline-block ml-1" />
      </a>
      {openAireWork.data ? (
        <span className="inline-flex items-center gap-1 align-middle text-xs font-semibold text-muted-foreground">
          <Quote className="size-3" />
          {asNumber(openAireWork.data.citedByCount)}
        </span>
      ) : null}
    </div>
  );
}
