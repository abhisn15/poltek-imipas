"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, FileText, BookOpen, Newspaper, User, GraduationCap, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { HasilPencarian } from "@/lib/data-pencarian"

const tipeIcon: Record<string, React.ElementType> = {
  berita: Newspaper,
  jurnal: FileText,
  dosen: User,
  blog: BookOpen,
  prodi: GraduationCap,
}

const tipeColor: Record<string, string> = {
  berita: "text-amber-600 bg-amber-50",
  jurnal: "text-teal-600 bg-teal-50",
  dosen: "text-violet-600 bg-violet-50",
  blog: "text-sky-600 bg-sky-50",
  prodi: "text-emerald-600 bg-emerald-50",
}

const tipeLabel: Record<string, string> = {
  berita: "Berita",
  jurnal: "Jurnal",
  dosen: "Dosen",
  blog: "Blog",
  prodi: "Program Studi",
}

const suggestions = ["pemasyarakatan", "imigrasi", "jurnal", "dosen", "IoT", "rehabilitasi", "kebijakan"]

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<HasilPencarian[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      setQuery("")
      setResults([])
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const cari = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([])
      setTotal(0)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/publik/cari?q=${encodeURIComponent(q)}&tipe=semua`)
      const json = await res.json()
      // Preview max 7 results in overlay
      setResults((json.data ?? []).slice(0, 7))
      setTotal(json.total ?? 0)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => cari(query), 250)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, cari])

  const keHalamanCari = useCallback((q?: string) => {
    const target = q ?? query
    if (!target.trim()) return
    router.push(`/cari?q=${encodeURIComponent(target.trim())}`)
    onClose()
  }, [query, router, onClose])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      keHalamanCari()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4 bg-[#0a1628]/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white shadow-2xl overflow-hidden"
        style={{ animation: "searchSlideIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes searchSlideIn {
            from { opacity: 0; transform: translateY(-10px) scale(0.98); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e6ebf2]">
          <Search className="h-5 w-5 shrink-0 text-[#8a97aa]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari berita, jurnal, dosen, program studi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#1b2a4a] placeholder:text-[#b0bac7] focus:outline-none text-base"
          />
          <div className="flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 text-[#8a97aa] animate-spin" />}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8a97aa] hover:bg-[#f0f4f9] hover:text-[#1b2a4a] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8a97aa] hover:bg-[#f0f4f9] hover:text-[#1b2a4a] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[480px] overflow-y-auto">
          {/* Empty state / suggestions */}
          {query.length < 2 && (
            <div className="p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8a97aa]">Saran Pencarian</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-[#d6dde6] bg-[#f8fbff] px-3 py-1.5 text-sm text-[#45566f] hover:border-[#1b3a6b] hover:text-[#1b3a6b] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: "Berita", href: "/berita", icon: Newspaper, color: "text-amber-600 bg-amber-50" },
                  { label: "Jurnal", href: "/jurnal", icon: FileText, color: "text-teal-600 bg-teal-50" },
                  { label: "Dosen", href: "/profile/dosen", icon: User, color: "text-violet-600 bg-violet-50" },
                  { label: "Blog", href: "/blog", icon: BookOpen, color: "text-sky-600 bg-sky-50" },
                  { label: "Prodi", href: "/program-studi", icon: GraduationCap, color: "text-emerald-600 bg-emerald-50" },
                  { label: "Cari Semua", href: "/cari", icon: Search, color: "text-[#1b3a6b] bg-[#edf2fb]" },
                ].map(({ label, href, icon: Icon, color }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-xl border border-[#e6ebf2] bg-white p-3 hover:border-[#1b3a6b]/30 hover:bg-[#f8fbff] transition-all"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-[#1b2a4a]">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query.length >= 2 && !loading && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-[#8a97aa]">
                Tidak ditemukan hasil untuk <strong className="text-[#1b2a4a]">&ldquo;{query}&rdquo;</strong>
              </p>
              <button
                onClick={() => keHalamanCari()}
                className="mt-3 text-sm text-[#1b3a6b] underline hover:text-[#153159]"
              >
                Coba pencarian lanjut
              </button>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="p-2">
              {results.map((item, i) => {
                const Icon = tipeIcon[item.tipe] ?? FileText
                const color = tipeColor[item.tipe] ?? "text-[#1b3a6b] bg-[#edf2fb]"
                return (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[#f8fbff] group"
                  >
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a97aa]">
                          {tipeLabel[item.tipe] ?? item.tipe}
                        </span>
                        {item.kategori && (
                          <span className="text-[10px] text-[#b0bac7]">· {item.kategori}</span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-[#1b2a4a] group-hover:text-[#1b3a6b] line-clamp-1 transition-colors">
                        {item.judul}
                      </div>
                      {item.deskripsi && (
                        <div className="mt-0.5 text-xs text-[#8a97aa] line-clamp-1">{item.deskripsi}</div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Footer: Lihat semua */}
          {query.length >= 2 && (
            <div className="border-t border-[#e6ebf2] px-5 py-3">
              <button
                onClick={() => keHalamanCari()}
                className="flex w-full items-center justify-between rounded-xl bg-[#f0f4ff] px-4 py-2.5 text-sm font-semibold text-[#1b3a6b] hover:bg-[#e8efff] transition-colors"
              >
                <span>
                  Lihat semua hasil untuk <span className="italic">&ldquo;{query}&rdquo;</span>
                  {total > 0 && <span className="ml-2 text-xs font-normal text-[#5a6b7f]">({total} ditemukan)</span>}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <div className="flex items-center gap-4 border-t border-[#e6ebf2] px-5 py-2.5 bg-[#fafcff]">
          <span className="text-[11px] text-[#b0bac7]">
            <kbd className="rounded border border-[#d6dde6] px-1.5 py-0.5 text-[10px] font-mono">Enter</kbd>{" "}
            untuk cari lengkap
          </span>
          <span className="text-[11px] text-[#b0bac7]">
            <kbd className="rounded border border-[#d6dde6] px-1.5 py-0.5 text-[10px] font-mono">Esc</kbd>{" "}
            untuk tutup
          </span>
        </div>
      </div>
    </div>
  )
}
