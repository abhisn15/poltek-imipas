"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { X, ZoomIn, Images, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

type GalleryItem = {
  src: string
  title: string
  tall: boolean
  kategori: string
}

const images: GalleryItem[] = [
  { src: "https://picsum.photos/seed/poltekimipas-wisuda/800/600", title: "Wisuda Taruna Angkatan XXXI", tall: true, kategori: "Wisuda" },
  { src: "https://picsum.photos/seed/poltekimipas-upacara/800/500", title: "Upacara Bendera di Kampus POLTEKIMIPAS", tall: false, kategori: "Kegiatan" },
  { src: "https://picsum.photos/seed/poltekimipas-kuliah/800/500", title: "Kegiatan Perkuliahan di Kelas", tall: false, kategori: "Akademik" },
  { src: "https://picsum.photos/seed/poltekimipas-latihan/800/600", title: "Latihan Fisik Taruna dan Taruni", tall: true, kategori: "Kegiatan" },
  { src: "https://picsum.photos/seed/poltekimipas-perpus/800/500", title: "Perpustakaan Kampus POLTEKIMIPAS", tall: false, kategori: "Fasilitas" },
  { src: "https://picsum.photos/seed/poltekimipas-seminar/800/500", title: "Seminar Akademik Nasional", tall: false, kategori: "Akademik" },
  { src: "https://picsum.photos/seed/poltekimipas-lab/800/600", title: "Laboratorium Teknologi Pemasyarakatan", tall: true, kategori: "Fasilitas" },
  { src: "https://picsum.photos/seed/poltekimipas-olahraga/800/500", title: "Pertandingan Olahraga Antar Angkatan", tall: false, kategori: "Kegiatan" },
  { src: "https://picsum.photos/seed/poltekimipas-kunjungan/800/500", title: "Kunjungan Studi ke Lembaga Pemasyarakatan", tall: false, kategori: "Akademik" },
]

const semuaKategori = ["Semua", ...Array.from(new Set(images.map((i) => i.kategori)))]

const warnaBadge: Record<string, string> = {
  Wisuda: "bg-amber-500/25 text-amber-200",
  Kegiatan: "bg-blue-500/25 text-blue-200",
  Akademik: "bg-emerald-500/25 text-emerald-200",
  Fasilitas: "bg-violet-500/25 text-violet-200",
}

const warnaBadgeLight: Record<string, string> = {
  Wisuda: "bg-amber-50 text-amber-700",
  Kegiatan: "bg-blue-50 text-blue-700",
  Akademik: "bg-emerald-50 text-emerald-700",
  Fasilitas: "bg-violet-50 text-violet-700",
}

function GambarCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [err, setErr] = useState(false)

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.tall ? "row-span-2" : ""}`}
      onClick={onClick}
    >
      {err ? (
        <div className={`flex w-full items-center justify-center bg-gradient-to-br from-[#0f2647] to-[#1b3a6b] ${item.tall ? "h-full min-h-[424px]" : "h-full min-h-[200px]"}`}>
          <div className="text-center">
            <Images className="mx-auto mb-2 h-10 w-10 text-[#c9a34f]/40" />
            <p className="text-xs text-white/30">Foto belum tersedia</p>
          </div>
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.title}
          onError={() => setErr(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ display: "block" }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#040d1e]/75 via-[#040d1e]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className={`mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${warnaBadge[item.kategori] ?? "bg-white/15 text-white/70"}`}>
          {item.kategori}
        </span>
        <div className="flex items-end justify-between gap-2">
          <p className="text-sm font-semibold leading-snug text-white">{item.title}</p>
          <ZoomIn className="h-5 w-5 shrink-0 text-[#c9a34f]" />
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [filter, setFilter] = useState("Semua")

  const filtered = filter === "Semua" ? images : images.filter((i) => i.kategori === filter)

  // ── Scroll lock saat lightbox aktif ──────────────────────────────────
  useEffect(() => {
    if (lightbox !== null) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
    }
  }, [lightbox])

  const tutupLightbox = useCallback(() => setLightbox(null), [])
  const prevFoto = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setLightbox((p) => (p !== null && p > 0 ? p - 1 : p))
  }, [])
  const nextFoto = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setLightbox((p) => (p !== null && p < images.length - 1 ? p + 1 : p))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && lightbox > 0) setLightbox(lightbox - 1)
      if (e.key === "ArrowRight" && lightbox < images.length - 1) setLightbox(lightbox + 1)
      if (e.key === "Escape") tutupLightbox()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox, tutupLightbox])

  return (
    <section className="bg-[#f4f7fb] pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-gold/60 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c9a34f]/30 bg-[#c9a34f]/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#9a7a2c]">
            <Images className="h-3.5 w-3.5" />
            Dokumentasi Kampus
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f2240] sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Galeri <span className="text-[#1b3a6b]">POLTEKIMIPAS</span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#c9a34f] to-[#e8c97a]" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#5a6b7f] md:text-base">
            Dokumentasi berbagai kegiatan akademik, kemahasiswaan, dan fasilitas kampus POLTEKIMIPAS.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {semuaKategori.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                filter === k
                  ? "bg-[#1b3a6b] text-white shadow-md"
                  : "border border-[#d6dde6] bg-white text-[#1b2a4a] hover:border-[#1b3a6b] hover:text-[#1b3a6b]"
              }`}
            >
              {k}
              {k !== "Semua" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {images.filter((i) => i.kategori === k).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Masonry grid — responsif */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-[#8a97aa]">Tidak ada foto dalam kategori ini.</div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gridAutoRows: "200px",
            }}
          >
            {filtered.map((img) => (
              <GambarCard
                key={img.src}
                item={img}
                onClick={() => {
                  setLightbox(images.indexOf(img))
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={tutupLightbox}
        >
          {/* Tombol tutup */}
          <button
            onClick={tutupLightbox}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/25 hover:ring-white/40"
            aria-label="Tutup lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Tombol Prev */}
          {lightbox > 0 && (
            <button
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/25 sm:left-5"
              onClick={prevFoto}
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Gambar */}
          <div
            className="flex max-h-[82vh] max-w-[min(90vw,1100px)] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox].src}
              alt={images[lightbox].title}
              className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          {/* Tombol Next */}
          {lightbox < images.length - 1 && (
            <button
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/25 sm:right-5"
              onClick={nextFoto}
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Caption bawah */}
          <div className="absolute bottom-4 left-1/2 w-[min(90vw,500px)] -translate-x-1/2 rounded-2xl bg-black/60 px-5 py-3 text-center backdrop-blur-sm">
            <div className="mb-1">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${warnaBadge[images[lightbox].kategori] ?? "bg-white/15 text-white/70"}`}>
                {images[lightbox].kategori}
              </span>
            </div>
            <p className="text-sm font-medium text-white">{images[lightbox].title}</p>
            <p className="mt-0.5 text-xs text-white/40">{lightbox + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </section>
  )
}
