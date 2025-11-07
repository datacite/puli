"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type KeyboardEvent, useState } from "react";
import { Button as Btn } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClientId } from "@/hooks";
import { cn } from "@/lib/utils";

export default function ActionButtons() {
  return (
    <ButtonsGrid>
      <Button>Filter by Registration Year</Button>
      <Button>Filter by Resource Type</Button>
      <FilterByQuery />

      <Button className="max-md:col-span-2">View Records in Commons</Button>
      <Button className="max-md:col-span-2">View Records in REST API</Button>
    </ButtonsGrid>
  );
}

function Button(props: React.ComponentProps<typeof Btn>) {
  return (
    <Btn
      {...props}
      variant="outline"
      className={cn("text-xs px-6 py-2 md:w-min h-full", props.className)}
    />
  );
}

function ButtonsGrid(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="w-full grid grid-cols-4 md:grid-cols-[repeat(2,min-content)_1fr_repeat(2,min-content)] gap-x-2 gap-y-4"
    />
  );
}

function FilterByQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = useClientId();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const params = new URLSearchParams(searchParams.toString());
  params.set("query", query);
  if (!query.trim()) params.delete("query");
  const href = `/${clientId}?${params.toString()}`;

  const disabled = !query.trim();

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(href);
    }
  }

  return (
    <div className="max-md:col-span-2 flex md:mr-10 h-full">
      <Input
        placeholder="Enter query..."
        className="text-xs px-6 py-2 h-full rounded-r-none border-r-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button
        type="submit"
        variant="outline"
        className="rounded-l-none border-l-0"
        disabled={disabled}
        asChild={!disabled}
      >
        <Link href={href}>Filter by Query</Link>
      </Button>
    </div>
  );
}
