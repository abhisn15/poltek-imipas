"use client"

import { useState } from "react"
import { Search, Download, BookOpen, BookMarked } from "lucide-react"
import Link from "next/link"

const categories = [
  "Semua",
  "Hukum Pemasyarakatan",
  "Manajemen",
  "Teknologi",
  "Modul Pelatihan",
]

const books = [
  {
    id: 1,
    slug: "hukum-pemasyarakatan-indonesia-teori-dan-praktik",
    title: "Hukum Pemasyarakatan Indonesia: Teori dan Praktik",
    author: "Prof. Dr. Suhartoyo, S.H., M.H.",
    category: "Hukum Pemasyarakatan",
    color: "bg-navy",
  },
  {
    id: 2,
    slug: "manajemen-lembaga-pemasyarakatan-modern",
    title: "Manajemen Lembaga Pemasyarakatan Modern",
    author: "Dr. Haryono, M.Si.",
    category: "Manajemen",
    color: "bg-navy-light",
  },
  {
    id: 3,
    slug: "teknologi-keamanan-lembaga-pemasyarakatan",
    title: "Teknologi Keamanan untuk Lembaga Pemasyarakatan",
    author: "Ahmad Fauzi, M.T.",
    category: "Teknologi",
    color: "bg-navy-dark",
  },
  {
    id: 4,
    slug: "modul-pelatihan-bimbingan-kemasyarakatan",
    title: "Modul Pelatihan Bimbingan Kemasyarakatan",
    author: "Tim Dosen Bimbingan Kemasyarakatan",
    category: "Modul Pelatihan",
    color: "bg-gold",
  },
  {
    id: 5,
    slug: "sistem-pemasyarakatan-perspektif-ham",
    title: "Sistem Pemasyarakatan: Perspektif HAM",
    author: "Dra. Siti Rahayu, M.Hum.",
    category: "Hukum Pemasyarakatan",
    color: "bg-navy",
  },
  {
    id: 6,
    slug: "panduan-teknis-pengawasan-lembaga-pemasyarakatan",
    title: "Panduan Teknis Pengawasan Lembaga Pemasyarakatan",
    author: "Tim Dosen Teknik Pemasyarakatan",
    category: "Modul Pelatihan",
    color: "bg-gold",
  },
  {
    id: 7,
    slug: "manajemen-sdm-lingkungan-pemasyarakatan",
    title: "Manajemen SDM di Lingkungan Pemasyarakatan",
    author: "Bambang Supriyadi, S.H., M.H.",
    category: "Manajemen",
    color: "bg-navy-light",
  },
  {
    id: 8,
    slug: "smart-surveillance-penerapan-ai-pengawasan",
    title: "Smart Surveillance: Penerapan AI dalam Pengawasan",
    author: "Ahmad Fauzi, M.T., Eko Prasetyo, S.T.",
    category: "Teknologi",
    color: "bg-navy-dark",
  },
]

export default function Library() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === "Semua" || b.category === category
    return matchSearch && matchCat
  })

  return (
    <section id="perpustakaan" className="py-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Sumber Belajar
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Perpustakaan Digital
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
        </div>

        {/* Search and filter */}
        <div className="scroll-reveal mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari judul atau penulis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-navy focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-navy text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:border-navy hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Book grid */}
        <div className="scroll-reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
            >
              {/* Book cover placeholder */}
              <div className={`relative flex h-40 items-center justify-center ${book.color}`}>
                <BookMarked className="h-12 w-12 text-primary-foreground/30" />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                  {book.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="mb-1 line-clamp-2 text-sm font-bold text-foreground" style={{ fontFamily: "var(--font-poppins)" }}>
                  {book.title}
                </h3>
                <p className="mb-3 text-xs text-muted-foreground">{book.author}</p>

                <div className="flex gap-2">
                  <Link
                    href={`/perpustakaan/${book.slug}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy px-3 py-2 text-xs font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
                  >
                    <BookOpen className="h-3 w-3" />
                    Detail
                  </Link>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-navy-light">
                    <Download className="h-3 w-3" />
                    Unduh
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="scroll-reveal rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
            Tidak ada buku yang sesuai dengan pencarian Anda.
          </div>
        )}

        <div className="scroll-reveal mt-10 text-center">
          <Link 
            href="/perpustakaan"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
          >
            Lihat Semua Buku
            <BookOpen className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
