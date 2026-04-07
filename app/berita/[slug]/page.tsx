import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Eye, Tag } from "lucide-react"

import { ambilBeritaTerkait, ambilDetailBeritaPublik } from "@/lib/layanan-berita"
import { sanitasiHtmlBerita } from "@/lib/sanitasi-html-berita"
import { formatTanggalIndonesia } from "@/lib/teks"

type HalamanDetailProps = {
  params: Promise<{ slug: string }>
}

function escapeHtml(teks: string): string {
  return teks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function konversiTeksBiasaKeHtml(teks: string): string {
  return teks
    .split(/\n\s*\n/g)
    .map((paragraf) => paragraf.trim())
    .filter(Boolean)
    .map((paragraf) => `<p>${escapeHtml(paragraf).replace(/\n/g, "<br/>")}</p>`)
    .join("")
}

export default async function BeritaDetailPage({ params }: HalamanDetailProps) {
  const { slug } = await params
  const berita = await ambilDetailBeritaPublik(slug, { naikkanDilihat: true })

  if (!berita) {
    notFound()
  }

  const beritaTerkait = await ambilBeritaTerkait({
    kategori: berita.kategori,
    slugAktif: berita.slug,
    batas: 3,
  })

  const isiMentah = berita.isiPenuh?.trim() || ""
  const berisiTagHtml = /<\/?[a-z][\s\S]*>/i.test(isiMentah)
  const isiHtmlMentah = berisiTagHtml ? isiMentah : konversiTeksBiasaKeHtml(isiMentah || berita.ringkasan)
  const isiHtmlAman = sanitasiHtmlBerita(isiHtmlMentah)

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#1b2a4a]">
      <section className="bg-gradient-to-br from-[#123765] to-[#1f4776] pb-12 pt-28 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <Link href="/berita" className="mb-6 inline-flex items-center gap-2 text-sm text-white/85 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke daftar berita
          </Link>

          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-white/85">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#c9a84c] px-3 py-1 font-semibold text-[#0f2647]">
              <Tag className="h-3 w-3" />
              {berita.kategori}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatTanggalIndonesia(berita.tanggalTerbit)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {berita.jumlahDilihat.toLocaleString("id-ID")} dibaca
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{berita.judul}</h1>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/90 md:text-base">{berita.ringkasan}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
        <article className="rounded-2xl border border-[#d6dde6] bg-white p-6 shadow-sm">
          {berita.gambarUrl ? (
            <img
              src={berita.gambarUrl}
              alt={berita.judul}
              className="mb-6 h-72 w-full rounded-xl object-cover md:h-96"
            />
          ) : null}

          <style>{`
            .konten-berita-editor h2 {
              margin: 1.3rem 0 0.7rem;
              font-size: 1.25rem;
              font-weight: 700;
              color: #1b2a4a;
            }
            .konten-berita-editor h3 {
              margin: 1rem 0 0.6rem;
              font-size: 1.1rem;
              font-weight: 700;
              color: #1b2a4a;
            }
            .konten-berita-editor p {
              margin-bottom: 0.8rem;
            }
            .konten-berita-editor ul,
            .konten-berita-editor ol {
              margin: 0.6rem 0 0.9rem;
              padding-left: 1.2rem;
            }
            .konten-berita-editor ul {
              list-style: disc;
            }
            .konten-berita-editor ol {
              list-style: decimal;
            }
            .konten-berita-editor blockquote {
              margin: 1rem 0;
              border-left: 3px solid #c9a84c;
              background: #f8fbff;
              padding: 0.7rem 1rem;
              color: #355171;
              border-radius: 0 0.6rem 0.6rem 0;
            }
            .konten-berita-editor img {
              width: 100%;
              border-radius: 0.8rem;
              margin: 0.8rem 0;
              border: 1px solid #e5ebf4;
            }
            .konten-berita-editor hr {
              margin: 1.1rem 0;
              border: 0;
              border-top: 1px solid #dbe3ef;
            }
            .konten-berita-editor pre {
              margin: 0.9rem 0;
              overflow-x: auto;
              border-radius: 0.65rem;
              background: #0f2647;
              color: #eef4ff;
              padding: 0.8rem 0.95rem;
              font-size: 0.86rem;
              line-height: 1.5;
            }
            .konten-berita-editor code {
              border-radius: 0.35rem;
              background: #eef3fb;
              padding: 0.15rem 0.35rem;
              color: #1b3a6b;
              font-size: 0.86em;
            }
            .konten-berita-editor pre code {
              background: transparent;
              padding: 0;
              color: inherit;
            }
            .konten-berita-editor table {
              margin: 1rem 0;
              width: 100%;
              border-collapse: collapse;
              border: 1px solid #dbe3ef;
            }
            .konten-berita-editor th,
            .konten-berita-editor td {
              border: 1px solid #dbe3ef;
              padding: 0.55rem 0.65rem;
              vertical-align: top;
            }
            .konten-berita-editor th {
              background: #f3f7fd;
              font-weight: 700;
              color: #1b2a4a;
            }
            .konten-berita-editor mark {
              background: #fff1c2;
              color: #1b2a4a;
              padding: 0 0.15rem;
              border-radius: 0.2rem;
            }
            .konten-berita-editor a {
              color: #1b3a6b;
              text-decoration: underline;
            }
          `}</style>

          <div
            className="konten-berita-editor text-[15px] leading-8 text-[#334a69]"
            dangerouslySetInnerHTML={{ __html: isiHtmlAman }}
          />

          {berita.tagList.length > 0 && (
            <div className="mt-7 border-t border-[#e6ebf2] pt-5">
              <h3 className="mb-3 text-sm font-semibold text-[#1b2a4a]">Tag berita</h3>
              <div className="flex flex-wrap gap-2">
                {berita.tagList.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#edf2fb] px-2 py-0.5 text-xs text-[#1b3a6b]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#d6dde6] bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-[#1b2a4a]">Informasi Artikel</h2>
            <div className="space-y-2 text-xs text-[#5a6b7f]">
              <p>Penulis: {berita.penulis}</p>
              <p>Estimasi baca: {berita.estimasiBacaMenit} menit</p>
              <p>Status: {berita.statusPublikasi}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d6dde6] bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-[#1b2a4a]">Berita Terkait</h2>
            {beritaTerkait.length === 0 ? (
              <p className="text-xs text-[#5a6b7f]">Belum ada berita terkait.</p>
            ) : (
              <div className="space-y-3">
                {beritaTerkait.map((item) => (
                  <Link
                    key={item.idBerita}
                    href={`/berita/${item.slug}`}
                    className="block rounded-xl border border-[#e6ebf2] bg-[#fafcff] p-3 transition hover:border-[#c9a84c]/45"
                  >
                    <p className="line-clamp-2 text-sm font-semibold text-[#1b2a4a]">{item.judul}</p>
                    <p className="mt-1 text-xs text-[#5a6b7f]">{formatTanggalIndonesia(item.tanggalTerbit)}</p>
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/berita"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1b3a6b] hover:text-[#c9a84c]"
            >
              Lihat semua berita
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>
      </section>
    </div>
  )
}
