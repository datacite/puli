"use client";

import Link from "next/link";
import { useState } from "react";
import { EntityBadge } from "@/components/Badges";
import { H3 } from "@/components/datacite/Headings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useSearchEntities } from "@/data/fetch";
import { cn } from "@/lib/utils";

const INITIAL_NUM_SHOWN = 5;

export default function DisplayEntities(props: { query: string | undefined }) {
  const { isFetching, data } = useSearchEntities(props.query);

  if (!props.query || !data) return null;

  return (
    <Card
      className={`w-full max-w-3xl mx-auto p-2 ${isFetching ? "opacity-50" : ""}`}
    >
      <CardContent className="flex flex-col gap-2 px-0 mx-0 items-center justify-items-center">
        <SectionHeader>Repositories</SectionHeader>
        <Section results={data.clients} isFetching={isFetching} />

        <SectionHeader className="mt-10">Organizations</SectionHeader>
        <Section results={data.providers} isFetching={isFetching} />
      </CardContent>
    </Card>
  );
}

function SectionHeader(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <H3
      className={cn(
        "font-bold mt-6 mb-4 text-start self-stretch mx-2 text-muted-foreground/70 uppercase text-xs tracking-wide flex items-center gap-3",
        props.className,
      )}
    >
      <span>{props.children}</span>
      <span className="h-px flex-1 bg-current" />
    </H3>
  );
}

function Section(props: {
  isFetching: boolean;
  results: { id: string; name: string; subtype: string }[];
}) {
  const [numShown, setNumShown] = useState(INITIAL_NUM_SHOWN);

  if (props.results.length === 0)
    return (
      <i className="text-xs text-muted-foreground/70 pt-2 pb-4">
        No results found.
      </i>
    );

  function onShowMore() {
    setNumShown(numShown + 10);
  }

  return (
    <>
      {props.results.slice(0, numShown).map((c) => (
        <EntityItem entity={c} key={c.id} />
      ))}
      {props.results.length > numShown && (
        <Button onClick={onShowMore} variant="ghost" className="w-full">
          Show more ↓
        </Button>
      )}
    </>
  );
}

function EntityItem(props: {
  entity: { id: string; name: string; subtype: string };
}) {
  return (
    <Item size="sm" className="w-full px-2 py-1" asChild>
      <Link href={`/${props.entity.id}`} prefetch={false} className="size-full">
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
