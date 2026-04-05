"use client"

import { useEffect, useMemo, useState } from "react"
import { ImageIcon, Loader2, Plus, RefreshCw, Trash2 } from "lucide-react"

import RichTextEditor from "@/components/admin/rich-text-editor"
import SearchableDropdown from "@/components/ui/searchable-dropdown"
import { formatTanggalIndonesia } from "@/lib/teks"

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
  const [daftar, setDaftar] = useState<ItemBeritaAdmin[]>([])
  const [daftarKategori, setDaftarKategori] = useState<ItemKategori[]>([])
  const [kategoriBaru, setKategoriBaru] = useState("")
  const [memuat, setMemuat] = useState(true)
  const [menyimpan, setMenyimpan] = useState(false)
  const [menambahKategori, setMenambahKategori] = useState(false)
  const [mengunggahGambar, setMengunggahGambar] = useState(false)
  const [error, setError] = useState("")
  const [sukses, setSukses] = useState("")

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
    if (!form.kategori && daftarKategori.length > 0) {
      setForm((lama) => ({
        ...lama,
        kategori: daftarKategori[0].namaKategori,
      }))
    }
  }, [daftarKategori, form.kategori])

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

      const response = await fetch("/api/admin/berita", {
        method: "POST",
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
        throw new Error(payload?.message ?? "Gagal membuat berita.")
      }

      setForm((lama) => ({
        ...formAwal,
        kategori: lama.kategori,
      }))
      setSukses("Berita baru berhasil ditambahkan.")
      await muatDaftar()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan berita.")
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
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-[#1b2a4a]">Buat Berita Baru</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setMemuat(true)
              muatSemuaData().finally(() => setMemuat(false))
            }}
            disabled={memuat}
            className="inline-flex items-center gap-2 rounded-xl border border-[#d6dde6] bg-white px-3 py-2 text-xs font-medium text-[#1b3a6b] transition hover:bg-[#f8fbff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${memuat ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-3 py-2 text-sm text-[#b42318]">
            {error}
          </div>
        ) : null}

        {sukses ? (
          <div className="mb-4 rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-3 py-2 text-sm text-[#157347]">
            {sukses}
          </div>
        ) : null}

        <form onSubmit={submitBerita} className="grid gap-5 lg:grid-cols-12">
          <section className="rounded-xl border border-[#e5ebf3] bg-[#fbfdff] p-4 md:p-5 lg:col-span-12">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-[#1b2a4a]">Konten Utama</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 flex items-center justify-between text-xs font-semibold text-[#1b2a4a]">
                  Judul
                  <span className="font-normal text-[#8a97aa]">{jumlahKarakterJudul}/120</span>
                </span>
                <input
                  value={form.judul}
                  onChange={(event) => setForm((lama) => ({ ...lama, judul: event.target.value }))}
                  className={kelasInputDasar}
                  placeholder="Judul berita"
                  maxLength={120}
                  required
                />
              </label>

              <div className="text-sm">
                <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Kategori</span>
                <SearchableDropdown
                  value={form.kategori}
                  onChange={(value) => setForm((lama) => ({ ...lama, kategori: value }))}
                  options={opsiKategori}
                  placeholder="Pilih kategori"
                  searchPlaceholder="Cari kategori..."
                  emptyText="Kategori belum tersedia"
                />
                <div className="mt-2 flex gap-2">
                  <input
                    value={kategoriBaru}
                    onChange={(event) => setKategoriBaru(event.target.value)}
                    className={kelasInputDasar}
                    placeholder="Tambah kategori baru"
                  />
                  <button
                    type="button"
                    onClick={prosesTambahKategori}
                    disabled={menambahKategori}
                    className="inline-flex h-10 shrink-0 items-center rounded-xl bg-[#1b3a6b] px-3 text-xs font-semibold text-white disabled:opacity-70"
                  >
                    {menambahKategori ? "Menyimpan..." : "Tambah"}
                  </button>
                </div>
              </div>

              <label className="text-sm md:col-span-2">
                <span className="mb-1 flex items-center justify-between text-xs font-semibold text-[#1b2a4a]">
                  Ringkasan
                  <span className="font-normal text-[#8a97aa]">{jumlahKarakterRingkasan}/220</span>
                </span>
                <textarea
                  value={form.ringkasan}
                  onChange={(event) => setForm((lama) => ({ ...lama, ringkasan: event.target.value }))}
                  className={`${kelasTextareaDasar} h-24`}
                  placeholder="Ringkasan"
                  maxLength={220}
                  required
                />
              </label>

              <div className="text-sm md:col-span-2">
                <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Isi Berita</span>
                <RichTextEditor
                  value={form.isiPenuh}
                  onChange={(value) => setForm((lama) => ({ ...lama, isiPenuh: value }))}
                  placeholder="Tulis isi berita..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#e5ebf3] bg-[#fbfdff] p-4 md:p-5 lg:col-span-5">
            <h3 className="mb-3 text-sm font-semibold text-[#1b2a4a]">Media</h3>
            <div className="text-sm">
              <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Thumbnail</span>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <label className="inline-flex cursor-pointer items-center rounded-xl border border-[#d6dde6] bg-white px-3 py-2 text-xs font-medium text-[#1b2a4a] hover:bg-[#f8fbff]">
                  {mengunggahGambar ? "Mengunggah..." : "Upload dari file"}
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
                        setSukses("Gambar berhasil diupload ke folder asset berita.")
                      } catch (err) {
                        setError(err instanceof Error ? err.message : "Upload gambar gagal.")
                      } finally {
                        setMengunggahGambar(false)
                      }
                    }}
                  />
                </label>
                <span className="text-[11px] text-[#7b8899]">jpg, png, webp, gif, avif · maks 8MB</span>
              </div>
              {form.gambarUrl ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-[#e4eaf2] bg-[#f8fbff]">
                  <img src={form.gambarUrl} alt="Thumbnail berita" className="h-36 w-full object-cover" />
                  <div className="flex items-center justify-between border-t border-[#e4eaf2] px-2 py-1.5">
                    <span className="truncate text-[11px] text-[#5a6b7f]">{form.gambarUrl.split("/").pop()}</span>
                    <button
                      type="button"
                      onClick={() => setForm((lama) => ({ ...lama, gambarUrl: "" }))}
                      className="text-[11px] font-medium text-[#b42318] hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex h-36 items-center justify-center rounded-xl border border-dashed border-[#d6dde6] bg-white text-xs text-[#8a97aa]">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Preview gambar akan tampil di sini
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-[#e5ebf3] bg-[#fbfdff] p-4 md:p-5 lg:col-span-7">
            <h3 className="mb-3 text-sm font-semibold text-[#1b2a4a]">Publikasi</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Penulis</span>
                <input
                  value={form.penulis}
                  onChange={(event) => setForm((lama) => ({ ...lama, penulis: event.target.value }))}
                  className={kelasInputDasar}
                  placeholder="Contoh: Biro Humas POLTEKIMIPAS"
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Tag (pisah koma)</span>
                <input
                  value={form.tagInput}
                  onChange={(event) => setForm((lama) => ({ ...lama, tagInput: event.target.value }))}
                  className={kelasInputDasar}
                  placeholder="Taruna, Akademik, Workshop"
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Tanggal Terbit</span>
                <input
                  type="datetime-local"
                  value={form.tanggalTerbit}
                  onChange={(event) => setForm((lama) => ({ ...lama, tanggalTerbit: event.target.value }))}
                  className={kelasInputDasar}
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Estimasi Baca (menit)</span>
                <input
                  type="number"
                  min={1}
                  value={form.estimasiBacaMenit}
                  onChange={(event) => setForm((lama) => ({ ...lama, estimasiBacaMenit: event.target.value }))}
                  className={kelasInputDasar}
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-xs font-semibold text-[#1b2a4a]">Status</span>
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
                  <option value="terbit">Terbit</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-end gap-3 lg:col-span-12">
            <button
              type="submit"
              disabled={menyimpan || mengunggahGambar}
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-[#1b3a6b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153159] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {menyimpan ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {menyimpan ? "Menyimpan..." : "Simpan Berita"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-[#d6dde6] bg-white p-5">
        <h2 className="mb-4 text-base font-semibold text-[#1b2a4a]">Daftar Berita</h2>

        {memuat ? (
          <p className="text-sm text-[#5a6b7f]">Memuat data...</p>
        ) : daftar.length === 0 ? (
          <p className="text-sm text-[#5a6b7f]">Belum ada berita.</p>
        ) : (
          <div className="space-y-3">
            {daftar.map((item) => (
              <article key={item.idBerita} className="rounded-xl border border-[#e6ebf2] bg-[#fafcff] p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1b2a4a]">{item.judul}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#5a6b7f]">
                      <span>{item.kategori}</span>
                      <span>{formatTanggalIndonesia(item.tanggalTerbit)}</span>
                      <span>{item.jumlahDilihat.toLocaleString("id-ID")} dibaca</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => hapusItem(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#f1c7c7] bg-[#fff1f1] px-2 py-1 text-xs font-medium text-[#b42318]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-sm text-[#45566f]">{item.ringkasan}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      item.statusPublikasi === "terbit"
                        ? "bg-[#e4f3ea] text-[#17633f]"
                        : "bg-[#f1f3f7] text-[#475569]"
                    }`}
                  >
                    {item.statusPublikasi}
                  </span>
                  {item.tagList.map((tag) => (
                    <span key={`${item.idBerita}-${tag}`} className="rounded-full bg-[#edf2fb] px-2 py-0.5 text-[11px] text-[#1b3a6b]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
