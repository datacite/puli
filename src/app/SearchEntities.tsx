"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type KeyboardEvent, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SEARCH_PARAMETERS } from "@/constants";
import { useDebounce } from "@/hooks";

export default function SearchEntities(props: { query: string | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(props.query || "");

  const params = new URLSearchParams(searchParams.toString());
  params.set(SEARCH_PARAMETERS.QUERY, query);
  if (!query.trim()) params.delete(SEARCH_PARAMETERS.QUERY);
  const href = `/?${params.toString()}`;

  useDebounce(query, () => router.push(href), 500);

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    e.preventDefault();
    router.push(href);
  }

  return (
    <InputGroup className="h-full max-w-3xl mx-auto bg-white rounded-[60px] p-2 shadow-sm">
      <InputGroupAddon align="inline-start" className="pl-4 pr-2">
        <Search className="size-6" aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput
        title="Search by repository or organization"
        placeholder="Search by repository or organization…"
        className="px-6 py-2 h-full bg-white text-base md:text-base"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </InputGroup>
  );
}
