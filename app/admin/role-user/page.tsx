"use client"

import { useEffect, useState, useTransition } from "react"
import {
  ShieldUser, Plus, Pencil, Trash2, Check, X, Loader2, ChevronDown, ChevronUp, AlertTriangle, Sparkles,
} from "lucide-react"
import {
  ambilSemuaRole, ambilSemuaMenu, buatRole, updateRole, hapusRole, seedMenuBawaan,
} from "@/lib/aksi-admin"

type MenuData = { idMenu: number; kunci: string; label: string; href: string; ikon: string; grup: string; urutan: number; aktif: boolean }
type RoleData = {
  idRole: number
  namaRole: string
  deskripsi: string | null
  izinMenu: { menu: MenuData }[]
  _count: { akunAdmin: number }
}

export default function AdminRoleUserPage() {
  const [roles, setRoles] = useState<RoleData[]>([])
  const [menus, setMenus] = useState<MenuData[]>([])
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState("")
  const [sukses, setSukses] = useState("")

  // Form state
  const [mode, setMode] = useState<"list" | "buat" | "edit">("list")
  const [editId, setEditId] = useState<number | null>(null)
  const [formNama, setFormNama] = useState("")
  const [formDeskripsi, setFormDeskripsi] = useState("")
  const [formMenuIds, setFormMenuIds] = useState<Set<number>>(new Set())
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  const [isPending, startTransition] = useTransition()
  const [hapusKonfirmasi, setHapusKonfirmasi] = useState<number | null>(null)

  const muatData = () => {
    setMemuat(true)
    setError("")
    startTransition(async () => {
      try {
        const [dataRole, dataMenu] = await Promise.all([ambilSemuaRole(), ambilSemuaMenu()])
        setRoles(dataRole as RoleData[])
        setMenus(dataMenu as MenuData[])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data.")
      } finally {
        setMemuat(false)
      }
    })
  }

  useEffect(() => { muatData() }, [])

  const grupMenu = menus.reduce<Record<string, MenuData[]>>((acc, m) => {
    if (!acc[m.grup]) acc[m.grup] = []
    acc[m.grup].push(m)
    return acc
  }, {})

  const bukaFormBuat = () => {
    setMode("buat")
    setEditId(null)
    setFormNama("")
    setFormDeskripsi("")
    setFormMenuIds(new Set())
    setError("")
    setSukses("")
  }

  const bukaFormEdit = (role: RoleData) => {
    setMode("edit")
    setEditId(role.idRole)
    setFormNama(role.namaRole)
    setFormDeskripsi(role.deskripsi ?? "")
    setFormMenuIds(new Set(role.izinMenu.map((iz) => iz.menu.idMenu)))
    setError("")
    setSukses("")
  }

  const batal = () => {
    setMode("list")
    setEditId(null)
    setError("")
  }

  const toggleMenu = (idMenu: number) => {
    setFormMenuIds((prev) => {
      const next = new Set(prev)
      if (next.has(idMenu)) next.delete(idMenu)
      else next.add(idMenu)
      return next
    })
  }

  const toggleGrup = (grup: string, menusDalamGrup: MenuData[]) => {
    const allChecked = menusDalamGrup.every((m) => formMenuIds.has(m.idMenu))
    setFormMenuIds((prev) => {
      const next = new Set(prev)
      menusDalamGrup.forEach((m) => {
        if (allChecked) next.delete(m.idMenu)
        else next.add(m.idMenu)
      })
      return next
    })
  }

  const simpan = () => {
    setError("")
    setSukses("")
    startTransition(async () => {
      try {
        const payload = { namaRole: formNama, deskripsi: formDeskripsi, menuIds: Array.from(formMenuIds) }
        if (mode === "buat") {
          await buatRole(payload)
          setSukses("Role berhasil dibuat!")
        } else if (mode === "edit" && editId !== null) {
          await updateRole(editId, payload)
          setSukses("Role berhasil diperbarui!")
        }
        setMode("list")
        muatData()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan role.")
      }
    })
  }

  const prosesHapus = (idRole: number) => {
    setError("")
    setSukses("")
    startTransition(async () => {
      try {
        await hapusRole(idRole)
        setSukses("Role berhasil dihapus!")
        setHapusKonfirmasi(null)
        muatData()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menghapus role.")
        setHapusKonfirmasi(null)
      }
    })
  }

  const prosesSeedMenu = () => {
    setError("")
    setSukses("")
    startTransition(async () => {
      try {
        await seedMenuBawaan()
        setSukses("Menu bawaan berhasil di-generate!")
        muatData()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal generate menu.")
      }
    })
  }

  if (memuat) {
    return (
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-6">
        <div className="flex items-center gap-2 text-sm text-[#5a6b7f]">
          <Loader2 className="h-4 w-4 animate-spin text-[#1b3a6b]" />
          Memuat data role & menu...
        </div>
      </section>
    )
  }

  // ── FORM Buat / Edit Role ──
  if (mode === "buat" || mode === "edit") {
    return (
      <section className="space-y-4">
        <div className="rounded-2xl border border-[#d6dde6] bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1b2a4a]">
              {mode === "buat" ? "Buat Role Baru" : "Edit Role"}
            </h2>
            <button onClick={batal} className="flex items-center gap-1.5 rounded-lg border border-[#d6dde6] px-3 py-2 text-xs font-medium text-[#5a6b7f] transition hover:bg-[#f5f7fb]">
              <X className="h-3.5 w-3.5" /> Batal
            </button>
          </div>

          {error && <div className="mb-4 rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-2.5 text-sm text-[#b42318]">{error}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#1b2a4a]">Nama Role *</span>
              <input
                type="text"
                value={formNama}
                onChange={(e) => setFormNama(e.target.value)}
                placeholder="misal: Editor Berita"
                className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
              />
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#1b2a4a]">Deskripsi</span>
              <input
                type="text"
                value={formDeskripsi}
                onChange={(e) => setFormDeskripsi(e.target.value)}
                placeholder="misal: Hanya bisa kelola berita"
                className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
              />
            </label>
          </div>

          {/* Checklist Menu */}
          <div className="mt-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#1b2a4a]">Akses Menu</h3>
            {menus.length === 0 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                <AlertTriangle className="mb-1 inline h-4 w-4" /> Belum ada menu terdaftar di database.{" "}
                <button onClick={prosesSeedMenu} disabled={isPending} className="font-semibold underline">
                  Klik untuk generate menu bawaan
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {Object.entries(grupMenu).map(([grup, items]) => {
                  const allChecked = items.every((m) => formMenuIds.has(m.idMenu))
                  const someChecked = items.some((m) => formMenuIds.has(m.idMenu))
                  const isOpen = expandedGroup === grup || expandedGroup === null

                  return (
                    <div key={grup} className="rounded-xl border border-[#e5ebf3] bg-[#fafcff]">
                      <button
                        type="button"
                        onClick={() => setExpandedGroup(isOpen && expandedGroup !== null ? null : grup)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); toggleGrup(grup, items) }}
                            className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                              allChecked
                                ? "border-[#1b3a6b] bg-[#1b3a6b] text-white"
                                : someChecked
                                  ? "border-[#1b3a6b] bg-[#1b3a6b]/20 text-[#1b3a6b]"
                                  : "border-[#d6dde6] bg-white"
                            }`}
                          >
                            {(allChecked || someChecked) && <Check className="h-3 w-3" />}
                          </button>
                          <span className="text-sm font-semibold text-[#1b2a4a]">{grup}</span>
                          <span className="text-xs text-[#5a6b7f]">({items.length} menu)</span>
                        </div>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-[#5a6b7f]" /> : <ChevronDown className="h-4 w-4 text-[#5a6b7f]" />}
                      </button>

                      {isOpen && (
                        <div className="border-t border-[#e5ebf3] px-4 py-3">
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((menu) => (
                              <label
                                key={menu.idMenu}
                                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                                  formMenuIds.has(menu.idMenu)
                                    ? "border-[#1b3a6b]/40 bg-[#1b3a6b]/5"
                                    : "border-[#e5ebf3] bg-white hover:border-[#1b3a6b]/20"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleMenu(menu.idMenu)}
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                                    formMenuIds.has(menu.idMenu) ? "border-[#1b3a6b] bg-[#1b3a6b] text-white" : "border-[#d6dde6] bg-white"
                                  }`}
                                >
                                  {formMenuIds.has(menu.idMenu) && <Check className="h-3 w-3" />}
                                </button>
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-[#1b2a4a]">{menu.label}</div>
                                  <div className="truncate text-[11px] text-[#5a6b7f]">{menu.href}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={simpan}
              disabled={isPending || !formNama.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153159] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {mode === "buat" ? "Buat Role" : "Simpan Perubahan"}
            </button>
            <span className="text-xs text-[#5a6b7f]">{formMenuIds.size} menu dipilih</span>
          </div>
        </div>
      </section>
    )
  }

  // ── LIST ROLE ──
  return (
    <section className="space-y-4">
      {error && <div className="rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-2.5 text-sm text-[#b42318]">{error}</div>}
      {sukses && <div className="rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-4 py-2.5 text-sm text-[#157347]">{sukses}</div>}

      <div className="rounded-2xl border border-[#d6dde6] bg-white p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1b2a4a] flex items-center gap-2">
              <ShieldUser className="h-5 w-5 text-[#1b3a6b]" /> Manajemen Role
            </h2>
            <p className="mt-1 text-sm text-[#5a6b7f]">Kelola role dan hak akses menu untuk setiap role.</p>
          </div>
          <div className="flex items-center gap-2">
            {menus.length === 0 && (
              <button
                onClick={prosesSeedMenu}
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-60"
              >
                <Sparkles className="h-3.5 w-3.5" /> Generate Menu
              </button>
            )}
            <button
              onClick={bukaFormBuat}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153159]"
            >
              <Plus className="h-4 w-4" /> Buat Role
            </button>
          </div>
        </div>

        {roles.length === 0 ? (
          <div className="rounded-xl border border-[#e5ebf3] bg-[#fafcff] p-8 text-center text-sm text-[#5a6b7f]">
            Belum ada role. Klik &ldquo;Buat Role&rdquo; untuk membuat role baru.
          </div>
        ) : (
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.idRole} className="rounded-xl border border-[#e5ebf3] bg-[#fafcff] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#1b2a4a]">{role.namaRole}</h3>
                      <span className="rounded-full bg-[#1b3a6b]/10 px-2 py-0.5 text-[10px] font-semibold text-[#1b3a6b]">
                        {role._count.akunAdmin} user
                      </span>
                    </div>
                    {role.deskripsi && <p className="mt-1 text-xs text-[#5a6b7f]">{role.deskripsi}</p>}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {role.izinMenu.map((iz) => (
                        <span key={iz.menu.idMenu} className="rounded-md bg-[#e5ebf3] px-2 py-0.5 text-[11px] font-medium text-[#1b2a4a]">
                          {iz.menu.label}
                        </span>
                      ))}
                      {role.izinMenu.length === 0 && (
                        <span className="text-[11px] italic text-[#8a97aa]">Tidak ada menu dipilih</span>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => bukaFormEdit(role)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#d6dde6] px-3 py-2 text-xs font-medium text-[#1b2a4a] transition hover:bg-[#f5f7fb]"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    {hapusKonfirmasi === role.idRole ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => prosesHapus(role.idRole)}
                          disabled={isPending}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white"
                        >
                          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />} Ya, Hapus
                        </button>
                        <button onClick={() => setHapusKonfirmasi(null)} className="rounded-lg border border-[#d6dde6] px-3 py-2 text-xs text-[#5a6b7f]">
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setHapusKonfirmasi(role.idRole)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Hapus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
