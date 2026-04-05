"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type SiteFilterComboboxProps = {
  options: string[]
  value: string
  onChange: (next: string) => void
  searchPlaceholder?: string
  emptyText?: string
  /** Label untuk aksesibilitas */
  ariaLabel?: string
}

export function SiteFilterCombobox({
  options,
  value,
  onChange,
  searchPlaceholder = "Cari...",
  emptyText = "Tidak ada opsi yang cocok.",
  ariaLabel = "Filter",
}: SiteFilterComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          className={cn(
            "h-11 w-full justify-between rounded-xl border-[#d6dde6] bg-white px-3 font-normal text-[#1b2a4a] shadow-none hover:bg-[#faf8f2] hover:text-[#1b2a4a] md:w-full",
            "focus-visible:border-[#1b3a6b] focus-visible:ring-2 focus-visible:ring-[#1b3a6b]/20",
          )}
        >
          <span className="truncate text-left">{value}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-45" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[60] w-[min(calc(100vw-2rem),320px)] border-[#d6dde6] p-0 shadow-lg sm:min-w-[260px]"
        align="start"
        sideOffset={6}
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-10 border-b border-[#e8ecf2] text-[#1b2a4a] placeholder:text-[#5a6b7f]"
          />
          <CommandList className="max-h-[280px]">
            <CommandEmpty className="py-6 text-xs text-[#5a6b7f]">{emptyText}</CommandEmpty>
            <CommandGroup className="p-1">
              {options.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={() => {
                    onChange(opt)
                    setOpen(false)
                  }}
                  className="cursor-pointer rounded-lg text-[#1b2a4a] aria-selected:bg-[#f8efdb] aria-selected:text-[#4a3a12]"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0 text-[#c9a84c]",
                      value === opt ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="truncate">{opt}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
