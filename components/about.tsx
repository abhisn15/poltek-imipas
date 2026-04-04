"use client"

import { Shield, Target, Eye, BookOpen } from "lucide-react"

const milestones = [
  { year: "1964", text: "Didirikan sebagai lembaga pendidikan pemasyarakatan" },
  { year: "1998", text: "Menjadi Akademi Ilmu Pemasyarakatan (AKIP)" },
  { year: "2012", text: "Bertransformasi menjadi Politeknik Imigrasi Pemasyarakatan" },
  { year: "2024", text: "Berada di bawah Kementerian Imigrasi dan Pemasyarakatan RI" },
]

export default function About() {
  return (
    <section id="tentang" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest text-gold uppercase">
            Tentang Kami
          </span>
          <h2
            className="text-3xl font-bold text-navy md:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Profil Institusi
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
        </div>

        <div className="scroll-reveal grid gap-12 lg:grid-cols-2">
          {/* Left - Description */}
          <div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Politeknik Imigrasi Pemasyarakatan (POLTEKIMIPAS) adalah perguruan tinggi kedinasan
              yang berada di bawah naungan Kementerian Imigrasi dan Pemasyarakatan Republik
              Indonesia. Sejak didirikan pada tahun 1964, POLTEKIMIPAS telah mencetak ribuan
              lulusan yang berdedikasi dalam bidang pemasyarakatan dan bimbingan kemasyarakatan.
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Dengan mengusung tagline &ldquo;Cerdas, Berintegritas, Berdedikasi&rdquo;, POLTEKIMIPAS
              berkomitmen untuk menghasilkan sumber daya manusia yang profesional, berkarakter,
              dan siap menghadapi tantangan di era modern.
            </p>

            {/* Vision & Mission */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-primary-foreground">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground" style={{ fontFamily: "var(--font-poppins)" }}>
                  Visi
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Menjadi perguruan tinggi vokasi unggulan di bidang pemasyarakatan yang
                  menghasilkan lulusan profesional dan berintegritas.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-secondary p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-primary-foreground">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground" style={{ fontFamily: "var(--font-poppins)" }}>
                  Misi
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Menyelenggarakan pendidikan vokasi berkualitas, melaksanakan penelitian
                  terapan, dan pengabdian kepada masyarakat.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Timeline */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-poppins)" }}>
                Sejarah Singkat
              </h3>
            </div>

            <div className="relative ml-5 border-l-2 border-gold/30 pl-8">
              {milestones.map((item, i) => (
                <div key={i} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy-dark">
                    <Shield className="h-3 w-3" />
                  </div>
                  <div className="text-sm font-bold text-gold">{item.year}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
