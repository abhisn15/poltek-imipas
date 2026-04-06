"use client"

import { Shield, Target, Eye, BookOpen, CheckCircle2 } from "lucide-react"

type Milestone = {
  year: string
  singkatan: string
  nama: string
  sisi: "kiri" | "kanan"
}

const milestones: Milestone[] = [
  { year: "1962", singkatan: "AIM", nama: "Akademi Imigrasi", sisi: "kiri" },
  { year: "1964", singkatan: "AKIP", nama: "Akademi Pemasyarakatan", sisi: "kanan" },
  { year: "2016", singkatan: "Poltekim", nama: "Politeknik Imigrasi", sisi: "kiri" },
  { year: "2018", singkatan: "Poltekip", nama: "Politeknik Pemasyarakatan", sisi: "kanan" },
  { year: "2023", singkatan: "Poltekpin", nama: "Politeknik Imigrasi dan Pemasyarakatan", sisi: "kiri" },
  { year: "2026", singkatan: "Poltekimipas", nama: "Politeknik Imigrasi dan Pemasyarakatan", sisi: "kanan" },
]

const warnaKiri = "from-[#1b3a6b] to-[#2a5298]"
const warnaKanan = "from-[#b8892f] to-[#c9a34f]"

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
          <div className="lg:col-span-6 space-y-5">
            <p className="leading-relaxed text-[17px] text-slate-700">
              <strong className="text-navy font-semibold">Politeknik Imigrasi dan Pemasyarakatan (Poltekimipas)</strong> merupakan perguruan tinggi kedinasan di bawah Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia yang menyelenggarakan pendidikan vokasi di bidang keimigrasian dan pemasyarakatan.
            </p>
            <p className="leading-relaxed text-[17px] text-slate-700">
              Poltekimipas hadir sebagai hasil integrasi dari <span className="font-semibold text-navy">Politeknik Imigrasi (Poltekim)</span> dan <span className="font-semibold text-navy">Politeknik Ilmu Pemasyarakatan (Poltekip)</span>, dengan tujuan mencetak sumber daya manusia yang profesional, berintegritas, dan kompeten dalam mendukung pelaksanaan tugas keimigrasian serta sistem pemasyarakatan di Indonesia.
            </p>
            <p className="leading-relaxed text-[17px] text-slate-700">
              Melalui kurikulum berbasis praktik, disiplin tinggi, serta pembinaan karakter, Poltekimipas berkomitmen menghasilkan lulusan yang siap mengabdi kepada negara, menjunjung tinggi hukum, serta memberikan pelayanan publik yang prima.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-semibold italic text-[#9a7a2c]">
              "Cerdas, Berintegritas, Berdedikasi"
            </div>
          </div>

          {/* Right - Timeline zigzag */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-navy/5 border border-slate-100 h-full">
              <div className="mb-7 flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-navy" style={{ fontFamily: "var(--font-poppins)" }}>
                  Sejarah &amp; Transformasi
                </h3>
              </div>

              {/* Zigzag timeline */}
              <div className="relative">
                {/* Center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#1b3a6b]/30 via-[#c9a34f]/40 to-[#1b3a6b]/30" />

                <div className="space-y-6">
                  {milestones.map((item, i) => {
                    const isKiri = item.sisi === "kiri"
                    const warna = isKiri ? warnaKiri : warnaKanan
                    const isLast = i === milestones.length - 1

                    return (
                      <div key={i} className="relative flex items-center gap-0">
                        {/* Kiri */}
                        <div className={`flex-1 flex ${isKiri ? "justify-end pr-5" : "pr-5 opacity-0 pointer-events-none"}`}>
                          {isKiri && (
                            <div className="text-right max-w-[160px]">
                              <span className={`inline-block rounded-full bg-gradient-to-r ${warna} px-3 py-1 text-xs font-bold text-white mb-1`}>
                                {item.year}
                              </span>
                              <p className="font-bold text-navy text-sm leading-tight">{item.singkatan}</p>
                              <p className="text-[11px] text-slate-500 leading-snug">{item.nama}</p>
                            </div>
                          )}
                        </div>

                        {/* Dot */}
                        <div className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${isLast ? "border-[#c9a34f] bg-[#c9a34f]" : "border-[#1b3a6b] bg-white"} shadow-sm`}>
                          {isLast && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>

                        {/* Kanan */}
                        <div className={`flex-1 flex ${!isKiri ? "justify-start pl-5" : "pl-5 opacity-0 pointer-events-none"}`}>
                          {!isKiri && (
                            <div className="text-left max-w-[160px]">
                              <span className={`inline-block rounded-full bg-gradient-to-r ${warna} px-3 py-1 text-xs font-bold text-white mb-1`}>
                                {item.year}
                              </span>
                              <p className="font-bold text-navy text-sm leading-tight">{item.singkatan}</p>
                              <p className="text-[11px] text-slate-500 leading-snug">{item.nama}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
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
