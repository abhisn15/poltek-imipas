"use client"

import Link from "next/link"
import { ArrowLeft, Building2, Users } from "lucide-react"

const menuProfil = [
  {
    title: "Pejabat",
    description: "Profil rektor, wakil rektor, dan jajaran pejabat kampus.",
    href: "/profile/pejabat",
    icon: Building2,
  },
  {
    title: "Dosen",
    description: "Direktori dosen dan daftar jurnal yang telah dipublikasikan.",
    href: "/profile/dosen",
    icon: Users,
  },
]

export default function ProfileIndexPage() {
  return (
    <main className="min-h-screen bg-cream pb-16 pt-24">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-gold/60 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <section className="mb-8 rounded-2xl bg-gradient-to-r from-[#0f2647] via-[#1b3a6b] to-[#2a5298] p-8 text-primary-foreground shadow-xl">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#f3d88e] uppercase">
            Profil Institusi
          </p>
          <h1 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Pusat Informasi Profil POLTEKIMIPAS
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            Halaman profil memuat dua fokus utama: profil pejabat kampus dan profil dosen beserta publikasi jurnal.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {menuProfil.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-[#dbe4f0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy transition-colors group-hover:bg-gold group-hover:text-navy-dark">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </Link>
            )
          })}
        </section>
      </div>
    </main>
  )
}
