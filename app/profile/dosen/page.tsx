"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, ChevronRight, Mail, Loader2 } from "lucide-react"

type DataDosen = {
  idDosen: number
  slug: string
  nama: string
  gelar: string
  jabatan: string
  bidangKeahlianList: string[]
  deskripsi: string
  email: string
  fotoUrl: string | null
  jurnalList: { id: number; judul: string; tahun: string }[]
}

function AvatarDosen({ nama }: { nama: string }) {
  const inisial = nama.split(" ").map((item) => item[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#f2e7cb] via-[#e7d4a5] to-[#c9a84c] text-4xl font-bold text-[#0f2647]">
      {inisial}
    </div>
  )
}

export default function ProfilDosenPage() {
  const [daftar, setDaftar] = useState<DataDosen[]>([])
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/publik/dosen")
      .then((r) => r.json())
      .then((p) => setDaftar(p?.data ?? []))
      .catch(() => setError("Gagal memuat data dosen."))
      .finally(() => setMemuat(false))
  }, [])

  return (
    <main className="min-h-screen bg-cream pb-16 pt-24">
      <div className="mx-auto max-w-7xl px-4">
        <Link href="/profile" className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-gold/60 hover:text-navy">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Profil
        </Link>

        <section className="mb-10 rounded-2xl bg-gradient-to-r from-[#0f2647] via-[#1b3a6b] to-[#2a5298] p-8 text-primary-foreground shadow-xl">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#f3d88e] uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            Direktori Akademik
          </p>
          <h1 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Profil Dosen POLTEKIMIPAS
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            Informasi singkat dosen dan kontribusi publikasi ilmiah. Klik kartu dosen untuk melihat daftar jurnal yang sudah diterbitkan.
          </p>
        </section>

        {memuat ? (
          <div className="flex items-center justify-center gap-3 py-20 text-[#8a97aa]">
            <Loader2 className="h-6 w-6 animate-spin text-[#1b3a6b]" />
            <span>Memuat data dosen...</span>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] px-6 py-10 text-center text-sm text-[#b42318]">{error}</div>
        ) : daftar.length === 0 ? (
          <div className="rounded-2xl border border-[#e5ebf3] bg-white px-6 py-16 text-center text-sm text-[#8a97aa]">
            Data dosen belum tersedia.
          </div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {daftar.map((dosen) => (
              <article key={dosen.idDosen} className="group overflow-hidden rounded-2xl border border-[#e1e7f0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-2xl">
                {dosen.fotoUrl
                  ? <img src={dosen.fotoUrl} alt={dosen.nama} className="h-52 w-full object-cover" />
                  : <AvatarDosen nama={dosen.nama} />
                }

                <div className="space-y-3 p-5">
                  <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
                    {dosen.gelar} {dosen.nama}
                  </h2>
                  <p className="text-sm font-medium text-gold">{dosen.jabatan}</p>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{dosen.deskripsi}</p>

                  {dosen.email && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                      <Mail className="h-3.5 w-3.5 text-navy shrink-0" />
                      <span className="break-all min-w-0">{dosen.email}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {dosen.bidangKeahlianList.slice(0, 2).map((bidang) => (
                      <span key={bidang} className="rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy">
                        {bidang}
                      </span>
                    ))}
                  </div>

                  {dosen.jurnalList.length > 0 && (
                    <Link href={`/profile/dosen/${dosen.slug}`} className="inline-flex items-center gap-1.5 rounded-lg border border-navy px-3 py-2 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground">
                      Lihat {dosen.jurnalList.length} Jurnal
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
