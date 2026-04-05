"use client"

import { SiteFilterCombobox } from "@/components/site-filter-combobox"

type Props = {
  options: string[]
  value: string
  onChange: (next: string) => void
}

/** Combobox kategori berita — tema sama dengan filter situs lainnya. */
export function BeritaKategoriCombobox(props: Props) {
  return (
    <SiteFilterCombobox
      {...props}
      searchPlaceholder="Cari nama kategori..."
      emptyText="Tidak ada kategori yang cocok."
      ariaLabel="Pilih kategori berita"
    />
  )
}
