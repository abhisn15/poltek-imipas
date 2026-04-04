"use client"

import { Bell, Calendar, ArrowRight, Megaphone } from "lucide-react"
import Link from "next/link"

const announcements = [
  {
    id: 1,
    date: "1 Maret 2026",
    title: "Pendaftaran Seleksi Penerimaan Taruna Baru T.A. 2026/2027",
    priority: true,
    description:
      "Pendaftaran dibuka mulai tanggal 1 Maret 2026 melalui portal resmi SSCASN. Persyaratan dan informasi lengkap dapat diunduh di website resmi.",
  },
  {
    id: 2,
    date: "25 Februari 2026",
    title: "Jadwal Ujian Akhir Semester Genap 2025/2026",
    priority: false,
    description:
      "Ujian akhir semester genap akan dilaksanakan pada tanggal 15-30 Juni 2026. Jadwal lengkap per program studi telah tersedia.",
  },
  {
    id: 3,
    date: "20 Februari 2026",
    title: "Pengumuman Hasil Seleksi Beasiswa Unggulan POLTEKIMIPAS",
    priority: false,
    description:
      "Hasil seleksi beasiswa unggulan tahun akademik 2026/2027 telah diumumkan. Silakan cek nama Anda pada daftar terlampir.",
  },
  {
    id: 4,
    date: "15 Februari 2026",
    title: "Peringatan Hari Pemasyarakatan ke-62",
    priority: false,
    description:
      "Rangkaian kegiatan Hari Pemasyarakatan ke-62 akan dilaksanakan pada 27 April 2026 dengan tema 'Pemasyarakatan Berdedikasi untuk Indonesia Maju'.",
  },
  {
    id: 5,
    date: "10 Februari 2026",
    title: "Libur Akademik Semester Genap 2025/2026",
    priority: false,
    description:
      "Libur akademik semester genap dimulai dari tanggal 1 Juli hingga 15 Agustus 2026. Kegiatan pembinaan fisik tetap berjalan sesuai jadwal.",
  },
]

export default function Announcements() {
  return (
    <section id="pengumuman" className="py-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Info Resmi
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Pengumuman
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
        </div>

        {/* Announcements list */}
        <div className="scroll-reveal space-y-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              className={`group rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-lg ${
                item.priority
                  ? "border-gold/50 bg-gold/5"
                  : "border-border hover:border-gold/40"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    item.priority ? "bg-gold text-navy-dark" : "bg-navy/10 text-navy"
                  }`}
                >
                  {item.priority ? (
                    <Megaphone className="h-5 w-5" />
                  ) : (
                    <Bell className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {item.priority && (
                      <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-dark">
                        Penting
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3
                    className="mb-1 font-bold text-foreground transition-colors group-hover:text-navy"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <Link
                  href={`/pengumuman/${item.id}`}
                  className="flex shrink-0 items-center gap-1 self-start text-sm font-semibold text-navy transition-colors hover:text-gold"
                >
                  Detail
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-reveal mt-10 text-center">
          <Link 
            href="/pengumuman"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
          >
            Lihat Semua Pengumuman
            <Megaphone className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
