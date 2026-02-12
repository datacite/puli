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
import { useResource } from "@/data/fetch";
import { useId } from "@/hooks";
import { cn } from "@/lib/utils";
import type { Resource } from "@/types";
import { ResourceBadge } from "./Badges";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export type BreadcrumbData = { title: string; href?: string };

export default function Breadcrumbs() {
  const id = useId();
  const { isPending, data: resource } = useResource();

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

  if (!resource)
    return (
      <BreadcrumbWrapper>
        <BreadcrumbContent resource={{ id, name: id, subtype: "" }} />
      </BreadcrumbWrapper>
    );

  const pages = [resource?.parent?.parent, resource?.parent, resource].filter(
    (p) => !!p,
  );

  return (
    <BreadcrumbWrapper>
      {pages.map((page, index) => (
        <React.Fragment key={page.id || index}>
          {index > 0 && <Separator />}
          <ChildrenSelect resource={page} items={page.parent?.children || []}>
            <BreadcrumbContent resource={page} />
          </ChildrenSelect>
        </React.Fragment>
      ))}

      {resource && resource.children.length > 0 && (
        <>
          <Separator />
          <ChildrenSelect
            resource={resource}
            items={resource.children}
            className="opacity-70"
          >
            Select{" "}
            {resource.subtype === "consortium" ? "organization" : "repository"}
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
  resource: { id: string; name: string; subtype: string };
}) {
  const id = useId();
  const className = `flex flex-row items-center ${props.resource.id === id ? "bg-black/0 font-semibold" : ""}`;

  const BreadcrumbPageLink = (wrapperProps: { children: ReactNode }) =>
    props.resource.id === id ? (
      <BreadcrumbPage {...wrapperProps} className={className} />
    ) : (
      <BreadcrumbLink
        {...wrapperProps}
        href={`/${props.resource.id}`}
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
                props.resource.id === id ? "bg-black/0 font-semibold" : ""
              }
            >
              {props.resource.name} <ResourceBadge resource={props.resource} />
            </ItemTitle>
            <ItemDescription className="text-muted-foreground/75 text-start">
              {props.resource.id}
            </ItemDescription>
          </ItemContent>
        </Item>
      </BreadcrumbPageLink>
    </BreadcrumbItem>
  );
}

function ChildrenSelect(props: {
  resource: Resource;
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
      value={props.resource}
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
      <ComboboxContent className="w-max">
        <ComboboxInput
          placeholder={`Search ${props.resource.name || props.resource.id}`}
          showTrigger={false}
        />
        <ComboboxEmpty>
          No{" "}
          {props.resource.type === "consortium"
            ? "organizations"
            : "repositories"}{" "}
          found.
        </ComboboxEmpty>
        <ComboboxList>
          {(item: Resource) => {
            return (
              <ComboboxItem value={item} key={item.id}>
                <Link
                  href={`/${item.id}?${searchParams.toString()}`}
                  className="size-full"
                >
                  <Item size="sm" className="px-0 py-0.5">
                    <ItemContent className="gap-0.5">
                      <ItemTitle>{item.name}</ItemTitle>
                      <ItemDescription>{item.id}</ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                      <ItemDescription>
                        <ResourceBadge resource={item} />
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
