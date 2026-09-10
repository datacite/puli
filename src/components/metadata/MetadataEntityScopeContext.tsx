"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Entity } from "@/types";

type MetadataEntityScope = {
  entityId?: string;
  entityType?: Entity["type"];
};

const MetadataEntityScopeContext = createContext<MetadataEntityScope | null>(null);

export function MetadataEntityScopeProvider({
  value,
  children,
}: {
  value: MetadataEntityScope;
  children: ReactNode;
}) {
  return (
    <MetadataEntityScopeContext.Provider value={value}>
      {children}
    </MetadataEntityScopeContext.Provider>
  );
}

export function useMetadataEntityScope() {
  return useContext(MetadataEntityScopeContext);
}
