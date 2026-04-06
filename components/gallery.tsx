"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ZoomIn, Images, ArrowLeft } from "lucide-react"

type GalleryItem = {
  src: string
  title: string
  tall: boolean
  kategori: string
}

const images: GalleryItem[] = [
  {
    src: "https://picsum.photos/seed/poltekimipas-wisuda/800/600",
    title: "Wisuda Taruna Angkatan XXXI",
    tall: true,
    kategori: "Wisuda",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-upacara/800/500",
    title: "Upacara Bendera di Kampus POLTEKIMIPAS",
    tall: false,
    kategori: "Kegiatan",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-kuliah/800/500",
    title: "Kegiatan Perkuliahan di Kelas",
    tall: false,
    kategori: "Akademik",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-latihan/800/600",
    title: "Latihan Fisik Taruna dan Taruni",
    tall: true,
    kategori: "Kegiatan",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-perpus/800/500",
    title: "Perpustakaan Kampus POLTEKIMIPAS",
    tall: false,
    kategori: "Fasilitas",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-seminar/800/500",
    title: "Seminar Akademik Nasional",
    tall: false,
    kategori: "Akademik",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-lab/800/600",
    title: "Laboratorium Teknologi Pemasyarakatan",
    tall: true,
    kategori: "Fasilitas",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-olahraga/800/500",
    title: "Pertandingan Olahraga Antar Angkatan",
    tall: false,
    kategori: "Kegiatan",
  },
  {
    src: "https://picsum.photos/seed/poltekimipas-kunjungan/800/500",
    title: "Kunjungan Studi ke Lembaga Pemasyarakatan",
    tall: false,
    kategori: "Akademik",
  },
]

const semuaKategori = ["Semua", ...Array.from(new Set(images.map((i) => i.kategori)))]

const warnaBadge: Record<string, string> = {
  Wisuda: "bg-amber-500/20 text-amber-300",
  Kegiatan: "bg-blue-500/20 text-blue-300",
  Akademik: "bg-emerald-500/20 text-emerald-300",
  Fasilitas: "bg-violet-500/20 text-violet-300",
}

function GambarCard({
  item,
  onClick,
}: {
  item: GalleryItem
  onClick: () => void
}) {
  const [err, setErr] = useState(false)

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.tall ? "row-span-2" : ""}`}
      onClick={onClick}
    >
      {err ? (
        <div className={`flex w-full items-center justify-center bg-gradient-to-br from-[#0f2647] to-[#1b3a6b] ${item.tall ? "h-[424px]" : "h-52"}`}>
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
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${item.tall ? "h-[424px]" : "h-52"}`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#040d1e]/80 via-[#040d1e]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${warnaBadge[item.kategori] ?? "bg-white/15 text-white/70"}`}>
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

  return (
    <section className="min-h-screen bg-[#f4f7fb] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-gold/60 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c9a34f]/30 bg-[#c9a34f]/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#9a7a2c]">
            <Images className="h-3.5 w-3.5" />
            Dokumentasi Kampus
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0f2240] md:text-5xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Galeri <span className="text-[#1b3a6b]">POLTEKIMIPAS</span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#c9a34f] to-[#e8c97a]" />
          <p className="mx-auto mt-4 max-w-2xl text-[#5a6b7f] md:text-base">
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

        {/* Grid */}
        <div className="grid auto-rows-[208px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((img, i) => (
            <GambarCard
              key={img.src}
              item={img}
              onClick={() => {
                const globalIdx = images.indexOf(img)
                setLightbox(globalIdx)
              }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-[#8a97aa]">Tidak ada foto dalam kategori ini.</div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
            >
              ‹
            </button>
          )}

          <img
            src={images[lightbox].src}
            alt={images[lightbox].title}
            className="max-h-[85vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {lightbox < images.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
            >
              ›
            </button>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-xl bg-black/60 px-5 py-2.5 text-center text-sm text-white backdrop-blur-sm">
            <span className={`mr-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${warnaBadge[images[lightbox].kategori] ?? "bg-white/15"}`}>
              {images[lightbox].kategori}
            </span>
            {images[lightbox].title}
            <span className="ml-3 text-white/40">{lightbox + 1} / {images.length}</span>
          </div>
        </div>
      )}
    </section>
  )
}
