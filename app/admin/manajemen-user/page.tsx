"use client"

import { useEffect, useState, useTransition } from "react"
import {
  Users, Plus, Pencil, Trash2, Check, X, Loader2, Eye, EyeOff, ShieldCheck, ShieldAlert,
} from "lucide-react"
import {
  ambilSemuaUser, buatUser, updateUser, hapusUser, ambilDaftarRoleUntukDropdown,
} from "@/lib/aksi-admin"

type RoleDropdown = { idRole: number; namaRole: string }
type UserData = {
  idAdmin: number
  namaPengguna: string
  namaLengkap: string
  peran: "superadmin" | "admin"
  idRole: number | null
  aktif: boolean
  dibuatPada: Date
  role: { idRole: number; namaRole: string } | null
}

export default function AdminManajemenUserPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [roles, setRoles] = useState<RoleDropdown[]>([])
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState("")
  const [sukses, setSukses] = useState("")

  const [mode, setMode] = useState<"list" | "buat" | "edit">("list")
  const [editId, setEditId] = useState<number | null>(null)

  // Form fields
  const [fUsername, setFUsername] = useState("")
  const [fNamaLengkap, setFNamaLengkap] = useState("")
  const [fKataSandi, setFKataSandi] = useState("")
  const [fPeran, setFPeran] = useState<"superadmin" | "admin">("admin")
  const [fIdRole, setFIdRole] = useState<number | null>(null)
  const [fAktif, setFAktif] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [isPending, startTransition] = useTransition()
  const [hapusKonfirmasi, setHapusKonfirmasi] = useState<number | null>(null)

  const muatData = () => {
    setMemuat(true)
    setError("")
    startTransition(async () => {
      try {
        const [dataUser, dataRole] = await Promise.all([ambilSemuaUser(), ambilDaftarRoleUntukDropdown()])
        setUsers(dataUser as UserData[])
        setRoles(dataRole as RoleDropdown[])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data.")
      } finally {
        setMemuat(false)
      }
    })
  }

  useEffect(() => { muatData() }, [])

  const bukaFormBuat = () => {
    setMode("buat")
    setEditId(null)
    setFUsername("")
    setFNamaLengkap("")
    setFKataSandi("")
    setFPeran("admin")
    setFIdRole(null)
    setFAktif(true)
    setShowPassword(false)
    setError("")
    setSukses("")
  }

  const bukaFormEdit = (user: UserData) => {
    setMode("edit")
    setEditId(user.idAdmin)
    setFUsername(user.namaPengguna)
    setFNamaLengkap(user.namaLengkap)
    setFKataSandi("")
    setFPeran(user.peran)
    setFIdRole(user.idRole)
    setFAktif(user.aktif)
    setShowPassword(false)
    setError("")
    setSukses("")
  }

  const batal = () => {
    setMode("list")
    setEditId(null)
    setError("")
  }

  const simpan = () => {
    setError("")
    setSukses("")
    startTransition(async () => {
      try {
        if (mode === "buat") {
          await buatUser({
            namaPengguna: fUsername,
            namaLengkap: fNamaLengkap,
            kataSandi: fKataSandi,
            peran: fPeran,
            idRole: fPeran === "superadmin" ? null : fIdRole,
          })
          setSukses("User berhasil dibuat!")
        } else if (mode === "edit" && editId !== null) {
          await updateUser(editId, {
            namaLengkap: fNamaLengkap,
            peran: fPeran,
            idRole: fPeran === "superadmin" ? null : fIdRole,
            aktif: fAktif,
            kataSandiBaru: fKataSandi || undefined,
          })
          setSukses("User berhasil diperbarui!")
        }
        setMode("list")
        muatData()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan user.")
      }
    })
  }

  const prosesHapus = (idAdmin: number) => {
    setError("")
    setSukses("")
    startTransition(async () => {
      try {
        await hapusUser(idAdmin)
        setSukses("User berhasil dihapus!")
        setHapusKonfirmasi(null)
        muatData()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menghapus user.")
        setHapusKonfirmasi(null)
      }
    })
  }

  if (memuat) {
    return (
      <section className="rounded-2xl border border-[#d6dde6] bg-white p-6">
        <div className="flex items-center gap-2 text-sm text-[#5a6b7f]">
          <Loader2 className="h-4 w-4 animate-spin text-[#1b3a6b]" />
          Memuat data user...
        </div>
      </section>
    )
  }

  // ── FORM Buat / Edit User ──
  if (mode === "buat" || mode === "edit") {
    return (
      <section className="space-y-4">
        <div className="rounded-2xl border border-[#d6dde6] bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1b2a4a]">
              {mode === "buat" ? "Buat User Baru" : "Edit User"}
            </h2>
            <button onClick={batal} className="flex items-center gap-1.5 rounded-lg border border-[#d6dde6] px-3 py-2 text-xs font-medium text-[#5a6b7f] transition hover:bg-[#f5f7fb]">
              <X className="h-3.5 w-3.5" /> Batal
            </button>
          </div>

          {error && <div className="mb-4 rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-2.5 text-sm text-[#b42318]">{error}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Username */}
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#1b2a4a]">Username *</span>
              <input
                type="text"
                value={fUsername}
                onChange={(e) => setFUsername(e.target.value)}
                disabled={mode === "edit"}
                placeholder="misal: editor.berita"
                className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10 disabled:bg-[#f5f7fb] disabled:text-[#8a97aa]"
              />
            </label>

            {/* Nama Lengkap */}
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#1b2a4a]">Nama Lengkap *</span>
              <input
                type="text"
                value={fNamaLengkap}
                onChange={(e) => setFNamaLengkap(e.target.value)}
                placeholder="misal: Budi Santoso"
                className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
              />
            </label>

            {/* Kata Sandi */}
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#1b2a4a]">
                {mode === "buat" ? "Kata Sandi *" : "Kata Sandi Baru (kosongkan jika tidak diubah)"}
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={fKataSandi}
                  onChange={(e) => setFKataSandi(e.target.value)}
                  placeholder={mode === "buat" ? "Minimal 6 karakter" : "••••••"}
                  className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 pr-10 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6b7f]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {/* Peran */}
            <label className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#1b2a4a]">Peran *</span>
              <select
                value={fPeran}
                onChange={(e) => setFPeran(e.target.value as "superadmin" | "admin")}
                className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
              >
                <option value="superadmin">Superadmin (akses semua)</option>
                <option value="admin">Admin (sesuai role)</option>
              </select>
            </label>

            {/* Role — hanya tampil jika peran = admin */}
            {fPeran === "admin" && (
              <label className="space-y-1.5">
                <span className="block text-xs font-semibold text-[#1b2a4a]">Role (hak akses menu)</span>
                <select
                  value={fIdRole ?? ""}
                  onChange={(e) => setFIdRole(e.target.value ? Number(e.target.value) : null)}
                  className="h-10 w-full rounded-xl border border-[#d6dde6] bg-white px-3 text-sm text-[#1b2a4a] outline-none focus:border-[#1b3a6b] focus:ring-2 focus:ring-[#1b3a6b]/10"
                >
                  <option value="">— Tanpa Role (hanya Dashboard) —</option>
                  {roles.map((r) => (
                    <option key={r.idRole} value={r.idRole}>{r.namaRole}</option>
                  ))}
                </select>
              </label>
            )}

            {/* Status aktif — hanya untuk edit */}
            {mode === "edit" && (
              <label className="flex items-center gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setFAktif((v) => !v)}
                  className={`flex h-6 w-11 items-center rounded-full transition-colors ${fAktif ? "bg-[#1b3a6b]" : "bg-[#d6dde6]"}`}
                >
                  <span className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${fAktif ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className="text-sm font-medium text-[#1b2a4a]">{fAktif ? "Aktif" : "Nonaktif"}</span>
              </label>
            )}
          </div>

          {fPeran === "superadmin" && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
              <ShieldAlert className="mr-1 inline h-3.5 w-3.5" />
              Superadmin memiliki akses ke <strong>semua menu</strong> tanpa batasan, tidak perlu memilih role.
            </div>
          )}

          <div className="mt-5">
            <button
              type="button"
              onClick={simpan}
              disabled={isPending || !fNamaLengkap.trim() || (mode === "buat" && (!fUsername.trim() || fKataSandi.length < 6))}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153159] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {mode === "buat" ? "Buat User" : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ── LIST USER ──
  return (
    <section className="space-y-4">
      {error && <div className="rounded-xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-2.5 text-sm text-[#b42318]">{error}</div>}
      {sukses && <div className="rounded-xl border border-[#b7e1c5] bg-[#effbf2] px-4 py-2.5 text-sm text-[#157347]">{sukses}</div>}

      <div className="rounded-2xl border border-[#d6dde6] bg-white p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1b2a4a] flex items-center gap-2">
              <Users className="h-5 w-5 text-[#1b3a6b]" /> Manajemen User
            </h2>
            <p className="mt-1 text-sm text-[#5a6b7f]">Kelola akun admin, atur peran dan role.</p>
          </div>
          <button
            onClick={bukaFormBuat}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a6b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153159]"
          >
            <Plus className="h-4 w-4" /> Buat User
          </button>
        </div>

        {users.length === 0 ? (
          <div className="rounded-xl border border-[#e5ebf3] bg-[#fafcff] p-8 text-center text-sm text-[#5a6b7f]">
            Belum ada user.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5ebf3] text-xs font-bold uppercase tracking-wider text-[#5a6b7f]">
                  <th className="px-3 py-3">User</th>
                  <th className="px-3 py-3">Peran</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.idAdmin} className="border-b border-[#f0f3f7] transition hover:bg-[#fafcff]">
                    <td className="px-3 py-3">
                      <div className="font-semibold text-[#1b2a4a]">{user.namaLengkap}</div>
                      <div className="text-xs text-[#5a6b7f]">@{user.namaPengguna}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        user.peran === "superadmin"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.peran === "superadmin" ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                        {user.peran}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {user.peran === "superadmin" ? (
                        <span className="text-xs italic text-[#8a97aa]">Semua akses</span>
                      ) : user.role ? (
                        <span className="rounded-md bg-[#e5ebf3] px-2 py-0.5 text-[11px] font-medium text-[#1b2a4a]">{user.role.namaRole}</span>
                      ) : (
                        <span className="text-xs italic text-[#8a97aa]">Tanpa role</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        user.aktif ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                      }`}>
                        {user.aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => bukaFormEdit(user)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#d6dde6] px-2.5 py-1.5 text-xs font-medium text-[#1b2a4a] transition hover:bg-[#f5f7fb]"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        {hapusKonfirmasi === user.idAdmin ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => prosesHapus(user.idAdmin)}
                              disabled={isPending}
                              className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white"
                            >
                              {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Hapus"}
                            </button>
                            <button onClick={() => setHapusKonfirmasi(null)} className="rounded-lg border border-[#d6dde6] px-2.5 py-1.5 text-xs text-[#5a6b7f]">
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setHapusKonfirmasi(user.idAdmin)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" /> Hapus
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
