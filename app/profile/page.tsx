import Link from "next/link"
import type { ComponentType } from "react"
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleAlert,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react"

type ItemStatus = "sudah" | "belum"

interface ProfileAuditItem {
  name: string
  status: ItemStatus
  note: string
}

interface ProfileAuditSection {
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  items: ProfileAuditItem[]
}

const profileAuditSections: ProfileAuditSection[] = [
  {
    title: "Profil Kampus",
    description: "Informasi identitas dan gambaran institusi.",
    icon: Building2,
    items: [
      {
        name: "Ringkasan institusi dan sejarah singkat",
        status: "sudah",
        note: "Sudah tampil di bagian Tentang Kami pada beranda.",
      },
      {
        name: "Visi dan misi institusi",
        status: "sudah",
        note: "Sudah tersedia pada section Profil Institusi.",
      },
      {
        name: "Kontak umum kampus",
        status: "sudah",
        note: "Sudah ada di footer (alamat, telepon, email).",
      },
      {
        name: "Peta organisasi resmi kampus",
        status: "belum",
        note: "Belum ada visual struktur organisasi khusus.",
      },
      {
        name: "Profil fasilitas utama kampus",
        status: "belum",
        note: "Belum ada halaman terstruktur per fasilitas.",
      },
    ],
  },
  {
    title: "Pejabat",
    description: "Data pimpinan dan pejabat struktural kampus.",
    icon: Users,
    items: [
      {
        name: "Informasi pejabat disebut di konten berita",
        status: "sudah",
        note: "Sudah ada penyebutan jabatan dalam artikel tertentu.",
      },
      {
        name: "Daftar pejabat aktif",
        status: "belum",
        note: "Belum ada daftar nama/jabatan resmi yang terstruktur.",
      },
      {
        name: "Profil detail pejabat (foto dan biografi)",
        status: "belum",
        note: "Belum tersedia.",
      },
      {
        name: "Masa jabatan dan dasar penetapan",
        status: "belum",
        note: "Belum tersedia.",
      },
      {
        name: "Kontak unit kerja pejabat",
        status: "belum",
        note: "Belum tersedia.",
      },
    ],
  },
  {
    title: "Dosen",
    description: "Data tenaga pengajar dan kontribusi akademik.",
    icon: GraduationCap,
    items: [
      {
        name: "Kontribusi dosen di blog dan jurnal",
        status: "sudah",
        note: "Sudah ada konten yang menyebut dosen/peneliti.",
      },
      {
        name: "Daftar dosen aktif",
        status: "belum",
        note: "Belum ada direktori dosen.",
      },
      {
        name: "Bidang keahlian per dosen",
        status: "belum",
        note: "Belum tersedia.",
      },
      {
        name: "Riwayat pendidikan dan sertifikasi",
        status: "belum",
        note: "Belum tersedia.",
      },
      {
        name: "Mata kuliah yang diampu",
        status: "belum",
        note: "Belum tersedia.",
      },
    ],
  },
  {
    title: "Pembina",
    description: "Informasi pembinaan taruna dan pembina kemasyarakatan.",
    icon: ShieldCheck,
    items: [
      {
        name: "Informasi umum kegiatan pembinaan",
        status: "sudah",
        note: "Sudah muncul di pengumuman/berita tertentu.",
      },
      {
        name: "Daftar pembina per unit atau angkatan",
        status: "belum",
        note: "Belum ada daftar resmi.",
      },
      {
        name: "Jadwal pembinaan terstruktur",
        status: "belum",
        note: "Belum ada halaman jadwal khusus.",
      },
      {
        name: "Profil pembina (foto, jabatan, unit)",
        status: "belum",
        note: "Belum tersedia.",
      },
      {
        name: "Panduan/SOP pembinaan untuk publik",
        status: "belum",
        note: "Belum tersedia.",
      },
    ],
  },
]

const allItems = profileAuditSections.flatMap((section) => section.items)
const doneCount = allItems.filter((item) => item.status === "sudah").length
const pendingCount = allItems.filter((item) => item.status === "belum").length

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-24 text-slate-900">
      <div className="mx-auto max-w-7xl px-4">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <section className="rounded-2xl bg-gradient-to-br from-[#1B3A6B] via-[#1E457D] to-[#10294D] p-8 text-white shadow-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F3D88E]">
            <BookOpen className="h-3.5 w-3.5" />
            Audit Konten Profil
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">Halaman Profile</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
            Ringkasan status konten profil kampus saat ini, khusus untuk melihat
            mana yang sudah tersedia dan mana yang masih perlu dilengkapi.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/15 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-300">Total Item</p>
              <p className="mt-1 text-2xl font-bold">{allItems.length}</p>
            </div>
            <div className="rounded-xl border border-emerald-300/25 bg-emerald-400/10 p-4">
              <p className="text-xs uppercase tracking-wider text-emerald-100">Sudah</p>
              <p className="mt-1 text-2xl font-bold text-emerald-200">{doneCount}</p>
            </div>
            <div className="rounded-xl border border-amber-300/30 bg-amber-400/10 p-4">
              <p className="text-xs uppercase tracking-wider text-amber-100">Belum</p>
              <p className="mt-1 text-2xl font-bold text-amber-200">{pendingCount}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {profileAuditSections.map((section) => {
            const Icon = section.icon
            return (
              <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start gap-3">
                  <div className="rounded-lg bg-[#1B3A6B]/10 p-2 text-[#1B3A6B]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-slate-800">{item.name}</h3>
                        {item.status === "sudah" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Sudah
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                            <CircleAlert className="h-3.5 w-3.5" />
                            Belum
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.note}</p>
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}
