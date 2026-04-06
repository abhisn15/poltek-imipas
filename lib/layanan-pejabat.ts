import { prisma, pastikanPrismaSiap } from "@/lib/prisma"

export type DataPejabat = {
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
  dibuatPada: string
  diubahPada: string
}

export type InputPejabat = {
  nama: string
  jabatan: string
  singkatan?: string
  email?: string
  telepon?: string
  bidangList?: string[]
  fotoUrl?: string | null
  urutan?: number
  aktif?: boolean
}

function parseBidangJson(input: string | null): string[] {
  if (!input) return []
  try {
    const parsed = JSON.parse(input)
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string").slice(0, 10)
    }
  } catch {
    return []
  }
  return []
}

function mapPejabat(data: {
  idPejabat: number
  nama: string
  jabatan: string
  singkatan: string
  email: string
  telepon: string
  bidangJson: string | null
  fotoUrl: string | null
  urutan: number
  aktif: boolean
  dibuatPada: Date
  diubahPada: Date
}): DataPejabat {
  return {
    idPejabat: data.idPejabat,
    nama: data.nama,
    jabatan: data.jabatan,
    singkatan: data.singkatan,
    email: data.email,
    telepon: data.telepon,
    bidangList: parseBidangJson(data.bidangJson),
    fotoUrl: data.fotoUrl,
    urutan: data.urutan,
    aktif: data.aktif,
    dibuatPada: data.dibuatPada.toISOString(),
    diubahPada: data.diubahPada.toISOString(),
  }
}

export async function ambilDaftarPejabat(hanyaAktif = true): Promise<DataPejabat[]> {
  await pastikanPrismaSiap()
  const items = await (prisma as any).pejabat.findMany({
    where: hanyaAktif ? { aktif: true } : undefined,
    orderBy: [{ urutan: "asc" }, { idPejabat: "asc" }],
  })
  return items.map(mapPejabat)
}

export async function ambilPejabatById(id: number): Promise<DataPejabat | null> {
  await pastikanPrismaSiap()
  const item = await (prisma as any).pejabat.findUnique({ where: { idPejabat: id } })
  if (!item) return null
  return mapPejabat(item)
}

export async function buatPejabat(input: InputPejabat): Promise<DataPejabat> {
  await pastikanPrismaSiap()

  const singkatan = input.singkatan?.trim() ||
    input.nama.split(" ").filter(Boolean).map((p: string) => p[0]).join("").slice(0, 2).toUpperCase()

  const item = await (prisma as any).pejabat.create({
    data: {
      nama: input.nama.trim(),
      jabatan: input.jabatan.trim(),
      singkatan,
      email: input.email?.trim() || "",
      telepon: input.telepon?.trim() || "",
      bidangJson: input.bidangList?.length ? JSON.stringify(input.bidangList) : null,
      fotoUrl: input.fotoUrl || null,
      urutan: input.urutan ?? 99,
      aktif: input.aktif ?? true,
    },
  })
  return mapPejabat(item)
}

export async function perbaruiPejabat(id: number, input: Partial<InputPejabat>): Promise<DataPejabat | null> {
  await pastikanPrismaSiap()

  const ada = await (prisma as any).pejabat.findUnique({ where: { idPejabat: id }, select: { idPejabat: true } })
  if (!ada) return null

  const item = await (prisma as any).pejabat.update({
    where: { idPejabat: id },
    data: {
      ...(input.nama !== undefined && { nama: input.nama.trim() }),
      ...(input.jabatan !== undefined && { jabatan: input.jabatan.trim() }),
      ...(input.singkatan !== undefined && { singkatan: input.singkatan.trim() }),
      ...(input.email !== undefined && { email: input.email.trim() }),
      ...(input.telepon !== undefined && { telepon: input.telepon.trim() }),
      ...(input.bidangList !== undefined && {
        bidangJson: input.bidangList.length ? JSON.stringify(input.bidangList) : null,
      }),
      ...(input.fotoUrl !== undefined && { fotoUrl: input.fotoUrl || null }),
      ...(input.urutan !== undefined && { urutan: input.urutan }),
      ...(input.aktif !== undefined && { aktif: input.aktif }),
    },
  })
  return mapPejabat(item)
}

export async function hapusPejabat(id: number): Promise<boolean> {
  await pastikanPrismaSiap()
  try {
    await (prisma as any).pejabat.delete({ where: { idPejabat: id } })
    return true
  } catch {
    return false
  }
}
