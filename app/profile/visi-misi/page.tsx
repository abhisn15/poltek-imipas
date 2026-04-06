"use client"

import Link from "next/link"
import { ArrowLeft, Eye, Target } from "lucide-react"

export default function ProfilVisiMisiPage() {
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
          <h1 className="mb-7 text-3xl font-bold text-navy md:text-4xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Visi & Misi POLTEKIMIPAS
          </h1>

          <div className="mb-8 rounded-xl border border-gold/30 bg-gold/5 p-6">
            <h2 className="mb-3 inline-flex items-center gap-2 text-xl font-bold text-navy">
              <Eye className="h-5 w-5 text-gold" />
              Visi
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Menjadi perguruan tinggi vokasi dan profesi yang terpercaya dalam pengembangan sumber daya
              manusia di bidang Imigrasi dan Pemasyarakatan yang berintegritas, profesional, tangguh dan
              berdaya saing global.
            </p>
          </div>

          <div className="rounded-xl border border-[#dbe4f0] bg-[#fafcff] p-6">
            <h2 className="mb-3 inline-flex items-center gap-2 text-xl font-bold text-navy">
              <Target className="h-5 w-5 text-gold" />
              Misi
            </h2>
            <ol className="list-[lower-alpha] space-y-2 pl-5 leading-relaxed text-muted-foreground">
              <li>
                Menyelenggarakan pendidikan tinggi untuk menghasilkan lulusan yang unggul, berakhlak mulia,
                memiliki jiwa kepemimpinan, dan berwawasan global.
              </li>
              <li>
                Melakukan penelitian untuk memberikan solusi bagi penyelesaian permasalahan bangsa yang
                berdampak signifikan untuk terciptanya kualitas kehidupan berkelanjutan.
              </li>
              <li>
                Mendarmabaktikan keahlian dalam bidang ilmu pengetahuan, dan teknologi, dalam rangka membina
                dan memberdayakan masyarakat untuk kemajuan pembangunan di Indonesia.
              </li>
              <li>
                Mengabdikan diri untuk menyediakan lingkungan pembelajaran yang mendorong dan mendukung
                pembelajaran seumur hidup (lifelong learning) bagi mahasiswa, alumni, dosen, tenaga
                kependidikan, dan masyarakat luas.
              </li>
              <li>
                Penyelenggaraan tata kelola yang baik melalui pengembangan kelembagaan yang berorientasi pada
                mutu dan mampu bersaing di tingkat internasional.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}

