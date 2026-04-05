"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Eye, Newspaper, Star, UploadCloud } from "lucide-react"

import { formatTanggalIndonesia } from "@/lib/teks"

type RingkasanDashboard = {
  totalBerita: number
  totalTerbit: number
  totalPenting: number
  totalDilihat: number
  beritaTerbaru: Array<{
    idBerita: number
    judul: string
    slug: string
    statusPublikasi: "draft" | "terbit"
    jumlahDilihat: number
    tanggalTerbit: string
  }>
}

export default function DashboardAdminPage() {
  const [data, setData] = useState<RingkasanDashboard | null>(null)
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let aktif = true

    const muatRingkasan = async () => {
      try {
        setError("")
        const response = await fetch("/api/admin/ringkasan-dashboard", {
          method: "GET",
          cache: "no-store",
        })
        if (!response.ok) {
          throw new Error("Gagal memuat dashboard")
        }
        const payload = await response.json()
        if (aktif) {
          setData(payload?.data ?? null)
        }
      } catch {
        if (aktif) {
          setError("Ringkasan dashboard belum bisa dimuat. Coba refresh kembali.")
        }
      } finally {
        if (aktif) {
          setMemuat(false)
        }
      }
    }

    muatRingkasan()
    return () => {
      aktif = false
    }
  }, [])

  if (memuat) {
    return (
      <div className="rounded-2xl border border-[#d6dde6] bg-white p-6 text-sm text-[#5a6b7f]">
        Memuat ringkasan dashboard...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-[#efc0c0] bg-[#fff8f8] p-6 text-sm text-[#8f2d2d]">
        {error || "Data dashboard belum tersedia."}
      </div>
    )
  }

  const kartu = [
    {
      label: "Total Berita",
      nilai: data.totalBerita,
      icon: Newspaper,
      warna: "from-[#16345f] to-[#2a5298]",
    },
    {
      label: "Berita Terbit",
      nilai: data.totalTerbit,
      icon: UploadCloud,
      warna: "from-[#0f2647] to-[#1b3a6b]",
    },
    {
      label: "Berita Penting",
      nilai: data.totalPenting,
      icon: Star,
      warna: "from-[#7f611d] to-[#c9a84c]",
    },
    {
      label: "Traffic Bacaan",
      nilai: data.totalDilihat,
      icon: Eye,
      warna: "from-[#194c45] to-[#2f7b72]",
    },
  ]

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kartu.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={`rounded-2xl bg-gradient-to-br ${item.warna} p-4 text-white shadow-md`}
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold">{item.nilai.toLocaleString("id-ID")}</div>
              <div className="text-xs tracking-wide text-white/80">{item.label}</div>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#1b2a4a]">Berita Terbaru</h2>
          <Link href="/admin/berita" className="text-xs font-medium text-[#1b3a6b] hover:underline">
            Kelola berita
          </Link>
        </div>

        <div className="space-y-3">
          {data.beritaTerbaru.map((berita) => (
            <div
              key={berita.idBerita}
              className="rounded-xl border border-[#e6ebf2] bg-[#fafcff] p-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-sm font-semibold text-[#1b2a4a]">{berita.judul}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    berita.statusPublikasi === "terbit"
                      ? "bg-[#e4f3ea] text-[#17633f]"
                      : "bg-[#f1f3f7] text-[#475569]"
                  }`}
                >
                  {berita.statusPublikasi}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#5a6b7f]">
                <span>{formatTanggalIndonesia(berita.tanggalTerbit)}</span>
                <span>{berita.jumlahDilihat.toLocaleString("id-ID")} dibaca</span>
                <Link href={`/berita/${berita.slug}`} className="text-[#1b3a6b] hover:underline">
                  Lihat publik
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
