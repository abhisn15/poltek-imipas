"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronDown, Search } from "lucide-react"

export type SearchableDropdownOption = {
  label: string
  value: string
  subLabel?: string
}

type SearchableDropdownProps = {
  value: string
  options: SearchableDropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
}

export default function SearchableDropdown({
  value,
  options,
  onChange,
  placeholder = "Pilih salah satu",
  searchPlaceholder = "Cari...",
  emptyText = "Tidak ada data",
  disabled = false,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen && query) {
      setQuery("")
    }
  }, [isOpen, query])

  const selectedOption = useMemo(
    () => options.find((item) => item.value === value),
    [options, value],
  )

  const filteredOptions = useMemo(() => {
    const text = query.trim().toLowerCase()
    if (!text) return options

    return options.filter((item) => {
      const inLabel = item.label.toLowerCase().includes(text)
      const inSubLabel = item.subLabel?.toLowerCase().includes(text)
      return inLabel || Boolean(inSubLabel)
    })
  }, [options, query])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false)
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-lg border border-[#d6dde6] bg-white px-3 py-2 text-sm text-[#1b2a4a] outline-none transition focus:border-[#1b3a6b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className={selectedOption ? "text-[#1b2a4a]" : "text-[#8a97aa]"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-[#64748b] transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-[#d6dde6] bg-white shadow-lg"
        >
          <div className="border-b border-[#e8edf5] p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a97aa]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-lg border border-[#d6dde6] pl-8 pr-3 text-sm outline-none focus:border-[#1b3a6b]"
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-[#7b8899]">{emptyText}</div>
            ) : (
              filteredOptions.map((item) => {
                const aktif = item.value === value
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="option"
                    aria-selected={aktif}
                    onClick={() => {
                      onChange(item.value)
                      setIsOpen(false)
                      setQuery("")
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                      aktif ? "bg-[#edf2fb] text-[#1b3a6b]" : "text-[#1b2a4a] hover:bg-[#f7f9fc]"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate">{item.label}</span>
                      {item.subLabel ? (
                        <span className="block truncate text-xs text-[#7b8899]">{item.subLabel}</span>
                      ) : null}
                    </span>
                    {aktif ? <Check className="h-4 w-4 shrink-0" /> : null}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
