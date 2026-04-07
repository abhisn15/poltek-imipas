"use client"

import { useEffect, useMemo, useState } from "react"
import { ImageIcon, Loader2, Plus, RefreshCw, Trash2, Edit, Search, Calendar as CalendarIcon } from "lucide-react"

import RichTextEditor from "@/components/admin/rich-text-editor"
import SearchableDropdown from "@/components/ui/searchable-dropdown"
import { formatTanggalIndonesia } from "@/lib/teks"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

type ItemBeritaAdmin = {
  idBerita: number
  judul: string
  slug: string
  ringkasan: string
  isiPenuh: string
  kategori: string
  penulis: string
  gambarUrl: string | null
  tagList: string[]
  estimasiBacaMenit: number
  jumlahDilihat: number
  statusPublikasi: "draft" | "terbit"
  tanggalTerbit: string
}

type ItemKategori = {
  idKategori: number
  namaKategori: string
  slug: string
}

type ItemGambar = {
  namaFile: string
  url: string
}

type FormBerita = {
  judul: string
  kategori: string
  ringkasan: string
  isiPenuh: string
  penulis: string
  gambarUrl: string
  tagInput: string
  estimasiBacaMenit: string
  statusPublikasi: "draft" | "terbit"
  tanggalTerbit: string
}

const formAwal: FormBerita = {
  judul: "",
  kategori: "",
  ringkasan: "",
  isiPenuh: "",
  penulis: "",
  gambarUrl: "",
  tagInput: "",
  estimasiBacaMenit: "4",
  statusPublikasi: "terbit",
  tanggalTerbit: "",
}

export default function AdminBeritaPage() {
  const [form, setForm] = useState<FormBerita>(formAwal)
  const [editId, setEditId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [daftar, setDaftar] = useState<ItemBeritaAdmin[]>([])
  const [daftarKategori, setDaftarKategori] = useState<ItemKategori[]>([])
  const [kategoriBaru, setKategoriBaru] = useState("")
  
  const [memuat, setMemuat] = useState(true)
  const [menyimpan, setMenyimpan] = useState(false)
  const [menambahKategori, setMenambahKategori] = useState(false)
  const [mengunggahGambar, setMengunggahGambar] = useState(false)
  const [error, setError] = useState("")
  const [sukses, setSukses] = useState("")

  // Filter & Pagination states
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const opsiKategori = useMemo(
    () =>
      daftarKategori.map((item) => ({
        value: item.namaKategori,
        label: item.namaKategori,
        subLabel: item.slug,
      })),
    [daftarKategori],
  )

  const jumlahKarakterJudul = form.judul.length
  const jumlahKarakterRingkasan = form.ringkasan.length
  const kelasInputDasar =
    "h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none transition focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
  const kelasTextareaDasar =
    "w-full rounded-xl border border-[#d6dde6] bg-white px-3 py-2 text-sm text-[#1b2a4a] outline-none transition focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"

  const muatDaftar = async () => {
    try {
      const response = await fetch("/api/admin/berita", {
        method: "GET",
        cache: "no-store",
      })
      if (!response.ok) {
        throw new Error("Gagal memuat daftar berita")
      }
      const payload = await response.json()
      setDaftar(payload?.data ?? [])
    } catch {
      setError("Daftar berita tidak bisa dimuat. Pastikan MySQL lokal sudah aktif.")
    } finally {
      setMemuat(false)
    }
  }

  const muatKategori = async () => {
    const response = await fetch("/api/admin/kategori-berita", {
      method: "GET",
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Gagal memuat kategori")
    }
    const payload = await response.json()
    setDaftarKategori(payload?.data ?? [])
  }

  const muatSemuaData = async () => {
    setError("")
    await Promise.all([muatDaftar(), muatKategori()])
  }

  useEffect(() => {
    muatSemuaData().catch(() => {
      setError("Data admin belum bisa dimuat sempurna. Coba refresh.")
      setMemuat(false)
    })
  }, [])

  useEffect(() => {
    if (!form.kategori && daftarKategori.length > 0 && !editId) {
      setForm((lama) => ({
        ...lama,
        kategori: daftarKategori[0].namaKategori,
      }))
    }
  }, [daftarKategori, form.kategori, editId])

  // Filter & Pagination Logic
  const filteredDaftar = useMemo(() => {
    return daftar.filter((item) => {
      const matchSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.kategori.toLowerCase().includes(searchQuery.toLowerCase())
      const matchDate = filterDate ? item.tanggalTerbit.startsWith(filterDate) : true
      return matchSearch && matchDate
    })
  }, [daftar, searchQuery, filterDate])

  const totalPages = Math.ceil(filteredDaftar.length / itemsPerPage)
  const paginatedDaftar = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredDaftar.slice(start, start + itemsPerPage)
  }, [filteredDaftar, currentPage, itemsPerPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterDate])

  const bukaModalTambah = () => {
    setForm({
      ...formAwal,
      kategori: daftarKategori.length > 0 ? daftarKategori[0].namaKategori : "",
    })
    setEditId(null)
    setError("")
    setSukses("")
    setIsModalOpen(true)
  }

  const bukaModalEdit = (item: ItemBeritaAdmin) => {
    setForm({
      judul: item.judul,
      kategori: item.kategori,
      ringkasan: item.ringkasan,
      isiPenuh: item.isiPenuh,
      penulis: item.penulis,
      gambarUrl: item.gambarUrl || "",
      tagInput: item.tagList.join(", "),
      estimasiBacaMenit: item.estimasiBacaMenit.toString(),
      statusPublikasi: item.statusPublikasi,
      tanggalTerbit: item.tanggalTerbit.slice(0, 16), // format for datetime-local
    })
    setEditId(item.idBerita)
    setError("")
    setSukses("")
    setIsModalOpen(true)
  }

  const submitBerita = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSukses("")
    setError("")

    const isiTanpaTag = form.isiPenuh.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim()
    if (!form.judul.trim() || !form.kategori.trim() || !form.ringkasan.trim() || !isiTanpaTag) {
      setError("Judul, kategori, ringkasan, dan isi berita wajib diisi.")
      return
    }

    try {
      setMenyimpan(true)

      const url = editId ? `/api/admin/berita/${editId}` : "/api/admin/berita"
      const method = editId ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: form.judul,
          kategori: form.kategori,
          ringkasan: form.ringkasan,
          isiPenuh: form.isiPenuh,
          penulis: form.penulis,
          gambarUrl: form.gambarUrl,
          tagList: form.tagInput,
          estimasiBacaMenit: Number(form.estimasiBacaMenit || 4),
          statusPublikasi: form.statusPublikasi,
          tanggalTerbit: form.tanggalTerbit || undefined,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.message ?? `Gagal ${editId ? "memperbarui" : "membuat"} berita.`)
      }

      setSukses(`Berita berhasil ${editId ? "diperbarui" : "ditambahkan"}.`)
      await muatDaftar()
      setIsModalOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : `Gagal menyimpan berita.`)
    } finally {
      setMenyimpan(false)
    }
  }

  const uploadGambarDariFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/admin/berita/gambar", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const payload = await response.json().catch(() => null)
      throw new Error(payload?.message ?? "Upload gambar gagal.")
    }

    const payload = await response.json()
    return payload?.data as ItemGambar | undefined
  }

  const prosesTambahKategori = async () => {
    setError("")
    setSukses("")

    const namaKategori = kategoriBaru.trim()
    if (!namaKategori) {
      setError("Nama kategori baru tidak boleh kosong.")
      return
    }

    try {
      setMenambahKategori(true)
      const response = await fetch("/api/admin/kategori-berita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaKategori }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.message ?? "Gagal menambah kategori.")
      }

      const payload = await response.json()
      const kategori = payload?.data as ItemKategori | undefined
      await muatKategori()

      if (kategori?.namaKategori) {
        setForm((lama) => ({ ...lama, kategori: kategori.namaKategori }))
      }
      setKategoriBaru("")
      setSukses("Kategori baru berhasil ditambahkan.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambah kategori.")
    } finally {
      setMenambahKategori(false)
    }
  }

  const hapusItem = async (item: ItemBeritaAdmin) => {
    const yakin = window.confirm(`Hapus berita "${item.judul}"?`)
    if (!yakin) {
      return
    }

    setSukses("")
    setError("")

    try {
      const response = await fetch(`/api/admin/berita/${item.idBerita}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.message ?? "Gagal menghapus berita.")
      }
      setSukses("Berita berhasil dihapus.")
      await muatDaftar()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus berita.")
    }
  }

  return (
    <div className="space-y-5">
      {/* Header & Filters */}
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1b2a4a]">Daftar Berita</h2>
            <p className="text-sm text-[#5a6b7f]">Kelola semua berita dan publikasi</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setMemuat(true)
                muatSemuaData().finally(() => setMemuat(false))
              }}
              disabled={memuat}
              className="inline-flex items-center gap-2 rounded-xl border border-[#d6dde6] bg-white px-3 py-2 text-sm font-medium text-[#1b3a6b] transition hover:bg-[#f8fbff] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 ${memuat ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={bukaModalTambah}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#153159]"
            >
              <Plus className="h-4 w-4" />
              Buat Berita
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-[#f8fbff] p-3 border border-[#e5ebf3]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a97aa]" />
            <input 
              type="text"
              placeholder="Cari judul atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#d6dde6] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#1b3a6b] focus:ring-1 focus:ring-[#1b3a6b]"
            />
          </div>
          <div className="relative min-w-[150px]">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a97aa]" />
            <input 
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#d6dde6] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#1b3a6b] focus:ring-1 focus:ring-[#1b3a6b]"
            />
          </div>
          {(searchQuery || filterDate) && (
            <button 
              onClick={() => { setSearchQuery(""); setFilterDate("") }}
              className="text-sm text-[#b42318] hover:underline px-2"
            >
              Reset Filter
            </button>
          )}
        </div>
      </section>

      {/* Messages */}
      {error && !isModalOpen && (
        <div className="rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-3 text-sm text-[#b42318]">
          {error}
        </div>
      )}
      {sukses && !isModalOpen && (
        <div className="rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-4 py-3 text-sm text-[#157347]">
          {sukses}
        </div>
      )}

      {/* List */}
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        {memuat ? (
          <div className="py-10 text-center text-sm text-[#5a6b7f]">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[#1b3a6b]" />
            Memuat data...
          </div>
        ) : paginatedDaftar.length === 0 ? (
          <div className="py-10 text-center text-sm text-[#5a6b7f]">
            {daftar.length === 0 ? "Belum ada berita." : "Tidak ada berita yang cocok dengan filter."}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedDaftar.map((item) => (
              <article key={item.idBerita} className="rounded-xl border border-[#e6ebf2] bg-[#fafcff] p-4 transition hover:border-[#d6dde6] hover:shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#1b2a4a] leading-tight">{item.judul}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#5a6b7f]">
                      <span className="flex items-center gap-1.5 font-medium text-[#1b3a6b] bg-[#edf2fb] px-2 py-0.5 rounded-md">
                        {item.kategori}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {formatTanggalIndonesia(item.tanggalTerbit)}
                      </span>
                      <span>{item.jumlahDilihat.toLocaleString("id-ID")} kali dibaca</span>
                    </div>
                    <p className="mt-3 text-sm text-[#45566f] line-clamp-2">{item.ringkasan}</p>
                    
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          item.statusPublikasi === "terbit"
                            ? "bg-[#e4f3ea] text-[#17633f]"
                            : "bg-[#f1f3f7] text-[#475569]"
                        }`}
                      >
                        {item.statusPublikasi.toUpperCase()}
                      </span>
                      {item.tagList.map((tag) => (
                        <span key={`${item.idBerita}-${tag}`} className="text-[11px] text-[#8a97aa]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => bukaModalEdit(item)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#d6dde6] bg-white px-3 py-1.5 text-xs font-medium text-[#1b2a4a] hover:bg-[#f8fbff]"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => hapusItem(item)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#f1c7c7] bg-[#fff1f1] px-3 py-1.5 text-xs font-medium text-[#b42318] hover:bg-[#ffe4e4]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 border-t border-[#e6ebf2] pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(p => p - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1
                  // Simple pagination logic: show first, last, current, and adjacent
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          href="#" 
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(p => p + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>

      {/* Modal Create/Edit — full-size editor */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="!max-w-[96vw] w-[1280px] max-h-[95vh] p-0 gap-0 overflow-hidden flex flex-col">

          {/* ── Header ── */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#e5ebf3] bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${editId ? "bg-amber-50" : "bg-[#edf2fb]"}`}>
                {editId
                  ? <Edit className="h-4 w-4 text-amber-600" />
                  : <Plus className="h-4 w-4 text-[#1b3a6b]" />
                }
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-[#1b2a4a] leading-tight">
                  {editId ? "Edit Berita" : "Buat Berita Baru"}
                </DialogTitle>
                <DialogDescription className="text-xs text-[#8a97aa] mt-0.5">
                  {editId ? `Memperbarui konten · ID #${editId}` : "Isi semua field yang diperlukan lalu simpan"}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Status pill */}
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                form.statusPublikasi === "terbit"
                  ? "bg-[#e4f3ea] text-[#17633f]"
                  : "bg-[#f1f3f7] text-[#475569]"
              }`}>
                {form.statusPublikasi === "terbit" ? "● Terbit" : "○ Draft"}
              </span>
            </div>
          </div>

          {/* ── Alert messages ── */}
          {(error || sukses) && (
            <div className="shrink-0 px-6 pt-3">
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-2.5 text-sm text-[#b42318]">
                  <span className="mt-0.5 shrink-0">⚠</span>
                  {error}
                </div>
              )}
              {sukses && (
                <div className="flex items-center gap-2 rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-4 py-2.5 text-sm text-[#157347]">
                  <span>✓</span>
                  {sukses}
                </div>
              )}
            </div>
          )}

          {/* ── Form body: scrollable 2-column ── */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            <form
              id="form-berita"
              onSubmit={submitBerita}
              className="flex w-full overflow-auto lg:overflow-hidden flex-col lg:flex-row"
            >
              {/* Left: Konten utama */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 min-w-0">

                {/* Judul */}
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1b2a4a]">
                    <span>Judul Berita <span className="text-red-500">*</span></span>
                    <span className={`font-normal ${jumlahKarakterJudul > 100 ? "text-amber-500" : "text-[#8a97aa]"}`}>
                      {jumlahKarakterJudul}/120
                    </span>
                  </label>
                  <input
                    value={form.judul}
                    onChange={(event) => setForm((lama) => ({ ...lama, judul: event.target.value }))}
                    className="h-11 w-full rounded-xl border border-[#d6dde6] bg-white px-4 text-base font-medium text-[#1b2a4a] outline-none transition focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10 placeholder:font-normal placeholder:text-[#b0bac7]"
                    placeholder="Tuliskan judul berita yang menarik..."
                    maxLength={120}
                    required
                  />
                </div>

                {/* Ringkasan */}
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1b2a4a]">
                    <span>Ringkasan <span className="text-red-500">*</span></span>
                    <span className={`font-normal ${jumlahKarakterRingkasan > 180 ? "text-amber-500" : "text-[#8a97aa]"}`}>
                      {jumlahKarakterRingkasan}/220
                    </span>
                  </label>
                  <textarea
                    value={form.ringkasan}
                    onChange={(event) => setForm((lama) => ({ ...lama, ringkasan: event.target.value }))}
                    className="w-full rounded-xl border border-[#d6dde6] bg-white px-4 py-3 text-sm text-[#1b2a4a] outline-none transition focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10 placeholder:text-[#b0bac7] resize-none"
                    placeholder="Ringkasan singkat yang ditampilkan di halaman daftar berita..."
                    maxLength={220}
                    rows={3}
                    required
                  />
                </div>

                {/* Isi Berita — CKEditor */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">
                    Isi Berita <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    value={form.isiPenuh}
                    onChange={(value) => setForm((lama) => ({ ...lama, isiPenuh: value }))}
                    placeholder="Tulis isi berita secara lengkap dan informatif..."
                  />
                </div>
              </div>

              {/* Right: Sidebar pengaturan */}
              <div className="w-full lg:w-[300px] lg:shrink-0 overflow-y-auto border-t border-[#e5ebf3] lg:border-t-0 lg:border-l bg-[#f8fbff] px-5 py-5 space-y-5">

                {/* Status & Tanggal */}
                <div className="rounded-xl border border-[#e5ebf3] bg-white p-4 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1b3a6b]">Publikasi</h3>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Status</label>
                    <select
                      value={form.statusPublikasi}
                      onChange={(event) =>
                        setForm((lama) => ({
                          ...lama,
                          statusPublikasi: event.target.value as "draft" | "terbit",
                        }))
                      }
                      className={kelasInputDasar}
                    >
                      <option value="terbit">● Terbit (Publik)</option>
                      <option value="draft">○ Draft (Disembunyikan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Tanggal Terbit</label>
                    <input
                      type="datetime-local"
                      value={form.tanggalTerbit}
                      onChange={(event) => setForm((lama) => ({ ...lama, tanggalTerbit: event.target.value }))}
                      className={kelasInputDasar}
                    />
                    <p className="mt-1 text-[11px] text-[#8a97aa]">Kosongkan untuk otomatis sekarang</p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Estimasi Baca (menit)</label>
                    <input
                      type="number"
                      min={1}
                      value={form.estimasiBacaMenit}
                      onChange={(event) => setForm((lama) => ({ ...lama, estimasiBacaMenit: event.target.value }))}
                      className={kelasInputDasar}
                    />
                  </div>
                </div>

                {/* Kategori */}
                <div className="rounded-xl border border-[#e5ebf3] bg-white p-4 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1b3a6b]">Kategori</h3>
                  <div>
                    <SearchableDropdown
                      value={form.kategori}
                      onChange={(value) => setForm((lama) => ({ ...lama, kategori: value }))}
                      options={opsiKategori}
                      placeholder="Pilih kategori"
                      searchPlaceholder="Cari kategori..."
                      emptyText="Kategori belum tersedia"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={kategoriBaru}
                      onChange={(event) => setKategoriBaru(event.target.value)}
                      className={`${kelasInputDasar} text-xs`}
                      placeholder="Nama kategori baru..."
                    />
                    <button
                      type="button"
                      onClick={prosesTambahKategori}
                      disabled={menambahKategori}
                      className="inline-flex h-10 shrink-0 items-center rounded-xl bg-[#1b3a6b] px-3 text-xs font-semibold text-white disabled:opacity-70 hover:bg-[#153159] transition"
                    >
                      {menambahKategori ? <Loader2 className="h-3 w-3 animate-spin" /> : "+"}
                    </button>
                  </div>
                </div>

                {/* Penulis & Tag */}
                <div className="rounded-xl border border-[#e5ebf3] bg-white p-4 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1b3a6b]">Penulis & Tag</h3>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Penulis</label>
                    <input
                      value={form.penulis}
                      onChange={(event) => setForm((lama) => ({ ...lama, penulis: event.target.value }))}
                      className={kelasInputDasar}
                      placeholder="Biro Humas POLTEKIMIPAS"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1b2a4a]">Tag</label>
                    <input
                      value={form.tagInput}
                      onChange={(event) => setForm((lama) => ({ ...lama, tagInput: event.target.value }))}
                      className={kelasInputDasar}
                      placeholder="Taruna, Akademik, Workshop"
                    />
                    <p className="mt-1 text-[11px] text-[#8a97aa]">Pisahkan dengan koma</p>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="rounded-xl border border-[#e5ebf3] bg-white p-4 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1b3a6b]">Thumbnail</h3>
                  <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#d6dde6] bg-[#f8fbff] py-2.5 text-xs font-medium text-[#5a6b7f] hover:border-[#1b3a6b] hover:text-[#1b3a6b] transition-colors">
                    {mengunggahGambar
                      ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Mengunggah...</>
                      : <><ImageIcon className="h-3.5 w-3.5" /> Upload Gambar</>
                    }
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={mengunggahGambar}
                      onChange={async (event) => {
                        const file = event.target.files?.[0]
                        event.currentTarget.value = ""
                        if (!file) return
                        setError("")
                        try {
                          setMengunggahGambar(true)
                          const hasil = await uploadGambarDariFile(file)
                          if (hasil?.url) {
                            setForm((lama) => ({ ...lama, gambarUrl: hasil.url }))
                          }
                        } catch (err) {
                          setError(err instanceof Error ? err.message : "Upload gambar gagal.")
                        } finally {
                          setMengunggahGambar(false)
                        }
                      }}
                    />
                  </label>
                  <p className="text-center text-[11px] text-[#8a97aa]">jpg, png, webp · maks 8MB</p>
                  {form.gambarUrl ? (
                    <div className="overflow-hidden rounded-xl border border-[#e4eaf2]">
                      <img src={form.gambarUrl} alt="Thumbnail" className="h-36 w-full object-cover" />
                      <div className="flex items-center justify-between bg-white px-3 py-2">
                        <span className="truncate text-[11px] text-[#5a6b7f] max-w-[160px]">
                          {form.gambarUrl.split("/").pop()}
                        </span>
                        <button
                          type="button"
                          onClick={() => setForm((lama) => ({ ...lama, gambarUrl: "" }))}
                          className="text-[11px] font-medium text-[#b42318] hover:underline shrink-0"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-28 items-center justify-center rounded-xl border border-[#e4eaf2] bg-[#f8fbff]">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-6 w-6 text-[#c6d0db] mb-1" />
                        <p className="text-[11px] text-[#b0bac7]">Preview gambar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* ── Footer sticky ── */}
          <div className="shrink-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-[#e5ebf3] bg-white px-6 py-3.5">
            <p className="text-xs text-[#8a97aa]">
              <span className="text-red-400">*</span> Field wajib diisi
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-[#d6dde6] bg-white px-4 py-2 text-sm font-medium text-[#45566f] hover:bg-[#f8fbff] hover:text-[#1b2a4a] transition"
              >
                Batal
              </button>
              <button
                type="submit"
                form="form-berita"
                disabled={menyimpan || mengunggahGambar}
                className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-[#1b3a6b] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#153159] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {menyimpan
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</>
                  : <><Plus className="h-4 w-4" /> {editId ? "Simpan Perubahan" : "Terbitkan Berita"}</>
                }
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
