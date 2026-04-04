"use client"

import { Calendar, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    id: 1,
    image: "/images/news-1.jpg",
    category: "Kegiatan Taruna",
    date: "28 Februari 2026",
    title: "Upacara Pelantikan Taruna Baru Angkatan XXXII POLTEKIMIPAS",
    excerpt:
      "Sebanyak 350 taruna dan taruni baru resmi dilantik dalam upacara yang dihadiri langsung oleh Menteri Imigrasi dan Pemasyarakatan RI.",
    slug: "upacara-pelantikan-taruna-baru-angkatan-xxxii-poltekip",
  },
  {
    id: 2,
    image: "/images/news-2.jpg",
    category: "Akademik",
    date: "15 Februari 2026",
    title: "Workshop Penulisan Karya Ilmiah untuk Dosen dan Taruna",
    excerpt:
      "POLTEKIMIPAS menyelenggarakan workshop penulisan karya ilmiah bertaraf internasional bekerja sama dengan Universitas Indonesia.",
    slug: "workshop-penulisan-karya-ilmiah-untuk-dosen-dan-taruna",
  },
  {
    id: 3,
    image: "/images/news-3.jpg",
    category: "Kebijakan",
    date: "5 Februari 2026",
    title: "Kunjungan Kerja Dirjen Pemasyarakatan ke Kampus POLTEKIMIPAS",
    excerpt:
      "Direktur Jenderal Pemasyarakatan melakukan kunjungan kerja untuk meninjau fasilitas pendidikan dan sarana prasarana kampus.",
    slug: "kunjungan-kerja-dirjen-pemasyarakatan-ke-kampus-poltekip",
  },
  {
    id: 4,
    image: "/images/gallery-4.jpg",
    category: "Kegiatan Taruna",
    date: "20 Januari 2026",
    title: "Latihan Baris Berbaris Taruna Angkatan XXXII POLTEKIMIPAS",
    excerpt:
      "Taruna dan taruni Angkatan XXXII mengikuti latihan baris berbaris sebagai bagian dari pembinaan karakter dan disiplin.",
    slug: "latihan-baris-berbaris-angkatan-xxxii-poltekip",
  },
  {
    id: 5,
    image: "/images/gallery-2.jpg",
    category: "Prestasi",
    date: "15 Januari 2026",
    title: "POLTEKIMIPAS Raih Peringkat Terbaik dalam Lomba Debat Nasional",
    excerpt:
      "Tim debat POLTEKIMIPAS berhasil meraih juara pertama dalam Lomba Debat Nasional Perguruan Tinggi Vokasi se-Indonesia.",
    slug: "poltekip-raih-peringkat-terbaik-lomba-debat-nasional",
  },
  {
    id: 6,
    image: "/images/gallery-3.jpg",
    category: "Kerjasama",
    date: "10 Januari 2026",
    title: "MoU dengan Kementerian Hukum dan HAM untuk Program Magang",
    excerpt:
      "POLTEKIMIPAS menjalin kerjasama dengan Kementerian Hukum dan HAM untuk program magang bagi taruna semester akhir.",
    slug: "mou-kemenkumham-program-magang",
  },
]

export default function News() {
  return (
    <section id="berita" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
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

        {/* Article grid */}
        <div className="scroll-reveal grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy-dark/0 transition-colors group-hover:bg-navy-dark/20" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-navy-dark">
                  <Tag className="h-3 w-3" />
                  {article.category}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </div>

                <h3
                  className="mb-2 line-clamp-2 font-bold text-foreground transition-colors group-hover:text-navy"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {article.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>

                <Link 
                  href={`/berita/${article.slug}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-gold"
                >
                  Baca Selengkapnya
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

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
