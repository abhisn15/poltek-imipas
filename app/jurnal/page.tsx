"use client"

import { useState } from "react"
import { Filter, FileText, Send, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

import { SiteFilterCombobox } from "@/components/site-filter-combobox"

const journals = [
  {
    id: 1,
    slug: "analisis-efektivitas-program-pembinaan-narapidana",
    title: "Analisis Efektivitas Program Pembinaan Narapidana di Lapas Kelas I",
    author: "Dr. Haryono, M.Si., Siti Rahayu, M.Hum.",
    volume: "Vol. 12 No. 1",
    year: "2026",
    program: "Manajemen Pemasyarakatan",
    doi: "10.1234/jip.2026.001",
    abstract: "Penelitian ini bertujuan untuk menganalisis efektivitas program pembinaan yang telah diimplementasikan di Lembaga Pemasyarakatan Kelas I. Metode penelitian menggunakan pendekatan kualitatif dengan wawancara mendalam dan observasi partisipatif. Hasil penelitian menunjukkan bahwa program pembinaan telah memberikan dampak positif terhadap perubahan perilaku narapidana.",
    keywords: ["pembinaan narapidana", "efektivitas program", "lapas kelas I", "rehabilitasi"],
    publishDate: "2026-01-15"
  },
  {
    id: 2,
    slug: "penerapan-sistem-keamanan-berbasis-iot",
    title: "Penerapan Sistem Keamanan Berbasis IoT pada Lembaga Pemasyarakatan",
    author: "Ahmad Fauzi, M.T., Bambang S., S.H.",
    volume: "Vol. 12 No. 1",
    year: "2026",
    program: "Teknik Pemasyarakatan",
    doi: "10.1234/jip.2026.002",
    abstract: "Penelitian ini mengkaji penerapan teknologi Internet of Things (IoT) dalam sistem keamanan lembaga pemasyarakatan. Sistem yang dikembangkan meliputi sensor gerak, kamera CCTV dengan AI, dan sistem monitoring terpusat. Hasil implementasi menunjukkan peningkatan efektivitas keamanan sebesar 78%.",
    keywords: ["IoT", "keamanan pemasyarakatan", "teknologi monitoring", "sistem terintegrasi"],
    publishDate: "2026-01-20"
  },
  {
    id: 3,
    slug: "model-bimbingan-kemasyarakatan-anak-berkonflik-hukum",
    title: "Model Bimbingan Kemasyarakatan untuk Anak Berkonflik dengan Hukum",
    author: "Dra. Siti Rahayu, M.Hum., Dr. Wulandari",
    volume: "Vol. 11 No. 2",
    year: "2025",
    program: "Bimbingan Kemasyarakatan",
    doi: "10.1234/jip.2025.015",
    abstract: "Penelitian ini mengembangkan model bimbingan kemasyarakatan yang efektif untuk anak berkonflik dengan hukum. Model ini mengintegrasikan pendekatan psikologis, pendidikan, dan rehabilitasi sosial. Hasil uji coba menunjukkan penurunan tingkat residivitas sebesar 45%.",
    keywords: ["bimbingan kemasyarakatan", "anak berkonflik hukum", "rehabilitasi", "residivitas"],
    publishDate: "2025-12-10"
  },
  {
    id: 4,
    slug: "evaluasi-kebijakan-asimilasi-integrasi-pandemi",
    title: "Evaluasi Kebijakan Asimilasi dan Integrasi di Masa Pandemi",
    author: "Bambang Supriyadi, S.H., M.H.",
    volume: "Vol. 11 No. 2",
    year: "2025",
    program: "Manajemen Pemasyarakatan",
    doi: "10.1234/jip.2025.016",
    abstract: "Penelitian ini mengevaluasi kebijakan asimilasi dan integrasi yang diterapkan selama masa pandemi COVID-19. Evaluasi mencakup aspek keamanan, kesehatan, dan reintegrasi sosial. Hasil analisis menunjukkan tantangan dan peluang dalam implementasi kebijakan tersebut.",
    keywords: ["asimilasi", "integrasi", "COVID-19", "kebijakan pemasyarakatan"],
    publishDate: "2025-12-05"
  },
  {
    id: 5,
    slug: "optimalisasi-pengawasan-berbasis-teknologi-balai-pemasyarakatan",
    title: "Optimalisasi Pengawasan Berbasis Teknologi di Balai Pemasyarakatan",
    author: "Ahmad Fauzi, M.T., Eko Prasetyo, S.T.",
    volume: "Vol. 11 No. 1",
    year: "2025",
    program: "Teknik Pemasyarakatan",
    doi: "10.1234/jip.2025.008",
    abstract: "Penelitian ini mengembangkan sistem pengawasan berbasis teknologi untuk Balai Pemasyarakatan. Sistem meliputi GPS tracking, electronic monitoring, dan dashboard analitik. Implementasi sistem menunjukkan peningkatan efisiensi pengawasan sebesar 65%.",
    keywords: ["pengawasan", "teknologi pemasyarakatan", "GPS tracking", "electronic monitoring"],
    publishDate: "2025-06-15"
  },
]

const years = ["Semua", "2026", "2025", "2024"]
const programs = ["Semua", "Manajemen Pemasyarakatan", "Teknik Pemasyarakatan", "Bimbingan Kemasyarakatan"]

export default function JournalPage() {
  const [filterYear, setFilterYear] = useState("Semua")
  const [filterProgram, setFilterProgram] = useState("Semua")

  const filtered = journals.filter((j) => {
    const yearMatch = filterYear === "Semua" || j.year === filterYear
    const progMatch = filterProgram === "Semua" || j.program === filterProgram
    return yearMatch && progMatch
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 pb-12 pt-24">
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
            className="text-3xl sm:text-4xl font-bold text-navy mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Jurnal Ilmiah POLTEKIMIPAS
          </h1>
          
          <div className="mx-auto h-1 w-16 rounded-full bg-gold mb-4" />
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kumpulan publikasi ilmiah dari dosen dan peneliti POLTEKIMIPAS dalam bidang pemasyarakatan
          </p>
        </div>

        {/* Filter — combobox seperti halaman berita */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#d6dde6]/80 bg-white p-4 shadow-[0_12px_40px_-12px_rgba(15,38,71,0.12)] ring-1 ring-[#f0dca6]/40 md:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c9a84c]/80 via-[#f0d78c]/70 to-[#c9a84c]/80" />
          <div className="mt-2 grid gap-5 sm:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1b3a6b]">
                <Calendar className="h-4 w-4 text-[#c9a84c]" />
                Tahun terbit
              </div>
              <SiteFilterCombobox
                options={years.map((y) => (y === "Semua" ? "Semua tahun" : y))}
                value={filterYear === "Semua" ? "Semua tahun" : filterYear}
                onChange={(v) => setFilterYear(v === "Semua tahun" ? "Semua" : v)}
                searchPlaceholder="Cari tahun..."
                emptyText="Tidak ada opsi yang cocok."
                ariaLabel="Pilih tahun terbit"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1b3a6b]">
                <Filter className="h-4 w-4 text-[#c9a84c]" />
                Program studi
              </div>
              <SiteFilterCombobox
                options={programs.map((p) => (p === "Semua" ? "Semua program studi" : p))}
                value={filterProgram === "Semua" ? "Semua program studi" : filterProgram}
                onChange={(v) => setFilterProgram(v === "Semua program studi" ? "Semua" : v)}
                searchPlaceholder="Cari program studi..."
                emptyText="Tidak ada opsi yang cocok."
                ariaLabel="Pilih program studi"
              />
            </div>
          </div>
        </div>

        {/* Journal list */}
        <div className="space-y-6">
          {filtered.map((journal) => (
            <article
              key={journal.id}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-xl"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-navy" />
                  <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[11px] font-medium text-navy">
                    {journal.program}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {journal.volume} ({journal.year})
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(journal.publishDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-navy mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
                  {journal.title}
                </h2>

                <p className="text-sm text-muted-foreground mb-3">{journal.author}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {journal.abstract}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {journal.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-navy"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/jurnal/${journal.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-navy px-4 py-2 text-sm font-medium text-navy transition-all hover:bg-navy hover:text-primary-foreground"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Detail
                    </Link>
                    
                    <a
                      href="/pdfs/pratinjau-jurnal.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gold px-4 py-2 text-sm font-medium text-navy transition-all hover:bg-gold hover:text-primary-foreground"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Preview PDF
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-border bg-secondary p-10 text-center text-muted-foreground">
              Tidak ada jurnal yang sesuai dengan filter yang dipilih.
            </div>
          )}
        </div>

        {/* Submit CTA */}
        <div className="mt-12 rounded-xl bg-navy p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-primary-foreground" style={{ fontFamily: "var(--font-poppins)" }}>
            Kirim Jurnal Anda
          </h3>
          <p className="mb-4 text-sm text-primary-foreground/70">
            Kontribusikan karya ilmiah Anda untuk diterbitkan di Jurnal Ilmiah POLTEKIMIPAS.
          </p>
          <button className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy-dark transition-all hover:bg-gold-light hover:shadow-lg">
            <Send className="h-4 w-4" />
            Submit Jurnal
          </button>
        </div>
      </div>
    </div>
  )
}
