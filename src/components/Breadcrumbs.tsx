"use client";

import { ChevronsUpDown, Home, Slash } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { type ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useEntity } from "@/data/fetch";
import { useId } from "@/hooks";
import { cn } from "@/lib/utils";
import type { Entity } from "@/types";
import { EntityBadge } from "./Badges";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export type BreadcrumbData = { title: string; href?: string };

export default function Breadcrumbs() {
  const id = useId();
  const { isPending, data: entity } = useEntity();

  const BreadcrumbWrapper = (wrapperProps: { children: ReactNode }) => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink href="/">
          <Home />
        </BreadcrumbLink>
        <Separator />
        {wrapperProps.children} {isPending && <Spinner />}
      </BreadcrumbList>
    </Breadcrumb>
  );

  if (!entity)
    return (
      <BreadcrumbWrapper>
        <BreadcrumbContent entity={{ id, name: id, subtype: "" }} />
      </BreadcrumbWrapper>
    );

  const pages = [entity?.parent?.parent, entity?.parent, entity].filter(
    (p) => !!p,
  );

  return (
    <BreadcrumbWrapper>
      {pages.map((page, index) => (
        <React.Fragment key={page.id || index}>
          {index > 0 && <Separator />}
          <ChildrenSelect entity={page} items={page.parent?.children || []}>
            <BreadcrumbContent entity={page} />
          </ChildrenSelect>
        </React.Fragment>
      ))}

      {entity && entity.children.length > 0 && (
        <>
          <Separator />
          <ChildrenSelect
            entity={entity}
            items={entity.children}
            className="opacity-70"
          >
            Select{" "}
            {entity.subtype === "consortium" ? "organization" : "repository"}
            ...
          </ChildrenSelect>
        </>
      )}
    </BreadcrumbWrapper>
  );
}

function Separator() {
  return (
    <BreadcrumbSeparator>
      <Slash opacity={0.25} />
    </BreadcrumbSeparator>
  );
}

function BreadcrumbContent(props: {
  entity: { id: string; name: string; subtype: string };
}) {
  const id = useId();
  const className = `flex flex-row items-center ${props.entity.id === id ? "bg-black/0 font-semibold" : ""}`;

  const BreadcrumbPageLink = (wrapperProps: { children: ReactNode }) =>
    props.entity.id === id ? (
      <BreadcrumbPage {...wrapperProps} className={className} />
    ) : (
      <BreadcrumbLink
        {...wrapperProps}
        href={`/${props.entity.id}`}
        className={className}
        onMouseDown={(e) => e.stopPropagation()}
      />
    );

  return (
    <BreadcrumbItem>
      <BreadcrumbPageLink>
        <Item className="p-0 pt-5">
          <ItemContent className="gap-0">
            <ItemTitle
              className={
                props.entity.id === id ? "bg-black/0 font-semibold" : ""
              }
            >
              {props.entity.name} <EntityBadge entity={props.entity} />
            </ItemTitle>
            <ItemDescription className="text-muted-foreground/75 text-start">
              {props.entity.id}
            </ItemDescription>
          </ItemContent>
        </Item>
      </BreadcrumbPageLink>
    </BreadcrumbItem>
  );
}

function ChildrenSelect(props: {
  entity: Entity;
  items: { id: string; name: string }[];
  children?: ReactNode;
  className?: string;
}) {
  const searchParams = useSearchParams();

  if (props.items.length === 0) return props.children;

  return (
    <Combobox
      items={props.items}
      itemToStringValue={(item) => item.id}
      itemToStringLabel={(item) => item.name}
      value={props.entity}
      isItemEqualToValue={(item, value) => item.id === value.id}
      filter={(itemValue, query) =>
        itemValue.id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        itemValue.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      }
      disabled={props.items.length === 0}
    >
      <ComboboxTrigger
        render={
          <Button variant="ghost" className={cn("h-min py-0", props.className)}>
            {props.children}
            {props.items.length > 0 && <ChevronsUpDown />}
          </Button>
        }
      />
      <ComboboxContent className="w-125">
        <ComboboxInput
          placeholder={`Search ${props.entity.name || props.entity.id}`}
          showTrigger={false}
        />
        <ComboboxEmpty>
          No{" "}
          {props.entity.type === "consortium"
            ? "organizations"
            : "repositories"}{" "}
          found.
        </ComboboxEmpty>
        <ComboboxList>
          {(item: Entity) => {
            return (
              <ComboboxItem value={item} key={item.id}>
                <Link
                  href={`/${item.id}?${searchParams.toString()}`}
                  className="size-full"
                >
                  <Item size="sm" className="px-0 py-0.5">
                    <ItemContent className="gap-0">
                      <ItemTitle>{item.name}</ItemTitle>
                      <ItemDescription className="text-muted-foreground/75">
                        {item.id}
                      </ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                      <ItemDescription>
                        <EntityBadge entity={item} />
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </Link>
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
