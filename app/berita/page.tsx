"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  Filter,
  Newspaper,
  Search,
  Sparkles,
  Tag,
} from "lucide-react"

import { BeritaKategoriCombobox } from "@/components/berita-kategori-combobox"
import { formatTanggalIndonesia } from "@/lib/teks"

type BeritaPublik = {
  idBerita: number
  judul: string
  slug: string
  ringkasan: string
  kategori: string
  gambarUrl: string | null
  tagList: string[]
  jumlahDilihat: number
  estimasiBacaMenit: number
  tanggalTerbit: string
}

const daftarKategoriFallback = [
  "Semua",
  "Kegiatan Taruna",
  "Akademik",
  "Kebijakan",
  "Prestasi",
  "Kerjasama",
  "Pengumuman",
]

type KategoriBeritaPublik = {
  idKategori: number
  namaKategori: string
}

function BeritaGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-[#d6dde6] bg-white shadow-sm"
        >
          <div className="aspect-[16/10] animate-pulse bg-gradient-to-br from-[#e8ecf2] to-[#dce3ed]" />
          <div className="space-y-3 p-5">
            <div className="flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-[#e8ecf2]" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-[#e8ecf2]" />
            </div>
            <div className="h-5 w-full animate-pulse rounded bg-[#e8ecf2]" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-[#e8ecf2]" />
            <div className="h-3 w-full animate-pulse rounded bg-[#e8ecf2]" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-[#e8ecf2]" />
          </div>
        </div>
      ))}
    </div>
  )
}

function BeritaContent() {
  const searchParams = useSearchParams()
  const [kataKunci, setKataKunci] = useState("")
  const [kategori, setKategori] = useState("Semua")
  const [halaman, setHalaman] = useState(1)
  const [totalHalaman, setTotalHalaman] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [daftarBerita, setDaftarBerita] = useState<BeritaPublik[]>([])
  const [daftarKategori, setDaftarKategori] = useState<string[]>(daftarKategoriFallback)
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let aktif = true

    const muatKategori = async () => {
      try {
        const response = await fetch("/api/publik/kategori-berita", {
          method: "GET",
          cache: "no-store",
        })
        if (!response.ok) return

        const payload = await response.json()
        const data = Array.isArray(payload?.data) ? (payload.data as KategoriBeritaPublik[]) : []
        const hasil = ["Semua", ...data.map((item) => item.namaKategori)]
        if (aktif && hasil.length > 1) {
          setDaftarKategori(hasil)
        }
      } catch {
        // fallback tetap pakai kategori bawaan
      }
    }

    muatKategori()
    return () => {
      aktif = false
    }
  }, [])

  useEffect(() => {
    const kategoriAwal = searchParams.get("kategori")
    if (kategoriAwal && daftarKategori.includes(kategoriAwal)) {
      setKategori(kategoriAwal)
    }
  }, [searchParams, daftarKategori])

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        setMemuat(true)
        setError("")

        const query = new URLSearchParams({
          halaman: String(halaman),
          batas: "6",
        })

        if (kategori !== "Semua") {
          query.set("kategori", kategori)
        }
        if (kataKunci.trim()) {
          query.set("cari", kataKunci.trim())
        }

        const response = await fetch(`/api/publik/berita?${query.toString()}`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Gagal memuat berita")
        }

        const payload = await response.json()
        const data = payload?.data
        setDaftarBerita(data?.data ?? [])
        setTotalData(data?.totalData ?? 0)
        setTotalHalaman(data?.totalHalaman ?? 1)
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Data berita belum bisa dimuat. Coba lagi sebentar.")
        }
      } finally {
        setMemuat(false)
      }
    }, 240)

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [kataKunci, kategori, halaman])

  const infoHasil = useMemo(() => {
    if (memuat) {
      return "Memuat berita..."
    }
    if (error) {
      return error
    }
    return `Menampilkan ${daftarBerita.length} dari ${totalData} berita`
  }, [memuat, error, daftarBerita.length, totalData])

  const heroPattern =
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1b2a4a]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2647] via-[#123765] to-[#1a4a7a] pb-14 pt-28 text-white md:pb-16 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ backgroundImage: heroPattern }}
        />
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#c9a84c]/10 blur-3xl md:h-96 md:w-96" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#2a5298]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm transition-colors hover:border-[#c9a84c]/40 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a84c]/35 bg-[#c9a84c]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f0d78c]">
              <Newspaper className="h-3.5 w-3.5" />
              Berita kampus
            </span>
          </div>
          <h1
            className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
          >
            Berita &amp; Informasi{" "}
            <span className="bg-gradient-to-r from-[#e8c97a] to-[#c9a34f] bg-clip-text text-transparent">
              POLTEKIMIPAS
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            Update resmi dari kampus — diselenggarakan melalui sistem administrasi POLTEKIMIPAS.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 pb-16 md:-mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-[#d6dde6]/80 bg-white p-4 shadow-[0_12px_40px_-12px_rgba(15,38,71,0.12)] ring-1 ring-[#f0dca6]/45 md:p-7">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c9a84c]/80 via-[#f0d78c]/70 to-[#c9a84c]/80" />

          <div className="mt-2 grid gap-5 lg:grid-cols-[1fr_minmax(200px,280px)] lg:items-end lg:gap-8">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1b3a6b]">
                <Search className="h-4 w-4 text-[#c9a84c]" />
                Cari berita
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a6b7f]/70" />
                <input
                  value={kataKunci}
                  onChange={(event) => {
                    setKataKunci(event.target.value)
                    setHalaman(1)
                  }}
                  className="h-11 w-full rounded-xl border border-[#d6dde6] bg-[#fafbfd] pl-10 pr-3 text-sm text-[#1b2a4a] outline-none transition-colors placeholder:text-[#5a6b7f]/70 focus:border-[#1b3a6b] focus:bg-white focus:ring-2 focus:ring-[#1b3a6b]/15"
                  placeholder="Judul, ringkasan, atau isi berita..."
                  aria-label="Cari berita"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1b3a6b]">
                <Filter className="h-4 w-4 text-[#c9a84c]" />
                Kategori
              </div>
              <BeritaKategoriCombobox
                options={daftarKategori}
                value={kategori}
                onChange={(next) => {
                  setKategori(next)
                  setHalaman(1)
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#eef1f6] pt-4">
            <Sparkles className="h-3.5 w-3.5 text-[#c9a84c]" />
            <p className="text-xs text-[#5a6b7f] md:text-sm">{infoHasil}</p>
          </div>
        </div>

        <div className="mt-8">
          {memuat ? (
            <BeritaGridSkeleton />
          ) : daftarBerita.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#c9a84c]/40 bg-white/80 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8efdb] text-[#8a6d24]">
                <Search className="h-7 w-7 opacity-80" />
              </div>
              <p className="mt-4 text-base font-semibold text-[#1b2a4a]">Tidak ada berita yang cocok</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#5a6b7f]">
                Ubah kata kunci atau pilih kategori lain. Pastikan ejaan kata kunci sudah sesuai.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {daftarBerita.map((item) => (
                <article
                  key={item.idBerita}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d6dde6] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a84c]/50 hover:shadow-[0_20px_50px_-20px_rgba(15,38,71,0.18)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0f2647]">
                    {item.gambarUrl ? (
                      <img
                        src={item.gambarUrl}
                        alt={item.judul}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#15325d] via-[#1b3a6b] to-[#2a5298]">
                        <span className="text-5xl font-bold text-white/25">
                          {item.judul.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1628]/85 to-transparent" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#c9a84c]/40 bg-[#0a1628]/75 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#f0d78c] backdrop-blur-sm">
                      <Tag className="h-3 w-3" />
                      {item.kategori}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#5a6b7f] md:text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#c9a84c]" />
                        {formatTanggalIndonesia(item.tanggalTerbit)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#c9a84c]" />
                        {item.estimasiBacaMenit} mnt baca
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 text-[#c9a84c]" />
                        {item.jumlahDilihat.toLocaleString("id-ID")} dilihat
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#0f2647] transition-colors group-hover:text-[#1b3a6b]">
                      {item.judul}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#5a6b7f]">
                      {item.ringkasan}
                    </p>

                    {item.tagList.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tagList.slice(0, 4).map((tag) => (
                          <span
                            key={`${item.idBerita}-${tag}`}
                            className="rounded-md border border-[#d6dde6] bg-[#f4f7fb] px-2 py-0.5 text-[11px] font-medium text-[#1b3a6b]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/berita/${item.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#1b3a6b] transition-colors hover:text-[#c9a84c]"
                    >
                      Baca selengkapnya
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {totalHalaman > 1 && !memuat && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={halaman <= 1}
              onClick={() => setHalaman((prev) => Math.max(1, prev - 1))}
              className="rounded-xl border border-[#d6dde6] bg-white px-4 py-2.5 text-sm font-semibold text-[#1b2a4a] shadow-sm transition-all hover:border-[#c9a84c]/50 hover:bg-[#faf8f2] disabled:pointer-events-none disabled:opacity-40"
            >
              Sebelumnya
            </button>
            <span className="rounded-full border border-[#e8ecf2] bg-white px-4 py-2 text-sm font-medium text-[#5a6b7f]">
              Halaman <strong className="text-[#1b3a6b]">{halaman}</strong> dari{" "}
              <strong className="text-[#1b3a6b]">{totalHalaman}</strong>
            </span>
            <button
              type="button"
              disabled={halaman >= totalHalaman}
              onClick={() => setHalaman((prev) => Math.min(totalHalaman, prev + 1))}
              className="rounded-xl border border-[#d6dde6] bg-white px-4 py-2.5 text-sm font-semibold text-[#1b2a4a] shadow-sm transition-all hover:border-[#c9a84c]/50 hover:bg-[#faf8f2] disabled:pointer-events-none disabled:opacity-40"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default function BeritaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f6fa] p-8 text-sm text-[#5a6b7f]">
          Memuat halaman berita...
        </div>
      }
    >
      <BeritaContent />
    </Suspense>
  )
}
