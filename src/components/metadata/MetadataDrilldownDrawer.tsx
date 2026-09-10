"use client";

import DoisPageClient from "@/app/dois/DoisPageClient";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerViewport,
} from "@/components/ui/drawer";
import { formatFieldName, type MetadataDrilldownKind } from "@/util";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  fixedQuery?: string;
  field: string;
  value?: string;
  kind?: MetadataDrilldownKind;
  basePath: string;
}

export default function MetadataDrilldownDrawer({
  open,
  onOpenChange,
  query,
  fixedQuery,
  field,
  value,
  kind,
  basePath,
}: Props) {
  const kindLabel = kind === "without" ? "without" : "with";
  const hasValue = typeof value === "string" && value.trim().length > 0;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent className="border-l border-gray-200 bg-datacite-gray" showCloseButton>
              <div className="border-b border-gray-200 px-6 py-4 pr-12 shadow-sm">
                <DrawerTitle>
                  Records {kindLabel} {formatFieldName(field)}
                  {hasValue ? ` value "${value?.trim()}"` : ""}
                </DrawerTitle>
              </div>
              <div className="min-h-0 flex-1 overflow-auto p-4">
                <DoisPageClient
                  initialQuery={query}
                  fixedQuery={fixedQuery}
                  basePath={basePath}
                  searchBarMode="below-results"
                  showInlineSearchBar
                />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
