"use client"

import { Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: 1,
    slug: "transformasi-digital-sistem-pemasyarakatan",
    author: "Dr. Haryono, M.Si.",
    authorInitial: "H",
    readTime: "5 menit",
    tags: ["Pemasyarakatan", "Opini"],
    title: "Transformasi Digital dalam Sistem Pemasyarakatan Indonesia",
    excerpt:
      "Perkembangan teknologi digital membawa perubahan signifikan dalam tata kelola lembaga pemasyarakatan. Artikel ini membahas tantangan dan peluang digitalisasi.",
  },
  {
    id: 2,
    slug: "pendekatan-humanis-bimbingan-kemasyarakatan",
    author: "Dra. Siti Rahayu, M.Hum.",
    authorInitial: "S",
    readTime: "7 menit",
    tags: ["Pendidikan", "Rehabilitasi"],
    title: "Pendekatan Humanis dalam Bimbingan Kemasyarakatan",
    excerpt:
      "Menggali lebih dalam tentang pentingnya pendekatan humanis dalam proses rehabilitasi dan reintegrasi sosial bagi warga binaan pemasyarakatan.",
  },
  {
    id: 3,
    slug: "urgensi-pembaruan-regulasi-pemasyarakatan",
    author: "Bambang Supriyadi, S.H., M.H.",
    authorInitial: "B",
    readTime: "4 menit",
    tags: ["Hukum", "Kebijakan"],
    title: "Urgensi Pembaruan Regulasi Pemasyarakatan di Era Modern",
    excerpt:
      "Mengkaji kebutuhan pembaruan regulasi pemasyarakatan untuk mengakomodasi perkembangan hukum dan hak asasi manusia secara global.",
  },
  {
    id: 4,
    slug: "implementasi-smart-prison-konsep-dan-tantangan",
    author: "Dr. Ahmad Fauzi, M.T.",
    authorInitial: "A",
    readTime: "6 menit",
    tags: ["Teknologi", "Keamanan"],
    title: "Implementasi Smart Prison: Konsep dan Tantangan",
    excerpt:
      "Membahas konsep smart prison yang memanfaatkan IoT dan AI untuk meningkatkan efisiensi pengelolaan lembaga pemasyarakatan.",
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Tulisan & Opini
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Blog
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tulisan editorial dan opini dari para dosen, staf, dan civitas akademika POLTEKIMIPAS.
          </p>
        </div>

        {/* Blog grid */}
        <div className="scroll-reveal grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-primary-foreground">
                  {post.authorInitial}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime} baca
                  </div>
                </div>
              </div>

              <h3
                className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-navy"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {post.title}
              </h3>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-navy/5 px-2.5 py-0.5 text-[11px] font-medium text-navy"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-gold"
                >
                  Baca
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="scroll-reveal mt-10 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
          >
            Lihat Semua Blog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
