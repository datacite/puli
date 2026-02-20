"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type KeyboardEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { SEARCH_PARAMETERS } from "@/constants";

export default function SearchEntities(props: { query: string | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(props.query || "");

  const params = new URLSearchParams(searchParams.toString());
  params.set(SEARCH_PARAMETERS.QUERY, query);
  if (!query.trim()) params.delete(SEARCH_PARAMETERS.QUERY);
  const href = `/?${params.toString()}`;

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(href);
    }
  }

  return (
    <Input
      title="Search by repository or organization"
      placeholder="Search by repository or organization…"
      className="text-xs px-6 py-2 h-full bg-white"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
