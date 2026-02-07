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
import { useResource } from "@/data/fetch";
import { useId } from "@/hooks";
import type { Resource } from "@/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export type BreadcrumbData = { title: string; href?: string };

export default function Breadcrumbs() {
  const { data: resource } = useResource();

  if (!resource) return null;

  const pages = [resource.parent?.parent, resource.parent, resource].filter(
    (p) => !!p,
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink href="/">
          <Home />
        </BreadcrumbLink>
        <BreadcrumbSeparator>
          <Slash opacity={0.25} />
        </BreadcrumbSeparator>

        {pages.map((page, index) => (
          <React.Fragment key={page.id || index}>
            {index > 0 && (
              <BreadcrumbSeparator>
                <Slash opacity={0.25} />
              </BreadcrumbSeparator>
            )}
            <ChildrenSelect resource={page} items={page.parent?.children || []}>
              <BreadcrumbContent resource={page} />
            </ChildrenSelect>
          </React.Fragment>
        ))}

        {resource.children.length > 0 && (
          <>
            <BreadcrumbSeparator>
              <Slash opacity={0.25} />
            </BreadcrumbSeparator>
            <ChildrenSelect
              resource={resource}
              items={resource.children}
              className="opacity-70"
            >
              Select{" "}
              {resource.subtype === "consortium"
                ? "organization"
                : "repository"}
              ...
            </ChildrenSelect>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbContent(props: { resource: Resource }) {
  const id = useId();
  const className = `rounded-lg ${props.resource.id === id ? "bg-black/0 font-semibold" : ""}`;

  const BreadcrumbPageLink = (wrapperProps: { children: ReactNode }) =>
    props.resource.id === id ? (
      <BreadcrumbPage {...wrapperProps} className={className} />
    ) : (
      <BreadcrumbLink
        {...wrapperProps}
        href={`/${props.resource.id}`}
        className={className}
      />
    );

  return (
    <BreadcrumbItem>
      <BreadcrumbPageLink>
        {props.resource.name}{" "}
        {props.resource.subtype && (
          <Badge
            variant="outline"
            className="ml-2 rounded-[40px] text-datacite-blue-dark bg-datacite-blue-light/20 p-y-0 p-x-1 border-none"
          >
            {props.resource.subtype.replaceAll("_", " ")}
          </Badge>
        )}
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
      itemToStringLabel={(item) => item.name || item.id}
      value={{
        id: props.resource.id,
        name: props.resource.name,
      }}
      disabled={props.items.length === 0}
    >
      <ComboboxTrigger
        render={
          <Button variant="ghost" className={props.className}>
            {props.children}
            {props.items.length > 0 && <ChevronsUpDown />}
          </Button>
        }
      />
      <ComboboxContent className="w-max" align="end">
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
          {(item) => {
            return (
              <Link
                href={`/${item.id}?${searchParams.toString()}`}
                key={item.id}
              >
                <ComboboxItem value={item.id}>{item.id}</ComboboxItem>
              </Link>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
