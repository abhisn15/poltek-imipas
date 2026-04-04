"use client"

import { useState, useEffect, use } from "react"
import {
  ArrowLeft,
  Calendar,
  Tag,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Link2,
  ChevronRight,
  Eye,
  BookOpen,
  ArrowRight,
} from "lucide-react"

// ─── Mock article data (replace with real fetch by slug) ─────────────────────
const articles = {
  "upacara-pelantikan-taruna-baru-angkatan-xxxii-poltekip": {
    id: 1,
    slug: "upacara-pelantikan-taruna-baru-angkatan-xxxii-poltekip",
    category: "Kegiatan Taruna",
    date: "28 Februari 2026",
    readTime: "4 menit",
    views: 1284,
    title: "Upacara Pelantikan Taruna Baru Angkatan XXXII POLTEKIMIPAS",
    subtitle:
      "Sebanyak 350 taruna dan taruni baru resmi dilantik dalam upacara yang dihadiri langsung oleh Menteri Imigrasi dan Pemasyarakatan RI.",
    image: "/images/gallery-1.jpg",
    author: {
      name: "Biro Humas POLTEKIMIPAS",
      role: "Tim Redaksi",
      initial: "BH",
    },
    tags: ["Pelantikan", "Taruna Baru", "Angkatan XXXII", "Upacara"],
    content: [
      {
        type: "paragraph",
        text: "Politeknik Ilmu Pemasyarakatan (POLTEKIMIPAS) resmi melantik 350 taruna dan taruni baru Angkatan XXXII dalam upacara khidmat yang diselenggarakan di Lapangan Apel Kampus POLTEKIMIPAS, Gandul, Depok, Jawa Barat, pada Jumat 28 Februari 2026.",
      },
      {
        type: "paragraph",
        text: "Upacara yang berlangsung sejak pukul 07.00 WIB ini dipimpin langsung oleh Direktur POLTEKIMIPAS dan dihadiri oleh Menteri Imigrasi dan Pemasyarakatan RI, Direktur Jenderal Pemasyarakatan, serta jajaran pejabat eselon I dan II Kementerian.",
      },
      {
        type: "quote",
        text: "Kalian adalah generasi penerus pemasyarakatan Indonesia. Emban amanah ini dengan penuh integritas, dedikasi, dan semangat pengabdian yang tinggi.",
        source: "Menteri Imigrasi dan Pemasyarakatan RI",
      },
      {
        type: "heading",
        text: "Prosesi Pelantikan",
      },
      {
        type: "paragraph",
        text: "Prosesi pelantikan berlangsung dengan penuh khidmat. Para taruna dan taruni mengucapkan sumpah jabatan yang dipandu oleh Rohaniawan, dilanjutkan dengan penandatanganan pakta integritas secara simbolis oleh perwakilan taruna terbaik dari masing-masing program studi.",
      },
      {
        type: "paragraph",
        text: "Dari 350 taruna yang dilantik, 120 orang berasal dari Program Studi D-IV Manajemen Pemasyarakatan, 115 orang dari D-IV Teknik Pemasyarakatan, dan 115 orang dari D-IV Bimbingan Kemasyarakatan. Mereka telah melalui proses seleksi ketat yang meliputi seleksi administrasi, tes kesehatan, tes psikologi, dan seleksi kompetensi dasar.",
      },
      {
        type: "heading",
        text: "Prestasi dan Harapan",
      },
      {
        type: "paragraph",
        text: "Direktur POLTEKIMIPAS dalam sambutannya menyampaikan bahwa angkatan XXXII ini merupakan angkatan dengan tingkat persaingan tertinggi dalam lima tahun terakhir, dengan rasio pendaftar dan yang diterima mencapai 1:47. Hal ini menunjukkan semakin tingginya minat masyarakat terhadap pendidikan kedinasan di bidang pemasyarakatan.",
      },
      {
        type: "paragraph",
        text: "Upacara diakhiri dengan defile pasukan taruna yang menampilkan kekompakan dan kedisiplinan Angkatan XXXII, disambut tepuk tangan meriah dari para keluarga dan tamu undangan yang hadir. Para orang tua dan wali murid tampak bangga menyaksikan putra-putri mereka resmi menjadi bagian dari keluarga besar POLTEKIMIPAS.",
      },
    ],
  },
  "workshop-penulisan-karya-ilmiah-untuk-dosen-dan-taruna": {
    id: 2,
    slug: "workshop-penulisan-karya-ilmiah-untuk-dosen-dan-taruna",
    category: "Akademik",
    date: "15 Februari 2026",
    readTime: "5 menit",
    views: 892,
    title: "Workshop Penulisan Karya Ilmiah untuk Dosen dan Taruna",
    subtitle:
      "POLTEKIMIPAS menyelenggarakan workshop penulisan karya ilmiah bertaraf internasional bekerja sama dengan Universitas Indonesia.",
    image: "/images/news-2.jpg",
    author: {
      name: "Dr. Budi Santoso, M.Ed.",
      role: "Ketua Program Studi",
      initial: "BS",
    },
    tags: ["Workshop", "Karya Ilmiah", "Akademik", "Universitas Indonesia"],
    content: [
      {
        type: "paragraph",
        text: "POLTEKIMIPAS kembali menyelenggarakan workshop penulisan karya ilmiah bertaraf internasional yang bertujuan untuk meningkatkan kapasitas dosen dan taruna dalam publikasi ilmiah.",
      },
      {
        type: "paragraph",
        text: "Workshop yang berlangsung selama dua hari ini menghadirkan pembicara dari Universitas Indonesia yang merupakan pakar dalam bidang penulisan karya ilmiah internasional.",
      },
      {
        type: "heading",
        text: "Materi Workshop",
      },
      {
        type: "paragraph",
        text: "Peserta diajarkan teknik penulisan karya ilmiah yang sesuai dengan standar publikasi internasional, mulai dari penyusunan abstrak hingga submit ke jurnal terindeks Scopus.",
      },
    ],
  },
  "kunjungan-kerja-dirjen-pemasyarakatan-ke-kampus-poltekip": {
    id: 3,
    slug: "kunjungan-kerja-dirjen-pemasyarakatan-ke-kampus-poltekip",
    category: "Kebijakan",
    date: "5 Februari 2026",
    readTime: "3 menit",
    views: 1567,
    title: "Kunjungan Kerja Dirjen Pemasyarakatan ke Kampus POLTEKIMIPAS",
    subtitle:
      "Direktur Jenderal Pemasyarakatan melakukan kunjungan kerja untuk meninjau fasilitas pendidikan dan sarana prasarana kampus.",
    image: "/images/news-3.jpg",
    author: {
      name: "Tim Humas POLTEKIMIPAS",
      role: "Tim Liputan",
      initial: "TH",
    },
    tags: ["Kunjungan", "Dirjen Pemasyarakatan", "Fasilitas", "Inspeksi"],
    content: [
      {
        type: "paragraph",
        text: "Direktur Jenderal Pemasyarakatan melakukan kunjungan kerja ke Kampus POLTEKIMIPAS dalam rangka meninjau fasilitas pendidikan dan sarana prasarana yang ada.",
      },
      {
        type: "paragraph",
        text: "Kunjungan ini merupakan bagian dari program monitoring dan evaluasi rutin yang dilakukan oleh Ditjen PAS terhadap seluruh unit pendidikan kedinasan di bawah naungannya.",
      },
      {
        type: "heading",
        text: "Hasil Kunjungan",
      },
      {
        type: "paragraph",
        text: "Dirjen PAS menyampaikan apresiasi terhadap perkembangan POLTEKIMIPAS dan berkomitmen untuk terus mendukung pengembangan infrastruktur kampus.",
      },
    ],
  },
  "latihan-baris-berbaris-angkatan-xxxii-poltekip": {
    id: 4,
    slug: "latihan-baris-berbaris-angkatan-xxxii-poltekip",
    category: "Kegiatan Taruna",
    date: "20 Januari 2026",
    readTime: "6 menit",
    views: 2341,
    title: "Latihan Baris Berbaris Taruna Angkatan XXXII POLTEKIMIPAS",
    subtitle:
      "Taruna dan taruni Angkatan XXXII mengikuti latihan baris berbaris sebagai bagian dari pembinaan karakter dan disiplin.",
    image: "/images/gallery-4.jpg",
    author: {
      name: "Tim Liputan POLTEKIMIPAS",
      role: "Tim Dokumentasi",
      initial: "TL",
    },
    tags: ["Latihan", "Baris Berbaris", "Taruna", "Disiplin"],
    content: [
      {
        type: "paragraph",
        text: "Sebanyak 350 taruna dan taruni Angkatan XXXII POLTEKIMIPAS mengikuti latihan baris berbaris (PBB) rutin yang diselenggarakan di Lapangan Apel Kampus POLTEKIMIPAS, Gandul, Depok. Kegiatan ini merupakan bagian integral dari pembinaan karakter dan disiplin bagi calon pemasyarakatan profesional.",
      },
      {
        type: "paragraph",
        text: "Latihan yang dipimpin langsung oleh Instruktur PBB profesional ini berlangsung selama tiga hari, mulai pukul 06.00 hingga 09.00 WIB. Para taruna dan taruni menunjukkan semangat dan dedikasi yang tinggi dalam mengikuti setiap gerakan dengan tekun dan penuh keseriusan.",
      },
      {
        type: "heading",
        text: "Tujuan Pembinaan",
      },
      {
        type: "paragraph",
        text: "Kegiatan PBB tidak hanya bertujuan untuk membentuk fisik yang tangguh, tetapi juga untuk membangun karakter disiplin, kepemimpinan, dan kerjasama tim yang solid. Ini adalah bekal penting bagi mereka yang akan menjadi penegak hukum di lembaga pemasyarakatan.",
      },
      {
        type: "quote",
        text: "Disiplin adalah fondasi utama seorang pemasyarakatan. Tanpa disiplin, tidak akan ada integritas dan profesionalisme dalam menjalankan tugas.",
        source: "Komandan Latihan POLTEKIMIPAS",
      },
      {
        type: "paragraph",
        text: "Selain latihan PBB, para taruna juga mendapatkan materi tentang etika profesi, kepemimpinan, dan manajemen stress yang akan mereka hadapi di dunia kerja nanti. Pembinaan ini dirancang secara komprehensif untuk menciptakan lulusan yang siap menghadapi tantangan di lapangan.",
      },
    ],
  },
  "poltekip-raih-peringkat-terbaik-lomba-debat-nasional": {
    id: 5,
    slug: "poltekip-raih-peringkat-terbaik-lomba-debat-nasional",
    category: "Prestasi",
    date: "15 Januari 2026",
    readTime: "4 menit",
    views: 1876,
    title: "POLTEKIMIPAS Raih Peringkat Terbaik dalam Lomba Debat Nasional",
    subtitle:
      "Tim debat POLTEKIMIPAS berhasil meraih juara pertama dalam Lomba Debat Nasional Perguruan Tinggi Vokasi se-Indonesia.",
    image: "/images/gallery-2.jpg",
    author: {
      name: "Biro Humas POLTEKIMIPAS",
      role: "Tim Prestasi",
      initial: "BH",
    },
    tags: ["Prestasi", "Debat", "Juara", "Nasional"],
    content: [
      {
        type: "paragraph",
        text: "Tim debat Politeknik Ilmu Pemasyarakatan (POLTEKIMIPAS) berhasil meraih juara pertama dalam Lomba Debat Nasional Perguruan Tinggi Vokasi se-Indonesia yang diselenggarakan di Jakarta pada 15 Januari 2026. Ini merupakan prestasi membanggakan bagi POLTEKIMIPAS dan dunia pendidikan vokasi pemasyarakatan.",
      },
      {
        type: "paragraph",
        text: "Tim yang terdiri dari tiga orang taruna terbaik ini berhasil mengalahkan 48 tim dari berbagai perguruan tinggi vokasi di seluruh Indonesia. Mereka menampilkan argumen yang tajam, logis, dan didasari pada data akurat tentang isu-isu pemasyarakatan kontemporer.",
      },
      {
        type: "heading",
        text: "Perjalanan Kompetisi",
      },
      {
        type: "paragraph",
        text: "Kompetisi berlangsung selama tiga hari dengan sistem eliminasi. Tim POLTEKIMIPAS berhasil melaju ke babak final setelah mengalahkan tim dari berbagai perguruan tinggi ternama. Di babak final, mereka berhasil membawakan mosi tentang 'Reformasi Pemasyarakatan di Era Digital' dengan sangat baik.",
      },
      {
        type: "quote",
        text: "Kemenangan ini bukti bahwa taruna POLTEKIMIPAS tidak hanya unggul dalam aspek teknis, tetapi juga memiliki kemampuan analitis dan komunikasi yang excellent.",
        source: "Direktur POLTEKIMIPAS",
      },
      {
        text: "Prestasi ini membawa nama baik POLTEKIMIPAS di tingkat nasional dan membuktikan kualitas pendidikan vokasi pemasyarakatan yang diselenggarakan. Tim debat POLTEKIMIPAS akan mewakili Indonesia dalam kompetisi debat tingkat Asia Tenggara tahun depan.",
      },
    ],
  },
  "mou-kemenkumham-program-magang": {
    id: 6,
    slug: "mou-kemenkumham-program-magang",
    category: "Kerjasama",
    date: "10 Januari 2026",
    readTime: "3 menit",
    views: 1234,
    title: "MoU dengan Kementerian Hukum dan HAM untuk Program Magang",
    subtitle:
      "POLTEKIMIPAS menjalin kerjasama dengan Kementerian Hukum dan HAM untuk program magang bagi taruna semester akhir.",
    image: "/images/gallery-3.jpg",
    author: {
      name: "Biro Kerjasama POLTEKIMIPAS",
      role: "Tim Hubungan Institusi",
      initial: "BK",
    },
    tags: ["MoU", "Kerjasama", "Magang", "Kemenkumham"],
    content: [
      {
        type: "paragraph",
        text: "Politeknik Ilmu Pemasyarakatan (POLTEKIMIPAS) secara resmi menandatangani Memorandum of Understanding (MoU) dengan Kementerian Hukum dan HAM Republik Indonesia untuk program magang bagi taruna semester akhir. Penandatanganan dilaksanakan di Kampus POLTEKIMIPAS pada 10 Januari 2026.",
      },
      {
        type: "paragraph",
        text: "Kerjasama ini akan memberikan kesempatan bagi 350 taruna semester akhir untuk melakukan magang langsung di berbagai unit kerja Kementerian Hukum dan HAM, termasuk Kantor Wilayah Kementerian Hukum dan HAM serta Unit Pelaksana Teknis Pemasyarakatan di seluruh Indonesia.",
      },
      {
        type: "heading",
        text: "Tujuan Kerjasama",
      },
      {
        type: "paragraph",
        text: "Program magang ini dirancang untuk memberikan pengalaman praktis yang mendalam bagi taruna sebelum mereka memasuki dunia kerja. Mereka akan terlibat langsung dalam kegiatan operasional pemasyarakatan, administrasi, dan program pembinaan warga binaan.",
      },
      {
        type: "quote",
        text: "Magang adalah jembatan antara teori yang dipelajari di kampus dengan praktik di lapangan. Ini penting untuk menciptakan lulusan yang siap kerja dan kompeten.",
        source: "Direktur Jenderal Pemasyarakatan",
      },
      {
        type: "paragraph",
        text: "Melalui kerjasama ini, diharapkan dapat meningkatkan kualitas lulusan POLTEKIMIPAS dan memperkuat link and match antara pendidikan vokasi dengan kebutuhan industri. Program magang akan dimulai pada semester ganjil tahun ajaran 2026/2027.",
      },
    ],
  },
}

// ─── Related articles ─────────────────────────────────────────────────────────
const related = [
  {
    id: 2,
    image: "/images/news-2.jpg",
    category: "Akademik",
    date: "15 Februari 2026",
    title: "Workshop Penulisan Karya Ilmiah untuk Dosen dan Taruna",
    slug: "workshop-penulisan-karya-ilmiah-untuk-dosen-dan-taruna",
  },
  {
    id: 3,
    image: "/images/news-3.jpg",
    category: "Kebijakan",
    date: "5 Februari 2026",
    title: "Kunjungan Kerja Dirjen Pemasyarakatan ke Kampus POLTEKIMIPAS",
    slug: "kunjungan-kerja-dirjen-pemasyarakatan-ke-kampus-poltekip",
  },
  {
    id: 4,
    image: "/images/gallery-5.jpg",
    category: "Kegiatan Taruna",
    date: "20 Januari 2026",
    title: "Latihan Baris Berbaris Taruna Angkatan XXXII POLTEKIMIPAS",
    slug: "latihan-baris-berbaris-angkatan-xxxii-poltekip",
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [copied, setCopied] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Get article based on slug
  const article = articles[resolvedParams.slug as keyof typeof articles]

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // If article not found, show 404
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Artikel tidak ditemukan</h1>
          <a href="/#berita" className="text-gold hover:underline">Kembali ke Berita</a>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        .detail-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--background, #fff);
          color: var(--foreground, #1B2A4A);
          min-height: 100vh;
        }

        /* Reading progress */
        .reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #1B3A6B, #C9A84C);
          z-index: 100;
          transition: width 0.1s linear;
        }

        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #5A6B7F;
          flex-wrap: wrap;
        }
        .breadcrumb a {
          color: #5A6B7F;
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover { color: #1B3A6B; }
        .breadcrumb-sep { color: #D6DDE6; }

        /* Hero image */
        .hero-img-wrap {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #D6DDE6;
        }
        .hero-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-img-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px 16px;
          background: linear-gradient(to top, rgba(11,22,48,0.7) 0%, transparent 100%);
          font-size: 12px;
          color: rgba(255,255,255,0.75);
        }

        /* Article body typography */
        .article-body {
          font-size: 16px;
          line-height: 1.85;
          color: #2D3F5A;
        }

        .article-heading {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #1B3A6B;
          margin: 36px 0 12px;
          line-height: 1.3;
        }

        .article-paragraph {
          margin-bottom: 20px;
        }

        .article-quote {
          border-left: 3px solid #C9A84C;
          background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(27,58,107,0.04) 100%);
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin: 28px 0;
        }

        .article-quote p {
          font-family: 'DM Serif Display', serif;
          font-size: 19px;
          font-style: italic;
          color: #1B3A6B;
          line-height: 1.55;
          margin-bottom: 10px;
        }

        .article-quote cite {
          font-size: 12px;
          font-style: normal;
          color: #C9A84C;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Tags */
        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          background: rgba(27,58,107,0.07);
          color: #1B3A6B;
          border: 1px solid rgba(27,58,107,0.1);
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .tag-pill:hover {
          background: #1B3A6B;
          color: #fff;
          border-color: #1B3A6B;
        }

        /* Share buttons */
        .share-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-decoration: none;
        }
        .share-fb {
          background: #1877F2;
          color: #fff;
        }
        .share-fb:hover { background: #166FE5; }
        .share-tw {
          background: #0f1419;
          color: #fff;
        }
        .share-tw:hover { background: #272c30; }
        .share-copy {
          background: rgba(27,58,107,0.08);
          color: #1B3A6B;
          border: 1px solid rgba(27,58,107,0.15) !important;
        }
        .share-copy:hover {
          background: #1B3A6B;
          color: #fff;
        }

        /* Sidebar sticky */
        .sidebar-sticky {
          position: sticky;
          top: 100px;
        }

        /* Related card */
        .related-card {
          display: flex;
          gap: 14px;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #D6DDE6;
          background: #fff;
          transition: all 0.25s;
          text-decoration: none;
          cursor: pointer;
        }
        .related-card:hover {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 6px 24px rgba(27,58,107,0.08);
          transform: translateY(-2px);
        }
        .related-card img {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
          background: #D6DDE6;
        }

        /* Back button */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          font-weight: 600;
          color: #1B3A6B;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 9px;
          background: rgba(27,58,107,0.06);
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .back-btn:hover {
          background: rgba(27,58,107,0.12);
        }

        /* Category badge */
        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: #C9A84C;
          color: #0F2647;
        }

        /* Section heading */
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,0.2);
        }

        /* Divider */
        .fancy-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #D6DDE6 20%, #D6DDE6 80%, transparent);
          margin: 32px 0;
        }

        @media (max-width: 1024px) {
          .sidebar-sticky { position: static; }
        }
      `}</style>

      {/* Reading progress bar */}
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="detail-root">
        {/* Top spacing for fixed navbar */}
        <div style={{ height: "80px" }} />

        <div className="mx-auto max-w-7xl px-4 py-10">

          {/* Breadcrumb + back */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Beranda</a>
              <ChevronRight className="breadcrumb-sep h-3.5 w-3.5" />
              <a href="/berita">Berita</a>
              <ChevronRight className="breadcrumb-sep h-3.5 w-3.5" />
              <span style={{ color: "#1B3A6B", fontWeight: 600, maxWidth: 220 }} className="truncate">
                {article.title}
              </span>
            </nav>
            <a href="/#berita" className="back-btn">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita
            </a>
          </div>

          {/* Main layout */}
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

            {/* ── Left: Article ───────────────────────────────────── */}
            <article>

              {/* Meta */}
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="category-badge">
                  <Tag className="h-3 w-3" />
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground" style={{ color: "#5A6B7F" }}>
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5 text-sm" style={{ color: "#5A6B7F" }}>
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime} baca
                </span>
                <span className="flex items-center gap-1.5 text-sm" style={{ color: "#5A6B7F" }}>
                  <Eye className="h-3.5 w-3.5" />
                  {article.views.toLocaleString('id-ID')} dilihat
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(26px, 4vw, 38px)",
                  lineHeight: 1.25,
                  color: "#1B3A6B",
                  marginBottom: "16px",
                }}
              >
                {article.title}
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: "17px", lineHeight: 1.65, color: "#5A6B7F", marginBottom: "28px" }}>
                {article.subtitle}
              </p>

              {/* Author */}
              <div className="mb-8 flex items-center gap-3 rounded-xl border p-4"
                style={{ borderColor: "#D6DDE6", background: "#F0F4F8" }}>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: "#1B3A6B", color: "#fff" }}
                >
                  {article.author.initial}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: "#1B2A4A", fontSize: "14px" }}>
                    {article.author.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#5A6B7F" }}>{article.author.role}</div>
                </div>
              </div>

              {/* Hero image */}
              <div className="hero-img-wrap mb-8">
                <img src={article.image} alt={article.title} />
                <div className="hero-img-caption">
                  Foto: Dokumentasi Resmi POLTEKIMIPAS — Upacara Pelantikan Taruna Angkatan XXXII
                </div>
              </div>

              {/* Article content */}
              <div className="article-body">
                {article.content.map((block, i) => {
                  if (block.type === "paragraph")
                    return <p key={i} className="article-paragraph">{block.text}</p>
                  if (block.type === "heading")
                    return <h2 key={i} className="article-heading">{block.text}</h2>
                  if (block.type === "quote")
                    return (
                      <blockquote key={i} className="article-quote">
                        <p>&ldquo;{block.text}&rdquo;</p>
                        <cite>— {(block as any).source ?? "Sumber tidak diketahui"}</cite>
                      </blockquote>
                    )
                  return null
                })}
              </div>

              <div className="fancy-divider" />

              {/* Tags */}
              <div className="mb-8">
                <div className="section-label">
                  <BookOpen className="h-3.5 w-3.5" />
                  Topik
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <a key={tag} href={`/berita?tag=${tag}`} className="tag-pill">
                      # {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="rounded-xl border p-5" style={{ borderColor: "#D6DDE6", background: "#FAF8F2" }}>
                <div className="mb-4 flex items-center gap-2">
                  <Share2 className="h-4 w-4" style={{ color: "#C9A84C" }} />
                  <span className="font-semibold" style={{ color: "#1B2A4A", fontSize: "14px" }}>
                    Bagikan artikel ini
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-fb"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-tw"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                  <button onClick={handleCopyLink} className="share-btn share-copy">
                    <Link2 className="h-4 w-4" />
                    {copied ? "Tersalin!" : "Salin Tautan"}
                  </button>
                </div>
              </div>

            </article>

            {/* ── Right: Sidebar ──────────────────────────────────── */}
            <aside>
              <div className="sidebar-sticky flex flex-col gap-6">

                {/* Related news */}
                <div className="rounded-xl border p-5" style={{ borderColor: "#D6DDE6" }}>
                  <div className="section-label">Berita Terkait</div>
                  <div className="flex flex-col gap-3">
                    {related.map((item) => (
                      <a key={item.id} href={`/berita/${item.slug}`} className="related-card">
                        <img src={item.image} alt={item.title} />
                        <div className="flex flex-col justify-between gap-1">
                          <span
                            className="category-badge"
                            style={{ fontSize: "10px", padding: "2px 8px", alignSelf: "flex-start" }}
                          >
                            {item.category}
                          </span>
                          <p
                            className="line-clamp-2"
                            style={{ fontSize: "13px", fontWeight: 600, color: "#1B2A4A", lineHeight: 1.4 }}
                          >
                            {item.title}
                          </p>
                          <span style={{ fontSize: "11px", color: "#5A6B7F" }}>{item.date}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                  <a
                    href="/berita"
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-colors"
                    style={{ color: "#1B3A6B", background: "rgba(27,58,107,0.06)", fontSize: "13px" }}
                  >
                    Lihat Semua Berita
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Categories */}
                <div className="rounded-xl border p-5" style={{ borderColor: "#D6DDE6" }}>
                  <div className="section-label">Kategori</div>
                  <div className="flex flex-col gap-1">
                    {["Kegiatan Taruna", "Akademik", "Kebijakan", "Penelitian", "Pengumuman"].map((cat) => (
                      <a
                        key={cat}
                        href={`/berita?kategori=${cat}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all"
                        style={{ color: cat === article.category ? "#1B3A6B" : "#5A6B7F",
                          background: cat === article.category ? "rgba(27,58,107,0.07)" : "transparent",
                          fontWeight: cat === article.category ? 600 : 400 }}
                      >
                        {cat}
                        <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA box */}
                <div
                  className="rounded-xl p-5 text-center"
                  style={{ background: "linear-gradient(135deg, #0F2647 0%, #1B3A6B 100%)" }}
                >
                  <div
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}
                  >
                    <BookOpen className="h-5 w-5" style={{ color: "#C9A84C" }} />
                  </div>
                  <h4 className="mb-1 font-bold" style={{ color: "#fff", fontFamily: "'DM Serif Display', serif", fontSize: "16px" }}>
                    Daftar Sekarang
                  </h4>
                  <p className="mb-4 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Seleksi penerimaan taruna baru T.A. 2026/2027 sudah dibuka.
                  </p>
                  <a
                    href="/pendaftaran"
                    className="block rounded-lg py-2.5 text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: "#C9A84C", color: "#0F2647" }}
                  >
                    Informasi Pendaftaran
                  </a>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  )
}