"use client";

import { Button } from "@/components/ui/button";
import { Popover } from "@base-ui/react/popover";
import { asNumber, formatFieldName } from "@/util";
import { Ban, Check } from "lucide-react";

type OptionKind = "with" | "without";

interface Props {
  withCount?: number;
  withoutCount?: number;
  onSelect: (kind: OptionKind) => void;
  children: React.ReactNode;
  field: string;
  value?: string;
}

function CountBadge({ value }: { value?: number }) {
  if (typeof value !== "number") return null;
  return (
    <span className="rounded-[40px] border border-white bg-white/10 px-2 py-0.5 text-xs text-white">
      {asNumber(value)}
    </span>
  );
}

export default function MetadataDrilldownPopover({
  withCount,
  withoutCount,
  onSelect,
  children,
  field,
  value,
}: Props) {
  function handleSelect(kind: OptionKind) {
    onSelect(kind);
  }

  return (
    <Popover.Root>
      <Popover.Trigger openOnHover>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={10} align="start">
          <Popover.Popup className="relative rounded-md bg-black p-1 text-white shadow-sm transition-opacity duration-150 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none">
            <Popover.Arrow className="relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:block before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:bg-black before:content-['']" />
            <div className="flex flex-col gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto w-full justify-between rounded-sm px-2 py-1.5 text-left text-sm font-normal text-slate-100 hover:bg-white/10 hover:text-white"
                onClick={() => handleSelect("with")}
              >
                <span className="inline-flex items-center gap-2">
                  <Check className="size-3.5" />
                  Show records with {formatFieldName(field)}{value ? ` "${value}"` : ""}
                </span>
                <CountBadge value={withCount} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto w-full justify-between rounded-sm px-2 py-1.5 text-left text-sm font-normal text-slate-100 hover:bg-white/10 hover:text-white"
                onClick={() => handleSelect("without")}
              >
                <span className="inline-flex items-center gap-2">
                  <Ban className="size-3.5" />
                  Show records without {formatFieldName(field)}{value ? ` "${value}"` : ""}
                </span>
                <CountBadge value={withoutCount} />
              </Button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
