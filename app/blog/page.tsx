"use client"

import { useState, useMemo } from "react"
import { Clock, User, ArrowLeft, Calendar, ArrowRight, Search, Filter, ChevronDown, Eye, Tag } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const posts = [
  {
    id: 1,
    slug: "transformasi-digital-sistem-pemasyarakatan",
    author: "Dr. Haryono, M.Si.",
    authorInitial: "H",
    readTime: "5 menit",
    views: 2456,
    tags: ["Pemasyarakatan", "Opini"],
    title: "Transformasi Digital dalam Sistem Pemasyarakatan Indonesia",
    excerpt: "Perkembangan teknologi digital membawa perubahan signifikan dalam tata kelola lembaga pemasyarakatan. Blog ini membahas tantangan dan peluang digitalisasi.",
    image: "/images/blog-1.jpg",
    publishDate: "2024-03-15",
    category: "Teknologi"
  },
  {
    id: 2,
    slug: "pendekatan-humanis-bimbingan-kemasyarakatan",
    author: "Dra. Siti Rahayu, M.Hum.",
    authorInitial: "S",
    readTime: "7 menit",
    views: 1892,
    tags: ["Pendidikan", "Rehabilitasi"],
    title: "Pendekatan Humanis dalam Bimbingan Kemasyarakatan",
    excerpt: "Menggali lebih dalam tentang pentingnya pendekatan humanis dalam proses rehabilitasi dan reintegrasi sosial bagi warga binaan pemasyarakatan.",
    image: "/images/blog-2.jpg",
    publishDate: "2024-03-10",
    category: "Pendidikan"
  },
  {
    id: 3,
    slug: "urgensi-pembaruan-regulasi-pemasyarakatan",
    author: "Bambang Supriyadi, S.H., M.H.",
    authorInitial: "B",
    readTime: "4 menit",
    views: 1567,
    tags: ["Hukum", "Kebijakan"],
    title: "Urgensi Pembaruan Regulasi Pemasyarakatan di Era Modern",
    excerpt: "Mengkaji kebutuhan pembaruan regulasi pemasyarakatan untuk mengakomodasi perkembangan hukum dan hak asasi manusia secara global.",
    image: "/images/blog-3.jpg",
    publishDate: "2024-03-05",
    category: "Kebijakan"
  },
  {
    id: 4,
    slug: "implementasi-smart-prison-konsep-dan-tantangan",
    author: "Dr. Ahmad Fauzi, M.T.",
    authorInitial: "A",
    readTime: "6 menit",
    views: 1234,
    tags: ["Teknologi", "Keamanan"],
    title: "Implementasi Smart Prison: Konsep dan Tantangan",
    excerpt: "Membahas konsep smart prison yang memanfaatkan IoT dan AI untuk meningkatkan efisiensi pengelolaan lembaga pemasyarakatan.",
    image: "/images/blog-1.jpg",
    publishDate: "2024-02-28",
    category: "Teknologi"
  },
  {
    id: 5,
    slug: "manajemen-risiko-lembaga-pemasyarakatan",
    author: "Prof. Dr. Indra Wijaya, M.Si.",
    authorInitial: "I",
    readTime: "8 menit",
    views: 987,
    tags: ["Manajemen", "Risiko", "Kepemimpinan"],
    title: "Manajemen Risiko di Lembaga Pemasyarakatan Modern",
    excerpt: "Strategi dan implementasi manajemen risiko yang efektif untuk meningkatkan keamanan dan kualitas layanan lembaga pemasyarakatan.",
    image: "/images/blog-2.jpg",
    publishDate: "2024-02-20",
    category: "Manajemen"
  },
  {
    id: 6,
    slug: "peran-psikologi-dalam-rehabilitasi",
    author: "Dr. Ratna Sari, M.Psi.",
    authorInitial: "R",
    readTime: "5 menit",
    views: 1543,
    tags: ["Psikologi", "Rehabilitasi", "Kesehatan Mental"],
    title: "Peran Psikologi dalam Rehabilitasi Narapidana",
    excerpt: "Pentingnya pendekatan psikologis dalam program rehabilitasi untuk memastikan reintegrasi sosial yang berhasil dan berkelanjutan.",
    image: "/images/blog-3.jpg",
    publishDate: "2024-02-15",
    category: "Psikologi"
  },
  {
    id: 7,
    slug: "inovasi-pembelajaran-vokasional",
    author: "Ir. Hendra Kusuma, M.T.",
    authorInitial: "H",
    readTime: "6 menit",
    views: 1789,
    tags: ["Vokasional", "Inovasi", "Pendidikan"],
    title: "Inovasi Pembelajaran Vokasional di Era Digital",
    excerpt: "Bagaimana teknologi digital dapat meningkatkan kualitas dan relevansi pembelajaran vokasional untuk calon praktisi pemasyarakatan.",
    image: "/images/blog-1.jpg",
    publishDate: "2024-02-10",
    category: "Pendidikan"
  },
  {
    id: 8,
    slug: "etika-profesional-pemasyarakatan",
    author: "Dr. Susilo Budi, S.H., M.H.",
    authorInitial: "S",
    readTime: "7 menit",
    views: 1321,
    tags: ["Etika", "Profesionalisme", "Kode Etik"],
    title: "Etika Profesional dalam Praktik Pemasyarakatan",
    excerpt: "Standar etika dan profesionalisme yang harus dimiliki oleh praktisi pemasyarakatan modern dalam menjalankan tugas sehari-hari.",
    image: "/images/blog-2.jpg",
    publishDate: "2024-02-05",
    category: "Etika"
  },
  {
    id: 9,
    slug: "teknologi-monitoring-modern",
    author: "Dr. Andi Pratama, M.Kom.",
    authorInitial: "A",
    readTime: "5 menit",
    views: 2109,
    tags: ["Teknologi", "Monitoring", "Keamanan"],
    title: "Teknologi Monitoring Modern untuk Keamanan Maksimal",
    excerpt: "Review teknologi monitoring terkini yang dapat meningkatkan keamanan lembaga pemasyarakatan tanpa mengganggu privasi.",
    image: "/images/blog-3.jpg",
    publishDate: "2024-01-30",
    category: "Teknologi"
  },
  {
    id: 10,
    slug: "program-reintegrasi-sosial",
    author: "Dra. Maya Sari, M.Sos.",
    authorInitial: "M",
    readTime: "6 menit",
    views: 1654,
    tags: ["Reintegrasi", "Sosial", "Program"],
    title: "Program Reintegrasi Sosial yang Efektif",
    excerpt: "Desain program reintegrasi sosial yang terbukti efektif dalam mengurangi tingkat residivisme narapidana.",
    image: "/images/blog-1.jpg",
    publishDate: "2024-01-25",
    category: "Sosial"
  },
  {
    id: 11,
    slug: "tata-kelola-keuangan-publik",
    author: "Dr. Bambang Sutrisno, M.Ak.",
    authorInitial: "B",
    readTime: "7 menit",
    views: 1432,
    tags: ["Keuangan", "Tata Kelola", "Transparansi"],
    title: "Tata Kelola Keuangan Publik di Lembaga Pemasyarakatan",
    excerpt: "Prinsip dan praktik tata kelola keuangan publik yang transparan dan akuntabel untuk lembaga pemasyarakatan.",
    image: "/images/blog-2.jpg",
    publishDate: "2024-01-20",
    category: "Keuangan"
  },
  {
    id: 12,
    slug: "kolaborasi-internasional",
    author: "Prof. Dr. Ahmad Rizki, M.H.",
    authorInitial: "A",
    readTime: "8 menit",
    views: 1876,
    tags: ["Internasional", "Kolaborasi", "Diplomasi"],
    title: "Kolaborasi Internasional dalam Pemasyarakatan",
    excerpt: "Manfaat dan tantangan kolaborasi internasional untuk meningkatkan standar pemasyarakatan di Indonesia.",
    image: "/images/blog-3.jpg",
    publishDate: "2024-01-15",
    category: "Internasional"
  },
  {
    id: 13,
    slug: "kesehatan-mental-petugas",
    author: "Dr. Sarah Wijaya, M.Psi.",
    authorInitial: "S",
    readTime: "5 menit",
    views: 1987,
    tags: ["Kesehatan Mental", "Petugas", "Wellness"],
    title: "Kesehatan Mental Petugas Pemasyarakatan",
    excerpt: "Pentingnya perhatian pada kesehatan mental petugas pemasyarakatan untuk menjalankan tugas dengan optimal dan berkelanjutan.",
    image: "/images/blog-1.jpg",
    publishDate: "2024-01-10",
    category: "Kesehatan"
  },
  {
    id: 14,
    slug: "sistem-informasi-terpadu",
    author: "Ir. Rudi Hermawan, M.T.",
    authorInitial: "R",
    readTime: "6 menit",
    views: 1543,
    tags: ["Sistem Informasi", "Integrasi", "Teknologi"],
    title: "Sistem Informasi Terpadu untuk Layanan Prima",
    excerpt: "Implementasi sistem informasi terpadu untuk meningkatkan efisiensi dan kualitas layanan lembaga pemasyarakatan.",
    image: "/images/blog-2.jpg",
    publishDate: "2024-01-05",
    category: "Teknologi"
  },
  {
    id: 15,
    slug: "pelatihan-soft-skills",
    author: "Dra. Lina Marlina, M.Pd.",
    authorInitial: "L",
    readTime: "7 menit",
    views: 1234,
    tags: ["Soft Skills", "Pelatihan", "Pengembangan Diri"],
    title: "Pelatihan Soft Skills untuk Petugas Profesional",
    excerpt: "Kompetensi soft skills esensial yang harus dimiliki petugas pemasyarakatan untuk memberikan layanan terbaik.",
    image: "/images/blog-3.jpg",
    publishDate: "2023-12-30",
    category: "Pelatihan"
  },
  {
    id: 16,
    slug: "evaluasi-program-efektif",
    author: "Dr. Joko Santoso, M.Si.",
    authorInitial: "J",
    readTime: "5 menit",
    views: 1765,
    tags: ["Evaluasi", "Program", "Efektivitas"],
    title: "Evaluasi Program Rehabilitasi yang Efektif",
    excerpt: "Metodologi dan indikator evaluasi program rehabilitasi untuk memastikan dampak positif yang terukur.",
    image: "/images/blog-1.jpg",
    publishDate: "2023-12-25",
    category: "Evaluasi"
  },
  {
    id: 17,
    slug: "hak-asasi-narapidana",
    author: "Dr. Siti Nurjanah, S.H., M.H.",
    authorInitial: "S",
    readTime: "8 menit",
    views: 2109,
    tags: ["HAM", "Hak Asasi", "Perlindungan"],
    title: "Hak Asasi Narapidana dan Implementasinya",
    excerpt: "Pemahaman mendalam tentang hak asasi narapidana sesuai standar nasional dan internasional.",
    image: "/images/blog-2.jpg",
    publishDate: "2023-12-20",
    category: "Hukum"
  },
  {
    id: 18,
    slug: "inovasi-layanan-masyarakat",
    author: "Dra. Dewi Lestari, M.Sos.",
    authorInitial: "D",
    readTime: "6 menit",
    views: 1456,
    tags: ["Inovasi", "Layanan", "Masyarakat"],
    title: "Inovasi Layanan untuk Masyarakat",
    excerpt: "Program-program inovatif yang dapat meningkatkan partisipasi masyarakat dalam mendukung sistem pemasyarakatan.",
    image: "/images/blog-3.jpg",
    publishDate: "2023-12-15",
    category: "Inovasi"
  }
]

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [currentPage, setCurrentPage] = useState(1)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set(posts.flatMap(post => post.tags))
    return Array.from(tags).sort()
  }, [])

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set(posts.map(post => post.category))
    return ["Semua", ...Array.from(categories).sort()]
  }, [])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    return filtered
  }, [searchQuery, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE)
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    return filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [filteredAndSortedPosts, currentPage])

  // Reset page when filters change
  const handleFilterChange = (setter: (value: any) => void) => (value: any) => {
    setter(value)
    setCurrentPage(1)
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        .blog-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--background, #fff);
          color: var(--foreground, #1B2A4A);
          min-height: 100vh;
        }

        /* Hero section */
        .blog-hero {
          background: linear-gradient(135deg, #1B3A6B 0%, #2C4F7C 100%);
          position: relative;
          overflow: hidden;
        }

        .blog-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .blog-hero-content {
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
      <div className="blog-root">
        {/* Hero Section */}
        <section className="blog-hero py-20">
          <div className="blog-hero-content max-w-7xl mx-auto px-4">
            <Link href="/" className="back-button">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>

            <div className="text-center text-white">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                Tulisan Editorial
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Blog POLTEKIMIPAS
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Tulisan editorial dan opini dari para dosen, staf, dan civitas akademika POLTEKIMIPAS.
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
                  <span className="text-sm font-medium text-navy">Cari Blog:</span>
                </div>
                <div className="relative">
                  <Search className="search-icon h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Cari artikel berdasarkan judul, penulis, atau konten..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => handleFilterChange(setSearchQuery)(e.target.value)}
                  />
                </div>
              </div>

              {/* Tag Filter Section */}
              <div className="border-t pt-6" style={{ borderColor: "#e5e7eb" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-navy" />
                  <span className="text-sm font-medium text-navy">Filter Kategori:</span>
                </div>
                <div className="category-filters">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => handleFilterChange(setSelectedCategory)(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground mt-4">
                Menampilkan {currentPosts.length} dari {filteredAndSortedPosts.length} artikel
                {searchQuery && ` untuk "${searchQuery}"`}
                {selectedCategory !== "Semua" && ` di kategori "${selectedCategory}"`}
              </div>
            </div>
          </div>
        </section>
        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {currentPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {currentPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-200">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-lg">
                            {post.authorInitial}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                              <User className="h-4 w-4 text-gray-500" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.publishDate).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views.toLocaleString('id-ID')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-2xl font-bold text-gray-900 mb-4 leading-tight"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="pt-4 border-t border-gray-100">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors group"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                  Tidak ada artikel yang ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba ubah kata kunci pencarian atau filter kategori untuk menemukan artikel yang Anda cari.
                </p>
                {(searchQuery || selectedCategory !== "Semua") && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("Semua")
                      setCurrentPage(1)
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-muted transition-colors mt-4"
                  >
                    <Filter className="h-4 w-4" />
                    Reset Filter
                  </button>
                )}
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
