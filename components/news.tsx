"use client"

import { useEffect, useState } from "react"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"

import { formatTanggalIndonesia } from "@/lib/teks"

type ItemBerita = {
  idBerita: number
  judul: string
  slug: string
  ringkasan: string
  kategori: string
  gambarUrl: string | null
  tanggalTerbit: string
}

export default function News() {
  const [daftar, setDaftar] = useState<ItemBerita[]>([])
  const [memuat, setMemuat] = useState(true)

  useEffect(() => {
    let aktif = true

    const muat = async () => {
      try {
        const response = await fetch("/api/publik/berita?halaman=1&batas=6", {
          method: "GET",
          cache: "no-store",
        })
        if (!response.ok) return

        const payload = await response.json()
        if (aktif) {
          setDaftar(payload?.data?.data ?? [])
        }
      } catch {
        // fallback: bila gagal, tampilkan state kosong
      } finally {
        if (aktif) {
          setMemuat(false)
        }
      }
    }

    muat()
    return () => {
      aktif = false
    }
  }, [])

  return (
    <section id="berita" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Informasi Terkini
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Berita & Artikel
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
        </div>

        {memuat ? (
          <div className="scroll-reveal rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Memuat berita terbaru...
          </div>
        ) : daftar.length === 0 ? (
          <div className="scroll-reveal rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Belum ada berita terbaru.
          </div>
        ) : (
          <div className="scroll-reveal grid gap-6 md:grid-cols-3">
            {daftar.map((item) => (
              <article
                key={item.idBerita}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  {item.gambarUrl ? (
                    <img
                      src={item.gambarUrl}
                      alt={item.judul}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#123765] to-[#2a5298] text-5xl font-bold text-white">
                      {item.judul.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-navy-dark/0 transition-colors group-hover:bg-navy-dark/20" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-navy-dark">
                    <Tag className="h-3 w-3" />
                    {item.kategori}
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatTanggalIndonesia(item.tanggalTerbit)}
                  </div>

                  <h3
                    className="mb-2 line-clamp-2 font-bold text-foreground transition-colors group-hover:text-navy"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {item.judul}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {item.ringkasan}
                  </p>

                  <Link
                    href={`/berita/${item.slug}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-gold"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="scroll-reveal mt-10 text-center">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
          >
            Lihat Semua Berita
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
