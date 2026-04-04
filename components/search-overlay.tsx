"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, FileText, BookOpen, Newspaper } from "lucide-react"

interface SearchItem {
  type: "article" | "journal" | "book"
  title: string
  subtitle: string
}

const searchData: SearchItem[] = [
  { type: "article", title: "Upacara Pelantikan Taruna Baru Angkatan XXXII POLTEKIMIPAS", subtitle: "Berita - 28 Februari 2026" },
  { type: "article", title: "Workshop Penulisan Karya Ilmiah untuk Dosen dan Taruna", subtitle: "Berita - 15 Februari 2026" },
  { type: "article", title: "Kunjungan Kerja Dirjen Pemasyarakatan ke Kampus POLTEKIMIPAS", subtitle: "Berita - 5 Februari 2026" },
  { type: "journal", title: "Analisis Efektivitas Program Pembinaan Narapidana di Lapas Kelas I", subtitle: "Jurnal - Vol. 12 No. 1 (2026)" },
  { type: "journal", title: "Penerapan Sistem Keamanan Berbasis IoT pada Lembaga Pemasyarakatan", subtitle: "Jurnal - Vol. 12 No. 1 (2026)" },
  { type: "journal", title: "Model Bimbingan Kemasyarakatan untuk Anak Berkonflik dengan Hukum", subtitle: "Jurnal - Vol. 11 No. 2 (2025)" },
  { type: "book", title: "Hukum Pemasyarakatan Indonesia: Teori dan Praktik", subtitle: "Perpustakaan - Hukum Pemasyarakatan" },
  { type: "book", title: "Manajemen Lembaga Pemasyarakatan Modern", subtitle: "Perpustakaan - Manajemen" },
  { type: "book", title: "Teknologi Keamanan untuk Lembaga Pemasyarakatan", subtitle: "Perpustakaan - Teknologi" },
  { type: "book", title: "Modul Pelatihan Bimbingan Kemasyarakatan", subtitle: "Perpustakaan - Modul Pelatihan" },
  { type: "article", title: "Transformasi Digital dalam Sistem Pemasyarakatan Indonesia", subtitle: "Blog - Dr. Haryono, M.Si." },
  { type: "article", title: "Pendekatan Humanis dalam Bimbingan Kemasyarakatan", subtitle: "Blog - Dra. Siti Rahayu, M.Hum." },
]

const iconMap = {
  article: Newspaper,
  journal: FileText,
  book: BookOpen,
}

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      setQuery("")
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!open) return null

  const results = query.length > 1
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-navy-dark/80 pt-24 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-2xl animate-fade-in-up rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari artikel, jurnal, atau buku..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.length > 1 && results.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;
            </div>
          )}

          {results.map((item, i) => {
            const Icon = iconMap[item.type]
            return (
              <button
                key={i}
                className="flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-secondary"
                onClick={onClose}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                </div>
              </button>
            )
          })}

          {query.length <= 1 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Ketik minimal 2 karakter untuk mencari...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
