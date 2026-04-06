"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Shield } from "lucide-react"

const milestones = [
  { year: "1962", text: "Lembaga pendidikan pemasyarakatan mulai dibentuk sebagai fondasi SDM profesional." },
  { year: "1998", text: "Transformasi kelembagaan menjadi Akademi Ilmu Pemasyarakatan (AKIP)." },
  { year: "2012", text: "Penguatan mandat vokasi dan profesi dalam rumpun keimigrasian-pemasyarakatan." },
  { year: "2024", text: "Penyesuaian tata kelola kelembagaan di bawah Kementerian Imigrasi dan Pemasyarakatan RI." },
]

export default function ProfilSejarahPage() {
  return (
    <main className="min-h-screen bg-cream pb-16 pt-24">
      <div className="mx-auto max-w-5xl px-4">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-gold/60 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Profil
        </Link>

        <section className="rounded-2xl border border-[#dbe4f0] bg-white p-8 shadow-sm">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-wider text-gold uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            Sejarah Institusi
          </p>
          <h1 className="mb-7 text-3xl font-bold text-navy md:text-4xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Perjalanan POLTEKIMIPAS
          </h1>

          <div className="relative ml-3 border-l-2 border-gold/35 pl-8">
            {milestones.map((item) => (
              <article key={item.year} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy-dark">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm font-bold tracking-wider text-gold">{item.year}</p>
                <p className="mt-1 leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

