"use client"

import { useEffect, useMemo, useState } from "react"
import { Plus, Trash2, Edit, RefreshCw, Loader2, Award, Search, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type DataPejabat = {
  idPejabat: number
  nama: string
  jabatan: string
  singkatan: string
  email: string
  telepon: string
  bidangList: string[]
  fotoUrl: string | null
  urutan: number
  aktif: boolean
}

type FormPejabat = {
  nama: string
  jabatan: string
  singkatan: string
  email: string
  telepon: string
  bidangInput: string
  fotoUrl: string
  urutan: string
  aktif: boolean
}

const formAwal: FormPejabat = {
  nama: "",
  jabatan: "",
  singkatan: "",
  email: "",
  telepon: "",
  bidangInput: "",
  fotoUrl: "",
  urutan: "99",
  aktif: true,
}

const kelasInput =
  "h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none transition focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"

export default function AdminPejabatPage() {
  const [daftar, setDaftar] = useState<DataPejabat[]>([])
  const [memuat, setMemuat] = useState(true)
  const [menyimpan, setMenyimpan] = useState(false)
  const [error, setError] = useState("")
  const [sukses, setSukses] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormPejabat>(formAwal)
  const [mengunggah, setMengunggah] = useState(false)

  const muatDaftar = async () => {
    try {
      setMemuat(true)
      const res = await fetch("/api/admin/pejabat", { cache: "no-store" })
      if (!res.ok) throw new Error("Gagal memuat")
      const payload = await res.json()
      setDaftar(payload?.data ?? [])
    } catch {
      setError("Gagal memuat data pejabat.")
    } finally {
      setMemuat(false)
    }
  }

  useEffect(() => { muatDaftar() }, [])

  const filtered = useMemo(() =>
    daftar.filter((p) =>
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
    ), [daftar, searchQuery])

  const bukaModalTambah = () => {
    setForm(formAwal)
    setEditId(null)
    setError("")
    setSukses("")
    setIsModalOpen(true)
  }

  const bukaModalEdit = (item: DataPejabat) => {
    setForm({
      nama: item.nama,
      jabatan: item.jabatan,
      singkatan: item.singkatan,
      email: item.email,
      telepon: item.telepon,
      bidangInput: item.bidangList.join(", "),
      fotoUrl: item.fotoUrl || "",
      urutan: item.urutan.toString(),
      aktif: item.aktif,
    })
    setEditId(item.idPejabat)
    setError("")
    setSukses("")
    setIsModalOpen(true)
  }

  const uploadFoto = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/admin/berita/gambar", { method: "POST", body: formData })
    if (!res.ok) throw new Error("Upload foto gagal.")
    const payload = await res.json()
    return payload?.data?.url ?? ""
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSukses("")
    if (!form.nama.trim() || !form.jabatan.trim()) {
      setError("Nama dan jabatan wajib diisi.")
      return
    }
    try {
      setMenyimpan(true)
      const bidangList = form.bidangInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)

      const url = editId ? `/api/admin/pejabat/${editId}` : "/api/admin/pejabat"
      const method = editId ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama,
          jabatan: form.jabatan,
          singkatan: form.singkatan,
          email: form.email,
          telepon: form.telepon,
          bidangList,
          fotoUrl: form.fotoUrl || undefined,
          urutan: Number(form.urutan || 99),
          aktif: form.aktif,
        }),
      })
      if (!res.ok) {
        const p = await res.json().catch(() => null)
        throw new Error(p?.message ?? "Gagal menyimpan.")
      }
      setSukses(`Pejabat berhasil ${editId ? "diperbarui" : "ditambahkan"}.`)
      await muatDaftar()
      setIsModalOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.")
    } finally {
      setMenyimpan(false)
    }
  }

  const hapus = async (item: DataPejabat) => {
    if (!window.confirm(`Hapus pejabat "${item.nama}"?`)) return
    try {
      const res = await fetch(`/api/admin/pejabat/${item.idPejabat}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Gagal menghapus.")
      setSukses("Pejabat berhasil dihapus.")
      await muatDaftar()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus.")
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1b2a4a]">Manajemen Pejabat</h2>
            <p className="text-sm text-[#5a6b7f]">Kelola data pimpinan & pejabat institusi</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => muatDaftar()}
              disabled={memuat}
              className="inline-flex items-center gap-2 rounded-xl border border-[#d6dde6] bg-white px-3 py-2 text-sm font-medium text-[#1b3a6b] hover:bg-[#f8fbff] disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${memuat ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={bukaModalTambah}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#153159]"
            >
              <Plus className="h-4 w-4" />
              Tambah Pejabat
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#e5ebf3] bg-[#f8fbff] p-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a97aa]" />
            <input
              type="text"
              placeholder="Cari nama atau jabatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#d6dde6] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#1b3a6b]"
            />
          </div>
        </div>
      </section>

      {/* Messages */}
      {error && !isModalOpen && (
        <div className="rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-3 text-sm text-[#b42318]">{error}</div>
      )}
      {sukses && !isModalOpen && (
        <div className="rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-4 py-3 text-sm text-[#157347]">{sukses}</div>
      )}

      {/* List */}
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        {memuat ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-[#8a97aa]">
            <Loader2 className="h-5 w-5 animate-spin text-[#1b3a6b]" />
            Memuat data...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#8a97aa]">
            {daftar.length === 0 ? "Belum ada data pejabat. Klik \"Tambah Pejabat\" untuk memulai." : "Tidak ada yang cocok dengan pencarian."}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <article key={item.idPejabat} className="flex flex-wrap items-center gap-4 rounded-xl border border-[#e6ebf2] bg-[#fafcff] p-4 transition hover:shadow-sm">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1b3a6b] text-sm font-bold text-[#c9a34f]">
                  {item.singkatan || item.nama.slice(0, 2).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[#1b2a4a]">{item.nama}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${item.aktif ? "bg-[#e4f3ea] text-[#17633f]" : "bg-[#f1f3f7] text-[#475569]"}`}>
                      {item.aktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#1b3a6b] mt-0.5">{item.jabatan}</p>
                  {item.bidangList.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {item.bidangList.map((b) => (
                        <span key={b} className="rounded-full bg-[#f0f4fb] px-2 py-0.5 text-[11px] text-[#1b3a6b]">{b}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Urutan */}
                <div className="flex items-center gap-1 text-xs text-[#8a97aa]">
                  <Award className="h-3.5 w-3.5" />
                  Urutan #{item.urutan}
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => bukaModalEdit(item)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#d6dde6] bg-white px-3 py-1.5 text-xs font-medium text-[#1b2a4a] hover:bg-[#f8fbff]"
                  >
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => hapus(item)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#f1c7c7] bg-[#fff1f1] px-3 py-1.5 text-xs font-medium text-[#b42318] hover:bg-[#ffe4e4]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Hapus
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          <div className="sticky top-0 z-10 border-b border-[#e5ebf3] bg-white px-6 py-4">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-[#1b2a4a]">
                {editId ? "Edit Pejabat" : "Tambah Pejabat Baru"}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#8a97aa]">
                {editId ? "Perbarui informasi pejabat di bawah ini." : "Isi data pejabat baru."}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form id="form-pejabat" onSubmit={submitForm} className="p-6 space-y-5">
            {error && <div className="rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-3 py-2 text-sm text-[#b42318]">{error}</div>}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Nama Lengkap <span className="text-red-500">*</span></span>
                <input value={form.nama} onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))} className={kelasInput} placeholder="Prof. Dr. Nama, M.Si." required />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Jabatan / Posisi <span className="text-red-500">*</span></span>
                <input value={form.jabatan} onChange={(e) => setForm((p) => ({ ...p, jabatan: e.target.value }))} className={kelasInput} placeholder="Rektor POLTEKIMIPAS" required />
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Singkatan (untuk Avatar)</span>
                <input value={form.singkatan} onChange={(e) => setForm((p) => ({ ...p, singkatan: e.target.value.slice(0, 3).toUpperCase() }))} className={kelasInput} placeholder="AP" maxLength={3} />
                <p className="mt-1 text-[11px] text-[#8a97aa]">Kosongkan untuk otomatis dari nama</p>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Urutan Tampil</span>
                <input type="number" min={1} value={form.urutan} onChange={(e) => setForm((p) => ({ ...p, urutan: e.target.value }))} className={kelasInput} placeholder="1" />
                <p className="mt-1 text-[11px] text-[#8a97aa]">Angka kecil tampil lebih dulu (Rektor = 1)</p>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Email</span>
                <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={kelasInput} placeholder="nama@poltekimipas.ac.id" />
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Telepon</span>
                <input value={form.telepon} onChange={(e) => setForm((p) => ({ ...p, telepon: e.target.value }))} className={kelasInput} placeholder="(021) 5252-001" />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Bidang Tugas (pisah koma)</span>
                <input value={form.bidangInput} onChange={(e) => setForm((p) => ({ ...p, bidangInput: e.target.value }))} className={kelasInput} placeholder="Kebijakan Institusi, Akademik, SDM" />
              </label>

              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Foto (URL atau upload)</span>
                <div className="flex gap-2">
                  <input value={form.fotoUrl} onChange={(e) => setForm((p) => ({ ...p, fotoUrl: e.target.value }))} className={kelasInput} placeholder="https://... atau upload di bawah" />
                  <label className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[#d6dde6] bg-white px-3 text-xs font-medium text-[#1b2a4a] hover:bg-[#f8fbff]">
                    {mengunggah ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    Upload
                    <input type="file" accept="image/*" className="hidden" disabled={mengunggah}
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        e.currentTarget.value = ""
                        if (!file) return
                        try {
                          setMengunggah(true)
                          const url = await uploadFoto(file)
                          setForm((p) => ({ ...p, fotoUrl: url }))
                        } catch { setError("Upload foto gagal.") } finally { setMengunggah(false) }
                      }}
                    />
                  </label>
                </div>
                {form.fotoUrl && (
                  <img src={form.fotoUrl} alt="preview" className="mt-2 h-20 rounded-xl object-cover border border-[#e4eaf2]" />
                )}
              </div>

              <div className="sm:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="aktif-pejabat" checked={form.aktif} onChange={(e) => setForm((p) => ({ ...p, aktif: e.target.checked }))} className="h-4 w-4 rounded border-[#d6dde6] accent-[#1b3a6b]" />
                <label htmlFor="aktif-pejabat" className="text-sm font-medium text-[#1b2a4a] cursor-pointer">
                  Tampilkan di halaman publik
                </label>
              </div>
            </div>
          </form>

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#e5ebf3] bg-white px-6 py-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-[#d6dde6] bg-white px-4 py-2 text-sm font-medium text-[#45566f] hover:bg-[#f8fbff]">
              Batal
            </button>
            <button type="submit" form="form-pejabat" disabled={menyimpan}
              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-[#1b3a6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#153159] disabled:opacity-70"
            >
              {menyimpan ? <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</> : <><Plus className="h-4 w-4" /> {editId ? "Simpan Perubahan" : "Tambah Pejabat"}</>}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
