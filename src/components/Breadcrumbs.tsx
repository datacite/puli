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
                {page.title}
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
