"use client";

import { ExternalLink } from "lucide-react";
import type { ComponentProps } from "react";
import DOIRegistrationsChart from "@/components/DoiRegistrationsChart";
import ResourceTypesChart from "@/components/ResourceTypesChart";
import { OverviewCardSkeleton } from "@/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { API_URL_DATACITE, COMMONS_URL } from "@/constants";
import { fetchDoisSearchParams, useDois } from "@/data/fetch";
import { useFilters } from "@/hooks";
import type { Entity } from "@/types";
import { asNumber } from "@/util";

export default function OverviewCard(
  props: { entity: Entity } & ComponentProps<"div">,
) {
  const { isPending, isFetching, isError, data, error } = useDois(props.entity);

  if (isPending) return <OverviewCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <Card
      className={`md:col-span-full w-full p-2 ${isFetching ? "opacity-50" : ""}`}
      {...props}
    >
      <CardContent className="grid md:grid-cols-max-3 grid-rows-[min-content_150px] max-md:gap-8 md:gap-x-25 mx-auto items-center justify-items-center">
        <TotalDois entity={props.entity} totalDois={data.total} />
        <p>DOI Registrations by Year</p>
        <p>Resource Types</p>
        <DOIRegistrationsChart data={data.registrationsData} />
        <ResourceTypesChart data={data.resourceTypeData} />
      </CardContent>
    </Card>
  );
}

function TotalDois(props: { entity: Entity; totalDois: number }) {
  return (
    <p className="flex flex-col items-center row-span-full gap-1">
      <span className="text-5xl">{asNumber(props.totalDois)}</span>
      <span className="mb-2">Total DOIs</span>

      <ViewInCommons entity={props.entity} />
      <ViewInApi entity={props.entity} />
    </p>
  );
}

function ViewInCommons(props: { entity: Entity }) {
  const filters = useFilters();

  const doisSearchParam = new URLSearchParams({
    filterQuery: filters.query || "",
    published: filters.registered || "",
    "resource-type": filters.resourceType || "",
  }).toString();

  const href =
    props.entity.type === "client"
      ? `${COMMONS_URL}/repositories/${props.entity.id}?${doisSearchParam}`
      : `${COMMONS_URL}/doi.org?query=${props.entity.type}_id:${props.entity.id}&${doisSearchParam}`;

  return (
    <a
      href={href}
      target="_blank"
      className="text-datacite-blue-light text-[0.8em] flex items-center gap-1"
    >
      View in Commons <ExternalLink size={"1em"} />
    </a>
  );
}

function ViewInApi(props: { entity: Entity }) {
  const filters = useFilters();

  const doisSearchParam = new URLSearchParams(
    fetchDoisSearchParams(props.entity, filters),
  ).toString();

  const href = `${API_URL_DATACITE}/dois?${doisSearchParam}`;

  return (
    <a
      href={href}
      target="_blank"
      className="text-datacite-blue-light text-[0.8em] flex items-center gap-1"
    >
      View in REST API <ExternalLink size={"1em"} />
    </a>
  );
}
