"use client"

import React from "react"
import { Download, BookOpen, ArrowLeft, Calendar, FileText, Star, User, Tag, Share2, BookMarked, Clock, HardDrive } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

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
    ],
    fullDescription: `
      <p class="mb-4">Buku "Hukum Pemasyarakatan Indonesia: Teori dan Praktik" merupakan karya komprehensif yang mengupas tuntas berbagai aspek hukum pemasyarakatan di Indonesia. Ditulis oleh Prof. Dr. Suhartoyo, S.H., M.H., seorang pakar hukum pemasyarakatan dengan pengalaman lebih dari 20 tahun, buku ini menjadi referensi wajib bagi praktisi, akademisi, dan mahasiswa yang mendalami bidang ini.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Mengapa Buku Ini Penting?</h3>
      <p class="mb-4">Buku ini penting karena memberikan pandangan holistik tentang sistem pemasyarakatan Indonesia, mengintegrasikan aspek teoretis dengan implementasi praktis yang seringkali terpisah dalam literatur lain. Pembaca akan mendapatkan pemahaman mendalam tentang bagaimana hukum pemasyarakatan bekerja di dunia nyata.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Target Pembaca</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Mahasiswa Fakultas Hukum</li>
        <li>Praktisi hukum dan pemasyarakatan</li>
        <li>Dosen dan peneliti</li>
        <li>Pembuat kebijakan</li>
        <li>Umum yang tertarik dengan hukum pemasyarakatan</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Keunggulan Buku</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Analisis mendalam dengan studi kasus nyata</li>
        <li>Update regulasi terbaru</li>
        <li>Pendekatan praktis dan aplikatif</li>
        <li>Referensi lengkap dan terpercaya</li>
      </ul>
    `
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
    ],
    fullDescription: `
      <p class="mb-4">Buku ini menyajikan pendekatan modern dalam manajemen lembaga pemasyarakatan, mengintegrasikan konsep manajemen kontemporer dengan kebutuhan spesifik lingkungan pemasyarakatan. Dr. Haryono, M.Si. berbagi pengalaman praktis dan teori yang relevan untuk menghadapi tantangan manajemen di era digital.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Fokus Utama</h3>
      <p class="mb-4">Buku ini berfokus pada transformasi manajemen lembaga pemasyarakatan dari pendekatan tradisional ke modern, dengan penekanan pada efisiensi, efektivitas, dan akuntabilitas.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Inovasi yang Dibahas</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Implementasi teknologi dalam operasional</li>
        <li>Manajemen berbasis data</li>
        <li>Peningkatan kualitas layanan</li>
        <li>Pengembangan sumber daya manusia</li>
      </ul>
    `
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
    ],
    fullDescription: `
      <p class="mb-4">Buku ini menghadirkan eksplorasi mendalam tentang teknologi keamanan terkini yang dapat diterapkan dalam lembaga pemasyarakatan. Ahmad Fauzi, M.T., seorang praktisi teknologi dengan spesialisasi dalam sistem keamanan, membagi pengetahuan praktis tentang implementasi teknologi modern.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Teknologi yang Dibahas</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Internet of Things (IoT) untuk monitoring</li>
        <li>Artificial Intelligence untuk analisis perilaku</li>
        <li>Smart Surveillance dengan computer vision</li>
        <li>Biometric authentication systems</li>
        <li>Cybersecurity untuk data protection</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Implementasi Praktis</h3>
      <p class="mb-4">Setiap teknologi dibahas dengan studi kasus implementasi nyata, termasuk tantangan, solusi, dan best practices untuk memastikan keberhasilan implementasi.</p>
    `
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
    ],
    fullDescription: `
      <p class="mb-4">Modul pelatihan ini dikembangkan oleh tim dosen Bimbingan Kemasyarakatan POLTEKIP untuk memberikan panduan praktis bagi pembina kemasyarakatan. Setiap modul dirancang untuk memberikan kompetensi yang dibutuhkan dalam menjalankan tugas bimbingan secara efektif.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Metodologi Pembelajaran</h3>
      <p class="mb-4">Modul ini menggunakan pendekatan andragogi dengan kombinasi teori, praktik, dan studi kasus untuk memastikan pemahaman mendalam dan keterampilan aplikatif.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Kompetensi yang Dikembangkan</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Kemampuan konseling yang efektif</li>
        <li>Pemahaman psikologi perilaku</li>
        <li>Teknik rehabilitasi sosial</li>
        <li>Evaluasi program bimbingan</li>
      </ul>
    `
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
    ],
    fullDescription: `
      <p class="mb-4">Buku ini mengkaji sistem pemasyarakatan Indonesia melalui lensa hak asasi manusia, membandingkan praktik lokal dengan standar internasional. Dra. Siti Rahayu, M.Hum., seorang aktivis HAM dan akademisi, memberikan analisis kritis tentang perlindungan HAM dalam konteks pemasyarakatan.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Isu Kritis yang Dibahas</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Overcrowding dan dampaknya terhadap HAM</li>
        <li>Perlindungan kelompok rentan</li>
        <li>Akses layanan kesehatan</li>
        <li>Edukasi dan rehabilitasi</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Rekomendasi Reformasi</h3>
      <p class="mb-4">Buku ini menyajikan rekomendasi konkret untuk reformasi sistem pemasyarakatan yang lebih berbasis HAM dan sesuai standar internasional.</p>
    `
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
    ],
    fullDescription: `
      <p class="mb-4">Panduan teknis ini disusun oleh tim dosen Teknik Pemasyarakatan POLTEKIMIPAS untuk memberikan acuan praktis dalam pelaksanaan pengawasan lembaga pemasyarakatan. Setiap prosedur didasarkan pada best practices dan regulasi terkini.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Cakupan Panduan</h3>
      <p class="mb-4">Panduan ini mencakup semua aspek pengawasan, mulai dari perencanaan hingga evaluasi, dengan fokus pada efektivitas dan keamanan.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Fitur Utama</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>SOP yang terstruktur dan jelas</li>
        <li>Checklist praktis untuk operasional</li>
        <li>Studi kasus nyata</li>
        <li>Troubleshooting guide</li>
      </ul>
    `
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
    ],
    fullDescription: `
      <p class="mb-4">Buku ini mengkhususkan pembahasan pada manajemen sumber daya manusia dalam konteks unik lembaga pemasyarakatan. Bambang Supriyadi, S.H., M.H., seorang praktisi SDM dengan pengalaman di lingkungan pemasyarakatan, berbagi strategi efektif untuk mengelola SDM di lingkungan yang menantang.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Tantangan Khusus</h3>
      <p class="mb-4">Buku ini mengakui tantangan unik dalam mengelola SDM di lingkungan pemasyarakatan dan memberikan solusi praktis untuk mengatasinya.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Strategi Inovatif</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Program retensi yang efektif</li>
        <li>Pengembangan kompetensi spesifik</li>
        <li>Manajemen stres dan burnout</li>
        <li>Pembangunan budaya kerja positif</li>
      </ul>
    `
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
    ],
    fullDescription: `
      <p class="mb-4">Buku ini merupakan panduan komprehensif untuk implementasi smart surveillance menggunakan AI dalam konteks pengawasan lembaga pemasyarakatan. Ahmad Fauzi, M.T. dan Eko Prasetyo, S.T. menggabungkan keahlian teknis dan praktik untuk memberikan solusi inovatif.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Teknologi Canggih yang Dibahas</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Computer vision untuk object detection</li>
        <li>Machine learning untuk behavioral analysis</li>
        <li>Real-time monitoring systems</li>
        <li>Predictive analytics</li>
        <li>Integration dengan existing systems</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3 mt-6">Studi Kasus Implementasi</h3>
      <p class="mb-4">Buku ini menyajikan studi kasus nyata implementasi smart surveillance di berbagai lembaga pemasyarakatan, termasuk tantangan, solusi, dan hasil yang dicapai.</p>
    `
  }
]

export default function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params)
  const book = books.find(b => b.slug === resolvedParams.slug)
  
  if (!book) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-cream">
      <article className="mx-auto max-w-4xl px-4 pb-12 pt-28">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/perpustakaan" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Perpustakaan
          </Link>
        </div>

        {/* Book Header */}
        <header className="mb-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className={`relative h-64 w-48 rounded-lg ${book.color} flex items-center justify-center`}>
                <BookMarked className="h-24 w-24 text-primary-foreground/30" />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                  {book.category}
                </span>
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy">
                  <Tag className="inline h-3 w-3 mr-1" />
                  {book.category}
                </span>
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-navy">
                  <Star className="inline h-3 w-3 mr-1" />
                  ⭐ {book.rating}
                </span>
                <span className="rounded-full bg-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {book.format}
                </span>
              </div>

              <h1
                className="text-3xl font-bold text-navy mb-4 leading-tight"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {book.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <User className="h-4 w-4" />
                <span className="font-medium text-foreground">{book.author}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(book.publishDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {book.pages} halaman
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  {book.fileSize}
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {book.downloads} unduhan
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-light">
                  <Download className="h-4 w-4" />
                  Unduh PDF
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground">
                  <BookOpen className="h-4 w-4" />
                  Baca Online
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-border w-full mt-8" />
        </header>

        {/* Book Content */}
        <div className="prose prose-navy max-w-none space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">Deskripsi</h2>
            <div 
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: book.fullDescription }}
            />
          </section>

          {/* Topics */}
          <section>
            <h3 className="text-xl font-semibold text-navy mb-3">Topik Utama</h3>
            <div className="flex flex-wrap gap-2">
              {book.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-gold/10 px-3 py-1 text-sm font-medium text-navy"
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>

          {/* Table of Contents */}
          <section>
            <h3 className="text-xl font-semibold text-navy mb-3">Daftar Isi</h3>
            <div className="space-y-2">
              {book.tableOfContents.map((chapter, index) => (
                <div key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">•</span>
                  <span>{chapter}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Book Details */}
          <section>
            <h3 className="text-xl font-semibold text-navy mb-3">Informasi Buku</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-foreground">ISBN:</span>
                <span className="ml-2 text-muted-foreground">{book.isbn}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Bahasa:</span>
                <span className="ml-2 text-muted-foreground">{book.language}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Format:</span>
                <span className="ml-2 text-muted-foreground">{book.format}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Ukuran File:</span>
                <span className="ml-2 text-muted-foreground">{book.fileSize}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Book Footer */}
        <footer className="border-t border-border pt-8 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Bagikan buku ini</h3>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors">
                  <Share2 className="h-4 w-4" />
                  Salin link
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-primary-foreground text-sm font-medium rounded-lg hover:bg-navy/90 transition-colors">
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/perpustakaan"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Lihat Buku Lainnya
            </Link>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>© 2024 POLTEKIMIPAS. Semua hak dilindungi.</p>
          </div>
        </footer>
      </article>
    </div>
  )
}
