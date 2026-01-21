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

export default function Breadcrumbs({
  pages = [],
}: {
  pages: BreadcrumbData[];
}) {
  const { isPending, isError, data, error } = useResource();

  if (isError) return `Error: ${error}`;

  pages = isPending
    ? [{ title: "Home", href: "/" }]
    : [...pages, { title: data.name }];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pages.map((page, index) => (
          <React.Fragment key={page.title + page.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {page.href && (
                <BreadcrumbLink href={page.href}>{page.title}</BreadcrumbLink>
              )}
              {!page.href && <BreadcrumbPage>{page.title}</BreadcrumbPage>}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
