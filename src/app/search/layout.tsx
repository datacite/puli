import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Entity } from "@/types";

interface SearchLayoutProps {
  children: React.ReactNode;
}

const searchBreadcrumbEntity: Entity = {
  id: "_search",
  name: "Search DataCite",
  role: "datacite",
  type: "",
  parent: null,
  children: [],
};

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <Breadcrumbs entity={searchBreadcrumbEntity} />
      {children}
    </>
  );
}
