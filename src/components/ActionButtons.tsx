"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type KeyboardEvent, useState } from "react";
import { Button as Btn } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { SEARCH_PARAMETERS } from "@/constants";
import { useDois } from "@/data/fetch";
import { cn } from "@/lib/utils";
import type { Entity } from "@/types";

export default function ActionButtons(props: { entity: Entity }) {
  return (
    <ButtonsGrid>
      <FilterByRegistrationYear entity={props.entity} />
      <FilterByResourceType entity={props.entity} />
      <FilterByQuery entity={props.entity} />
      <a
        href="https://support.datacite.org/docs/queries"
        target="_blank"
        rel="noopener"
        className="text-datacite-blue-light text-[0.8em] flex items-center gap-1 -col-start-2"
      >
        <Info size={"1em"} /> How can I use filter queries?
      </a>
    </ButtonsGrid>
  );
}

function Button(props: React.ComponentProps<typeof Btn>) {
  return (
    <Btn
      {...props}
      variant="outline"
      className={cn("text-xs px-6 py-2 w-full h-full", props.className)}
    />
  );
}

function ButtonsGrid(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="w-full grid grid-cols-4 auto-rows-min md:grid-cols-[repeat(2,1fr)_2fr] gap-x-2 gap-y-1 justify-items-end"
    />
  );
}

function FilterByRegistrationYear(props: { entity: Entity }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isPending, isError, data, error } = useDois(props.entity);

  if (isError) return `Error: ${error}`;

  const value =
    data?.registrationYears.find(
      (y) => y.id === searchParams.get(SEARCH_PARAMETERS.REGISTRATION_YEAR),
    ) || null;

  return (
    <Combobox
      items={data?.registrationYears ?? []}
      itemToStringValue={(item) => item.id}
      itemToStringLabel={(item) => item.title}
      value={value}
      disabled={isPending}
    >
      <ComboboxInput
        placeholder="Filter by Registration Year"
        showClear={!!value}
        onClear={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete(SEARCH_PARAMETERS.REGISTRATION_YEAR);
          router.push(`/${props.entity.id}?${params.toString()}`);
        }}
        className="text-xs bg-white w-full h-full rounded-[60px] px-2"
      />
      <ComboboxContent>
        <ComboboxEmpty>No years found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(SEARCH_PARAMETERS.REGISTRATION_YEAR, item.id);

            if (
              searchParams.get(SEARCH_PARAMETERS.REGISTRATION_YEAR) === item.id
            )
              params.delete(SEARCH_PARAMETERS.REGISTRATION_YEAR);

            const href = `/${props.entity.id}?${params.toString()}`;

            return (
              <ComboboxItem
                key={item.id}
                value={item.id}
                onClick={() => {
                  router.push(href);
                }}
              >
                {item.title}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function FilterByResourceType(props: { entity: Entity }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isPending, isError, data, error } = useDois(props.entity);

  if (isError) return `Error: ${error}`;

  const value =
    data?.resourceTypeData.find(
      (rt) => rt.id === searchParams.get(SEARCH_PARAMETERS.RESOURCE_TYPE),
    ) || null;

  return (
    <Combobox
      items={data?.resourceTypeData ?? []}
      itemToStringValue={(item) => item.id}
      itemToStringLabel={(item) => item.type}
      value={value}
      disabled={isPending}
    >
      <ComboboxInput
        placeholder="Filter by Resource Type"
        showClear={!!value}
        onClear={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete(SEARCH_PARAMETERS.RESOURCE_TYPE);
          router.push(`/${props.entity.id}?${params.toString()}`);
        }}
        className="text-xs bg-white w-full h-full rounded-[60px] px-2"
      />
      <ComboboxContent>
        <ComboboxEmpty>No resource types found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(SEARCH_PARAMETERS.RESOURCE_TYPE, item.id);

            if (searchParams.get(SEARCH_PARAMETERS.RESOURCE_TYPE) === item.id)
              params.delete(SEARCH_PARAMETERS.RESOURCE_TYPE);

            const href = `/${props.entity.id}?${params.toString()}`;

            return (
              <ComboboxItem
                key={item.id}
                value={item.id}
                onClick={() => {
                  router.push(href);
                }}
              >
                {item.type}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function FilterByQuery(props: { entity: Entity }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get(SEARCH_PARAMETERS.QUERY) || "",
  );

  const params = new URLSearchParams(searchParams.toString());
  params.set(SEARCH_PARAMETERS.QUERY, query);
  if (!query.trim()) params.delete(SEARCH_PARAMETERS.QUERY);
  const href = `/${props.entity.id}?${params.toString()}`;

  const disabled = !query.trim();

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(href);
    }
  }

  return (
    <div className="max-md:col-span-2 flex size-full pl-6">
      <Input
        title="Filter using query string syntax"
        placeholder="Filter using query string syntax…"
        className="text-xs bg-white px-6 py-2 h-full rounded-l-[60px] border-r-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button
        type="submit"
        variant="outline"
        className={cn(
          "rounded-l-none rounded-r-[60px] border-l-0 w-min",
          !disabled &&
            "bg-datacite-blue-light border-datacite-blue-light text-white hover:bg-datacite-blue-light/90 hover:text-white",
        )}
        disabled={disabled}
        asChild={!disabled}
      >
        <Link href={href} prefetch>
          Filter by Query
        </Link>
      </Button>
    </div>
  );
}
