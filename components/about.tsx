"use client"

import { Shield, Target, Eye, BookOpen, CheckCircle2 } from "lucide-react"

const milestones = [
  { year: "1962", text: "Didirikan sebagai lembaga pendidikan pemasyarakatan" },
  { year: "1998", text: "Menjadi Akademi Ilmu Pemasyarakatan (AKIP)" },
  { year: "2012", text: "Bertransformasi menjadi Politeknik Imigrasi Pemasyarakatan" },
  { year: "2024", text: "Berada di bawah Kementerian Imigrasi dan Pemasyarakatan RI" },
]

export default function About() {
  return (
    <section id="tentang" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="scroll-reveal mb-16 text-center max-w-3xl mx-auto">
          <span className="mb-3 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold tracking-wider text-gold uppercase">
            Tentang Kami
          </span>
          <h2
            className="text-3xl font-extrabold text-navy md:text-5xl tracking-tight mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Profil Institusi
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-gold to-yellow-500" />
        </div>

        <div className="scroll-reveal grid gap-12 lg:grid-cols-12 mb-16">
          {/* Left - Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-lg text-slate-600">
              <p className="leading-relaxed text-lg">
                <strong className="text-navy font-semibold">Politeknik Imigrasi Pemasyarakatan (POLTEKIMIPAS)</strong> adalah perguruan tinggi kedinasan
                yang berada di bawah naungan Kementerian Imigrasi dan Pemasyarakatan Republik
                Indonesia. Sejak didirikan pada tahun 1962, POLTEKIMIPAS telah mencetak ribuan
                lulusan yang berdedikasi dalam bidang pemasyarakatan dan bimbingan kemasyarakatan.
              </p>
              <p className="leading-relaxed text-lg">
                Dengan mengusung tagline <span className="italic font-medium text-gold">"Cerdas, Berintegritas, Berdedikasi"</span>, POLTEKIMIPAS
                berkomitmen untuk menghasilkan sumber daya manusia yang profesional, berkarakter,
                dan siap menghadapi tantangan di era modern.
              </p>
            </div>
          </div>

          {/* Right - Timeline */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-navy/5 border border-slate-100 h-full">
              <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
                  Sejarah Singkat
                </h3>
              </div>

              <div className="relative ml-4 border-l-2 border-slate-200 pl-8 space-y-8">
                {milestones.map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-white border-4 border-gold group-hover:scale-125 group-hover:border-navy transition-all duration-300">
                    </div>
                    <div className="text-lg font-bold text-navy mb-1">{item.year}</div>
                    <p className="text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="scroll-reveal grid gap-8 md:grid-cols-12">
          {/* Visi */}
          <div className="md:col-span-4 bg-navy rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
              <Eye className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-gold">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                Visi
              </h3>
              <p className="text-lg leading-relaxed text-slate-300">
                Menjadi perguruan tinggi vokasi dan profesi yang terpercaya dalam pengembangan
                sumber daya manusia di bidang Imigrasi dan Pemasyarakatan yang berintegritas,
                profesional, tangguh dan berdaya saing global.
              </p>
            </div>
          </div>

          {/* Misi */}
          <div className="md:col-span-8 bg-white rounded-3xl p-8 shadow-xl shadow-navy/5 border border-slate-100">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
                Misi
              </h3>
            </div>
            
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                "Menyelenggarakan pendidikan tinggi untuk menghasilkan lulusan yang unggul, berakhlak mulia, memiliki jiwa kepemimpinan, dan berwawasan global.",
                "Melakukan penelitian untuk memberikan solusi bagi penyelesaian permasalahan bangsa yang berdampak signifikan untuk terciptanya kualitas kehidupan berkelanjutan.",
                "Mendarmabaktikan keahlian dalam bidang ilmu pengetahuan, dan teknologi, dalam rangka membina dan memberdayakan masyarakat untuk kemajuan pembangunan di Indonesia.",
                "Mengabdikan diri untuk menyediakan lingkungan pembelajaran yang mendorong dan mendukung pembelajaran seumur hidup bagi mahasiswa, alumni, dosen, tenaga kependidikan, dan masyarakat luas.",
                "Penyelenggaraan tata kelola yang baik melalui pengembangan kelembagaan yang berorientasi pada mutu dan mampu bersaing di tingkat internasional."
              ].map((misi, idx) => (
                <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-gold shrink-0 mt-0.5" />
                  <span className="text-slate-600 leading-relaxed text-sm">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
