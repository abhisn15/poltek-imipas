import { prisma, pastikanPrismaSiap } from "@/lib/prisma"
import { buatSlugDariTeks } from "@/lib/teks"

export type JurnalDosenData = {
  id: number
  judul: string
  tahun: string
  program: string
  ringkasan: string
  pdfUrl: string
}

export type DataDosen = {
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
  jurnalList: JurnalDosenData[]
  aktif: boolean
  urutan: number
  dibuatPada: string
  diubahPada: string
}

export type InputDosen = {
  nama: string
  gelar?: string
  jabatan: string
  bidangKeahlianList?: string[]
  deskripsi?: string
  email?: string
  ruang?: string
  fotoUrl?: string | null
  jurnalList?: JurnalDosenData[]
  aktif?: boolean
  urutan?: number
}

function parseJsonArray<T>(input: string | null): T[] {
  if (!input) return []
  try {
    const parsed = JSON.parse(input)
    if (Array.isArray(parsed)) return parsed as T[]
  } catch {
    return []
  }
  return []
}

function mapDosen(data: {
  idDosen: number
  slug: string
  nama: string
  gelar: string
  jabatan: string
  bidangKeahlianJson: string | null
  deskripsi: string
  email: string
  ruang: string
  fotoUrl: string | null
  jurnalJson: string | null
  aktif: boolean
  urutan: number
  dibuatPada: Date
  diubahPada: Date
}): DataDosen {
  return {
    idDosen: data.idDosen,
    slug: data.slug,
    nama: data.nama,
    gelar: data.gelar,
    jabatan: data.jabatan,
    bidangKeahlianList: parseJsonArray<string>(data.bidangKeahlianJson),
    deskripsi: data.deskripsi,
    email: data.email,
    ruang: data.ruang,
    fotoUrl: data.fotoUrl,
    jurnalList: parseJsonArray<JurnalDosenData>(data.jurnalJson),
    aktif: data.aktif,
    urutan: data.urutan,
    dibuatPada: data.dibuatPada.toISOString(),
    diubahPada: data.diubahPada.toISOString(),
  }
}

async function cariSlugDosenUnik(nama: string, idDikecualikan?: number): Promise<string> {
  await pastikanPrismaSiap()
  const slugDasar = buatSlugDariTeks(nama)
  let kandidat = slugDasar
  let urutan = 2
  while (true) {
    const ada = await (prisma as any).dosen.findFirst({
      where: {
        slug: kandidat,
        ...(idDikecualikan ? { NOT: { idDosen: idDikecualikan } } : {}),
      },
      select: { idDosen: true },
    })
    if (!ada) return kandidat
    kandidat = `${slugDasar}-${urutan}`
    urutan++
  }
}

export async function ambilDaftarDosen(hanyaAktif = true): Promise<DataDosen[]> {
  await pastikanPrismaSiap()
  const items = await (prisma as any).dosen.findMany({
    where: hanyaAktif ? { aktif: true } : undefined,
    orderBy: [{ urutan: "asc" }, { idDosen: "asc" }],
  })
  return items.map(mapDosen)
}

export async function ambilDosenBySlug(slug: string): Promise<DataDosen | null> {
  await pastikanPrismaSiap()
  const item = await (prisma as any).dosen.findUnique({ where: { slug } })
  if (!item) return null
  return mapDosen(item)
}

export async function ambilDosenById(id: number): Promise<DataDosen | null> {
  await pastikanPrismaSiap()
  const item = await (prisma as any).dosen.findUnique({ where: { idDosen: id } })
  if (!item) return null
  return mapDosen(item)
}

export async function buatDosen(input: InputDosen): Promise<DataDosen> {
  await pastikanPrismaSiap()
  const slug = await cariSlugDosenUnik(input.nama)

  const item = await (prisma as any).dosen.create({
    data: {
      slug,
      nama: input.nama.trim(),
      gelar: input.gelar?.trim() || "",
      jabatan: input.jabatan.trim(),
      bidangKeahlianJson: input.bidangKeahlianList?.length
        ? JSON.stringify(input.bidangKeahlianList)
        : null,
      deskripsi: input.deskripsi?.trim() || "",
      email: input.email?.trim() || "",
      ruang: input.ruang?.trim() || "",
      fotoUrl: input.fotoUrl || null,
      jurnalJson: input.jurnalList?.length ? JSON.stringify(input.jurnalList) : null,
      aktif: input.aktif ?? true,
      urutan: input.urutan ?? 99,
    },
  })
  return mapDosen(item)
}

export async function perbaruiDosen(id: number, input: Partial<InputDosen>): Promise<DataDosen | null> {
  await pastikanPrismaSiap()
  const ada = await (prisma as any).dosen.findUnique({ where: { idDosen: id }, select: { idDosen: true, nama: true } })
  if (!ada) return null

  const item = await (prisma as any).dosen.update({
    where: { idDosen: id },
    data: {
      ...(input.nama !== undefined && { nama: input.nama.trim() }),
      ...(input.gelar !== undefined && { gelar: input.gelar.trim() }),
      ...(input.jabatan !== undefined && { jabatan: input.jabatan.trim() }),
      ...(input.bidangKeahlianList !== undefined && {
        bidangKeahlianJson: input.bidangKeahlianList.length
          ? JSON.stringify(input.bidangKeahlianList)
          : null,
      }),
      ...(input.deskripsi !== undefined && { deskripsi: input.deskripsi.trim() }),
      ...(input.email !== undefined && { email: input.email.trim() }),
      ...(input.ruang !== undefined && { ruang: input.ruang.trim() }),
      ...(input.fotoUrl !== undefined && { fotoUrl: input.fotoUrl || null }),
      ...(input.jurnalList !== undefined && {
        jurnalJson: input.jurnalList.length ? JSON.stringify(input.jurnalList) : null,
      }),
      ...(input.aktif !== undefined && { aktif: input.aktif }),
      ...(input.urutan !== undefined && { urutan: input.urutan }),
    },
  })
  return mapDosen(item)
}

export async function hapusDosen(id: number): Promise<boolean> {
  await pastikanPrismaSiap()
  try {
    await (prisma as any).dosen.delete({ where: { idDosen: id } })
    return true
  } catch {
    return false
  }
}
