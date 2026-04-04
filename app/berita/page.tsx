"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, Calendar, ArrowLeft, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    id: 1,
    image: "/images/gallery-1.jpg",
    category: "Kegiatan Taruna",
    date: "28 Februari 2026",
    readTime: "4 menit",
    views: 1284,
    title: "Upacara Pelantikan Taruna Baru Angkatan XXXII POLTEKIMIPAS",
    excerpt:
      "Sebanyak 350 taruna dan taruni baru resmi dilantik dalam upacara yang dihadiri langsung oleh Menteri Imigrasi dan Pemasyarakatan RI.",
    slug: "upacara-pelantikan-taruna-baru-angkatan-xxxii-poltekip",
    tags: ["Pelantikan", "Taruna Baru", "Angkatan XXXII", "Upacara"],
    author: "Biro Humas POLTEKIMIPAS"
  },
  {
    id: 2,
    image: "/images/news-2.jpg",
    category: "Akademik",
    date: "15 Februari 2026",
    readTime: "5 menit",
    views: 892,
    title: "Workshop Penulisan Karya Ilmiah untuk Dosen dan Taruna",
    excerpt:
      "POLTEKIMIPAS menyelenggarakan workshop penulisan karya ilmiah bertaraf internasional bekerja sama dengan Universitas Indonesia.",
    slug: "workshop-penulisan-karya-ilmiah-untuk-dosen-dan-taruna",
    tags: ["Workshop", "Karya Ilmiah", "Akademik", "Universitas Indonesia"],
    author: "Dr. Budi Santoso, M.Ed."
  },
  {
    id: 3,
    image: "/images/news-3.jpg",
    category: "Kebijakan",
    date: "5 Februari 2026",
    readTime: "3 menit",
    views: 1567,
    title: "Kunjungan Kerja Dirjen Pemasyarakatan ke Kampus POLTEKIMIPAS",
    excerpt:
      "Direktur Jenderal Pemasyarakatan melakukan kunjungan kerja untuk meninjau fasilitas pendidikan dan sarana prasarana kampus.",
    slug: "kunjungan-kerja-dirjen-pemasyarakatan-ke-kampus-poltekip",
    tags: ["Kunjungan", "Dirjen Pemasyarakatan", "Fasilitas", "Inspeksi"],
    author: "Tim Humas POLTEKIMIPAS"
  },
  {
    id: 4,
    image: "/images/gallery-4.jpg",
    category: "Kegiatan Taruna",
    date: "20 Januari 2026",
    readTime: "6 menit",
    views: 2341,
    title: "Latihan Baris Berbaris Taruna Angkatan XXXII POLTEKIMIPAS",
    excerpt:
      "Taruna dan taruni Angkatan XXXII mengikuti latihan baris berbaris sebagai bagian dari pembinaan karakter dan disiplin.",
    slug: "latihan-baris-berbaris-angkatan-xxxii-poltekip",
    tags: ["Latihan", "Baris Berbaris", "Taruna", "Disiplin"],
    author: "Tim Liputan POLTEKIMIPAS"
  },
  {
    id: 5,
    image: "/images/gallery-2.jpg",
    category: "Prestasi",
    date: "15 Januari 2026",
    readTime: "4 menit",
    views: 1876,
    title: "POLTEKIMIPAS Raih Peringkat Terbaik dalam Lomba Debat Nasional",
    excerpt:
      "Tim debat POLTEKIMIPAS berhasil meraih juara pertama dalam Lomba Debat Nasional Perguruan Tinggi Vokasi se-Indonesia.",
    slug: "poltekip-raih-peringkat-terbaik-lomba-debat-nasional",
    tags: ["Prestasi", "Debat", "Juara", "Nasional"],
    author: "Biro Humas POLTEKIMIPAS"
  },
  {
    id: 6,
    image: "/images/gallery-3.jpg",
    category: "Kerjasama",
    date: "10 Januari 2026",
    readTime: "3 menit",
    views: 1234,
    title: "MoU dengan Kementerian Hukum dan HAM untuk Program Magang",
    excerpt:
      "POLTEKIMIPAS menjalin kerjasama dengan Kementerian Hukum dan HAM untuk program magang bagi taruna semester akhir.",
    slug: "mou-kemenkumham-program-magang",
    tags: ["MoU", "Kerjasama", "Magang", "Kemenkumham"],
    author: "Biro Kerjasama POLTEKIMIPAS"
  },
  {
    id: 7,
    image: "/images/gallery-1.jpg",
    category: "Akademik",
    date: "5 Januari 2026",
    readTime: "5 menit",
    views: 987,
    title: "Peresmian Laboratorium Forensik Digital Terbaru",
    excerpt:
      "POLTEKIMIPAS meresmikan laboratorium forensik digital dengan peralatan canggih untuk mendukung pembelajaran praktik.",
    slug: "peresmian-lab-forensik-digital",
    tags: ["Laboratorium", "Forensik Digital", "Fasilitas", "Teknologi"],
    author: "Biro Akademik POLTEKIMIPAS"
  },
  {
    id: 8,
    image: "/images/news-2.jpg",
    category: "Kegiatan Taruna",
    date: "28 Desember 2025",
    readTime: "4 menit",
    views: 1543,
    title: "Kunjungan Industri ke Lembaga Pemasyarakatan Kelas IIA",
    excerpt:
      "Taruna semester VI melakukan kunjungan industri untuk mempelajari manajemen lembaga pemasyarakatan secara langsung.",
    slug: "kunjungan-industri-lapas",
    tags: ["Kunjungan Industri", "Lapas", "Praktik", "Taruna"],
    author: "Tim Akademik POLTEKIMIPAS"
  },
  {
    id: 9,
    image: "/images/news-3.jpg",
    category: "Prestasi",
    date: "20 Desember 2025",
    readTime: "3 menit",
    views: 2109,
    title: "Taruna POLTEKIMIPAS Juara 1 Olimpiade Sains Nasional",
    excerpt:
      "Tim olimpiade sains POLTEKIMIPAS berhasil meraih medali emas dalam kompetisi sains tingkat nasional.",
    slug: "juara-olimpiade-sains",
    tags: ["Prestasi", "Olimpiade", "Sains", "Juara"],
    author: "Biro Prestasi POLTEKIMIPAS"
  },
  {
    id: 10,
    image: "/images/gallery-4.jpg",
    category: "Kebijakan",
    date: "15 Desember 2025",
    readTime: "6 menit",
    views: 1876,
    title: "Implementasi Kurikulum Merdeka Belajar di POLTEKIMIPAS",
    excerpt:
      "POLTEKIMIPAS mulai mengimplementasikan kurikulum merdeka belajar untuk meningkatkan kualitas pendidikan vokasi.",
    slug: "kurikulum-merdeka-belajar",
    tags: ["Kurikulum", "Merdeka Belajar", "Pendidikan", "Inovasi"],
    author: "Biro Kurikulum POLTEKIMIPAS"
  },
  {
    id: 11,
    image: "/images/gallery-2.jpg",
    category: "Kerjasama",
    date: "10 Desember 2025",
    readTime: "4 menit",
    views: 1321,
    title: "Kerjasama dengan Universitas Terkemuka untuk Program Double Degree",
    excerpt:
      "POLTEKIMIPAS menjalin kerjasama dengan universitas internasional untuk program double degree bagi taruna berprestasi.",
    slug: "kerjasama-double-degree",
    tags: ["Kerjasama", "Double Degree", "Internasional", "Universitas"],
    author: "Biro Kerjasama Internasional POLTEKIMIPAS"
  },
  {
    id: 12,
    image: "/images/gallery-3.jpg",
    category: "Akademik",
    date: "5 Desember 2025",
    readTime: "5 menit",
    views: 1654,
    title: "Seminar Nasional Reformasi Pemasyarakatan Era Digital",
    excerpt:
      "POLTEKIMIPAS menyelenggarakan seminar nasional membahas reformasi pemasyarakatan di era digital dengan narasumber ahli.",
    slug: "seminar-reformasi-pemasyarakatan",
    tags: ["Seminar", "Nasional", "Reformasi", "Digital"],
    author: "Panitia Seminar POLTEKIMIPAS"
  },
  {
    id: 13,
    image: "/images/gallery-1.jpg",
    category: "Kegiatan Taruna",
    date: "28 November 2025",
    readTime: "4 menit",
    views: 1432,
    title: "Pelatihan Kepemimpinan Taruna di Alam Terbuka",
    excerpt:
      "Taruna POLTEKIMIPAS mengikuti pelatihan kepemimpinan di alam terbuka untuk membangun karakter dan teamwork.",
    slug: "pelatihan-kepemimpinan-alam-terbuka",
    tags: ["Pelatihan", "Kepemimpinan", "Outbound", "Character Building"],
    author: "Biro Taruna POLTEKIMIPAS"
  },
  {
    id: 14,
    image: "/images/news-2.jpg",
    category: "Prestasi",
    date: "20 November 2025",
    readTime: "3 menit",
    views: 1987,
    title: "Tim Robotik POLTEKIMIPAS Juara 2 Kompetisi Nasional",
    excerpt:
      "Tim robotik POLTEKIMIPAS berhasil meraih juara kedua dalam kompetisi robotik tingkat nasional di Jakarta.",
    slug: "tim-robotik-juara-2",
    tags: ["Robotik", "Kompetisi", "Teknologi", "Prestasi"],
    author: "Biro Teknologi POLTEKIMIPAS"
  },
  {
    id: 15,
    image: "/images/news-3.jpg",
    category: "Akademik",
    date: "15 November 2025",
    readTime: "6 menit",
    views: 1234,
    title: "Implementasi Sistem Pembelajaran Online Terintegrasi",
    excerpt:
      "POLTEKIMIPAS meluncurkan sistem pembelajaran online terintegrasi untuk mendukung pembelajaran hybrid.",
    slug: "sistem-pembelajaran-online",
    tags: ["Online Learning", "Hybrid", "Teknologi Edukasi", "Digital"],
    author: "Biro IT POLTEKIMIPAS"
  },
  {
    id: 16,
    image: "/images/gallery-4.jpg",
    category: "Kebijakan",
    date: "10 November 2025",
    readTime: "5 menit",
    views: 1567,
    title: "Standar Operasional Prosedur Baru Lembaga Pemasyarakatan",
    excerpt:
      "Kementerian Hukum dan HAM bersama POLTEKIMIPAS menyusun SOP baru untuk lembaga pemasyarakatan modern.",
    slug: "sop-baru-lembaga-pemasyarakatan",
    tags: ["SOP", "Kebijakan", "Standar", "Modernisasi"],
    author: "Biro Kebijakan POLTEKIMIPAS"
  },
  {
    id: 17,
    image: "/images/gallery-2.jpg",
    category: "Kerjasama",
    date: "5 November 2025",
    readTime: "4 menit",
    views: 1098,
    title: "MoU dengan Perusahaan Teknologi untuk Magang IT",
    excerpt:
      "POLTEKIMIPAS menjalin kerjasama dengan perusahaan teknologi ternama untuk program magang IT taruna.",
    slug: "mou-perusahaan-teknologi",
    tags: ["MoU", "Teknologi", "Magang", "IT"],
    author: "Biro Kerjasama POLTEKIMIPAS"
  },
  {
    id: 18,
    image: "/images/gallery-3.jpg",
    category: "Kegiatan Taruna",
    date: "1 November 2025",
    readTime: "3 menit",
    views: 1876,
    title: "Festival Seni dan Budaya Taruna POLTEKIMIPAS 2025",
    excerpt:
      "Taruna menampilkan berbagai penampilan seni dan budaya dalam festival tahunan yang merayakan keberagaman.",
    slug: "festival-seni-budaya-2025",
    tags: ["Festival", "Seni", "Budaya", "Taruna"],
    author: "Biro Kesenian POLTEKIMIPAS"
  }
]

const categories = ["Semua", "Kegiatan Taruna", "Akademik", "Kebijakan", "Prestasi", "Kerjasama"]

// Komponen yang menggunakan useSearchParams
function BeritaContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  useEffect(() => {
    // Get category from URL query parameter
    const kategoriParam = searchParams.get('kategori')
    
    // Set selected category based on URL parameter
    if (kategoriParam && categories.includes(kategoriParam)) {
      setSelectedCategory(kategoriParam)
    } else {
      setSelectedCategory("Semua")
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = articles

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredArticles(filtered)
    setCurrentPage(1) // Reset to page 1 when filters change
  }, [searchTerm, selectedCategory])

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        .berita-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--background, #fff);
          color: var(--foreground, #1B2A4A);
          min-height: 100vh;
        }

        /* Hero section */
        .berita-hero {
          background: linear-gradient(135deg, #1B3A6B 0%, #2C4F7C 100%);
          position: relative;
          overflow: hidden;
        }

        .berita-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .berita-hero-content {
          position: relative;
          z-index: 1;
        }

        /* Search and filter */
        .search-filter-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          margin-bottom: 32px;
        }

        .search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .search-input:focus {
          outline: none;
          border-color: #1B3A6B;
          box-shadow: 0 0 0 4px rgba(27, 58, 107, 0.1);
          background: white;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          pointer-events: none;
          z-index: 1;
        }

        /* Category filters */
        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .category-btn {
          padding: 8px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 20px;
          background: white;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          border-color: #1B3A6B;
          color: #1B3A6B;
        }

        .category-btn.active {
          background: #1B3A6B;
          color: white;
          border-color: #1B3A6B;
        }

        /* Article cards */
        .article-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #C9A84C;
        }

        .article-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .article-image-placeholder {
          width: 100%;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: bold;
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: linear-gradient(135deg, #1B3A6B 0%, #2C4F7C 100%);
        }

        .article-card:hover .article-image {
          transform: scale(1.05);
        }

        .article-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .article-card:hover .article-overlay {
          opacity: 1;
        }

        .category-badge {
          position: absolute;
          left: 12px;
          top: 12px;
          background: #C9A84C;
          color: #1B3A6B;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Article meta */
        .article-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          color: #6b7280;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .article-meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Tags */
        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }

        .tag {
          background: rgba(27, 58, 107, 0.1);
          color: #1B3A6B;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tag:hover {
          background: #1B3A6B;
          color: white;
        }

        /* Read more link */
        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #1B3A6B;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .read-more:hover {
          color: #C9A84C;
          transform: translateX(4px);
        }

        /* Back button */
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
          margin-bottom: 24px;
        }

        .back-button:hover {
          color: white;
        }

        /* No results */
        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-results-icon {
          margin: 0 auto 16px;
          width: 64px;
          height: 64px;
          background: rgba(27, 58, 107, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 48px;
        }

        .pagination-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .pagination-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          color: #374151;
        }

        .pagination-btn.active {
          background: #1B3A6B;
          border-color: #1B3A6B;
          color: white;
        }

        .pagination-btn.active:hover {
          background: #2C4F7C;
          border-color: #2C4F7C;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-btn:disabled:hover {
          background: white;
          border-color: #e5e7eb;
          color: #6b7280;
        }

        .pagination-info {
          font-size: 14px;
          color: #6b7280;
          margin: 0 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .search-filter-container {
            padding: 16px;
          }
          
          .category-filters {
            justify-content: center;
          }
        }
      `}</style>

      <div className="berita-root">
        {/* Hero Section */}
        <section className="berita-hero py-20">
          <div className="berita-hero-content max-w-7xl mx-auto px-4">
            <Link href="/" className="back-button">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>

            <div className="text-center text-white">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                Informasi Terkini
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Berita & Artikel
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Dapatkan informasi terbaru tentang kegiatan akademik, prestasi, dan berita penting 
                seputar POLTEKIMIPAS.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="search-filter-container">
              {/* Search Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-navy" />
                  <span className="text-sm font-medium text-navy">Cari Berita:</span>
                </div>
                <div className="relative">
                  <Search className="search-icon h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter Section */}
              <div className="border-t pt-6" style={{ borderColor: "#e5e7eb" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-navy" />
                  <span className="text-sm font-medium text-navy">Filter Kategori:</span>
                </div>
                <div className="category-filters">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground mt-4">
                Menampilkan {currentArticles.length} dari {filteredArticles.length} artikel
                {searchTerm && ` untuk "${searchTerm}"`}
                {selectedCategory !== "Semua" && ` di kategori "${selectedCategory}"`}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {currentArticles.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentArticles.map((article) => (
                  <article key={article.id} className="article-card">
                    <div className="relative overflow-hidden">
                      {article.id <= 6 ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="article-image"
                        />
                      ) : (
                        <div className="article-image-placeholder">
                          {article.title.charAt(0)}
                        </div>
                      )}
                      <div className="article-overlay" />
                      <span className="category-badge">
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="article-meta">
                        <div className="article-meta-item">
                          <Calendar className="h-3 w-3" />
                          {article.date}
                        </div>
                        <div className="article-meta-item">
                          <span>{article.readTime}</span>
                        </div>
                        <div className="article-meta-item">
                          <span>{article.views} views</span>
                        </div>
                      </div>

                      <h3
                        className="mb-3 text-lg font-bold text-gray-900 leading-tight"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {article.title}
                      </h3>

                      <p className="mb-4 text-gray-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="article-tags">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/berita/${article.slug}`}
                        className="read-more mt-4"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  <Search className="h-8 w-8 text-navy" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tidak ada berita ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba ubah kata kunci pencarian atau filter kategori untuk menemukan berita yang Anda cari.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show max 5 page numbers
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                }

                // Show dots for hidden pages
                if (
                  (page === currentPage - 2 && page > 1) ||
                  (page === currentPage + 2 && page < totalPages)
                ) {
                  return <span key={page} style={{ padding: '0 4px' }}>...</span>
                }

                return null
              })}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

// Default export yang wrap dengan Suspense
export default function BeritaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BeritaContent />
    </Suspense>
  )
}
