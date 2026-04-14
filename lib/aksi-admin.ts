"use server"

import { createHash } from "node:crypto"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

import { pastikanPrismaSiap, prisma } from "@/lib/prisma"
import {
  ambilAdminDariTokenSesi,
  NAMA_COOKIE_SESI_ADMIN,
  type DataAdminAman,
} from "@/lib/otentikasi-admin"

// ────────────────────────────────────────────────────────────────────────────
// Helper: ambil admin dari cookie (server-side)
// ────────────────────────────────────────────────────────────────────────────

async function ambilAdmin(): Promise<DataAdminAman | null> {
  const jar = await cookies()
  const token = jar.get(NAMA_COOKIE_SESI_ADMIN)?.value
  return ambilAdminDariTokenSesi(token)
}

async function pastikanSuperadmin() {
  const admin = await ambilAdmin()
  if (!admin || admin.peran !== "superadmin") {
    throw new Error("Hanya superadmin yang bisa mengakses fitur ini.")
  }
  return admin
}

// ────────────────────────────────────────────────────────────────────────────
// MENU: Daftar semua menu
// ────────────────────────────────────────────────────────────────────────────

export async function ambilSemuaMenu() {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  return prisma.menuAdmin.findMany({
    orderBy: [{ grup: "asc" }, { urutan: "asc" }],
  })
}

export async function seedMenuBawaan() {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  const menuBawaan = [
    { kunci: "dashboard", label: "Dashboard", href: "/admin", ikon: "LayoutDashboard", grup: "Umum", urutan: 0 },
    { kunci: "berita", label: "Berita", href: "/admin/berita", ikon: "Newspaper", grup: "Konten", urutan: 1 },
    { kunci: "blog", label: "Blog", href: "/admin/blog", ikon: "BookText", grup: "Konten", urutan: 2 },
    { kunci: "jurnal", label: "Jurnal", href: "/admin/jurnal", ikon: "Library", grup: "Konten", urutan: 3 },
    { kunci: "pejabat", label: "Pejabat", href: "/admin/pejabat", ikon: "Award", grup: "Profil", urutan: 4 },
    { kunci: "dosen", label: "Dosen", href: "/admin/dosen", ikon: "GraduationCap", grup: "Profil", urutan: 5 },
    { kunci: "statistik-beranda", label: "Statistik Beranda", href: "/admin/statistik-beranda", ikon: "ChartNoAxesColumn", grup: "Pengaturan", urutan: 6 },
    { kunci: "role-user", label: "Manajemen Role", href: "/admin/role-user", ikon: "ShieldUser", grup: "Pengaturan", urutan: 7 },
    { kunci: "manajemen-user", label: "Manajemen User", href: "/admin/manajemen-user", ikon: "Users", grup: "Pengaturan", urutan: 8 },
  ]

  for (const menu of menuBawaan) {
    await prisma.menuAdmin.upsert({
      where: { kunci: menu.kunci },
      create: menu,
      update: { label: menu.label, href: menu.href, ikon: menu.ikon, grup: menu.grup, urutan: menu.urutan },
    })
  }

  revalidatePath("/admin")
  return { sukses: true }
}

// ────────────────────────────────────────────────────────────────────────────
// ROLE: CRUD
// ────────────────────────────────────────────────────────────────────────────

export async function ambilSemuaRole() {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  return prisma.rolePengguna.findMany({
    include: {
      izinMenu: { include: { menu: true } },
      _count: { select: { akunAdmin: true } },
    },
    orderBy: { idRole: "asc" },
  })
}

export async function buatRole(input: { namaRole: string; deskripsi: string; menuIds: number[] }) {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  const { namaRole, deskripsi, menuIds } = input

  if (!namaRole.trim()) throw new Error("Nama role wajib diisi.")

  const ada = await prisma.rolePengguna.findUnique({ where: { namaRole: namaRole.trim() } })
  if (ada) throw new Error("Role dengan nama tersebut sudah ada.")

  const role = await prisma.rolePengguna.create({
    data: {
      namaRole: namaRole.trim(),
      deskripsi: deskripsi.trim() || null,
      izinMenu: {
        create: menuIds.map((idMenu) => ({ idMenu })),
      },
    },
    include: { izinMenu: { include: { menu: true } } },
  })

  revalidatePath("/admin/role-user")
  return role
}

export async function updateRole(idRole: number, input: { namaRole: string; deskripsi: string; menuIds: number[] }) {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  const { namaRole, deskripsi, menuIds } = input

  if (!namaRole.trim()) throw new Error("Nama role wajib diisi.")

  const duplikat = await prisma.rolePengguna.findFirst({
    where: { namaRole: namaRole.trim(), NOT: { idRole } },
  })
  if (duplikat) throw new Error("Role dengan nama tersebut sudah ada.")

  // Hapus izin lama, buat yang baru
  await prisma.izinRoleMenu.deleteMany({ where: { idRole } })

  const role = await prisma.rolePengguna.update({
    where: { idRole },
    data: {
      namaRole: namaRole.trim(),
      deskripsi: deskripsi.trim() || null,
      izinMenu: {
        create: menuIds.map((idMenu) => ({ idMenu })),
      },
    },
    include: { izinMenu: { include: { menu: true } } },
  })

  revalidatePath("/admin/role-user")
  revalidatePath("/admin")
  return role
}

export async function hapusRole(idRole: number) {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  const jumlahUser = await prisma.akunAdmin.count({ where: { idRole } })
  if (jumlahUser > 0) {
    throw new Error(`Role ini masih digunakan oleh ${jumlahUser} user. Pindahkan user terlebih dahulu.`)
  }

  await prisma.rolePengguna.delete({ where: { idRole } })
  revalidatePath("/admin/role-user")
  return { sukses: true }
}

// ────────────────────────────────────────────────────────────────────────────
// USER: CRUD
// ────────────────────────────────────────────────────────────────────────────

export async function ambilSemuaUser() {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  return prisma.akunAdmin.findMany({
    select: {
      idAdmin: true,
      namaPengguna: true,
      namaLengkap: true,
      peran: true,
      idRole: true,
      aktif: true,
      dibuatPada: true,
      role: { select: { idRole: true, namaRole: true } },
    },
    orderBy: { idAdmin: "asc" },
  })
}

export async function buatUser(input: {
  namaPengguna: string
  namaLengkap: string
  kataSandi: string
  peran: "superadmin" | "admin"
  idRole: number | null
}) {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  const { namaPengguna, namaLengkap, kataSandi, peran, idRole } = input

  if (!namaPengguna.trim()) throw new Error("Username wajib diisi.")
  if (!namaLengkap.trim()) throw new Error("Nama lengkap wajib diisi.")
  if (kataSandi.length < 6) throw new Error("Kata sandi minimal 6 karakter.")

  const ada = await prisma.akunAdmin.findUnique({ where: { namaPengguna: namaPengguna.trim() } })
  if (ada) throw new Error("Username sudah digunakan.")

  const hash = createHash("sha256").update(kataSandi).digest("hex")

  const user = await prisma.akunAdmin.create({
    data: {
      namaPengguna: namaPengguna.trim(),
      namaLengkap: namaLengkap.trim(),
      kataSandiHash: hash,
      peran,
      idRole,
    },
    select: {
      idAdmin: true,
      namaPengguna: true,
      namaLengkap: true,
      peran: true,
      idRole: true,
      aktif: true,
    },
  })

  revalidatePath("/admin/manajemen-user")
  return user
}

export async function updateUser(idAdmin: number, input: {
  namaLengkap: string
  peran: "superadmin" | "admin"
  idRole: number | null
  aktif: boolean
  kataSandiBaru?: string
}) {
  const adminSaatIni = await pastikanSuperadmin()
  await pastikanPrismaSiap()

  const { namaLengkap, peran, idRole, aktif, kataSandiBaru } = input

  if (!namaLengkap.trim()) throw new Error("Nama lengkap wajib diisi.")

  // Cegah superadmin menurunkan dirinya sendiri
  if (adminSaatIni.idAdmin === idAdmin && peran !== "superadmin") {
    throw new Error("Anda tidak bisa menurunkan peran akun Anda sendiri.")
  }
  if (adminSaatIni.idAdmin === idAdmin && !aktif) {
    throw new Error("Anda tidak bisa menonaktifkan akun Anda sendiri.")
  }

  const dataUpdate: Record<string, unknown> = {
    namaLengkap: namaLengkap.trim(),
    peran,
    idRole,
    aktif,
  }

  if (kataSandiBaru && kataSandiBaru.length >= 6) {
    dataUpdate.kataSandiHash = createHash("sha256").update(kataSandiBaru).digest("hex")
  }

  const user = await prisma.akunAdmin.update({
    where: { idAdmin },
    data: dataUpdate,
    select: {
      idAdmin: true,
      namaPengguna: true,
      namaLengkap: true,
      peran: true,
      idRole: true,
      aktif: true,
    },
  })

  revalidatePath("/admin/manajemen-user")
  revalidatePath("/admin")
  return user
}

export async function hapusUser(idAdmin: number) {
  const adminSaatIni = await pastikanSuperadmin()
  await pastikanPrismaSiap()

  if (adminSaatIni.idAdmin === idAdmin) {
    throw new Error("Anda tidak bisa menghapus akun Anda sendiri.")
  }

  await prisma.sesiAdmin.deleteMany({ where: { idAdmin } })
  await prisma.akunAdmin.delete({ where: { idAdmin } })

  revalidatePath("/admin/manajemen-user")
  return { sukses: true }
}

// ────────────────────────────────────────────────────────────────────────────
// SIDEBAR: Ambil menu yang boleh diakses user tertentu
// ────────────────────────────────────────────────────────────────────────────

export async function ambilMenuUntukAdmin() {
  const admin = await ambilAdmin()
  if (!admin) return []

  await pastikanPrismaSiap()

  // Superadmin selalu punya akses ke semua menu
  if (admin.peran === "superadmin") {
    return prisma.menuAdmin.findMany({
      where: { aktif: true },
      orderBy: [{ grup: "asc" }, { urutan: "asc" }],
    })
  }

  // Ambil data admin beserta role-nya
  const akunData = await prisma.akunAdmin.findUnique({
    where: { idAdmin: admin.idAdmin },
    select: { idRole: true },
  })

  if (!akunData?.idRole) {
    // Admin tanpa role hanya bisa akses dashboard
    return prisma.menuAdmin.findMany({
      where: { kunci: "dashboard", aktif: true },
      orderBy: [{ grup: "asc" }, { urutan: "asc" }],
    })
  }

  // Ambil menu berdasarkan izin role
  const izinList = await prisma.izinRoleMenu.findMany({
    where: { idRole: akunData.idRole },
    include: { menu: true },
  })

  return izinList
    .map((izin) => izin.menu)
    .filter((m) => m.aktif)
    .sort((a, b) => {
      if (a.grup !== b.grup) return a.grup.localeCompare(b.grup)
      return a.urutan - b.urutan
    })
}

export async function ambilDaftarRoleUntukDropdown() {
  await pastikanSuperadmin()
  await pastikanPrismaSiap()

  return prisma.rolePengguna.findMany({
    select: { idRole: true, namaRole: true },
    orderBy: { namaRole: "asc" },
  })
}
