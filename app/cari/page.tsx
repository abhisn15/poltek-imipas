"use client"

import { useEffect, useState, useCallback, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  Newspaper,
  FileText,
  User,
  BookOpen,
  GraduationCap,
  Loader2,
  ArrowLeft,
  ChevronRight,
} from "lucide-react"
import type { HasilPencarian } from "@/lib/data-pencarian"

type TipeFilter = "semua" | "berita" | "jurnal" | "dosen" | "blog" | "prodi"

type ApiResponse = {
  data: HasilPencarian[]
  query: string
  total: number
  per_tipe: Record<string, number>
}

const tipeConfig: Record<TipeFilter, { label: string; Icon: React.ElementType; warna: string; bg: string }> = {
  semua: { label: "Semua", Icon: Search, warna: "text-[#1b3a6b]", bg: "bg-[#edf2fb]" },
  berita: { label: "Berita", Icon: Newspaper, warna: "text-[#b45309]", bg: "bg-amber-50" },
  jurnal: { label: "Jurnal", Icon: FileText, warna: "text-[#0f766e]", bg: "bg-teal-50" },
  dosen: { label: "Dosen", Icon: User, warna: "text-[#7c3aed]", bg: "bg-violet-50" },
  blog: { label: "Blog", Icon: BookOpen, warna: "text-[#0369a1]", bg: "bg-sky-50" },
  prodi: { label: "Program Studi", Icon: GraduationCap, warna: "text-[#157347]", bg: "bg-emerald-50" },
}

function KartuHasil({ item }: { item: HasilPencarian }) {
  const config = tipeConfig[item.tipe] ?? tipeConfig.semua
  const { Icon, warna, bg } = config

  return (
    <Link
      href={item.href}
      className="group flex items-start gap-4 rounded-2xl border border-[#e6ebf2] bg-white p-5 transition-all hover:border-[#1b3a6b]/30 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg}`}>
        <Icon className={`h-5 w-5 ${warna}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${bg} ${warna}`}>
            {config.label}
          </span>
          {item.kategori && (
            <span className="text-xs text-[#8a97aa]">{item.kategori}</span>
          )}
        </div>
        <h3 className="font-semibold text-[#1b2a4a] group-hover:text-[#1b3a6b] transition-colors line-clamp-2">
          {item.judul}
        </h3>
        <p className="mt-1.5 text-sm text-[#5a6b7f] line-clamp-2 leading-relaxed">
          {item.deskripsi}
        </p>
        {item.meta && (
          <p className="mt-2 text-xs text-[#8a97aa]">{item.meta}</p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 text-[#c6d0db] shrink-0 mt-1 group-hover:text-[#1b3a6b] transition-colors" />
    </Link>
  )
}

function HalamanCariInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [tipe, setTipe] = useState<TipeFilter>((searchParams.get("tipe") as TipeFilter) ?? "semua")
  const [hasil, setHasil] = useState<HasilPencarian[]>([])
  const [perTipe, setPerTipe] = useState<Record<string, number>>({})
  const [memuat, setMemuat] = useState(false)
  const [sudahCari, setSudahCari] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const lakukan = useCallback(async (q: string, t: TipeFilter) => {
    if (q.trim().length < 2) {
      setHasil([])
      setSudahCari(false)
      return
    }
    setMemuat(true)
    try {
      const res = await fetch(`/api/publik/cari?q=${encodeURIComponent(q)}&tipe=${t}`)
      const json: ApiResponse = await res.json()
      setHasil(json.data ?? [])
      setPerTipe(json.per_tipe ?? {})
      setSudahCari(true)
    } catch {
      setHasil([])
    } finally {
      setMemuat(false)
    }
  }, [])

  // Update URL params
  const updateUrl = useCallback((q: string, t: TipeFilter) => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (t !== "semua") params.set("tipe", t)
    router.replace(`/cari?${params.toString()}`, { scroll: false })
  }, [router])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      lakukan(query, tipe)
      updateUrl(query, tipe)
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, tipe, lakukan, updateUrl])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const hasilDitampilkan = tipe === "semua" ? hasil : hasil.filter((h) => h.tipe === tipe)

  const totalPerTipe = (t: TipeFilter): number => {
    if (t === "semua") return hasil.length
    return perTipe[t] ?? hasil.filter((h) => h.tipe === t).length
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* Search Header */}
      <div className="bg-[#0a1628] pb-12 pt-28 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-poppins)" }}>
            Cari di POLTEKIMIPAS
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            {memuat ? (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 animate-spin" />
            ) : null}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berita, jurnal, dosen, program studi..."
              className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-12 pr-12 text-white placeholder:text-white/35 outline-none focus:border-[#c9a34f]/50 focus:bg-white/15 transition-all text-lg"
            />
          </div>
          {query.length > 0 && query.length < 2 && (
            <p className="mt-2 text-xs text-white/40">Ketik minimal 2 karakter untuk mencari</p>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      {sudahCari && (
        <div className="sticky top-0 z-10 bg-white border-b border-[#e6ebf2] shadow-sm">
          <div className="mx-auto max-w-3xl px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              {(Object.keys(tipeConfig) as TipeFilter[]).map((t) => {
                const count = totalPerTipe(t)
                const isActive = tipe === t
                return (
                  <button
                    key={t}
                    onClick={() => setTipe(t)}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#1b3a6b] text-white"
                        : "text-[#5a6b7f] hover:bg-[#f0f4f9] hover:text-[#1b2a4a]"
                    }`}
                  >
                    {tipeConfig[t].label}
                    {count > 0 && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                          isActive ? "bg-white/20 text-white" : "bg-[#e6ebf2] text-[#5a6b7f]"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        {memuat && (
          <div className="flex items-center justify-center py-16 gap-3 text-[#8a97aa]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Mencari...</span>
          </div>
        )}

        {!memuat && !sudahCari && !query && (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#edf2fb] mb-4">
              <Search className="h-7 w-7 text-[#1b3a6b]" />
            </div>
            <h2 className="text-lg font-semibold text-[#1b2a4a] mb-2">Temukan Apa yang Anda Cari</h2>
            <p className="text-[#8a97aa] max-w-sm mx-auto text-sm">
              Cari berita terbaru, jurnal ilmiah, profil dosen, program studi, dan artikel blog dari POLTEKIMIPAS.
            </p>

            {/* Suggestions */}
            <div className="mt-8 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8a97aa] mb-3">Saran pencarian</p>
              <div className="flex flex-wrap gap-2">
                {["pemasyarakatan", "imigrasi", "jurnal", "dosen", "rehabilitasi", "IoT", "kebijakan", "taruna"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-[#d6dde6] bg-white px-3 py-1.5 text-sm text-[#45566f] hover:border-[#1b3a6b] hover:text-[#1b3a6b] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories shortcut */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(Object.entries(tipeConfig) as [TipeFilter, typeof tipeConfig.semua][])
                .filter(([t]) => t !== "semua")
                .map(([t, cfg]) => (
                  <Link
                    key={t}
                    href={`/${t === "prodi" ? "program-studi" : t}`}
                    className={`flex items-center gap-3 rounded-xl border border-[#e6ebf2] bg-white p-4 hover:border-[#1b3a6b]/30 hover:shadow-sm transition-all`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${cfg.bg}`}>
                      <cfg.Icon className={`h-4 w-4 ${cfg.warna}`} />
                    </div>
                    <span className="text-sm font-medium text-[#1b2a4a]">{cfg.label}</span>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {!memuat && sudahCari && hasilDitampilkan.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] mb-4">
              <Search className="h-7 w-7 text-amber-500" />
            </div>
            <h2 className="text-lg font-semibold text-[#1b2a4a] mb-2">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;
            </h2>
            <p className="text-[#8a97aa] text-sm max-w-sm mx-auto">
              Coba kata kunci yang berbeda atau pilih kategori lain di atas.
            </p>
          </div>
        )}

        {!memuat && hasilDitampilkan.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-[#5a6b7f]">
                Menampilkan <strong className="text-[#1b2a4a]">{hasilDitampilkan.length}</strong> hasil
                {query && (
                  <> untuk <strong className="text-[#1b2a4a]">&ldquo;{query}&rdquo;</strong></>
                )}
              </p>
            </div>
            <div className="space-y-3">
              {hasilDitampilkan.map((item, idx) => (
                <KartuHasil key={`${item.tipe}-${idx}`} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function HalamanCari() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb]">
        <Loader2 className="h-6 w-6 animate-spin text-[#1b3a6b]" />
      </div>
    }>
      <HalamanCariInner />
    </Suspense>
  )
}
