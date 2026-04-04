"use client"

import { Shield, Wrench, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const jurusan = [
  {
    icon: Shield,
    title: "Jurusan Keimigrasian",
    description:
      "Program studi yang mempersiapkan tenaga profesional di bidang keimigrasian dengan 3 program studi unggulan.",
    programCount: "3 Program Studi",
  },
  {
    icon: Users,
    title: "Jurusan Pemasyarakatan",
    description:
      "Program studi yang menghasilkan tenaga ahli di bidang pemasyarakatan dengan 3 program studi terakreditasi.",
    programCount: "3 Program Studi",
  },
]

export default function Programs() {
  return (
    <section id="program-studi" className="py-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Akademik
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Jurusan
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            POLTEKIMIPAS menyelenggarakan dua jurusan unggulan yang
            dirancang untuk menghasilkan tenaga profesional di bidang keimigrasian dan pemasyarakatan.
          </p>
        </div>

        {/* Jurusan Cards */}
        <div className="scroll-reveal grid gap-8 md:grid-cols-2">
          {jurusan.map((item, i) => (
            <div
              key={i}
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-navy text-primary-foreground transition-colors group-hover:bg-gold group-hover:text-navy-dark">
                <item.icon className="h-8 w-8" />
              </div>

              <h3
                className="mb-4 text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {item.title}
              </h3>

              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold">
                  {item.programCount}
                </span>
              </div>

              <Link href="/program-studi" className="group/btn inline-flex items-center gap-2 text-base font-semibold text-navy transition-colors hover:text-gold">
                Baca Selengkapnya
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
