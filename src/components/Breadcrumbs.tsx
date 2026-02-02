"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useResource } from "@/data/fetch";
import { Badge } from "./ui/badge";

export type BreadcrumbData = { title: string; href?: string };

export default function Breadcrumbs() {
  const { data: resource } = useResource();

  if (!resource) return null;

  const pages = [...resource.ancestors, resource]
    .filter((p) => !!p)
    .map((p) => ({
      title: p.name,
      href: p.id === resource.id ? undefined : `/${p.id}`,
      type: p.type,
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pages.map((page, index) => (
          <React.Fragment key={page.title + page.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbContent href={page.href}>
                {page.title} <TypeBadge>{page.type}</TypeBadge>
              </BreadcrumbContent>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbContent(props: {
  href?: string;
  children: React.ReactNode;
}) {
  return props.href ? (
    <BreadcrumbLink {...props} />
  ) : (
    <BreadcrumbPage {...props} />
  );
}

function TypeBadge(props: { children: React.ReactNode }) {
  if (!props.children) return null;

  return (
    <Badge
      variant="outline"
      className="ml-2 rounded-[40px] text-datacite-blue-dark bg-datacite-blue-light/20 text-[0.8em] p-y-0 p-x-1 border-none"
      {...props}
    />
  );
}
