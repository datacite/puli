"use client";

import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type Props = {
  query: string;
  scrollLeft: number;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputScroll: (event: React.UIEvent<HTMLInputElement>) => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function DoiSearchBar(props: Props) {
  return (
    <InputGroup className="h-10 w-full rounded-[60px] bg-white p-1.5 shadow-none">
      <InputGroupAddon align="inline-start" className="pl-3 pr-1">
        <SearchIcon className="size-5" aria-hidden="true" />
      </InputGroupAddon>

      <div className="relative flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden px-4 py-1.5 text-sm whitespace-pre"
        >
          <div
            className="min-w-full"
            style={{ transform: `translateX(${-props.scrollLeft}px)` }}
          >
            {props.query ? (
              <span className="text-foreground">{props.query}</span>
            ) : (
              <span className="text-muted-foreground">
                Search and filter results...
              </span>
            )}
          </div>
        </div>

        <InputGroupInput
          id="dois-query"
          title="Search DOI records"
          value={props.query}
          className="relative z-10 h-full bg-transparent px-4 py-1.5 text-sm text-transparent caret-foreground md:text-sm"
          onChange={props.onInputChange}
          onScroll={props.onInputScroll}
          onKeyDown={props.onInputKeyDown}
        />
      </div>
    </InputGroup>
  );
}