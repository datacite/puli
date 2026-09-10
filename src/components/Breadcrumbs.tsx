"use client";

import { track } from "@vercel/analytics";
import { ChevronsUpDown, Home, Slash } from "lucide-react";
import Link from "next/link";
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
import type { ChildEntity, Entity } from "@/types";
import { EntityBadge } from "./Badges";
import { Button } from "./ui/button";

export default function Breadcrumbs(props: { entity: Entity }) {
  const pages: Entity[] = [];
  const seen = new Set<string>();
  let current: Entity | null = props.entity;

  while (current && !seen.has(current.id)) {
    pages.unshift(current);
    seen.add(current.id);
    current = current.parent;
  }

  return (
    <Breadcrumb className="w-full max-w-full px-6">
      <BreadcrumbList className="w-full max-w-full">
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
              {props.entity.type === "consortium"
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
  entity: { id: string; name: string; type: string };
}) {
  const className = `flex flex-row items-center ${props.entity.id === props.active.id ? "bg-black/0 font-semibold" : ""}`;

  function onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    track("breadcrumbs", { on: "breadcrumb entity", action: "clicked" });
    e.stopPropagation();
  }

  const BreadcrumbPageLink = (wrapperProps: { children: ReactNode }) =>
    props.entity.id === props.active.id ? (
      <BreadcrumbPage {...wrapperProps} className={className} />
    ) : (
      <BreadcrumbLink
        {...wrapperProps}
        href={`/org-repo/${props.entity.id}`}
        className={className}
        onMouseDown={onClick}
      />
    );

  return (
    <BreadcrumbPageLink>
      <BreadcrumbDisplay active={props.active} entity={props.entity} />
    </BreadcrumbPageLink>
  );
}

function BreadcrumbDisplay(props: {
  active: { id: string };
  entity: { id: string; name: string; type: string };
}) {
  return (
    <Item className="p-0 pt-5">
      <ItemContent className="gap-0 min-w-0">
        <ItemTitle
          className={cn(
            "items-center gap-2",
            props.entity.id === props.active.id ? "bg-black/0 font-semibold" : "",
          )}
        >
          <span className="inline-block max-w-[10vw] truncate align-bottom">{props.entity.name}</span>
          <span className="shrink-0">
            <EntityBadge entity={props.entity} />
          </span>
        </ItemTitle>
        <ItemDescription className="text-muted-foreground/75 text-start truncate">
          {props.entity.id}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

function SiblingSelect(props: {
  parent: Entity | null;
  selected?: ChildEntity<string>;
  children?: ReactNode;
  className?: string;
}) {
  const items = props.parent?.children || [];

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
          <Button
            variant="ghost"
            className={cn(
              "h-min py-0 min-w-0",
              props.className,
            )}
          >
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
          {props.parent?.role === "provider" ? "repositories" : "organizations"}{" "}
          found.
        </ComboboxEmpty>
        <ComboboxList>
          {(item: Entity) => {
            return (
              <ComboboxItem
                onClick={() =>
                  track("breadcrumbs", {
                    on: "dropdown entity",
                    action: "clicked",
                  })
                }
                value={item}
                key={item.id}
              >
                <Link
                  href={`/org-repo/${item.id}`}
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
