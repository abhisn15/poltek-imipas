"use client"

import React, { useState, useEffect, use } from "react"
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
  User,
  BookOpen,
  Eye,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// ─── Type definitions ─────────────────────────────────────────────────────
type ContentSection = 
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level: number }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; source?: string }

type BlogPost = {
  id: number
  slug: string
  category: string
  date: string
  readTime: string
  views: number
  title: string
  subtitle: string
  image: string
  author: {
    name: string
    role: string
    initial: string
  }
  tags: string[]
  content: ContentSection[]
}

// ─── Mock blog data (replace with real fetch by slug) ─────────────────────
const posts: Record<string, BlogPost> = {
  "transformasi-digital-sistem-pemasyarakatan": {
    id: 1,
    slug: "transformasi-digital-sistem-pemasyarakatan",
    category: "Teknologi",
    date: "15 Maret 2024",
    readTime: "5 menit",
    views: 2456,
    title: "Transformasi Digital dalam Sistem Pemasyarakatan Indonesia",
    subtitle: "Perkembangan teknologi digital membawa perubahan signifikan dalam tata kelola lembaga pemasyarakatan.",
    image: "/images/blog-1.jpg",
    author: {
      name: "Dr. Haryono, M.Si.",
      role: "Ahli Teknologi Pemasyarakatan",
      initial: "H",
    },
    tags: ["Pemasyarakatan", "Teknologi", "Digitalisasi"],
    content: [
      {
        type: "paragraph",
        text: "Perkembangan teknologi digital telah membawa perubahan signifikan dalam berbagai aspek kehidupan, termasuk dalam tata kelola lembaga pemasyarakatan. Transformasi digital di sistem pemasyarakatan Indonesia bukan lagi menjadi pilihan, melainkan keharusan untuk meningkatkan efektivitas dan efisiensi.",
      },
      {
        type: "heading",
        text: "Tantangan Digitalisasi",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Beberapa tantangan utama dalam implementasi digitalisasi pemasyarakatan antara lain:",
      },
      {
        type: "list",
        items: [
          "Keterbatasan infrastruktur teknologi di beberapa wilayah",
          "Kebutuhan pelatihan sumber daya manusia yang memadai",
          "Aspek keamanan data dan privasi narapidana",
          "Integrasi sistem yang sudah ada dengan teknologi baru",
        ],
      },
      {
        type: "heading",
        text: "Peluang dan Manfaat",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Di sisi lain, digitalisasi membawa banyak peluang positif:",
      },
      {
        type: "list",
        items: [
          "Peningkatan transparansi dan akuntabilitas",
          "Optimalisasi manajemen data narapidana",
          "Mempermudah proses rehabilitasi melalui e-learning",
          "Efisiensi dalam administrasi dan pelaporan",
        ],
      },
      {
        type: "quote",
        text: "Transformasi digital dalam sistem pemasyarakatan merupakan langkah strategis yang perlu diimplementasikan secara bertahap.",
        source: "Dr. Haryono, M.Si.",
      },
    ],
  },
  "pendekatan-humanis-bimbingan-kemasyarakatan": {
    id: 2,
    slug: "pendekatan-humanis-bimbingan-kemasyarakatan",
    category: "Pendidikan",
    date: "10 Maret 2024",
    readTime: "7 menit",
    views: 1892,
    title: "Pendekatan Humanis dalam Bimbingan Kemasyarakatan",
    subtitle: "Menggali lebih dalam tentang pentingnya pendekatan humanis dalam proses rehabilitasi.",
    image: "/images/blog-2.jpg",
    author: {
      name: "Dra. Siti Rahayu, M.Hum.",
      role: "Konselor Rehabilitasi",
      initial: "S",
    },
    tags: ["Pendidikan", "Rehabilitasi", "Psikologi"],
    content: [
      {
        type: "paragraph",
        text: "Pendekatan humanis dalam bimbingan kemasyarakatan merupakan paradigma penting yang menempatkan martabat dan hak asasi manusia sebagai fondasi utama dalam proses rehabilitasi narapidana.",
      },
      {
        type: "heading",
        text: "Konsep Humanisme dalam Pemasyarakatan",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Humanisme dalam konteks pemasyarakatan mengakui bahwa setiap individu, termasuk narapidana, memiliki potensi untuk berubah dan berkembang menjadi pribadi yang lebih baik.",
      },
    ],
  },
}

// Related posts for sidebar
const relatedPosts = [
  {
    id: 1,
    title: "Implementasi Smart Prison di Indonesia",
    category: "Teknologi",
    date: "5 Maret 2024",
    readTime: "4 menit",
    slug: "implementasi-smart-prison",
  },
  {
    id: 2,
    title: "Rehabilitasi Sosial Era Digital",
    category: "Pendidikan",
    date: "1 Maret 2024",
    readTime: "6 menit",
    slug: "rehabilitasi-sosial-digital",
  },
  {
    id: 3,
    title: "Tantangan Sistem Pemasyarakatan Modern",
    category: "Kebijakan",
    date: "25 Februari 2024",
    readTime: "5 menit",
    slug: "tantangan-sistem-modern",
  },
]

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [copied, setCopied] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Get post based on slug
  const post = posts[resolvedParams.slug as keyof typeof posts]

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

  // If post not found, show 404
  if (!post) {
    return notFound()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        .blog-detail-root {
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
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .breadcrumb a {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb a:hover {
          color: #1B3A6B;
        }

        .breadcrumb-sep {
          color: #d1d5db;
        }

        /* Category badge */
        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(201, 168, 76, 0.1);
          color: #C9A84C;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        /* Author card */
        .author-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1B3A6B, #2C4F7C);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
        }

        /* Sidebar card */
        .sidebar-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .sidebar-sticky {
          position: sticky;
          top: 100px;
        }

        /* Related post */
        .related-post {
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .related-post:last-child {
          border-bottom: none;
        }

        .related-post:hover {
          padding-left: 8px;
        }

        .related-post-title {
          font-weight: 600;
          color: #1B3A6B;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .related-post-meta {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 8px;
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

        /* Content styling */
        .content-paragraph {
          margin-bottom: 16px;
          line-height: 1.7;
          color: #374151;
        }

        .content-heading {
          font-size: 24px;
          font-weight: 600;
          color: #1B3A6B;
          margin: 32px 0 16px 0;
        }

        .content-list {
          margin: 16px 0;
          padding-left: 24px;
        }

        .content-list li {
          margin-bottom: 8px;
          line-height: 1.6;
          color: #374151;
        }

        .article-quote {
          border-left: 3px solid #C9A84C;
          background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(27,58,107,0.04) 100%);
          border-radius: 0 12px 12px 0;
          padding: 20px 25px;
          margin: 28px 0;
        }

        .article-quote p {
          font-family: 'DM Serif Display', serif;
          font-size: 19px;
          font-style: italic;
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

      <div className="blog-detail-root">
        {/* Top spacing for fixed navbar */}
        <div style={{ height: "80px" }} />

        <div className="mx-auto max-w-7xl px-4 py-10">

          {/* Breadcrumb + back */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Beranda</a>
              <ChevronRight className="breadcrumb-sep h-3.5 w-3.5" />
              <a href="/blog">Blog</a>
              <ChevronRight className="breadcrumb-sep h-3.5 w-3.5" />
              <span style={{ color: "#1B3A6B", fontWeight: 600, maxWidth: 220 }} className="truncate">
                {post.title}
              </span>
            </nav>
            <a href="/blog" className="back-btn">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </a>
          </div>

          {/* Main layout */}
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

            {/* ─── Left: Article ───────────────────────────────────── */}
            <article>
              {/* Meta */}
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="category-badge">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground" style={{ color: "#5A6B7F" }}>
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground" style={{ color: "#5A6B7F" }}>
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} baca
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground" style={{ color: "#5A6B7F" }}>
                  <Eye className="h-3.5 w-3.5" />
                  {post.views.toLocaleString('id-ID')} dilihat
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
                {post.title}
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: "17px", lineHeight: 1.65, color: "#5A6B7F", marginBottom: "28px" }}>
                {post.subtitle}
              </p>

              {/* Content */}
              <div style={{ fontSize: "16px", lineHeight: 1.7 }}>
                {post.content.map((section, index) => {
                  switch (section.type) {
                    case 'paragraph':
                      return (
                        <p key={index} className="content-paragraph">
                          {section.text}
                        </p>
                      )
                    case 'heading':
                      return (
                        <h3 key={index} className="content-heading">
                          {section.text}
                        </h3>
                      )
                    case 'list':
                      return (
                        <ul key={index} className="content-list">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      )
                    case 'quote':
                      return (
                        <blockquote key={index} className="article-quote">
                          <p>&ldquo;{section.text}&rdquo;</p>
                          <cite>— {section.source ?? "Sumber tidak diketahui"}</cite>
                        </blockquote>
                      )
                    default:
                      return null
                  }
                })}
              </div>

              {/* Tags */}
              <div className="mb-8">
                <div className="section-label">
                  <BookOpen className="h-3.5 w-3.5" />
                  Topik
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <a key={tag} href={`/blog?tag=${tag}`} className="tag-pill">
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
                    Bagikan blog ini
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
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
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

            {/* ─── Right: Sidebar ───────────────────────────────────── */}
            <aside className="sidebar-sticky flex flex-col gap-6">
              {/* Author Card */}
              <div className="sidebar-card">
                <div className="section-label">
                  <User className="h-3 w-3" />
                  Penulis
                </div>
                <div className="text-center">
                  <div 
                    className="author-avatar mx-auto mb-3"
                    style={{ width: "64px", height: "64px", fontSize: "24px" }}
                  >
                    {post.author.initial}
                  </div>
                  <h3 style={{ fontWeight: 600, color: "#1B3A6B", marginBottom: "4px" }}>
                    {post.author.name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>
                    {post.author.role}
                  </p>
                </div>
              </div>

              {/* Related Posts */}
              <div className="sidebar-card">
                <div className="section-label">
                  <BookOpen className="h-3 w-3" />
                  Blog Terkait
                </div>
                <div className="space-y-0">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="related-post">
                      <h4 className="related-post-title">
                        {relatedPost.title}
                      </h4>
                      <div className="related-post-meta">
                        <span>{relatedPost.category}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="sidebar-card">
                <div className="section-label">
                  <MessageSquare className="h-3 w-3" />
                  Newsletter
                </div>
                <p style={{ 
                  fontSize: "14px", 
                  color: "#6b7280", 
                  marginBottom: "16px",
                  lineHeight: 1.5 
                }}>
                  Dapatkan blog terbaru langsung di inbox Anda
                </p>
                <div>
                  <input
                    type="email"
                    placeholder="Email Anda"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                      marginBottom: "12px",
                    }}
                  />
                  <button
                    style={{
                      width: "100%",
                      background: "#C9A84C",
                      color: "#1B3A6B",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#b8943f"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#C9A84C"}
                  >
                    Dapatkan Update
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
