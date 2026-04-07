"use client"

import { useEffect, useMemo, useState } from "react"
import { Plus, Trash2, Edit, RefreshCw, Loader2, Search, Upload, BookOpen, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type JurnalItem = {
  id: number
  judul: string
  tahun: string
  program: string
  ringkasan: string
  pdfUrl: string
}

type DataDosen = {
  idDosen: number
  slug: string
  nama: string
  gelar: string
  jabatan: string
  bidangKeahlianList: string[]
  deskripsi: string
  email: string
  ruang: string
  fotoUrl: string | null
  jurnalList: JurnalItem[]
  aktif: boolean
  urutan: number
}

type FormDosen = {
  nama: string
  gelar: string
  jabatan: string
  bidangInput: string
  deskripsi: string
  email: string
  ruang: string
  fotoUrl: string
  urutan: string
  aktif: boolean
  jurnalList: JurnalItem[]
}

const formAwal: FormDosen = {
  nama: "",
  gelar: "",
  jabatan: "",
  bidangInput: "",
  deskripsi: "",
  email: "",
  ruang: "",
  fotoUrl: "",
  urutan: "99",
  aktif: true,
  jurnalList: [],
}

const jurnalAwal: JurnalItem = {
  id: Date.now(),
  judul: "",
  tahun: new Date().getFullYear().toString(),
  program: "",
  ringkasan: "",
  pdfUrl: "",
}

const kelasInput =
  "h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none transition focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"

export default function AdminDosenPage() {
  const [daftar, setDaftar] = useState<DataDosen[]>([])
  const [memuat, setMemuat] = useState(true)
  const [menyimpan, setMenyimpan] = useState(false)
  const [error, setError] = useState("")
  const [sukses, setSukses] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormDosen>(formAwal)
  const [mengunggah, setMengunggah] = useState(false)

  const muatDaftar = async () => {
    try {
      setMemuat(true)
      const res = await fetch("/api/admin/dosen", { cache: "no-store" })
      if (!res.ok) throw new Error("Gagal memuat")
      const payload = await res.json()
      setDaftar(payload?.data ?? [])
    } catch {
      setError("Gagal memuat data dosen.")
    } finally {
      setMemuat(false)
    }
  }

  useEffect(() => { muatDaftar() }, [])

  const filtered = useMemo(() =>
    daftar.filter((d) =>
      d.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
    ), [daftar, searchQuery])

  const bukaModalTambah = () => {
    setForm(formAwal)
    setEditId(null)
    setError("")
    setSukses("")
    setIsModalOpen(true)
  }

  const bukaModalEdit = (item: DataDosen) => {
    setForm({
      nama: item.nama,
      gelar: item.gelar,
      jabatan: item.jabatan,
      bidangInput: item.bidangKeahlianList.join(", "),
      deskripsi: item.deskripsi,
      email: item.email,
      ruang: item.ruang,
      fotoUrl: item.fotoUrl || "",
      urutan: item.urutan.toString(),
      aktif: item.aktif,
      jurnalList: item.jurnalList,
    })
    setEditId(item.idDosen)
    setError("")
    setSukses("")
    setIsModalOpen(true)
  }

  const uploadFoto = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/admin/berita/gambar", { method: "POST", body: formData })
    if (!res.ok) throw new Error("Upload gagal.")
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
      const bidangKeahlianList = form.bidangInput.split(",").map((s) => s.trim()).filter(Boolean)

      const url = editId ? `/api/admin/dosen/${editId}` : "/api/admin/dosen"
      const method = editId ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama,
          gelar: form.gelar,
          jabatan: form.jabatan,
          bidangKeahlianList,
          deskripsi: form.deskripsi,
          email: form.email,
          ruang: form.ruang,
          fotoUrl: form.fotoUrl || undefined,
          jurnalList: form.jurnalList,
          urutan: Number(form.urutan || 99),
          aktif: form.aktif,
        }),
      })
      if (!res.ok) {
        const p = await res.json().catch(() => null)
        throw new Error(p?.message ?? "Gagal menyimpan.")
      }
      setSukses(`Dosen berhasil ${editId ? "diperbarui" : "ditambahkan"}.`)
      await muatDaftar()
      setIsModalOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.")
    } finally {
      setMenyimpan(false)
    }
  }

  const hapus = async (item: DataDosen) => {
    if (!window.confirm(`Hapus dosen "${item.nama}"?`)) return
    try {
      const res = await fetch(`/api/admin/dosen/${item.idDosen}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Gagal menghapus.")
      setSukses("Dosen berhasil dihapus.")
      await muatDaftar()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus.")
    }
  }

  // Jurnal helpers
  const tambahJurnal = () => {
    setForm((p) => ({
      ...p,
      jurnalList: [...p.jurnalList, { ...jurnalAwal, id: Date.now() }],
    }))
  }

  const updateJurnal = (idx: number, field: keyof JurnalItem, val: string) => {
    setForm((p) => ({
      ...p,
      jurnalList: p.jurnalList.map((j, i) => i === idx ? { ...j, [field]: val } : j),
    }))
  }

  const hapusJurnal = (idx: number) => {
    setForm((p) => ({ ...p, jurnalList: p.jurnalList.filter((_, i) => i !== idx) }))
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1b2a4a]">Manajemen Dosen</h2>
            <p className="text-sm text-[#5a6b7f]">Kelola data dosen beserta publikasi jurnalnya</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={muatDaftar} disabled={memuat}
              className="inline-flex items-center gap-2 rounded-xl border border-[#d6dde6] bg-white px-3 py-2 text-sm font-medium text-[#1b3a6b] hover:bg-[#f8fbff] disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${memuat ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button onClick={bukaModalTambah}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#153159]"
            >
              <Plus className="h-4 w-4" />
              Tambah Dosen
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#e5ebf3] bg-[#f8fbff] p-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a97aa]" />
            <input type="text" placeholder="Cari nama atau jabatan..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#d6dde6] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#1b3a6b]"
            />
          </div>
        </div>
      </section>

      {error && !isModalOpen && <div className="rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-3 text-sm text-[#b42318]">{error}</div>}
      {sukses && !isModalOpen && <div className="rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-4 py-3 text-sm text-[#157347]">{sukses}</div>}

      {/* List */}
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        {memuat ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-[#8a97aa]">
            <Loader2 className="h-5 w-5 animate-spin text-[#1b3a6b]" /> Memuat data...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#8a97aa]">
            {daftar.length === 0 ? "Belum ada data dosen. Klik \"Tambah Dosen\" untuk memulai." : "Tidak ada yang cocok."}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <article key={item.idDosen} className="flex flex-wrap items-start gap-4 rounded-xl border border-[#e6ebf2] bg-[#fafcff] p-4 transition hover:shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8c97a] to-[#c9a34f] text-sm font-bold text-[#0f2240]">
                  {item.nama.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[#1b2a4a]">{item.gelar} {item.nama}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${item.aktif ? "bg-[#e4f3ea] text-[#17633f]" : "bg-[#f1f3f7] text-[#475569]"}`}>
                      {item.aktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#1b3a6b] mt-0.5">{item.jabatan}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {item.bidangKeahlianList.map((b) => (
                      <span key={b} className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] text-violet-700">{b}</span>
                    ))}
                  </div>
                  {item.jurnalList.length > 0 && (
                    <p className="mt-1 text-xs text-[#8a97aa] flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {item.jurnalList.length} jurnal terdaftar
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => bukaModalEdit(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#d6dde6] bg-white px-3 py-1.5 text-xs font-medium text-[#1b2a4a] hover:bg-[#f8fbff]">
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => hapus(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#f1c7c7] bg-[#fff1f1] px-3 py-1.5 text-xs font-medium text-[#b42318] hover:bg-[#ffe4e4]">
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
        <DialogContent className="!max-w-[90vw] w-[860px] max-h-[92vh] overflow-y-auto p-0 gap-0">
          <div className="sticky top-0 z-10 border-b border-[#e5ebf3] bg-white px-6 py-4">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-[#1b2a4a]">
                {editId ? "Edit Dosen" : "Tambah Dosen Baru"}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#8a97aa]">
                Isi data dosen dan tambahkan jurnal publikasinya.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form id="form-dosen" onSubmit={submitForm} className="p-6 space-y-6">
            {error && <div className="rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-3 py-2 text-sm text-[#b42318]">{error}</div>}

            {/* Data Dosen */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#1b3a6b]">Data Dosen</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Nama Lengkap (tanpa gelar) <span className="text-red-500">*</span></span>
                  <input value={form.nama} onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))} className={kelasInput} placeholder="Haryono" required />
                </label>

                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Gelar</span>
                  <input value={form.gelar} onChange={(e) => setForm((p) => ({ ...p, gelar: e.target.value }))} className={kelasInput} placeholder="Dr., M.Si." />
                </label>

                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Urutan Tampil</span>
                  <input type="number" min={1} value={form.urutan} onChange={(e) => setForm((p) => ({ ...p, urutan: e.target.value }))} className={kelasInput} />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Jabatan <span className="text-red-500">*</span></span>
                  <input value={form.jabatan} onChange={(e) => setForm((p) => ({ ...p, jabatan: e.target.value }))} className={kelasInput} placeholder="Ketua Program Studi Manajemen Pemasyarakatan" required />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Bidang Keahlian (pisah koma)</span>
                  <input value={form.bidangInput} onChange={(e) => setForm((p) => ({ ...p, bidangInput: e.target.value }))} className={kelasInput} placeholder="Manajemen Lapas, Pembinaan Narapidana" />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Deskripsi Singkat</span>
                  <textarea value={form.deskripsi} onChange={(e) => setForm((p) => ({ ...p, deskripsi: e.target.value }))}
                    className="w-full rounded-xl border border-[#d6dde6] bg-white px-3 py-2.5 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] resize-none"
                    rows={3} placeholder="Fokus riset pada..." />
                </label>

                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Email</span>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className={kelasInput} placeholder="nama@poltekimipas.ac.id" />
                </label>

                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Ruang Kerja</span>
                  <input value={form.ruang} onChange={(e) => setForm((p) => ({ ...p, ruang: e.target.value }))} className={kelasInput} placeholder="Gedung A, Ruang 2.13" />
                </label>

                <div className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Foto (URL atau upload)</span>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input value={form.fotoUrl} onChange={(e) => setForm((p) => ({ ...p, fotoUrl: e.target.value }))} className={`${kelasInput} min-w-0 flex-1`} placeholder="https://... atau upload" />
                    <label className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[#d6dde6] bg-white px-3 text-xs font-medium hover:bg-[#f8fbff]">
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
                  <input type="checkbox" id="aktif-dosen" checked={form.aktif} onChange={(e) => setForm((p) => ({ ...p, aktif: e.target.checked }))} className="h-4 w-4 rounded accent-[#1b3a6b]" />
                  <label htmlFor="aktif-dosen" className="text-sm font-medium text-[#1b2a4a] cursor-pointer">Tampilkan di halaman publik</label>
                </div>
              </div>
            </div>

            {/* Jurnal */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1b3a6b]">
                  Jurnal Publikasi ({form.jurnalList.length})
                </h3>
                <button type="button" onClick={tambahJurnal}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#edf2fb] px-3 py-1.5 text-xs font-semibold text-[#1b3a6b] hover:bg-[#dce8f8]"
                >
                  <Plus className="h-3 w-3" /> Tambah Jurnal
                </button>
              </div>

              {form.jurnalList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#d6dde6] bg-[#f8fbff] py-6 text-center text-sm text-[#8a97aa]">
                  Belum ada jurnal. Klik &ldquo;Tambah Jurnal&rdquo; untuk menambahkan.
                </div>
              ) : (
                <div className="space-y-4">
                  {form.jurnalList.map((jurnal, idx) => (
                    <div key={jurnal.id} className="rounded-xl border border-[#e5ebf3] bg-white p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#1b3a6b]">Jurnal #{idx + 1}</span>
                        <button type="button" onClick={() => hapusJurnal(idx)} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fff1f1] text-[#b42318] hover:bg-[#ffe4e4]">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="sm:col-span-2">
                          <span className="mb-1 block text-[11px] font-semibold text-[#5a6b7f]">Judul</span>
                          <input value={jurnal.judul} onChange={(e) => updateJurnal(idx, "judul", e.target.value)} className={kelasInput} placeholder="Judul jurnal..." />
                        </label>
                        <label>
                          <span className="mb-1 block text-[11px] font-semibold text-[#5a6b7f]">Tahun</span>
                          <input value={jurnal.tahun} onChange={(e) => updateJurnal(idx, "tahun", e.target.value)} className={kelasInput} placeholder="2025" />
                        </label>
                        <label>
                          <span className="mb-1 block text-[11px] font-semibold text-[#5a6b7f]">Program Studi</span>
                          <input value={jurnal.program} onChange={(e) => updateJurnal(idx, "program", e.target.value)} className={kelasInput} placeholder="Manajemen Pemasyarakatan" />
                        </label>
                        <label className="sm:col-span-2">
                          <span className="mb-1 block text-[11px] font-semibold text-[#5a6b7f]">Ringkasan</span>
                          <textarea value={jurnal.ringkasan} onChange={(e) => updateJurnal(idx, "ringkasan", e.target.value)}
                            className="w-full rounded-xl border border-[#d6dde6] bg-white px-3 py-2 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] resize-none"
                            rows={2} placeholder="Ringkasan singkat..." />
                        </label>
                        <label className="sm:col-span-2">
                          <span className="mb-1 block text-[11px] font-semibold text-[#5a6b7f]">URL / Path PDF</span>
                          <input value={jurnal.pdfUrl} onChange={(e) => updateJurnal(idx, "pdfUrl", e.target.value)} className={kelasInput} placeholder="/pdfs/jurnal.pdf" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#e5ebf3] bg-white px-6 py-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-[#d6dde6] bg-white px-4 py-2 text-sm font-medium text-[#45566f] hover:bg-[#f8fbff]">
              Batal
            </button>
            <button type="submit" form="form-dosen" disabled={menyimpan}
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-[#1b3a6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#153159] disabled:opacity-70"
            >
              {menyimpan ? <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</> : <><Plus className="h-4 w-4" /> {editId ? "Simpan Perubahan" : "Tambah Dosen"}</>}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
