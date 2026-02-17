"use client";

import { ExternalLink } from "lucide-react";
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
import { API_URL_DATACITE, COMMONS_URL, SEARCH_PARAMETERS } from "@/constants";
import { fetchDoisSearchParams, useDois, useEntity } from "@/data/fetch";
import { useFilters, useId } from "@/hooks";
import { cn } from "@/lib/utils";

export default function ActionButtons() {
  return (
    <ButtonsGrid>
      <FilterByRegistrationYear />
      <FilterByResourceType />
      <FilterByQuery />

      <ViewInCommons />
      <ViewInApi />
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
      className="w-full grid grid-cols-4 md:grid-cols-[repeat(2,1fr)_2fr_repeat(2,min-content)] gap-x-2 gap-y-4"
    />
  );
}

function FilterByRegistrationYear() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();

  const { isPending, isError, data, error } = useDois();

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
          router.push(`/${id}?${params.toString()}`);
        }}
        className="text-xs w-full h-full"
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

            return (
              <Link href={`/${id}?${params.toString()}`} key={item.id}>
                <ComboboxItem value={item.id}>{item.title}</ComboboxItem>
              </Link>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function FilterByResourceType() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();

  const { isPending, isError, data, error } = useDois();

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
          router.push(`/${id}?${params.toString()}`);
        }}
        className="text-xs w-full h-full"
      />
      <ComboboxContent>
        <ComboboxEmpty>No resource types found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(SEARCH_PARAMETERS.RESOURCE_TYPE, item.id);

            if (searchParams.get(SEARCH_PARAMETERS.RESOURCE_TYPE) === item.id)
              params.delete(SEARCH_PARAMETERS.RESOURCE_TYPE);

            return (
              <Link href={`/${id}?${params.toString()}`} key={item.id}>
                <ComboboxItem value={item.id}>{item.type}</ComboboxItem>
              </Link>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function FilterByQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = useId();
  const [query, setQuery] = useState(
    searchParams.get(SEARCH_PARAMETERS.QUERY) || "",
  );

  const params = new URLSearchParams(searchParams.toString());
  params.set(SEARCH_PARAMETERS.QUERY, query);
  if (!query.trim()) params.delete(SEARCH_PARAMETERS.QUERY);
  const href = `/${id}?${params.toString()}`;

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
        title="filter by text input"
        placeholder="Enter query..."
        className="text-xs px-6 py-2 h-full rounded-r-none border-r-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button
        type="submit"
        variant="outline"
        className="rounded-l-none border-l-0 w-min"
        disabled={disabled}
        asChild={!disabled}
      >
        <Link href={href}>Filter by Query</Link>
      </Button>
    </div>
  );
}

function ViewInCommons() {
  const { data: entity } = useEntity();
  const filters = useFilters();

  if (!entity) return null;

  const doisSearchParam = new URLSearchParams({
    filterQuery: filters.query || "",
    published: filters.registered || "",
    "resource-type": filters.resourceType || "",
  }).toString();

  const href =
    entity.type === "client"
      ? `${COMMONS_URL}/repositories/${entity.id}?${doisSearchParam}`
      : `${COMMONS_URL}/doi.org?query=${entity.type}_id:${entity.id}&${doisSearchParam}`;

  return (
    <Button className="max-md:col-span-2" asChild>
      <a href={href} target="_blank">
        View Records in Commons{" "}
        <ExternalLink className="stroke-muted-foreground" />
      </a>
    </Button>
  );
}

function ViewInApi() {
  const { isError, data: entity, error } = useEntity();
  const filters = useFilters();

  if (isError) return `Error: ${error}`;
  if (!entity) return null;

  const doisSearchParam = new URLSearchParams(
    fetchDoisSearchParams(entity, filters),
  ).toString();

  const href = `${API_URL_DATACITE}/dois?${doisSearchParam}`;

  return (
    <Button className="max-md:col-span-2" asChild>
      <a href={href} target="_blank">
        View Records in REST API{" "}
        <ExternalLink className="stroke-muted-foreground" />
      </a>
    </Button>
  );
}
