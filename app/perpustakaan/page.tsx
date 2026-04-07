"use client"

import { useState } from "react"
import { Search, Download, BookOpen, BookMarked, ArrowLeft, FileText, Filter, Sparkles } from "lucide-react"
import Link from "next/link"

import { SiteFilterCombobox } from "@/components/site-filter-combobox"

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
    description: "Buku ini membahas secara komprehensif tentang hukum pemasyarakatan di Indonesia, mulai dari aspek teoretis hingga implementasi praktis di lapangan.",
    publishDate: "2024-01-15",
    pages: 456,
    isbn: "978-602-1234-001",
    fileSize: "12.5 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 1250,
    rating: 4.8,
    topics: ["Hukum Pidana", "Sistem Pemasyarakatan", "Regulasi", "Implementasi"],
    tableOfContents: [
      "Bab 1: Pengantar Hukum Pemasyarakatan",
      "Bab 2: Sejarah Perkembangan Hukum Pemasyarakatan",
      "Bab 3: Aspek Yuridis Lembaga Pemasyarakatan",
      "Bab 4: Hak dan Kewajiban Narapidana",
      "Bab 5: Program Pembinaan Narapidana",
      "Bab 6: Asimilasi dan Integrasi",
      "Bab 7: Sistem Keamanan dan Disiplin",
      "Bab 8: Tantangan dan Reformasi"
    ]
  },
  {
    id: 2,
    slug: "manajemen-lembaga-pemasyarakatan-modern",
    title: "Manajemen Lembaga Pemasyarakatan Modern",
    author: "Dr. Haryono, M.Si.",
    category: "Manajemen",
    color: "bg-navy-light",
    description: "Panduan lengkap tentang manajemen lembaga pemasyarakatan dengan pendekatan modern dan berbasis teknologi.",
    publishDate: "2024-02-20",
    pages: 342,
    isbn: "978-602-1234-002",
    fileSize: "8.7 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 980,
    rating: 4.6,
    topics: ["Manajemen", "Leadership", "SDM", "Operasional"],
    tableOfContents: [
      "Bab 1: Konsep Manajemen Pemasyarakatan",
      "Bab 2: Perencanaan Strategis",
      "Bab 3: Manajemen Sumber Daya Manusia",
      "Bab 4: Manajemen Keuangan",
      "Bab 5: Manajemen Sarana dan Prasarana",
      "Bab 6: Sistem Informasi Manajemen",
      "Bab 7: Evaluasi Kinerja",
      "Bab 8: Inovasi dan Perubahan"
    ]
  },
  {
    id: 3,
    slug: "teknologi-keamanan-lembaga-pemasyarakatan",
    title: "Teknologi Keamanan untuk Lembaga Pemasyarakatan",
    author: "Ahmad Fauzi, M.T.",
    category: "Teknologi",
    color: "bg-navy-dark",
    description: "Eksplorasi teknologi terkini dalam sistem keamanan lembaga pemasyarakatan, termasuk IoT, AI, dan smart surveillance.",
    publishDate: "2024-03-10",
    pages: 289,
    isbn: "978-602-1234-003",
    fileSize: "15.2 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 1450,
    rating: 4.9,
    topics: ["IoT", "AI", "Smart Surveillance", "Keamanan Digital"],
    tableOfContents: [
      "Bab 1: Teknologi dalam Pemasyarakatan",
      "Bab 2: Sistem IoT untuk Keamanan",
      "Bab 3: AI dan Machine Learning",
      "Bab 4: Smart Surveillance System",
      "Bab 5: Biometric Technology",
      "Bab 6: Cyber Security",
      "Bab 7: Implementasi dan Integrasi",
      "Bab 8: Masa Depan Teknologi Pemasyarakatan"
    ]
  },
  {
    id: 4,
    slug: "modul-pelatihan-bimbingan-kemasyarakatan",
    title: "Modul Pelatihan Bimbingan Kemasyarakatan",
    author: "Tim Dosen Bimbingan Kemasyarakatan",
    category: "Modul Pelatihan",
    color: "bg-gold",
    description: "Modul pelatihan komprehensif untuk pembina kemasyarakatan, mencakup teknik bimbingan dan konseling.",
    publishDate: "2024-01-25",
    pages: 198,
    isbn: "978-602-1234-004",
    fileSize: "6.8 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 2100,
    rating: 4.7,
    topics: ["Bimbingan", "Konseling", "Teknik Bimbingan", "Rehabilitasi"],
    tableOfContents: [
      "Modul 1: Konsep Bimbingan Kemasyarakatan",
      "Modul 2: Psikologi Perilaku",
      "Modul 3: Teknik Konseling Individual",
      "Modul 4: Konseling Kelompok",
      "Modul 5: Bimbingan Karir",
      "Modul 6: Rehabilitasi Sosial",
      "Modul 7: Evaluasi Program",
      "Modul 8: Studi Kasus"
    ]
  },
  {
    id: 5,
    slug: "sistem-pemasyarakatan-perspektif-ham",
    title: "Sistem Pemasyarakatan: Perspektif HAM",
    author: "Dra. Siti Rahayu, M.Hum.",
    category: "Hukum Pemasyarakatan",
    color: "bg-navy",
    description: "Analisis sistem pemasyarakatan Indonesia dari perspektif hak asasi manusia dan standar internasional.",
    publishDate: "2024-02-15",
    pages: 312,
    isbn: "978-602-1234-005",
    fileSize: "9.3 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 890,
    rating: 4.5,
    topics: ["HAM", "Standar Internasional", "Hak Narapidana", "Advokasi"],
    tableOfContents: [
      "Bab 1: HAM dalam Konteks Pemasyarakatan",
      "Bab 2: Standar Internasional",
      "Bab 3: Implementasi di Indonesia",
      "Bab 4: Hak-hak Narapidana",
      "Bab 5: Kewajiban Narapidana",
      "Bab 6: Perlindungan Kelompok Rentan",
      "Bab 7: Mekanisme Pengaduan",
      "Bab 8: Reformasi dan Rekomendasi"
    ]
  },
  {
    id: 6,
    slug: "panduan-teknis-pengawasan-lembaga-pemasyarakatan",
    title: "Panduan Teknis Pengawasan Lembaga Pemasyarakatan",
    author: "Tim Dosen Teknik Pemasyarakatan",
    category: "Modul Pelatihan",
    color: "bg-gold",
    description: "Panduan praktis untuk pengawasan lembaga pemasyarakatan dengan standar operasional prosedur yang jelas.",
    publishDate: "2024-03-05",
    pages: 245,
    isbn: "978-602-1234-006",
    fileSize: "7.4 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 1680,
    rating: 4.8,
    topics: ["Pengawasan", "SOP", "Teknik Pengawasan", "Keamanan"],
    tableOfContents: [
      "Bab 1: Konsep Pengawasan",
      "Bab 2: Standar Prosedur Operasional",
      "Bab 3: Teknik Pengawasan Fisik",
      "Bab 4: Pengawasan Non-Fisik",
      "Bab 5: Sistem Reporting",
      "Bab 6: Penanganan Insiden",
      "Bab 7: Evaluasi Pengawasan",
      "Bab 8: Best Practices"
    ]
  },
  {
    id: 7,
    slug: "manajemen-sdm-lingkungan-pemasyarakatan",
    title: "Manajemen SDM di Lingkungan Pemasyarakatan",
    author: "Bambang Supriyadi, S.H., M.H.",
    category: "Manajemen",
    color: "bg-navy-light",
    description: "Strategi manajemen sumber daya manusia khusus untuk lingkungan kerja lembaga pemasyarakatan.",
    publishDate: "2024-02-28",
    pages: 278,
    isbn: "978-602-1234-007",
    fileSize: "8.1 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 1120,
    rating: 4.6,
    topics: ["SDM", "Rekrutmen", "Pelatihan", "Pengembangan Karir"],
    tableOfContents: [
      "Bab 1: SDM di Pemasyarakatan",
      "Bab 2: Rekrutmen dan Seleksi",
      "Bab 3: Pelatihan dan Pengembangan",
      "Bab 4: Manajemen Kinerja",
      "Bab 5: Kompensasi dan Benefit",
      "Bab 6: Kesehatan dan Keselamatan",
      "Bab 7: Hubungan Industrial",
      "Bab 8: Retensi dan Turnover"
    ]
  },
  {
    id: 8,
    slug: "smart-surveillance-penerapan-ai-pengawasan",
    title: "Smart Surveillance: Penerapan AI dalam Pengawasan",
    author: "Ahmad Fauzi, M.T., Eko Prasetyo, S.T.",
    category: "Teknologi",
    color: "bg-navy-dark",
    description: "Panduan implementasi sistem pengawasan cerdas menggunakan artificial intelligence untuk lembaga pemasyarakatan.",
    publishDate: "2024-03-15",
    pages: 334,
    isbn: "978-602-1234-008",
    fileSize: "11.9 MB",
    format: "PDF",
    language: "Indonesia",
    downloads: 1890,
    rating: 4.9,
    topics: ["Smart Surveillance", "AI", "Computer Vision", "Monitoring"],
    tableOfContents: [
      "Bab 1: Konsep Smart Surveillance",
      "Bab 2: AI dalam Pengawasan",
      "Bab 3: Computer Vision",
      "Bab 4: Object Detection",
      "Bab 5: Behavioral Analysis",
      "Bab 6: Real-time Monitoring",
      "Bab 7: Data Analytics",
      "Bab 8: Implementasi dan Studi Kasus"
    ]
  },
]

export default function LibraryPage() {
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
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-28">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link 
            href="/" 
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          
          <h1 
            className="text-4xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Perpustakaan Digital POLTEKIMIPAS
          </h1>
          
          <div className="mx-auto h-1 w-16 rounded-full bg-gold mb-4" />
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Koleksi buku digital, modul pelatihan, dan referensi ilmiah untuk mendukung pembelajaran di POLTEKIMIPAS
          </p>
        </div>

        {/* Search & kategori — selaras tema berita */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#d6dde6]/80 bg-white p-4 shadow-[0_12px_40px_-12px_rgba(15,38,71,0.12)] ring-1 ring-[#f0dca6]/40 md:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c9a84c]/80 via-[#f0d78c]/70 to-[#c9a84c]/80" />
          <div className="mt-2 grid gap-5 lg:grid-cols-[1fr_minmax(200px,280px)] lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1b3a6b]">
                <Search className="h-4 w-4 text-[#c9a84c]" />
                Cari koleksi
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a6b7f]/70" />
                <input
                  type="text"
                  placeholder="Judul atau penulis..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#d6dde6] bg-[#fafbfd] pl-10 pr-3 text-sm text-[#1b2a4a] outline-none transition-colors placeholder:text-[#5a6b7f]/70 focus:border-[#1b3a6b] focus:bg-white focus:ring-2 focus:ring-[#1b3a6b]/15"
                  aria-label="Cari perpustakaan"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1b3a6b]">
                <Filter className="h-4 w-4 text-[#c9a84c]" />
                Kategori
              </div>
              <SiteFilterCombobox
                options={categories}
                value={category}
                onChange={setCategory}
                searchPlaceholder="Cari kategori..."
                emptyText="Tidak ada kategori yang cocok."
                ariaLabel="Pilih kategori koleksi"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#eef1f6] pt-4">
            <Sparkles className="h-3.5 w-3.5 text-[#c9a84c]" />
            <p className="text-xs text-[#5a6b7f] md:text-sm">
              Menampilkan {filtered.length} dari {books.length} koleksi
            </p>
          </div>
        </div>

        {/* Book grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((book) => (
            <article
              key={book.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
            >
              {/* Book cover */}
              <div className={`relative flex h-48 items-center justify-center ${book.color}`}>
                <BookMarked className="h-16 w-16 text-primary-foreground/30" />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                  {book.category}
                </span>
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1">
                  <span className="text-xs font-medium text-foreground">⭐ {book.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 text-sm font-bold text-foreground" style={{ fontFamily: "var(--font-poppins)" }}>
                  {book.title}
                </h3>
                <p className="mb-3 text-xs text-muted-foreground">{book.author}</p>
                
                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {book.pages} hal
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {book.downloads}
                  </div>
                </div>

                <p className="mb-4 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                  {book.description}
                </p>

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
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
            Tidak ada buku yang sesuai dengan pencarian Anda.
          </div>
        )}
      </div>
    </div>
  )
}
