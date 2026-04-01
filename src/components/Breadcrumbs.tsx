"use client";

import { track } from "@vercel/analytics";
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
import { cn } from "@/lib/utils";
import type { Entity } from "@/types";
import { EntityBadge } from "./Badges";
import { Button } from "./ui/button";

export default function Breadcrumbs(props: { entity: Entity }) {
  const pages = [
    props.entity?.parent?.parent,
    props.entity?.parent,
    props.entity,
  ].filter((p) => !!p);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink href="/">
          <Home />
        </BreadcrumbLink>
        <Separator />
        {pages.map((page, index) => (
          <React.Fragment key={page.id || index}>
            {index > 0 && <Separator />}
            <SiblingSelect parent={page.parent} selected={page}>
              <BreadcrumbContent active={props.entity} entity={page} />
            </SiblingSelect>
          </React.Fragment>
        ))}

        {props.entity && props.entity.children.length > 0 && (
          <>
            <Separator />
            <SiblingSelect parent={props.entity} className="opacity-70">
              Select{" "}
              {props.entity.subtype === "consortium"
                ? "organization"
                : "repository"}
              ...
            </SiblingSelect>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
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
  active: { id: string };
  entity: { id: string; name: string; subtype: string };
}) {
  const className = `flex flex-row items-center ${props.entity.id === props.active.id ? "bg-black/0 font-semibold" : ""}`;

  function onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    track("breadcrumbs", { on: "breadcrumb item", action: "entity clicked" });
    e.stopPropagation();
  }

  const BreadcrumbPageLink = (wrapperProps: { children: ReactNode }) =>
    props.entity.id === props.active.id ? (
      <BreadcrumbPage {...wrapperProps} className={className} />
    ) : (
      <BreadcrumbLink
        {...wrapperProps}
        href={`/${props.entity.id}`}
        className={className}
        onMouseDown={onClick}
      />
    );

  return (
    <BreadcrumbItem>
      <BreadcrumbPageLink>
        <Item className="p-0 pt-5">
          <ItemContent className="gap-0">
            <ItemTitle
              className={
                props.entity.id === props.active.id
                  ? "bg-black/0 font-semibold"
                  : ""
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

function SiblingSelect(props: {
  parent: Entity | null;
  selected?: Entity;
  children?: ReactNode;
  className?: string;
}) {
  const items = props.parent?.children || [];
  const searchParams = useSearchParams();

  if (items.length === 0) return props.children;

  return (
    <Combobox
      items={items}
      itemToStringValue={(item) => item.id}
      itemToStringLabel={(item) => item.name}
      value={props.selected}
      isItemEqualToValue={(item, value) => item.id === value.id}
      filter={(itemValue, query) =>
        itemValue.id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        itemValue.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      }
      disabled={items.length === 0}
    >
      <ComboboxTrigger
        render={
          <Button variant="ghost" className={cn("h-min py-0", props.className)}>
            {props.children}
            {items.length > 0 && <ChevronsUpDown />}
          </Button>
        }
      />
      <ComboboxContent className="w-125">
        <ComboboxInput
          placeholder={`Search ${props.parent?.name}`}
          showTrigger={false}
        />
        <ComboboxEmpty>
          No{" "}
          {props.parent?.type === "provider" ? "repositories" : "organizations"}{" "}
          found.
        </ComboboxEmpty>
        <ComboboxList>
          {(item: Entity) => {
            return (
              <ComboboxItem
                onClick={() =>
                  track("breadcrumbs", {
                    on: "dropdown",
                    action: "entity clicked",
                  })
                }
                value={item}
                key={item.id}
              >
                <Link
                  href={`/${item.id}?${searchParams.toString()}`}
                  prefetch
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
