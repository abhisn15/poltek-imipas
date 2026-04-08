"use client"

import { useEffect, useState } from "react"
import { Loader2, Save } from "lucide-react"

type DataAdmin = {
  peran: "superadmin" | "admin"
}

type FormStatistik = {
  totalTaruna: string
  totalAlumni: string
  tahunPengabdian: string
}

export default function AdminStatistikBerandaPage() {
  const [admin, setAdmin] = useState<DataAdmin | null>(null)
  const [memuat, setMemuat] = useState(true)
  const [menyimpan, setMenyimpan] = useState(false)
  const [error, setError] = useState("")
  const [sukses, setSukses] = useState("")
  const [form, setForm] = useState<FormStatistik>({
    totalTaruna: "",
    totalAlumni: "",
    tahunPengabdian: "",
  })

  useEffect(() => {
    let aktif = true
    const muat = async () => {
      try {
        const [sesiResponse, dataResponse] = await Promise.all([
          fetch("/api/admin/sesi", { cache: "no-store" }),
          fetch("/api/admin/statistik-beranda", { cache: "no-store" }),
        ])

        if (!sesiResponse.ok) throw new Error("Sesi admin tidak valid.")
        if (!dataResponse.ok) throw new Error("Gagal mengambil statistik beranda.")

        const sesiPayload = await sesiResponse.json()
        const dataPayload = await dataResponse.json()

        if (!aktif) return
        setAdmin(sesiPayload?.data ?? null)
        setForm({
          totalTaruna: String(dataPayload?.data?.totalTaruna ?? ""),
          totalAlumni: String(dataPayload?.data?.totalAlumni ?? ""),
          tahunPengabdian: String(dataPayload?.data?.tahunPengabdian ?? ""),
        })
      } catch (err) {
        if (!aktif) return
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
      } finally {
        if (aktif) setMemuat(false)
      }
    }

    muat()
    return () => {
      aktif = false
    }
  }, [])

  const simpan = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    setSukses("")
    setMenyimpan(true)

    try {
      const response = await fetch("/api/admin/statistik-beranda", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalTaruna: Number(form.totalTaruna),
          totalAlumni: Number(form.totalAlumni),
          tahunPengabdian: Number(form.tahunPengabdian),
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload?.message || "Gagal menyimpan perubahan.")
      }

      setSukses(payload?.message || "Berhasil disimpan.")
      if (payload?.data) {
        setForm({
          totalTaruna: String(payload.data.totalTaruna ?? ""),
          totalAlumni: String(payload.data.totalAlumni ?? ""),
          tahunPengabdian: String(payload.data.tahunPengabdian ?? ""),
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
    } finally {
      setMenyimpan(false)
    }
  }

  if (memuat) {
    return (
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-6">
        <div className="flex items-center gap-2 text-sm text-[#5a6b7f]">
          <Loader2 className="h-4 w-4 animate-spin text-[#1b3a6b]" />
          Memuat data statistik beranda...
        </div>
      </section>
    )
  }

  if (admin?.peran !== "superadmin") {
    return (
      <section className="rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] p-6 text-sm text-[#b42318]">
        Halaman ini hanya dapat diakses superadmin.
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-[#d6dde6] bg-white p-6">
      <h2 className="text-base font-semibold text-[#1b2a4a]">Statistik Beranda</h2>
      <p className="mt-2 text-sm text-[#5a6b7f]">
        Ubah angka statistik pada hero beranda menggunakan data aktual (tanpa tanda plus).
      </p>

      {error && <div className="mt-4 rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-2.5 text-sm text-[#b42318]">{error}</div>}
      {sukses && <div className="mt-4 rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-4 py-2.5 text-sm text-[#157347]">{sukses}</div>}

      <form onSubmit={simpan} className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="space-y-1.5">
          <span className="block text-xs font-semibold text-[#1b2a4a]">Total Taruna</span>
          <input
            type="number"
            min={0}
            value={form.totalTaruna}
            onChange={(e) => setForm((lama) => ({ ...lama, totalTaruna: e.target.value }))}
            className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
            required
          />
        </label>

        <label className="space-y-1.5">
          <span className="block text-xs font-semibold text-[#1b2a4a]">Total Alumni</span>
          <input
            type="number"
            min={0}
            value={form.totalAlumni}
            onChange={(e) => setForm((lama) => ({ ...lama, totalAlumni: e.target.value }))}
            className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
            required
          />
        </label>

        <label className="space-y-1.5">
          <span className="block text-xs font-semibold text-[#1b2a4a]">Tahun Pengabdian</span>
          <input
            type="number"
            min={0}
            value={form.tahunPengabdian}
            onChange={(e) => setForm((lama) => ({ ...lama, tahunPengabdian: e.target.value }))}
            className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
            required
          />
        </label>

        <div className="sm:col-span-3">
          <button
            type="submit"
            disabled={menyimpan}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153159] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {menyimpan ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Simpan Statistik
          </button>
        </div>
      </form>
    </section>
  )
}
