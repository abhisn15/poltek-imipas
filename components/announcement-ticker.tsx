"use client"

import { Bell } from "lucide-react"
import Link from "next/link"

const tickerItems = [
  { text: "Pendaftaran Seleksi Penerimaan Taruna Baru T.A. 2026/2027 telah dibuka!", id: 1, penting: true },
  { text: "Jadwal Ujian Akhir Semester Genap 2025/2026 telah tersedia.", id: 2, penting: false },
  { text: "Pengumuman Hasil Seleksi Beasiswa Unggulan POLTEKIMIPAS.", id: 3, penting: false },
  { text: "Peringatan Hari Pemasyarakatan ke-62 akan dilaksanakan 27 April 2026.", id: 4, penting: false },
]

export default function AnnouncementTicker() {
  const tickerPenting = tickerItems.filter((item) => item.penting)

  if (tickerPenting.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden bg-gold text-navy-dark">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2">
        <div className="mr-3 flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
          <Bell className="h-3.5 w-3.5" />
          Pengumuman Penting
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...tickerPenting, ...tickerPenting].map((item, i) => (
              <Link
                key={i}
                href={`/pengumuman/${item.id}`}
                className="mx-8 inline-block text-sm font-medium hover:underline transition-colors"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
