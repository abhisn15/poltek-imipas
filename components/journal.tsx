"use client"

import { useState } from "react"
import { ExternalLink, Filter, FileText, Send } from "lucide-react"
import Link from "next/link"

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
  },
]

const years = ["Semua", "2026", "2025", "2024"]
const programs = ["Semua", "Manajemen Pemasyarakatan", "Teknik Pemasyarakatan", "Bimbingan Kemasyarakatan"]

export default function Journal() {
  const [filterYear, setFilterYear] = useState("Semua")
  const [filterProgram, setFilterProgram] = useState("Semua")

  const filtered = journals.filter((j) => {
    const yearMatch = filterYear === "Semua" || j.year === filterYear
    const progMatch = filterProgram === "Semua" || j.program === filterProgram
    return yearMatch && progMatch
  })

  return (
    <section id="jurnal" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Publikasi Ilmiah
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Jurnal Ilmiah
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
        </div>

        {/* Filters */}
        <div className="scroll-reveal mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            Filter:
          </div>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-navy focus:outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "Semua" ? "Semua Tahun" : y}
              </option>
            ))}
          </select>
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-navy focus:outline-none"
          >
            {programs.map((p) => (
              <option key={p} value={p}>
                {p === "Semua" ? "Semua Program Studi" : p}
              </option>
            ))}
          </select>
        </div>

        {/* Journal list */}
        <div className="scroll-reveal space-y-4">
          {filtered.map((journal) => (
            <div
              key={journal.id}
              className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-gold/40 hover:shadow-lg"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <FileText className="h-4 w-4 text-navy" />
                    <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[11px] font-medium text-navy">
                      {journal.program}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {journal.volume} ({journal.year})
                    </span>
                  </div>

                  <h3 className="mb-1 font-bold text-foreground transition-colors group-hover:text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
                    {journal.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">{journal.author}</p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/jurnal/${journal.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-navy px-4 py-2 text-sm font-medium text-navy transition-all hover:bg-navy hover:text-primary-foreground"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Detail
                  </Link>
                  
                  <a
                    href={`https://doi.org/${journal.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gold px-4 py-2 text-sm font-medium text-navy transition-all hover:bg-gold hover:text-primary-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    DOI
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-border bg-secondary p-10 text-center text-muted-foreground">
              Tidak ada jurnal yang sesuai dengan filter yang dipilih.
            </div>
          )}
        </div>

        <div className="scroll-reveal mt-10 text-center">
          <Link 
            href="/jurnal"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
          >
            Lihat Semua Jurnal
            <FileText className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
