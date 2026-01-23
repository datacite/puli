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
  const { data: resource } = useResource();

  pages = !resource
    ? [{ title: "Home", href: "/" }]
    : [...pages, { title: resource.name }];

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
