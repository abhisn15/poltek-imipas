import { createHash, randomBytes } from "node:crypto"

import type { PeranAdmin } from "@/prisma/generated/client_next"

import { pastikanPrismaSiap, prisma } from "@/lib/prisma"

export const NAMA_COOKIE_SESI_ADMIN = "sesi_admin_poltekimipas"
export const DURASI_SESI_SATU_BULAN_DETIK = 60 * 60 * 24 * 30

export type DataAdminAman = {
  idAdmin: number
  namaPengguna: string
  namaLengkap: string
  peran: "superadmin" | "admin"
  punyaSegalanya: boolean
}

function hashKataSandi(kataSandi: string): string {
  return createHash("sha256").update(kataSandi).digest("hex")
}

function mapAdminAman(admin: {
  idAdmin: number
  namaPengguna: string
  namaLengkap: string
  peran: PeranAdmin
}): DataAdminAman {
  return {
    idAdmin: admin.idAdmin,
    namaPengguna: admin.namaPengguna,
    namaLengkap: admin.namaLengkap,
    peran: admin.peran,
    punyaSegalanya: admin.peran === "superadmin",
  }
}

export async function validasiKredensialAdmin(
  identitas: string,
  kataSandi: string,
): Promise<DataAdminAman | null> {
  await pastikanPrismaSiap()

  const admin = await prisma.akunAdmin.findUnique({
    where: { namaPengguna: identitas },
    select: {
      idAdmin: true,
      namaPengguna: true,
      namaLengkap: true,
      kataSandiHash: true,
      peran: true,
      aktif: true,
    },
  })

  if (!admin || !admin.aktif) {
    return null
  }

  if (admin.kataSandiHash !== hashKataSandi(kataSandi)) {
    return null
  }

  return mapAdminAman(admin)
}

export async function buatSesiAdminBaru(input: {
  idAdmin: number
  ipPengguna?: string | null
  agenPengguna?: string | null
}) {
  await pastikanPrismaSiap()

  const tokenSesi = randomBytes(32).toString("hex")
  const kedaluwarsa = new Date(Date.now() + DURASI_SESI_SATU_BULAN_DETIK * 1000)

  await prisma.sesiAdmin.create({
    data: {
      idSesi: tokenSesi,
      idAdmin: input.idAdmin,
      ipPengguna: input.ipPengguna ?? null,
      agenPengguna: input.agenPengguna ?? null,
      kedaluwarsaPada: kedaluwarsa,
    },
  })

  return { tokenSesi, kedaluwarsa }
}

export async function ambilAdminDariTokenSesi(tokenSesi?: string | null): Promise<DataAdminAman | null> {
  if (!tokenSesi) {
    return null
  }

  await pastikanPrismaSiap()

  const sesi = await prisma.sesiAdmin.findFirst({
    where: {
      idSesi: tokenSesi,
      kedaluwarsaPada: { gt: new Date() },
      admin: { aktif: true },
    },
    select: {
      admin: {
        select: {
          idAdmin: true,
          namaPengguna: true,
          namaLengkap: true,
          peran: true,
        },
      },
    },
  })

  if (!sesi?.admin) {
    return null
  }

  return mapAdminAman(sesi.admin)
}

export async function hapusSesiAdmin(tokenSesi?: string | null) {
  if (!tokenSesi) {
    return
  }

  await pastikanPrismaSiap()
  await prisma.sesiAdmin.deleteMany({
    where: { idSesi: tokenSesi },
  })
}

export async function bersihkanSesiKadaluarsa() {
  await pastikanPrismaSiap()
  await prisma.sesiAdmin.deleteMany({
    where: {
      kedaluwarsaPada: { lte: new Date() },
    },
  })
}
