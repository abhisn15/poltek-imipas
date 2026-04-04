"use client"

import { useState } from "react"
import { X, ZoomIn } from "lucide-react"

const images = [
  { src: "/images/gallery-1.jpg", title: "Wisuda Taruna Angkatan XXXI", tall: true },
  { src: "/images/gallery-2.jpg", title: "Upacara Bendera di Kampus POLTEKIMIPAS", tall: false },
  { src: "/images/gallery-3.jpg", title: "Kegiatan Perkuliahan di Kelas", tall: false },
  { src: "/images/gallery-4.jpg", title: "Latihan Fisik Taruna dan Taruni", tall: true },
  { src: "/images/gallery-5.jpg", title: "Perpustakaan Kampus POLTEKIMIPAS", tall: false },
  { src: "/images/gallery-6.jpg", title: "Seminar Akademik Nasional", tall: false },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="galeri" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Dokumentasi
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Galeri
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
        </div>

        {/* Masonry grid */}
        <div className="scroll-reveal masonry-grid">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.title}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  img.tall ? "h-80" : "h-52"
                }`}
              />
              <div className="absolute inset-0 flex items-end bg-navy-dark/0 p-4 transition-all duration-300 group-hover:bg-navy-dark/60">
                <div className="flex w-full translate-y-4 items-center justify-between opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-sm font-medium text-primary-foreground">
                    {img.title}
                  </span>
                  <ZoomIn className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Lightbox galeri"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-primary-foreground transition-colors hover:bg-background/40"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].title}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-navy-dark/80 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm">
            {images[lightbox].title}
          </div>
        </div>
      )}
    </section>
  )
}
