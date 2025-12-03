"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  placeholderButton: string;
  placeholderSearch?: string;
  placeholderNoResults?: string;
  options: { value: string; label: string }[];
  open: boolean;
  value: string;
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  className?: string;
}

export function Combobox({
  placeholderButton,
  placeholderSearch = "Search...",
  placeholderNoResults = "No results found.",
  options,
  open,
  setOpen,
  value,
  setValue,
  className,
}: Props) {
  // Append current value to options if not present so the user can deselect it
  const selectedOption = options.find((option) => option.value === value)
  if (!selectedOption && value) options = [...options, { value, label: value }];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label || value
            : placeholderButton}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholderSearch} className="h-9" />
          <CommandList>
            <CommandEmpty>{placeholderNoResults}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
