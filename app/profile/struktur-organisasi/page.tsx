"use client"

import Link from "next/link"
import { ArrowLeft, Building, Network } from "lucide-react"

export default function StrukturOrganisasiPage() {
  return (
    <main className="min-h-screen bg-cream pb-16 pt-24">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-gold/60 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Profil
        </Link>

        <section className="rounded-2xl border border-[#dbe4f0] bg-white p-8 shadow-sm">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-wider text-gold uppercase">
            <Network className="h-3.5 w-3.5" />
            Struktur Organisasi
          </p>
          <h1 className="mb-7 text-3xl font-bold text-navy md:text-4xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Struktur Organisasi POLTEKIMIPAS
          </h1>

          <div className="space-y-6">
            <div className="mx-auto max-w-sm rounded-xl border border-gold/35 bg-gold/10 p-4 text-center">
              <p className="text-xs font-semibold tracking-wider text-gold uppercase">Puncak Pimpinan</p>
              <h2 className="mt-1 text-xl font-bold text-navy">Rektor</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#dbe4f0] bg-[#fafcff] p-4 text-center">
                <Building className="mx-auto mb-2 h-5 w-5 text-navy" />
                <h3 className="font-semibold text-navy">Wakil Rektor Akademik</h3>
              </div>
              <div className="rounded-xl border border-[#dbe4f0] bg-[#fafcff] p-4 text-center">
                <Building className="mx-auto mb-2 h-5 w-5 text-navy" />
                <h3 className="font-semibold text-navy">Wakil Rektor Umum & Keuangan</h3>
              </div>
              <div className="rounded-xl border border-[#dbe4f0] bg-[#fafcff] p-4 text-center">
                <Building className="mx-auto mb-2 h-5 w-5 text-navy" />
                <h3 className="font-semibold text-navy">Wakil Rektor Kemahasiswaan</h3>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-[#dbe4f0] bg-white p-4 text-center text-sm font-medium text-muted-foreground">
                Biro Akademik
              </div>
              <div className="rounded-xl border border-[#dbe4f0] bg-white p-4 text-center text-sm font-medium text-muted-foreground">
                Biro Keuangan
              </div>
              <div className="rounded-xl border border-[#dbe4f0] bg-white p-4 text-center text-sm font-medium text-muted-foreground">
                Biro SDM
              </div>
              <div className="rounded-xl border border-[#dbe4f0] bg-white p-4 text-center text-sm font-medium text-muted-foreground">
                Biro Kemahasiswaan
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

