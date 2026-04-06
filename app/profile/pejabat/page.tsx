"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, Mail, Phone, Award, Loader2 } from "lucide-react"

type DataPejabat = {
  idPejabat: number
  nama: string
  jabatan: string
  singkatan: string
  email: string
  telepon: string
  bidangList: string[]
  fotoUrl: string | null
  urutan: number
  aktif: boolean
}

function isRektor(jabatan: string) {
  const j = jabatan.toLowerCase()
  return j.includes("rektor") && !j.includes("wakil")
}

function AvatarPimpinan({ inisial, isUtama }: { inisial: string; isUtama: boolean }) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center ${isUtama ? "bg-gradient-to-br from-[#1b3a6b] via-[#1e4882] to-[#0a1e3d]" : "bg-gradient-to-br from-[#f0f4f9] via-[#e8eef6] to-[#dce5f0]"}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-10 ${isUtama ? "bg-[#c9a34f]" : "bg-[#1b3a6b]"}`} />
        <div className={`absolute -bottom-4 -left-4 h-20 w-20 rounded-full opacity-10 ${isUtama ? "bg-white" : "bg-[#1b3a6b]"}`} />
      </div>
      <span className={`relative z-10 text-4xl font-extrabold tracking-tight ${isUtama ? "text-[#c9a34f]" : "text-[#1b3a6b]"}`} style={{ fontFamily: "var(--font-poppins)" }}>
        {inisial}
      </span>
    </div>
  )
}

function KartuPimpinan({ item, utama }: { item: DataPejabat; utama: boolean }) {
  const inisial = item.singkatan ||
    item.nama.split(" ").filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase()

  return (
    <article className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${utama ? "border-[#c9a34f]/30 bg-white shadow-lg shadow-[#1b3a6b]/10" : "border-[#e2e8f0] bg-white shadow-sm"}`}>
      <div className={`h-1 w-full ${utama ? "bg-gradient-to-r from-[#c9a34f] via-[#e8c97a] to-[#c9a34f]" : "bg-gradient-to-r from-[#1b3a6b] to-[#2a5298]"}`} />
      <div className={`relative overflow-hidden ${utama ? "h-64" : "h-52"}`}>
        {item.fotoUrl
          ? <img src={item.fotoUrl} alt={item.nama} className="h-full w-full object-cover object-top" />
          : <AvatarPimpinan inisial={inisial} isUtama={utama} />
        }
        {utama && (
          <div className="absolute bottom-3 left-3 right-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a34f] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
              <Award className="h-3 w-3" /> Pimpinan Tertinggi
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className={`font-bold leading-snug text-[#0f2240] ${utama ? "text-lg" : "text-base"}`} style={{ fontFamily: "var(--font-poppins)" }}>
          {item.nama}
        </h2>
        <p className={`mt-1 font-semibold ${utama ? "text-[#b68a2f] text-sm" : "text-[#1b3a6b] text-xs"}`}>
          {item.jabatan}
        </p>

        {item.bidangList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.bidangList.map((b) => (
              <span key={b} className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${utama ? "bg-amber-50 text-amber-700" : "bg-[#f0f4fb] text-[#1b3a6b]"}`}>{b}</span>
            ))}
          </div>
        )}

        {(item.email || item.telepon) && (
          <div className="mt-4 space-y-1.5 border-t border-[#f0f4f9] pt-4">
            {item.email && (
              <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-xs text-[#5a6b7f] hover:text-[#1b3a6b] transition-colors">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#8a97aa]" />
                {item.email}
              </a>
            )}
            {item.telepon && (
              <div className="flex items-center gap-2 text-xs text-[#5a6b7f]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#8a97aa]" />
                {item.telepon}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function ProfilPejabatPage() {
  const [daftar, setDaftar] = useState<DataPejabat[]>([])
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/publik/pejabat")
      .then((r) => r.json())
      .then((p) => setDaftar(p?.data ?? []))
      .catch(() => setError("Gagal memuat data pejabat."))
      .finally(() => setMemuat(false))
  }, [])

  const rektor = daftar.filter((p) => isRektor(p.jabatan))
  const lainnya = daftar.filter((p) => !isRektor(p.jabatan))

  return (
    <main className="min-h-screen bg-[#f4f7fb] pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="mb-8 flex items-center gap-2 text-sm text-[#8a97aa]">
          <Link href="/" className="hover:text-[#1b3a6b] transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/profile" className="hover:text-[#1b3a6b] transition-colors">Profil</Link>
          <span>/</span>
          <span className="text-[#1b2a4a] font-medium">Pejabat</span>
        </div>

        <section className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a34f]/30 bg-[#c9a34f]/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#9a7a2c]">
            <Building2 className="h-3.5 w-3.5" /> Profil Pejabat
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0f2240] md:text-5xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Pejabat <span className="text-[#1b3a6b]">POLTEKIMIPAS</span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#c9a34f] to-[#e8c97a]" />
          <p className="mx-auto mt-4 max-w-2xl text-[#5a6b7f] md:text-base">
            Jajaran pimpinan dan pejabat POLTEKIMIPAS yang berdedikasi dalam memimpin institusi menuju keunggulan akademik dan profesionalisme.
          </p>
        </section>

        {memuat ? (
          <div className="flex items-center justify-center gap-3 py-20 text-[#8a97aa]">
            <Loader2 className="h-6 w-6 animate-spin text-[#1b3a6b]" />
            <span>Memuat data pejabat...</span>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] px-6 py-10 text-center text-sm text-[#b42318]">{error}</div>
        ) : daftar.length === 0 ? (
          <div className="rounded-2xl border border-[#e5ebf3] bg-white px-6 py-16 text-center text-sm text-[#8a97aa]">
            Data pejabat belum tersedia.
          </div>
        ) : (
          <>
            {rektor.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#c9a34f]/40 to-transparent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#c9a34f]">Pimpinan Utama</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#c9a34f]/40 to-transparent" />
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <KartuPimpinan item={rektor[0]} utama={true} />
                  </div>
                </div>
              </section>
            )}

            {lainnya.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#1b3a6b]/30 to-transparent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1b3a6b]">Wakil Rektor & Direktur</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#1b3a6b]/30 to-transparent" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {lainnya.map((item) => <KartuPimpinan key={item.idPejabat} item={item} utama={false} />)}
                </div>
              </section>
            )}
          </>
        )}

        <div className="mt-12 flex justify-center">
          <Link href="/profile" className="inline-flex items-center gap-2 rounded-xl border border-[#d6dde6] bg-white px-5 py-2.5 text-sm font-medium text-[#1b2a4a] shadow-sm transition hover:border-[#1b3a6b] hover:text-[#1b3a6b]">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Profil
          </Link>
        </div>
      </div>
    </main>
  )
}
