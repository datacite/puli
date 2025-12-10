"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type KeyboardEvent, useState } from "react";
import { Button as Btn } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL_DATACITE, COMMONS_URL, SEARCH_PARAMETERS } from "@/constants";
import useOverview from "@/data/fetchOverview";
import { useClientId, useFilters } from "@/hooks";
import { cn } from "@/lib/utils";
import { Combobox } from "./ui/combobox";

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
  const clientId = useClientId();

  const { isPending, isError, data, error } = useOverview();
  const [open, setOpen] = useState(false);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const registrationYears = data.registrationYears.map((ry) => ({
    value: ry.id,
    label: ry.title,
  }));

  const value = searchParams.get(SEARCH_PARAMETERS.REGISTRATION_YEAR) || "";

  function onValueChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(SEARCH_PARAMETERS.REGISTRATION_YEAR, value);
    if (!value.trim()) params.delete(SEARCH_PARAMETERS.REGISTRATION_YEAR);

    const href = `/${clientId}?${params.toString()}`;
    router.push(href);
  }

  return (
    <Combobox
      placeholderButton="Filter by Registration Year"
      options={registrationYears}
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={onValueChange}
      className="text-xs px-6 py-2 w-full h-full"
    />
  );
}

function FilterByResourceType() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = useClientId();

  const { isPending, isError, data, error } = useOverview();
  const [open, setOpen] = useState(false);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const resourceTypes = data.resourceTypeData.map((rt) => ({
    value: rt.id,
    label: rt.type,
  }));

  const value = searchParams.get(SEARCH_PARAMETERS.RESOURCE_TYPE) || "";

  function onValueChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(SEARCH_PARAMETERS.RESOURCE_TYPE, value);
    if (!value.trim()) params.delete(SEARCH_PARAMETERS.RESOURCE_TYPE);

    const href = `/${clientId}?${params.toString()}`;
    router.push(href);
  }

  return (
    <Combobox
      placeholderButton="Filter by Resource Type"
      placeholderSearch="Search resource types..."
      options={resourceTypes}
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={onValueChange}
      className="text-xs px-6 py-2 w-full h-full"
    />
  );
}

function FilterByQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = useClientId();
  const [query, setQuery] = useState(
    searchParams.get(SEARCH_PARAMETERS.QUERY) || "",
  );

  const params = new URLSearchParams(searchParams.toString());
  params.set(SEARCH_PARAMETERS.QUERY, query);
  if (!query.trim()) params.delete(SEARCH_PARAMETERS.QUERY);
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
  const clientId = useClientId();
  const filters = useFilters();

  const doisSearchParam = new URLSearchParams({
    clientId: clientId,
    query: filters.query || "*",
    published: filters.registered || "",
    "resource-type": filters.resourceType || "",
  }).toString();

  const href = `${COMMONS_URL}/doi.org?${doisSearchParam}`;

  return (
    <Button className="max-md:col-span-2" asChild>
      <Link href={href}>View Records in Commons</Link>
    </Button>
  );
}

function ViewInApi() {
  const clientId = useClientId();
  const filters = useFilters();

  const doisSearchParam = new URLSearchParams({
    "client-id": clientId,
    query: filters.query || "",
    registered: filters.registered || "",
    "resource-type-id": filters.resourceType || "",
    state: "findable",
  }).toString();

  const href = `${API_URL_DATACITE}/dois?${doisSearchParam}`;

  return (
    <Button className="max-md:col-span-2" asChild>
      <Link href={href}>View Records in REST API</Link>
    </Button>
  );
}
