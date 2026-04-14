"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, BookOpen, Calendar, FileText, Mail, MapPin } from "lucide-react"

type JurnalItem = {
  id: number
  judul: string
  tahun: string
  program: string
  ringkasan: string
  pdfUrl: string
}

type DataDosen = {
  idDosen: number
  slug: string
  nama: string
  gelar: string
  jabatan: string
  bidangKeahlianList: string[]
  deskripsi: string
  email: string
  ruang: string
  fotoUrl: string | null
  jurnalList: JurnalItem[]
}

function AvatarDosen({ nama }: { nama: string }) {
  const inisial = nama.split(" ").map((item) => item[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div className="flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br from-[#f2e7cb] via-[#e7d4a5] to-[#c9a84c] text-6xl font-bold text-[#0f2647]">
      {inisial}
    </div>
  )
}

export default function DetailDosenPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [dosen, setDosen] = useState<DataDosen | null>(null)
  const [memuat, setMemuat] = useState(true)
  const [tidak, setTidak] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/publik/dosen/${slug}`)
      .then((r) => {
        if (r.status === 404) { setTidak(true); return null }
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((p) => { if (p) setDosen(p?.data ?? null) })
      .catch(() => setTidak(true))
      .finally(() => setMemuat(false))
  }, [slug])

  if (memuat) {
    return (
      <main className="min-h-screen bg-cream pb-16 pt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 h-9 w-44 animate-pulse rounded-lg bg-[#e8edf6]" />

          <section className="mb-8 overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-lg">
            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="aspect-[4/3] max-h-[320px] animate-pulse bg-[#eef3fb] lg:max-h-none lg:aspect-auto" />
              <div className="space-y-4 p-5 sm:p-7">
                <div className="h-6 w-28 animate-pulse rounded-full bg-[#eef2f8]" />
                <div className="h-8 w-3/4 animate-pulse rounded bg-[#e8edf6]" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-[#eef2f8]" />
                <div className="h-16 w-full animate-pulse rounded bg-[#f2f5fb]" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-10 animate-pulse rounded-lg bg-[#f2f5fb]" />
                  <div className="h-10 animate-pulse rounded-lg bg-[#f2f5fb]" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-[#eef2f8]" />
                  <div className="h-6 w-24 animate-pulse rounded-full bg-[#eef2f8]" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-[#eef2f8]" />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#dbe4f0] bg-white p-6 shadow-sm">
            <div className="mb-5 h-7 w-64 animate-pulse rounded bg-[#e8edf6]" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, idx) => (
                <article key={idx} className="rounded-xl border border-border bg-[#fafcff] p-4">
                  <div className="mb-2 h-4 w-40 animate-pulse rounded bg-[#eef2f8]" />
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-[#e8edf6]" />
                  <div className="mb-3 h-10 w-full animate-pulse rounded bg-[#f2f5fb]" />
                  <div className="h-9 w-28 animate-pulse rounded-lg bg-[#eef2f8]" />
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    )
  }

  if (tidak || !dosen) {
    return (
      <main className="min-h-screen bg-cream pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-2xl font-bold text-[#1b2a4a]">Dosen tidak ditemukan</h1>
          <Link href="/profile/dosen" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-navy">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Profil Dosen
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream pb-16 pt-24">
      <div className="mx-auto max-w-6xl px-4">
        <Link href="/profile/dosen" className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-gold/60 hover:text-navy">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Profil Dosen
        </Link>

        <section className="mb-8 overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-lg">
          <div className="grid lg:grid-cols-[320px_1fr]">
            <div className="bg-[#f8fbff] aspect-[4/3] max-h-[320px] lg:max-h-none lg:aspect-auto overflow-hidden">
              {dosen.fotoUrl
                ? <img src={dosen.fotoUrl} alt={dosen.nama} className="h-full w-full object-cover" />
                : <AvatarDosen nama={dosen.nama} />
              }
            </div>

            <div className="p-5 sm:p-7">
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-wider text-gold uppercase">
                <BookOpen className="h-3.5 w-3.5" />
                Profil Dosen
              </p>
              <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
                {dosen.gelar} {dosen.nama}
              </h1>
              <p className="mt-2 text-sm font-semibold text-gold">{dosen.jabatan}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{dosen.deskripsi}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {dosen.email && (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-[#fafcff] px-3 py-2 text-sm text-muted-foreground min-w-0">
                    <Mail className="h-4 w-4 text-navy shrink-0" />
                    <span className="break-all min-w-0">{dosen.email}</span>
                  </div>
                )}
                {dosen.ruang && (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-[#fafcff] px-3 py-2 text-sm text-muted-foreground min-w-0">
                    <MapPin className="h-4 w-4 text-navy shrink-0" />
                    <span className="break-words min-w-0">{dosen.ruang}</span>
                  </div>
                )}
              </div>

              {dosen.bidangKeahlianList.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {dosen.bidangKeahlianList.map((bidang) => (
                    <span key={bidang} className="rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy">
                      {bidang}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {dosen.jurnalList.length > 0 && (
          <section className="rounded-2xl border border-[#dbe4f0] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
              Jurnal yang Sudah Dipublikasikan
            </h2>

            <div className="space-y-4">
              {dosen.jurnalList.map((item) => (
                <article key={item.id} className="rounded-xl border border-border bg-[#fafcff] p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {item.program && (
                      <span className="rounded-full bg-navy/10 px-2.5 py-1 font-medium text-navy">{item.program}</span>
                    )}
                    {item.tahun && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.tahun}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground">{item.judul}</h3>
                  {item.ringkasan && (
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{item.ringkasan}</p>
                  )}

                  {item.pdfUrl && (
                    <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gold px-3 py-2 text-sm font-semibold text-navy transition-all hover:bg-gold hover:text-primary-foreground"
                    >
                      <FileText className="h-4 w-4" />
                      Preview PDF
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
