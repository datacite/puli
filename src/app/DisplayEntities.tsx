"use client";

import Link from "next/link";
import { EntityBadge } from "@/components/Badges";
import { SectionHeader } from "@/components/datacite/Headings";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useSearchEntities } from "@/data/fetch";

export default function DisplayEntities(props: { query: string | undefined }) {
  const { isFetching, data } = useSearchEntities(props.query);

  if (!props.query || !data) return null;

  return (
    <>
      <SectionHeader>Repositories</SectionHeader>
      <Section results={data.clients} isFetching={isFetching} />

      <SectionHeader>Organizations</SectionHeader>
      <Section results={data.providers} isFetching={isFetching} />
    </>
  );
}

function Section(props: {
  isFetching: boolean;
  results: { id: string; name: string; subtype: string }[];
}) {
  if (props.results.length === 0) return <i>No results found</i>;
  return (
    <Card className={`w-full p-2 ${props.isFetching ? "opacity-50" : ""}`}>
      <CardContent className="flex flex-col gap-2 px-0 mx-0 items-center justify-items-center">
        {props.results.map((c) => (
          <EntityItem entity={c} key={c.id} />
        ))}
      </CardContent>
    </Card>
  );
}

function EntityItem(props: {
  entity: { id: string; name: string; subtype: string };
}) {
  return (
    <Item size="sm" className="w-full px-2 py-1" asChild>
      <Link href={`/${props.entity.id}`} className="size-full">
        <ItemContent className="gap-0">
          <ItemTitle>{props.entity.name}</ItemTitle>
          <ItemDescription className="text-muted-foreground/75">
            {props.entity.id}
          </ItemDescription>
        </ItemContent>
        <ItemContent className="flex-none text-center">
          <ItemDescription>
            <EntityBadge entity={props.entity} />
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
