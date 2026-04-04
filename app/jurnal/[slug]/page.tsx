"use client"

import React from "react"
import { ExternalLink, FileText, ArrowLeft, Calendar, User, Tag, Share2, Download } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

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
    publishDate: "2026-01-15",
    pages: "45-62",
    methodology: "Penelitian ini menggunakan pendekatan kualitatif dengan metode studi kasus. Data dikumpulkan melalui wawancara mendalam dengan 30 narapidana, 10 petugas pembina, dan observasi partisipatif selama 6 bulan di Lapas Kelas I. Analisis data dilakukan dengan teknik triangulasi untuk memvalidasi temuan.",
    results: "Hasil penelitian menunjukkan bahwa 78% narapidana mengalami perubahan perilaku positif setelah mengikuti program pembinaan. Faktor-faktor yang mempengaruhi keberhasilan meliputi: kualitas pembina, relevansi materi, dan dukungan keluarga. Program pembinaan spiritual menunjukkan dampak paling signifikan dengan tingkat keberhasilan 85%.",
    conclusion: "Program pembinaan di Lapas Kelas I secara umum efektif dalam mengubah perilaku narapidana. Namun, masih diperlukan peningkatan dalam hal individualisasi program dan monitoring pasca-pembinaan. Rekomendasi utama adalah pengembangan sistem pembinaan yang terintegrasi dengan teknologi digital.",
    references: [
      "Smith, J. (2025). Effective Rehabilitation Programs. Journal of Criminal Justice, 12(3), 234-251.",
      "Johnson, M. (2024). Qualitative Research in Corrections. Criminal Justice Review, 8(2), 112-128.",
      "Brown, A. (2023). Prison Reform and Rehabilitation. International Journal of Penology, 15(4), 89-105."
    ]
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
    publishDate: "2026-01-20",
    pages: "63-78",
    methodology: "Penelitian ini menggunakan metode Research and Development (R&D). Prototipe sistem IoT dikembangkan dan diuji coba di Lapas Kelas II selama 3 bulan. Data performa sistem dikumpulkan melalui sensor dan log sistem. Evaluasi dilakukan dengan membandingkan metrik keamanan sebelum dan sesudah implementasi.",
    results: "Implementasi sistem IoT menunjukkan peningkatan deteksi dini insiden sebesar 78%, pengurangan waktu respons keamanan 65%, dan penurunan biaya operasional 45%. Sistem berhasil mengidentifikasi 95% percobaan pelanggaran keamanan dan memberikan notifikasi real-time ke petugas.",
    conclusion: "Sistem keamanan berbasis IoT terbukti efektif dalam meningkatkan keamanan lembaga pemasyarakatan. Integrasi teknologi AI dan IoT memberikan solusi komprehensif untuk tantangan keamanan modern. Rekomendasi untuk pengembangan lebih lanjut meliputi penambahan fitur prediktif dan integrasi dengan sistem manajemen narapidana.",
    references: [
      "Chen, L. (2025). IoT in Security Systems. IEEE Security & Privacy, 23(1), 45-58.",
      "Wang, H. (2024). Smart Prison Technology. Journal of Digital Transformation, 10(2), 78-92.",
      "Lee, K. (2023). AI in Correctional Facilities. International Journal of Security, 18(3), 156-170."
    ]
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
    publishDate: "2025-12-10",
    pages: "23-38",
    methodology: "Penelitian ini menggunakan metode Developmental Research dengan pendekatan mixed methods. Model dikembangkan berdasarkan studi literatur dan analisis kebutuhan. Uji coba dilakukan pada 50 anak berkonflik hukum di 3 wilayah berbeda selama 12 bulan. Data kuantitatif dan kualitatif dikumpulkan melalui pre-test post-test, wawancara, dan observasi.",
    results: "Model bimbingan kemasyarakatan yang dikembangkan menunjukkan efektivitas tinggi dengan penurunan tingkat residivitas sebesar 45%, peningkatan motivasi belajar 67%, dan perbaikan hubungan sosial 72%. Faktor kunci keberhasilan meliputi pendekatan individual, partisipasi keluarga, dan kolaborasi multi-stakeholder.",
    conclusion: "Model bimbingan kemasyarakatan terintegrasi terbukti efektif dalam mengurangi residivitas anak. Pendekatan holistik yang melibatkan aspek psikologis, pendidikan, dan sosial memberikan hasil optimal. Rekomendasi utama adalah adopsi model ini secara nasional dengan penyesuaian konteks lokal.",
    references: [
      "Anderson, R. (2025). Juvenile Rehabilitation Models. Child & Youth Services Review, 140, 105-678.",
      "Taylor, S. (2024). Community-Based Corrections. Journal of Criminal Justice, 52(3), 234-248.",
      "Wilson, M. (2023). Youth Justice Programs. International Journal of Offender Therapy, 67(4), 312-328."
    ]
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
    publishDate: "2025-12-05",
    pages: "39-54",
    methodology: "Penelitian evaluatif dengan pendekatan kualitatif. Data dikumpulkan melalui analisis dokumen kebijakan, wawancara dengan 25 pembina kemasyarakatan, dan survei terhadap 100 narapidana yang menjalani asimilasi/integrasi. Periode penelitian dari Maret 2020 hingga Desember 2023.",
    results: "Kebijakan asimilasi dan integrasi berhasil mengurangi overcrowding sebesar 32% dan menurunkan tingkat penularan COVID-19 di lapas. Namun, terjadi peningkatan pelanggaran sebesar 15% dan tantangan dalam monitoring. Faktor sukses utama adalah ketersediaan sistem monitoring digital dan kerjasama dengan masyarakat.",
    conclusion: "Kebijakan asimilasi dan integrasi selama pandemi memberikan solusi efektif untuk overcrowding dan kesehatan, namun memerlukan peningkatan sistem monitoring. Pelajaran utama adalah pentingnya kesiapan teknologi dan kolaborasi multi-pihak dalam kebijakan darurat.",
    references: [
      "Davis, P. (2025). COVID-19 in Corrections. Journal of Prison Health, 9(2), 123-138.",
      "Martinez, J. (2024). Emergency Policy Implementation. Public Administration Review, 84(1), 45-59.",
      "Thompson, R. (2023). Community Corrections Policy. Criminal Justice Policy Review, 34(3), 267-281."
    ]
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
    publishDate: "2025-06-15",
    pages: "15-28",
    methodology: "Penelitian pengembangan dengan metode prototyping. Sistem dikembangkan menggunakan agile methodology dan diuji coba di 4 Balai Pemasyarakatan. Data performa dikumpulkan selama 6 bulan dengan membandingkan metrik pengawasan manual vs sistem terintegrasi.",
    results: "Sistem pengawasan terintegrasi meningkatkan efisiensi pengawasan sebesar 65%, mengurangi biaya operasional 40%, dan meningkatkan akurasi pelaporan 85%. Waktu respons insiden berkurang dari 24 jam menjadi 2 jam. Sistem berhasil memonitor 95% klien secara real-time.",
    conclusion: "Teknologi pengawasan berbasis GPS dan electronic monitoring terbukti efektif meningkatkan efisiensi Balai Pemasyarakatan. Integrasi teknologi memberikan solusi scalable untuk tantangan pengawasan modern. Rekomendasi untuk ekspansi nasional dengan penyesuaian regulasi.",
    references: [
      "Robinson, T. (2025). Electronic Monitoring Systems. Journal of Offender Monitoring, 12(1), 34-48.",
      "Clark, S. (2024). GPS in Community Corrections. International Journal of Criminology, 16(2), 89-103.",
      "Harris, J. (2023). Technology in Probation Services. Criminal Justice Technology, 8(3), 156-172."
    ]
  }
]

export default function JournalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params)
  const journal = journals.find(j => j.slug === resolvedParams.slug)
  
  if (!journal) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/jurnal" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Jurnal
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy">
              <Tag className="inline h-3 w-3 mr-1" />
              {journal.program}
            </span>
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-navy">
              {journal.volume}
            </span>
            <span className="rounded-full bg-border px-3 py-1 text-xs font-medium text-muted-foreground">
              Halaman {journal.pages}
            </span>
          </div>

          <h1
            className="text-4xl font-bold text-navy mb-6 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {journal.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">{journal.author}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(journal.publishDate).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>

          <div className="h-px bg-border w-full" />
        </header>

        {/* Article Content */}
        <div className="prose prose-navy max-w-none space-y-8">
          {/* Abstract */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">Abstrak</h2>
            <p className="text-muted-foreground leading-relaxed">{journal.abstract}</p>
          </section>

          {/* Keywords */}
          <section>
            <h3 className="text-lg font-semibold text-navy mb-3">Kata Kunci</h3>
            <div className="flex flex-wrap gap-2">
              {journal.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-gold/10 px-3 py-1 text-sm font-medium text-navy"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">Metodologi</h2>
            <p className="text-muted-foreground leading-relaxed">{journal.methodology}</p>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">Hasil</h2>
            <p className="text-muted-foreground leading-relaxed">{journal.results}</p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">Kesimpulan</h2>
            <p className="text-muted-foreground leading-relaxed">{journal.conclusion}</p>
          </section>

          {/* References */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">Referensi</h2>
            <div className="space-y-2">
              {journal.references.map((ref, index) => (
                <p key={index} className="text-sm text-muted-foreground leading-relaxed">
                  {index + 1}. {ref}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* Article Footer */}
        <footer className="border-t border-border pt-8 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Bagikan jurnal ini</h3>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors">
                  <Share2 className="h-4 w-4" />
                  Salin link
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <a
                href={`https://doi.org/${journal.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gold text-sm font-medium text-navy transition-all hover:bg-gold hover:text-primary-foreground rounded-lg"
              >
                <ExternalLink className="h-4 w-4" />
                DOI
              </a>
              
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-primary-foreground text-sm font-medium rounded-lg hover:bg-navy/90 transition-colors">
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/jurnal"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Lihat Jurnal Lainnya
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
